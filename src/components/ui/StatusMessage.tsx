import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

type StatusMessageProps = {
  title: string
  children?: ReactNode
  /** Renders a "Try again" button. */
  onRetry?: () => void
  /** Extra actions, e.g. a link back home. */
  actions?: ReactNode
  tone?: 'error' | 'neutral'
}

/** Shared empty / error block used by every data view. */
export function StatusMessage({ title, children, onRetry, actions, tone = 'neutral' }: StatusMessageProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : undefined}
      className="rounded-2xl border border-dashed border-line-strong px-6 py-12 text-center sm:px-10"
    >
      <p className="font-display font-wide text-xl font-[620] tracking-[-0.02em] sm:text-2xl">{title}</p>
      {children && <div className="mx-auto mt-3 max-w-[32rem] text-fg-muted">{children}</div>}
      {(onRetry || actions) && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {onRetry && (
            <Button variant="secondary" onClick={onRetry}>
              Try again
            </Button>
          )}
          {actions}
        </div>
      )}
    </div>
  )
}
