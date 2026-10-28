import { PageHeader } from '@/components/PageHeader'
import { ProjectGrid, ProjectGridSkeleton } from '@/components/ProjectGrid'
import { StatusMessage } from '@/components/ui/StatusMessage'
import { links } from '@/data/site'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useRepos } from '@/hooks/useRepos'

export default function ProjectsPage() {
  useDocumentTitle('Projects')
  const { data: repos, isPending, isError, error, refetch } = useRepos()

  return (
    <div className="shell pb-24">
      <PageHeader
        eyebrow="Work"
        title="All projects"
        lead={
          <>
            Every public repository on{' '}
            <a href={links.github} target="_blank" rel="noreferrer" className="link-draw text-fg">
              my GitHub
            </a>
            , loaded straight from its API.
          </>
        }
      />
      <div className="mt-14">
        {isPending ? (
          <ProjectGridSkeleton count={9} />
        ) : isError ? (
          <StatusMessage tone="error" title="Couldn’t load projects from GitHub" onRetry={() => refetch()}>
            {error.message}
          </StatusMessage>
        ) : repos.length === 0 ? (
          <StatusMessage title="No public projects yet">
            New repositories will show up here automatically.
          </StatusMessage>
        ) : (
          <ProjectGrid repos={repos} />
        )}
      </div>
    </div>
  )
}
