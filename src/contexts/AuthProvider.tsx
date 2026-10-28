import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { AuthContext } from '@/contexts/authContext'
import { getSupabase } from '@/services/supabase'

/** Only wraps the admin routes, so the public site never loads auth code. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [configError, setConfigError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    let unsubscribe = () => {}

    getSupabase()
      .then(async supabase => {
        const { data } = await supabase.auth.getSession()
        if (cancelled) return
        setSession(data.session)
        setLoading(false)
        const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
        unsubscribe = () => listener.subscription.unsubscribe()
      })
      .catch((error: Error) => {
        if (cancelled) return
        setConfigError(error.message)
        setLoading(false)
      })

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = await getSupabase()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    const supabase = await getSupabase()
    await supabase.auth.signOut()
  }, [])

  const value = useMemo(
    () => ({ session, loading, configError, signIn, signOut }),
    [session, loading, configError, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
