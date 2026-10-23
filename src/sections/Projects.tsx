import { ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { links, projects, sections } from '@/data/site'
import { ArrowUpRight } from '@/components/Icons'

/**
 * Bento placement by position. lg is a 4-column grid where the featured project takes 2×2.
 * Positions past the sixth fall back to a single cell.
 */
const PLACEMENT = [
  'md:col-span-2 lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-2',
  'md:col-span-2 lg:col-span-2',
]

export function Projects() {
  return (
    <Section
      {...sections.work}
      title="Selected work"
      lead="From OSINT tooling to async Rust. Coursework and personal builds, described from the code itself."
    >
      <Reveal stagger={0.07} className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, i) => (
          <div key={project.slug} className={PLACEMENT[i] ?? ''}>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </Reveal>

      <p className="mt-10 text-fg-muted">
        More on{' '}
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="link-draw inline-flex items-center gap-1 text-fg"
        >
          github.com/raulacor
          <ArrowUpRight size={15} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </Section>
  )
}
