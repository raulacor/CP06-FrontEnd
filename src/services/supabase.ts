import type { SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

let client: Promise<SupabaseClient> | null = null

/**
 * The Supabase SDK (~45 kB gzipped) is only downloaded the first time something needs it:
 * sending a message, reading featured projects or opening the dashboard. Visitors who
 * only read the home page never pay for it.
 */
export function getSupabase(): Promise<SupabaseClient> {
  if (!url || !anonKey) return Promise.reject(new Error('Supabase is not configured. Check your .env file.'))
  client ??= import('@supabase/supabase-js').then(({ createClient }) => createClient(url, anonKey))
  return client
}
