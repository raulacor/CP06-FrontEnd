import { Suspense } from 'react'
import { Link, Outlet } from 'react-router'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Monogram } from '@/components/Monogram'
import { PageLoader } from '@/components/PageLoader'
import { QueryProvider } from '@/components/QueryProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { AuthProvider } from '@/contexts/AuthProvider'

/** Login and dashboard: a plain header, no hero effects. Loaded only when an admin route is opened. */
export default function AdminLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <header className="border-b border-line">
          <div className="shell flex h-16 items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-3 text-sm text-fg-muted hover:text-fg">
              <Monogram className="size-7 text-fg" />
              Back to site
            </Link>
            <ThemeToggle />
          </div>
        </header>
        <main id="main">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </AuthProvider>
    </QueryProvider>
  )
}
