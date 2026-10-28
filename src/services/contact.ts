import type { ContactInput } from '@/lib/validation'
import { getSupabase } from '@/services/supabase'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

/** Stores the message so it shows up in the dashboard. */
export async function saveMessage(input: ContactInput) {
  const supabase = await getSupabase()
  const { error } = await supabase.from('messages').insert({
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
  })
  if (error) throw new Error(`Could not save the message: ${error.message}`)
}

/** Forwards the message to the site owner's inbox through Formspree. */
export async function emailMessage(input: ContactInput) {
  if (!FORMSPREE_ID) throw new Error('Formspree is not configured. Check your .env file.')
  const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...input, _subject: `Portfolio message from ${input.name}` }),
  })
  if (!response.ok) throw new Error(`Could not send the email (${response.status}).`)
}

/** Both must succeed: the owner gets an email and the message is saved for the dashboard. */
export async function sendContactMessage(input: ContactInput) {
  await Promise.all([saveMessage(input), emailMessage(input)])
}
