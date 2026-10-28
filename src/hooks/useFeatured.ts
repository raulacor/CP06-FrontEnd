import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addFeatured, fetchFeatured, removeFeatured } from '@/services/featured'

export const MAX_FEATURED = 6
const featuredKey = ['featured'] as const

export function useFeatured() {
  return useQuery({ queryKey: featuredKey, queryFn: ({ signal }) => fetchFeatured(signal) })
}

export function useToggleFeatured() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, featured }: { name: string; featured: boolean }) =>
      featured ? addFeatured(name) : removeFeatured(name),
    onSettled: () => queryClient.invalidateQueries({ queryKey: featuredKey }),
  })
}
