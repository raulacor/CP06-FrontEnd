import { useQuery } from '@tanstack/react-query'
import { fetchRepoLanguages, fetchRepos, type Repo } from '@/services/github'

export const repoKeys = {
  all: ['repos'] as const,
  languages: (name: string) => ['repos', name, 'languages'] as const,
}

/** Every public repository. Cached app-wide, so all pages share a single request. */
export function useRepos() {
  return useQuery({ queryKey: repoKeys.all, queryFn: ({ signal }) => fetchRepos(signal) })
}

/** One repository, read from the same cached list (no extra request). `null` when it doesn't exist. */
export function useRepo(name: string) {
  return useQuery({
    queryKey: repoKeys.all,
    queryFn: ({ signal }) => fetchRepos(signal),
    select: (repos: Repo[]) => repos.find(repo => repo.name.toLowerCase() === name.toLowerCase()) ?? null,
  })
}

export function useRepoLanguages(name: string) {
  return useQuery({
    queryKey: repoKeys.languages(name),
    queryFn: ({ signal }) => fetchRepoLanguages(name, signal),
  })
}
