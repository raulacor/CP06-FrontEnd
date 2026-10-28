import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { PageLoader } from '@/components/PageLoader'
import { SiteLayout } from '@/layouts/SiteLayout'
import HomePage from '@/pages/HomePage'

// Everything except the home page is split into its own chunk.
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectPage = lazy(() => import('@/pages/ProjectPage'))
// Admin area: its own chunks, never downloaded by regular visitors.
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ProtectedRoute = lazy(() => import('@/components/ProtectedRoute'))

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        element={
          <Suspense fallback={<PageLoader />}>
            <AdminLayout />
          </Suspense>
        }
      >
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
