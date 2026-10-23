import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { certifications, coursework, education, experience, sections, type TimelineEntry } from '@/data/site'

function Group({ label, entries, showLabel }: { label: string; entries: TimelineEntry[]; showLabel: boolean }) {
  // Entry titles sit one level below whatever heading precedes them.
  const Title = showLabel ? 'h4' : 'h3'
  return (
    <div>
      {showLabel && <h3 className="eyebrow mb-2">{label}</h3>}
      <Reveal stagger={0.08}>
        {entries.map(entry => (
          <article
            key={`${entry.title}-${entry.org}`}
            className="grid gap-x-8 gap-y-2 border-b border-line py-7 first:border-t sm:grid-cols-12 sm:py-8"
          >
            <p className="text-sm text-fg-subtle sm:col-span-3 sm:pt-2">
              {[entry.period, entry.status].filter(Boolean).join(' · ')}
            </p>
            <div className="sm:col-span-5">
              <Title className="font-display font-wide text-[clamp(1.5rem,2.6vw,2.125rem)] leading-tight font-[620] tracking-[-0.025em]">
                {entry.title}
              </Title>
              <p className="mt-1 text-fg-muted">{entry.org}</p>
            </div>
            {entry.detail && <p className="text-fg-muted sm:col-span-4 sm:pt-2">{entry.detail}</p>}
          </article>
        ))}
      </Reveal>
    </div>
  )
}

export function Path() {
  const title = experience.length ? 'Experience & education' : 'Where I’m learning'
  // Group labels only add information once there is more than one group.
  const showLabels = experience.length > 0 || certifications.length > 0

  return (
    <Section {...sections.path} title={title}>
      <div className="mt-14 space-y-16 sm:mt-20">
        {experience.length > 0 && <Group label="Experience" entries={experience} showLabel={showLabels} />}
        <Group label="Education" entries={education} showLabel={showLabels} />
        {certifications.length > 0 && <Group label="Certifications" entries={certifications} showLabel={showLabels} />}

        <Reveal className="grid gap-x-8 gap-y-4 sm:grid-cols-12">
          <h3 className="eyebrow sm:col-span-3 sm:pt-1.5">Coursework so far</h3>
          <ul className="flex flex-wrap gap-2 sm:col-span-9">
            {coursework.map(item => (
              <li key={item} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-fg">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
