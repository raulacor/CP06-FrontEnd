import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMessages, setMessageAnswered, type Message } from '@/services/messages'

const messagesKey = ['messages'] as const

export function useMessages() {
  // Messages change outside the app (new visitors), so they are never considered fresh.
  return useQuery({ queryKey: messagesKey, queryFn: fetchMessages, staleTime: 0 })
}

/** Flips a message between answered and pending, updating the list right away. */
export function useSetAnswered() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, answered }: { id: string; answered: boolean }) => setMessageAnswered(id, answered),
    onMutate: async ({ id, answered }) => {
      await queryClient.cancelQueries({ queryKey: messagesKey })
      const previous = queryClient.getQueryData<Message[]>(messagesKey)
      queryClient.setQueryData<Message[]>(messagesKey, list =>
        list?.map(message => (message.id === id ? { ...message, answered } : message)),
      )
      return { previous }
    },
    onError: (_error, _vars, context) => queryClient.setQueryData(messagesKey, context?.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey: messagesKey }),
  })
}
