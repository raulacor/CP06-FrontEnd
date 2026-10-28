import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowUpRight, GitHub } from '@/components/Icons'
import { LanguageBar } from '@/components/LanguageBar'
import { PageHeader } from '@/components/PageHeader'
import { PageLoader } from '@/components/PageLoader'
import { StatusMessage } from '@/components/ui/StatusMessage'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useRepo, useRepoLanguages } from '@/hooks/useRepos'
import { formatDate, formatRepoName } from '@/lib/format'
import { repoPreviewImage, type Repo } from '@/services/github'
import NotFoundPage from '@/pages/NotFoundPage'

const backLink = (
  <Link to="/projects" className="link-draw mb-8 inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg">
    <ArrowLeft size={15} /> All projects
  </Link>
)

function Languages({ name }: { name: string }) {
  const { data, isPending, isError } = useRepoLanguages(name)
  if (isPending) return <div className="h-10 animate-pulse rounded-lg bg-fg/[0.06] motion-reduce:animate-none" />
  if (isError) return <p className="text-fg-muted">Language breakdown unavailable right now.</p>
  return <LanguageBar languages={data} />
}

function ProjectDetails({ repo }: { repo: Repo }) {
  const facts = [
    { label: 'Main language', value: repo.language ?? '—' },
    { label: 'Last update', value: formatDate(repo.updatedAt) },
    { label: 'Stars', value: repo.stars },
    { label: 'Forks', value: repo.forks },
  ]

  return (
    <div className="shell pb-24">
      <PageHeader
        before={backLink}
        eyebrow={repo.language ?? 'Repository'}
        title={formatRepoName(repo.name)}
        lead={repo.description ?? 'No description yet.'}
      />

      <div className="mt-10 flex flex-wrap gap-3">
        <a href={repo.url} target="_blank" rel="noreferrer" className={buttonStyles('primary')}>
          <GitHub size={17} /> View source
          <span className="sr-only"> on GitHub (opens in a new tab)</span>
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noreferrer" className={buttonStyles('secondary')}>
            Live demo <ArrowUpRight size={16} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="space-y-12 lg:col-span-5">
          <dl className="divide-y divide-line border-y border-line">
            {facts.map(fact => (
              <div key={fact.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="text-right text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby="languages-heading">
            <h2 id="languages-heading" className="eyebrow mb-5">
              Languages
            </h2>
            <Languages name={repo.name} />
          </section>

          {repo.topics.length > 0 && (
            <section aria-labelledby="topics-heading">
              <h2 id="topics-heading" className="eyebrow mb-5">
                Topics
              </h2>
              <ul className="flex flex-wrap gap-2">
                {repo.topics.map(topic => (
                  <li key={topic} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-fg">
                    {topic}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <figure className="lg:col-span-7">
          {/* Fixed aspect ratio + lazy loading: no layout shift and no download until it scrolls into view. */}
          <img
            src={repoPreviewImage(repo.name)}
            alt={`GitHub preview card for ${repo.name}`}
            width={1200}
            height={600}
            loading="lazy"
            decoding="async"
            className="aspect-[2/1] w-full rounded-2xl border border-line bg-ink-raised object-cover"
          />
        </figure>
      </div>
    </div>
  )
}

export default function ProjectPage() {
  const { slug = '' } = useParams()
  const { data: repo, isPending, isError, error, refetch } = useRepo(slug)
  useDocumentTitle(repo ? formatRepoName(repo.name) : undefined)

  if (isPending) return <PageLoader />

  if (isError) {
    return (
      <div className="shell pt-36 pb-24">
        <StatusMessage
          tone="error"
          title="Couldn’t load this project"
          onRetry={() => refetch()}
          actions={
            <Link to="/" className={buttonStyles('ghost')}>
              Back to home
            </Link>
          }
        >
          {error.message}
        </StatusMessage>
      </div>
    )
  }

  if (!repo) return <NotFoundPage />

  return <ProjectDetails repo={repo} />
}
