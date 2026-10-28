import { StatusMessage } from '@/components/ui/StatusMessage'
import { Spinner } from '@/components/ui/Spinner'
import { MAX_FEATURED, useFeatured, useToggleFeatured } from '@/hooks/useFeatured'
import { useRepos } from '@/hooks/useRepos'
import { formatDate, formatRepoName } from '@/lib/format'

export function FeaturedPanel() {
  const repos = useRepos()
  const featured = useFeatured()
  const toggle = useToggleFeatured()

  if (repos.isPending || featured.isPending) {
    return (
      <div className="grid place-items-center py-16 text-fg-muted">
        <Spinner size={22} label="Loading projects" />
      </div>
    )
  }

  if (repos.isError || featured.isError) {
    return (
      <StatusMessage
        tone="error"
        title="Couldn’t load projects"
        onRetry={() => {
          repos.refetch()
          featured.refetch()
        }}
      >
        {(repos.error ?? featured.error)?.message}
      </StatusMessage>
    )
  }

  if (repos.data.length === 0) return <StatusMessage title="No public repositories on GitHub yet" />

  const selected = new Set(featured.data)
  const full = selected.size >= MAX_FEATURED
  const pendingName = toggle.isPending ? toggle.variables?.name : undefined

  return (
    <div>
      <p className="mb-6 text-fg-muted">
        Pick up to {MAX_FEATURED} projects for the home page, in the order you want them.{' '}
        <span className="text-fg">
          {selected.size}/{MAX_FEATURED} selected.
        </span>{' '}
        With none selected, the home page shows the latest {MAX_FEATURED}.
      </p>
      {toggle.isError && (
        <p role="alert" className="mb-4 text-sm text-red-500">
          Couldn’t save that change: {toggle.error.message}
        </p>
      )}
      <ul className="divide-y divide-line rounded-2xl border border-line bg-ink-raised">
        {repos.data.map(repo => {
          const checked = selected.has(repo.name)
          const position = featured.data.indexOf(repo.name) + 1
          return (
            <li key={repo.name}>
              <label className="flex cursor-pointer items-center gap-4 px-5 py-4 has-disabled:cursor-not-allowed has-disabled:opacity-50">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={(full && !checked) || toggle.isPending}
                  onChange={() => toggle.mutate({ name: repo.name, featured: !checked })}
                  className="size-4 accent-[var(--color-accent)]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-fg">{formatRepoName(repo.name)}</span>
                  <span className="block truncate text-sm text-fg-subtle">
                    {repo.language ?? 'Repository'} · updated {formatDate(repo.updatedAt)}
                  </span>
                </span>
                {pendingName === repo.name ? (
                  <Spinner label="Saving" />
                ) : (
                  checked && <span className="eyebrow text-accent">#{position}</span>
                )}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
