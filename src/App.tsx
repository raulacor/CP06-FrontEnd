import { lazy, Suspense } from 'react'
import ClickSpark from '@/components/ClickSpark'
import { sections } from '@/data/site'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { About } from '@/sections/About'
import { Footer } from '@/sections/Footer'
import { Hero } from '@/sections/Hero'
import { Nav } from '@/sections/Nav'

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

export default function App() {
  const reduce = useReducedMotion()

  return (
    <ClickSpark
      sparkColor="#5de8f6"
      sparkCount={7}
      sparkSize={7}
      sparkRadius={18}
      sparkWidth={1.25}
      duration={360}
      disabled={reduce}
    >
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Suspense fallback={<BelowFoldPlaceholder />}>
          <BelowFold />
        </Suspense>
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </ClickSpark>
  )
}
