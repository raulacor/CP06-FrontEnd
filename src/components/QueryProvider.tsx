import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'

/**
 * Wraps only the lazily loaded parts that fetch data (below-the-fold sections, project pages,
 * admin), so TanStack Query and the services stay out of the initial bundle. Every wrapper
 * shares the same QueryClient instance, so there is still one cache for the whole app.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
