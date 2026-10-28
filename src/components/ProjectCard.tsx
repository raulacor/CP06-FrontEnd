import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import SpotlightCard from '@/components/SpotlightCard'
import { ArrowUpRight, Star } from '@/components/Icons'
import { CARD_SIZE } from '@/components/projectCardSize'
import { formatDate, formatRepoName } from '@/lib/format'
import type { Repo } from '@/services/github'

const CARD_VARS = {
  '--spotlight-card-surface': 'var(--color-ink-raised)',
  '--spotlight-card-border': 'var(--color-line)',
  '--spotlight-card-shadow': 'none',
} as CSSProperties

type ProjectCardProps = { repo: Repo; index: number; featured?: boolean }

export function ProjectCard({ repo, index, featured = false }: ProjectCardProps) {
  const title = formatRepoName(repo.name)
  const tags = repo.topics.length ? repo.topics.slice(0, 4) : repo.language ? [repo.language] : []

  return (
    <SpotlightCard
      className={`group flex h-full flex-col rounded-2xl! p-6! has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent sm:p-7! ${featured ? CARD_SIZE.featured : CARD_SIZE.regular}`}
      style={CARD_VARS}
      spotlightColor="#5de8f6"
      intensity={featured ? 0.09 : 0.11}
      spotlightSize={featured ? 460 : 320}
      borderGlow={0.6}
      proximity={60}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-fg)_8%,transparent)_1px,transparent_1.5px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_80%_70%_at_100%_0%,#000,transparent_70%)]"
        />
      )}

      <article className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow leading-relaxed">
            <span className="text-fg-muted">{String(index + 1).padStart(2, '0')}</span>
            <span className="px-2" aria-hidden="true">
              /
            </span>
            {repo.language ?? 'Repository'}
          </p>
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-fg-subtle transition-[color,border-color,transform] duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-line-strong group-hover:text-fg"
          >
            <ArrowUpRight size={16} />
          </span>
        </div>

        <h3
          className={`font-wide font-[650] tracking-[-0.025em] break-words ${featured ? 'mt-8 text-[clamp(2rem,4vw,3.25rem)] leading-[0.95]' : 'mt-6 text-2xl leading-tight sm:text-[1.65rem]'}`}
        >
          {/* The stretched link makes the whole card clickable while keeping one accessible link. */}
          <Link
            to={`/projects/${repo.name}`}
            className="outline-none after:absolute after:inset-0 after:z-[2] after:content-['']"
          >
            {title}
          </Link>
        </h3>

        <p className={`mt-3 text-fg-muted ${featured ? 'max-w-[36rem] text-lg' : ''}`}>
          {repo.description ?? 'No description yet.'}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
              {tags.map(tag => (
                <li key={tag} className="rounded-full border border-line px-2.5 py-1 text-xs text-fg-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <p className="flex items-center gap-3 text-xs text-fg-subtle">
            {repo.stars > 0 && (
              <span className="inline-flex items-center gap-1">
                <Star size={13} />
                <span className="sr-only">Stars:</span>
                {repo.stars}
              </span>
            )}
            <span>
              Updated <time dateTime={repo.updatedAt}>{formatDate(repo.updatedAt)}</time>
            </span>
          </p>
        </div>
      </article>
    </SpotlightCard>
  )
}
