/** GitHub REST API access. No token: public data only, 60 requests/hour per visitor IP. */

const API_URL = 'https://api.github.com'
export const GITHUB_USER = import.meta.env.VITE_GITHUB_USER || 'raulacor'

export type Repo = {
  name: string
  description: string | null
  language: string | null
  /** Last push, i.e. the last time code changed. */
  updatedAt: string
  stars: number
  forks: number
  topics: string[]
  url: string
  homepage: string | null
}

type RawRepo = {
  name: string
  description: string | null
  language: string | null
  pushed_at: string
  stargazers_count: number
  forks_count: number
  topics?: string[]
  html_url: string
  homepage: string | null
  fork: boolean
  archived: boolean
}

export class GitHubError extends Error {
  readonly status: number
  readonly rateLimited: boolean

  constructor(message: string, status: number, rateLimited = false) {
    super(message)
    this.name = 'GitHubError'
    this.status = status
    this.rateLimited = rateLimited
  }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  })

  if (response.ok) return response.json() as Promise<T>

  const outOfRequests = response.headers.get('x-ratelimit-remaining') === '0'
  if ((response.status === 403 || response.status === 429) && outOfRequests) {
    const reset = Number(response.headers.get('x-ratelimit-reset')) * 1000
    const time = new Date(reset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    throw new GitHubError(
      `GitHub’s API limit for your network was reached. It resets at ${time}.`,
      response.status,
      true,
    )
  }
  if (response.status === 404) throw new GitHubError('Not found on GitHub.', 404)
  throw new GitHubError(`GitHub responded with an error (${response.status}).`, response.status)
}

function toRepo(raw: RawRepo): Repo {
  return {
    name: raw.name,
    description: raw.description,
    language: raw.language,
    updatedAt: raw.pushed_at,
    stars: raw.stargazers_count,
    forks: raw.forks_count,
    topics: raw.topics ?? [],
    url: raw.html_url,
    homepage: raw.homepage || null,
  }
}

/** Public, non-fork, non-archived repositories, most recently updated first. */
export async function fetchRepos(signal?: AbortSignal): Promise<Repo[]> {
  const raw = await request<RawRepo[]>(`/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, signal)
  return raw.filter(repo => !repo.fork && !repo.archived).map(toRepo)
}

/** Bytes of code per language, e.g. { TypeScript: 52000, CSS: 4100 }. */
export function fetchRepoLanguages(name: string, signal?: AbortSignal) {
  return request<Record<string, number>>(`/repos/${GITHUB_USER}/${encodeURIComponent(name)}/languages`, signal)
}

/** GitHub's generated social card for a repository. */
export function repoPreviewImage(name: string) {
  return `https://opengraph.githubassets.com/1/${GITHUB_USER}/${encodeURIComponent(name)}`
}
