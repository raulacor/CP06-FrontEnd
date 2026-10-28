import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import type { Session } from '@supabase/supabase-js'
import { describe, expect, it } from 'vitest'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { AuthContext, type AuthContextValue } from '@/contexts/authContext'

function renderAt(path: string, auth: Partial<AuthContextValue>) {
  const value: AuthContextValue = {
    session: null,
    loading: false,
    configError: null,
    signIn: async () => {},
    signOut: async () => {},
    ...auth,
  }
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/login" element={<h1>Login page</h1>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<h1>Dashboard page</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  )
}

describe('<ProtectedRoute />', () => {
  it('redirects a visitor who is not signed in to /login', () => {
    renderAt('/dashboard', { session: null })

    expect(screen.getByRole('heading', { name: 'Login page' })).toBeInTheDocument()
    expect(screen.queryByText('Dashboard page')).not.toBeInTheDocument()
  })

  it('shows a loader, not the dashboard, while the session is being checked', () => {
    renderAt('/dashboard', { loading: true })

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.queryByText('Dashboard page')).not.toBeInTheDocument()
  })

  it('shows the dashboard to a signed-in user', () => {
    renderAt('/dashboard', { session: { user: { email: 'owner@example.com' } } as Session })

    expect(screen.getByRole('heading', { name: 'Dashboard page' })).toBeInTheDocument()
  })
})
