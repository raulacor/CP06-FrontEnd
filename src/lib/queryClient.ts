import { QueryClient } from '@tanstack/react-query'
import { GitHubError } from '@/services/github'

/**
 * One cache for the whole app. Data stays fresh for 10 minutes, so moving between
 * pages never re-requests the GitHub API (it has a 60 requests/hour limit).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      // Retrying a rate limit or a 404 only makes things worse.
      retry: (failures, error) => {
        if (error instanceof GitHubError && (error.rateLimited || error.status === 404)) return false
        return failures < 2
      },
    },
  },
})
