import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow: ReactNode
  title: ReactNode
  lead?: ReactNode
  /** Rendered above the eyebrow, e.g. a back link. */
  before?: ReactNode
}

/** Heading block shared by every page other than home. */
export function PageHeader({ eyebrow, title, lead, before }: PageHeaderProps) {
  return (
    <header className="pt-32 sm:pt-40">
      {before}
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 font-wide text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92] font-[680] tracking-[-0.04em] break-words">
        {title}
      </h1>
      {lead && <p className="mt-6 max-w-[40rem] text-lg text-fg-muted">{lead}</p>}
    </header>
  )
}
