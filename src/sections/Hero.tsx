import type { CSSProperties } from 'react'
import SplitText from '@/components/SplitText'
import { HeroBackground } from '@/components/HeroBackground'
import { RoleCycler } from '@/components/RoleCycler'
import { ArrowDown, Download } from '@/components/Icons'
import { profile, sections } from '@/data/site'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative isolate flex min-h-[100svh] flex-col">
      <HeroBackground />

      <div className="shell relative flex flex-1 flex-col justify-end pt-32 pb-8 sm:pb-12">
        <p className="eyebrow hero-in flex items-center gap-2.5" style={delay(0)}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
          Portfolio · {new Date().getFullYear()}
        </p>

        <h1 className="mt-6 font-wide text-[clamp(3rem,16.5vw,11.25rem)] leading-[0.86] font-[680] tracking-[-0.045em]">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true" className="block">
            {profile.nameLines.map((line, i) => (
              <span key={line} className="block">
                <SplitText
                  text={line}
                  tag="span"
                  trigger="load"
                  splitType="chars"
                  mask
                  textAlign="left"
                  delay={28}
                  duration={0.6}
                  from={{ yPercent: 105, opacity: 0 }}
                  to={{ yPercent: 0, opacity: 1, delay: 0.08 + i * 0.14 }}
                  ease="power4.out"
                  className="overflow-visible!"
                />
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p
              className="hero-in flex items-baseline gap-3 font-display text-[clamp(1.2rem,2.3vw,1.6rem)] leading-tight font-medium tracking-[-0.01em] font-wide"
              style={delay(450)}
            >
              <span aria-hidden="true" className="text-accent">
                &gt;
              </span>
              <RoleCycler roles={profile.roles} startDelay={750} />
            </p>
            <p className="hero-in mt-5 max-w-[34rem] text-base text-fg-muted sm:text-lg" style={delay(550)}>
              {profile.intro}
            </p>
          </div>

          <div className="hero-in flex flex-wrap gap-2.5 sm:gap-3 md:col-span-5 md:justify-end" style={delay(650)}>
            <a
              href={`#${sections.work.id}`}
              className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-fg px-5 text-sm sm:px-6 font-semibold text-ink transition-colors duration-200 hover:bg-white"
            >
              View selected work
              <ArrowDown
                size={16}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong px-5 text-sm sm:px-6 font-semibold text-fg transition-colors duration-200 hover:border-fg-subtle hover:bg-white/5"
            >
              <Download size={16} />
              Résumé
            </a>
          </div>
        </div>

        <div
          className="hero-in mt-14 flex items-center justify-between gap-6 border-t border-line pt-5 text-xs text-fg-subtle"
          style={delay(800)}
        >
          <span>{profile.location}</span>
          <span className="hidden tabular-nums sm:inline">{profile.coordinates}</span>
          <a
            href={`#${sections.about.id}`}
            className="group inline-flex items-center gap-2 uppercase tracking-[0.16em] transition-colors hover:text-fg"
          >
            Scroll
            <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
