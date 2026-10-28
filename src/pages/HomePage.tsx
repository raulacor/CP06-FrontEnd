import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { sections } from '@/data/site'
import { About } from '@/sections/About'
import { Hero } from '@/sections/Hero'

const loadBelowFold = () => import('@/sections/BelowFold')
const BelowFold = lazy(loadBelowFold)

/** Holds the anchor targets (and roughly the height) until the below-the-fold chunk renders. */
function BelowFoldPlaceholder() {
  return (
    <>
      {[sections.work, sections.skills, sections.path, sections.contact].map(s => (
        <section key={s.id} id={s.id} aria-label={s.label} className="min-h-[100svh] border-t border-line" />
      ))}
    </>
  )
}

/**
 * The sections below About (and the API calls they make) render only when the visitor gets
 * near them or follows a link like /#work. The code is prefetched while the browser is idle,
 * so it is ready by then, but nothing competes with the hero's first paint.
 */
function useRenderBelowFold() {
  const { hash } = useLocation()
  const sentinel = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const render = near || hash.length > 1

  useEffect(() => {
    if (typeof requestIdleCallback !== 'function') return void setTimeout(loadBelowFold, 1500)
    const id = requestIdleCallback(() => void loadBelowFold(), { timeout: 3000 })
    return () => cancelIdleCallback(id)
  }, [])

  useEffect(() => {
    const el = sentinel.current
    if (render || !el) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), {
      rootMargin: '0px 0px 800px 0px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [render])

  return { render, sentinel }
}

export default function HomePage() {
  const { render, sentinel } = useRenderBelowFold()

  return (
    <>
      <Hero />
      <About />
      <div ref={sentinel} aria-hidden="true" />
      {render ? (
        <Suspense fallback={<BelowFoldPlaceholder />}>
          <BelowFold />
        </Suspense>
      ) : (
        <BelowFoldPlaceholder />
      )}
    </>
  )
}
