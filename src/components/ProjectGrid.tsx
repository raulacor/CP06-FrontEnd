import { ProjectCard } from '@/components/ProjectCard'
import { ProjectCardSkeleton } from '@/components/ProjectCardSkeleton'
import type { Repo } from '@/services/github'

/**
 * Bento placement by position on the home page. lg is a 4-column grid where the first
 * project takes 2×2. Positions past the sixth fall back to a single cell.
 */
const BENTO = [
  'md:col-span-2 lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-2',
  'md:col-span-2 lg:col-span-2',
]

const LAYOUTS = {
  bento: 'grid gap-4 md:grid-cols-2 lg:grid-cols-4',
  grid: 'grid gap-4 md:grid-cols-2 lg:grid-cols-3',
}

type Layout = keyof typeof LAYOUTS

const cellClass = (layout: Layout, index: number) => (layout === 'bento' ? (BENTO[index] ?? '') : '')

export function ProjectGrid({ repos, layout = 'grid' }: { repos: Repo[]; layout?: Layout }) {
  return (
    <ul className={LAYOUTS[layout]}>
      {repos.map((repo, i) => (
        <li key={repo.name} className={cellClass(layout, i)}>
          <ProjectCard repo={repo} index={i} featured={layout === 'bento' && i === 0} />
        </li>
      ))}
    </ul>
  )
}

export function ProjectGridSkeleton({ count = 6, layout = 'grid' }: { count?: number; layout?: Layout }) {
  return (
    <div className={LAYOUTS[layout]} role="status" aria-label="Loading projects">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={cellClass(layout, i)}>
          <ProjectCardSkeleton featured={layout === 'bento' && i === 0} />
        </div>
      ))}
    </div>
  )
}
