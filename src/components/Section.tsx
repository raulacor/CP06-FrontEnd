import type { ReactNode } from 'react'
import { Reveal } from '@/components/Reveal'

type SectionProps = {
  id: string
  index: string
  label: string
  /** Large display heading. When omitted, the small label becomes the section's <h2>. */
  title?: ReactNode
  lead?: ReactNode
  /** Rendered full-bleed between the header and the content (e.g. the logo loop). */
  bleed?: ReactNode
  children?: ReactNode
  className?: string
}

/**
 * Editorial section layout: a sticky index label in the left three columns,
 * content in the remaining nine, separated from the previous section by a hairline.
 */
export function Section({ id, index, label, title, lead, bleed, children, className = '' }: SectionProps) {
  const headingId = `${id}-heading`
  const Label = title ? 'p' : 'h2'

  return (
    <section id={id} aria-labelledby={headingId} className={`relative border-t border-line ${className}`}>
      <div className="shell grid gap-y-8 pt-20 sm:pt-28 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-3">
          <Label id={title ? undefined : headingId} className="eyebrow flex items-center gap-3 lg:sticky lg:top-28">
            <span className="text-fg-muted">{index}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span>{label}</span>
          </Label>
        </div>

        {(title || lead) && (
          <Reveal className="lg:col-span-9">
            {title && (
              <h2
                id={headingId}
                className="font-wide text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.95] font-[650] tracking-[-0.035em]"
              >
                {title}
              </h2>
            )}
            {lead && <p className="mt-6 max-w-[38rem] text-lg text-fg-muted">{lead}</p>}
          </Reveal>
        )}
      </div>

      {bleed}

      <div className="shell pb-20 sm:pb-28">{children}</div>
    </section>
  )
}
