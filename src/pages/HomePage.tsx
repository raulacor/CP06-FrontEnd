import { lazy, Suspense } from 'react'
import { sections } from '@/data/site'
import { About } from '@/sections/About'
import { Hero } from '@/sections/Hero'

const BelowFold = lazy(() => import('@/sections/BelowFold'))

/** Holds the anchor targets (and roughly the height) until the below-the-fold chunk arrives. */
function BelowFoldPlaceholder() {
  return (
    <>
      {[sections.work, sections.skills, sections.path, sections.contact].map(s => (
        <section key={s.id} id={s.id} aria-label={s.label} className="min-h-[100svh] border-t border-line" />
      ))}
    </>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<BelowFoldPlaceholder />}>
        <BelowFold />
      </Suspense>
    </>
  )
}
