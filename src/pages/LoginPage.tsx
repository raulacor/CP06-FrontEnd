import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { PageLoader } from '@/components/PageLoader'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function LoginPage() {
  useDocumentTitle('Sign in')
  const { session, loading, configError, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) return <PageLoader />
  if (session) return <Navigate to={from} replace />

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!email || !password) {
      setError('Enter your email and password.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch {
      setError('Wrong email or password.')
      setSubmitting(false)
    }
  }

  return (
    <div className="shell grid min-h-[calc(100svh-4rem)] place-items-center py-16">
      <form onSubmit={onSubmit} noValidate className="w-full max-w-sm space-y-5">
        <div>
          <p className="eyebrow">Owner area</p>
          <h1 className="mt-4 font-wide text-4xl font-[680] tracking-[-0.03em]">Sign in</h1>
        </div>
        {configError && (
          <p role="alert" className="rounded-xl border border-red-500/40 p-4 text-sm text-red-500">
            {configError}
          </p>
        )}
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}
        <Button type="submit" loading={submitting} disabled={Boolean(configError)} className="w-full">
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}
