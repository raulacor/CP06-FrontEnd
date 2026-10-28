import { getSupabase, isSupabaseConfigured } from '@/services/supabase'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Names of the repositories picked in the dashboard, in the order they were picked.
 * Visitors read this through Supabase's REST endpoint with a plain fetch, so the home
 * page doesn't need to download the Supabase SDK.
 */
export async function fetchFeatured(signal?: AbortSignal): Promise<string[]> {
  if (!isSupabaseConfigured) return []
  const response = await fetch(`${url}/rest/v1/featured_projects?select=repo_name&order=created_at.asc`, {
    headers: { apikey: anonKey!, Authorization: `Bearer ${anonKey}` },
    signal,
  })
  if (!response.ok) throw new Error(`Could not load featured projects (${response.status}).`)
  const rows: { repo_name: string }[] = await response.json()
  return rows.map(row => row.repo_name)
}

export async function addFeatured(repoName: string) {
  const supabase = await getSupabase()
  const { error } = await supabase.from('featured_projects').insert({ repo_name: repoName })
  if (error) throw new Error(error.message)
}

export async function removeFeatured(repoName: string) {
  const supabase = await getSupabase()
  const { error } = await supabase.from('featured_projects').delete().eq('repo_name', repoName)
  if (error) throw new Error(error.message)
}
