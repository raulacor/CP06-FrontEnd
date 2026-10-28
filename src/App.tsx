import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { SiteLayout } from '@/layouts/SiteLayout'
import HomePage from '@/pages/HomePage'

// Everything except the home page is split into its own chunk.
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectPage = lazy(() => import('@/pages/ProjectPage'))

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
