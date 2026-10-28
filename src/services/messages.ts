import { getSupabase } from '@/services/supabase'

export type Message = {
  id: string
  name: string
  email: string
  message: string
  answered: boolean
  created_at: string
}

export async function fetchMessages(): Promise<Message[]> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('messages')
    .select('id, name, email, message, answered, created_at')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data
}

export async function setMessageAnswered(id: string, answered: boolean) {
  const supabase = await getSupabase()
  const { error } = await supabase.from('messages').update({ answered }).eq('id', id)
  if (error) throw new Error(error.message)
}
