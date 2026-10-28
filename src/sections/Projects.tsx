import { Link } from 'react-router'
import { ProjectGrid, ProjectGridSkeleton } from '@/components/ProjectGrid'
import { Section } from '@/components/Section'
import { StatusMessage } from '@/components/ui/StatusMessage'
import { ArrowUpRight } from '@/components/Icons'
import { sections } from '@/data/site'
import { useFeatured } from '@/hooks/useFeatured'
import { useRepos } from '@/hooks/useRepos'
import type { Repo } from '@/services/github'

const HOME_LIMIT = 6

/** Featured repos (picked in the dashboard) in their chosen order, or the latest ones if none are picked. */
function pickHomeRepos(repos: Repo[], featured: string[] | undefined) {
  const picked = (featured ?? []).map(name => repos.find(repo => repo.name === name)).filter(repo => repo !== undefined)
  return picked.length ? picked : repos.slice(0, HOME_LIMIT)
}

export function Projects() {
  const { data: repos, isPending: reposPending, isError, error, refetch } = useRepos()
  const featured = useFeatured()
  // A failed featured request is not fatal: the section falls back to the latest projects.
  const isPending = reposPending || featured.isPending

  return (
    <Section
      {...sections.work}
      title="Selected work"
      lead="Pulled live from my GitHub: coursework and personal builds."
    >
      <div className="mt-14 sm:mt-20">
        {isPending ? (
          <ProjectGridSkeleton layout="bento" />
        ) : isError ? (
          <StatusMessage tone="error" title="Couldn’t load projects from GitHub" onRetry={() => refetch()}>
            {error.message}
          </StatusMessage>
        ) : repos.length === 0 ? (
          <StatusMessage title="No public projects yet">
            New repositories will show up here automatically.
          </StatusMessage>
        ) : (
          <ProjectGrid repos={pickHomeRepos(repos, featured.data)} layout="bento" />
        )}
      </div>

      {repos && repos.length > 0 && !isPending && (
        <p className="mt-10 text-fg-muted">
          <Link to="/projects" className="link-draw inline-flex items-center gap-1 text-fg">
            See all {repos.length} projects
            <ArrowUpRight size={15} />
          </Link>
        </p>
      )}
    </Section>
  )
}
