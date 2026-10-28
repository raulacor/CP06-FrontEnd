import { Suspense } from 'react'
import { Outlet } from 'react-router'
import ClickSpark from '@/components/ClickSpark'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PageLoader } from '@/components/PageLoader'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollToHash } from '@/hooks/useScrollToHash'
import { Footer } from '@/sections/Footer'
import { Nav } from '@/sections/Nav'

/** Public pages: nav, footer and the page-level effects shared by every route. */
export function SiteLayout() {
  const reduce = useReducedMotion()
  useScrollToHash()

  return (
    <ClickSpark
      sparkColor="#5de8f6"
      sparkCount={7}
      sparkSize={7}
      sparkRadius={18}
      sparkWidth={1.25}
      duration={360}
      disabled={reduce}
    >
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </ClickSpark>
  )
}
