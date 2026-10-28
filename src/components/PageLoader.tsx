import { Spinner } from '@/components/ui/Spinner'

/** Fallback while a lazily loaded page chunk downloads. Reserves the viewport to avoid layout shift. */
export function PageLoader() {
  return (
    <div className="grid min-h-[100svh] place-items-center text-fg-muted">
      <Spinner size={22} label="Loading page" />
    </div>
  )
}
