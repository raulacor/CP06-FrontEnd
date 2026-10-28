import { Navigate, Outlet, useLocation } from 'react-router'
import { PageLoader } from '@/components/PageLoader'
import { useAuth } from '@/hooks/useAuth'

/** Renders the child routes only for a signed-in user; everyone else goes to /login. */
export default function ProtectedRoute() {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}
