import ScrollReveal from '@/components/ScrollReveal'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { about, sections } from '@/data/site'

export function About() {
  return (
    <Section {...sections.about}>
      <div className="mt-8 grid gap-y-14 lg:mt-0 lg:grid-cols-12 lg:gap-x-8">
        <ScrollReveal
          as="p"
          containerClassName="my-0! lg:col-span-9 lg:col-start-4"
          textClassName="font-display font-wide text-[clamp(1.75rem,4.4vw,3.6rem)]! leading-[1.08]! font-[560]! tracking-[-0.025em]"
          effect="fade"
          baseOpacity={0.16}
          enableBlur={false}
          baseRotation={0}
          stagger={0.04}
          wordAnimationEnd="bottom 72%"
        >
          {about.statement}
        </ScrollReveal>

        <Reveal className="grid gap-10 sm:grid-cols-2 lg:col-span-9 lg:col-start-4 lg:grid-cols-9 lg:gap-x-8">
          <div className="space-y-5 text-lg text-fg-muted sm:col-span-1 lg:col-span-5">
            {about.paragraphs.map(text => (
              <p key={text}>{text}</p>
            ))}
          </div>

          <dl className="divide-y divide-line border-y border-line sm:col-span-1 lg:col-span-4">
            {about.facts.map(fact => (
              <div key={fact.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="text-right text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
