import type { CSSProperties } from 'react'
import SpotlightCard from '@/components/SpotlightCard'
import { ArrowUpRight, GitHub } from '@/components/Icons'
import type { Project } from '@/data/site'

const CARD_VARS = {
  '--spotlight-card-surface': 'var(--color-ink-raised)',
  '--spotlight-card-border': 'var(--color-line)',
  '--spotlight-card-shadow': 'none',
} as CSSProperties

/** Visual readout of UkrAid's real risk model (python/risk_model.py). Decorative. */
function RiskReadout() {
  const levels = [
    { label: 'Critical', bars: 4 },
    { label: 'High', bars: 3 },
    { label: 'Moderate', bars: 2 },
    { label: 'Low', bars: 1 },
  ]
  return (
    <div aria-hidden="true" className="relative rounded-xl border border-line bg-ink/80 p-4 text-[0.8125rem] sm:p-5">
      <p className="flex items-center gap-2 text-fg-subtle">
        <span className="text-accent">$</span> risk_model.py
      </p>
      <p className="mt-3 font-display font-wide text-lg tracking-[-0.01em] text-fg sm:text-xl">
        risk(d) = e<sup className="text-[0.6em]">−k·d</sup> / d²
      </p>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
        {levels.map(level => (
          <div key={level.label} className="flex items-center gap-2">
            <span className="flex gap-0.5">
              {Array.from({ length: 4 }, (_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-1 rounded-[1px] ${i < level.bars ? (level.bars === 4 ? 'bg-accent' : 'bg-fg-muted') : 'bg-line-strong'}`}
                />
              ))}
            </span>
            <span className="text-fg-subtle">{level.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { featured } = project

  return (
    <SpotlightCard
      className="group flex h-full flex-col rounded-2xl! p-6! has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent sm:p-7!"
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
            {project.kicker}
          </p>
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-fg-subtle transition-[color,border-color,transform] duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-line-strong group-hover:text-fg"
          >
            <ArrowUpRight size={16} />
          </span>
        </div>

        <h3
          className={`font-wide font-[650] tracking-[-0.025em] ${featured ? 'mt-8 text-[clamp(2.25rem,4vw,3.25rem)] leading-[0.95]' : 'mt-6 text-2xl leading-tight sm:text-[1.65rem]'}`}
        >
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="outline-none after:absolute after:inset-0 after:z-[2] after:content-['']"
          >
            {project.title}
            <span className="sr-only"> (GitHub repository, opens in a new tab)</span>
          </a>
        </h3>

        <p className={`mt-3 text-fg-muted ${featured ? 'max-w-[36rem] text-lg' : ''}`}>{project.summary}</p>

        {featured && project.highlights && (
          <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-fg-muted">
            {project.highlights.map(item => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {featured && (
          <div className="mt-8">
            <RiskReadout />
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.tags.map(tag => (
              <li key={tag} className="rounded-full border border-line px-2.5 py-1 text-xs text-fg-muted">
                {tag}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-1.5 text-xs text-fg-subtle" aria-hidden="true">
            <GitHub size={14} /> Source
          </span>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="relative z-[3] inline-flex items-center gap-1.5 rounded-full bg-fg px-3 py-1.5 text-xs font-semibold text-ink"
            >
              Live
              <ArrowUpRight size={14} />
              <span className="sr-only"> demo of {project.title}, opens in a new tab</span>
            </a>
          )}
        </div>
      </article>
    </SpotlightCard>
  )
}
