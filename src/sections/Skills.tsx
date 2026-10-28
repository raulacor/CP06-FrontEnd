import { useMemo } from 'react'
import LogoLoop, { type LogoItem } from '@/components/LogoLoop'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { TechIcon } from '@/components/TechIcon'
import { brandColor } from '@/lib/techIcons'
import { sections, skillGroups, stackLogos } from '@/data/site'

export function Skills() {
  const logos = useMemo<LogoItem[]>(
    () =>
      stackLogos.map(logo => ({
        node: <TechIcon icon={logo.icon} size={26} />,
        title: logo.name,
        ariaLabel: logo.name,
        hoverColor: brandColor(logo.icon),
      })),
    [],
  )

  return (
    <Section
      {...sections.skills}
      title="The stack"
      lead="Languages, frameworks and tools that show up in my repos and coursework."
      bleed={
        <Reveal className="mt-14 border-y border-line text-fg-muted sm:mt-20">
          <LogoLoop
            logos={logos}
            speed={38}
            gap={56}
            logoHeight={28}
            labels="inline"
            muted={0.4}
            pauseOnHover
            fadeOut
            fadeOutWidth={0.14}
            ariaLabel="Technologies I work with"
            className="py-7 sm:py-9"
          />
        </Reveal>
      }
    >
      <Reveal
        stagger={0.06}
        className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:mt-20 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5"
      >
        {skillGroups.map(group => (
          <div key={group.label}>
            <h3 className="eyebrow">{group.label}</h3>
            <ul className="mt-5 space-y-2.5">
              {group.items.map(item => (
                <li key={item} className="text-fg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  )
}
