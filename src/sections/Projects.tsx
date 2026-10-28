import { Link } from 'react-router'
import { ProjectGrid, ProjectGridSkeleton } from '@/components/ProjectGrid'
import { Section } from '@/components/Section'
import { StatusMessage } from '@/components/ui/StatusMessage'
import { ArrowUpRight } from '@/components/Icons'
import { sections } from '@/data/site'
import { useRepos } from '@/hooks/useRepos'

const HOME_LIMIT = 6

export function Projects() {
  const { data: repos, isPending, isError, error, refetch } = useRepos()

  return (
    <Section
      {...sections.work}
      title="Selected work"
      lead="Pulled live from my GitHub: coursework and personal builds, newest first."
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
          <ProjectGrid repos={repos.slice(0, HOME_LIMIT)} layout="bento" />
        )}
      </div>

      {repos && repos.length > HOME_LIMIT && (
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
