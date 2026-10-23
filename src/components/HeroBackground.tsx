import { lazy, Suspense, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// The WebGL veil loads in its own chunk after first paint so it never blocks the hero text.
const DarkVeil = lazy(() => import('@/components/DarkVeil'))

const supportsWebGL2 = () => {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

/**
 * Hero backdrop. A pre-rendered still of the veil (public/veil*.webp) paints first
 * and stays as the static fallback for reduced motion and no-WebGL browsers.
 * On capable devices the live DarkVeil fades in over it once the browser is idle.
 * DarkVeil pauses itself when off-screen or when the tab is hidden.
 */
export function HeroBackground() {
  const reduce = useReducedMotion()
  const [idle, setIdle] = useState(false)
  const live = idle && !reduce

  useEffect(() => {
    if (reduce || !supportsWebGL2()) return
    const start = () => setIdle(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(start, 300)
    return () => clearTimeout(id)
  }, [reduce])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink bg-[url('/veil-portrait.webp')] bg-cover bg-center sm:bg-[url('/veil.webp')]" />

      {live && (
        <Suspense fallback={null}>
          <div className="veil-in absolute inset-0">
            <DarkVeil
              color="#00abca"
              speed={0.32}
              brightness={0.8}
              glow={0.3}
              flipX
              grain={0}
              flow={0.9}
              quality={0.45}
              dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
              mouseStrength={0.55}
            />
          </div>
        </Suspense>
      )}

      {/* Scrims keep the type readable and blend the veil into the page. */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(10_11_14/0.92)_6%,rgb(10_11_14/0.55)_40%,rgb(10_11_14/0.05)_75%,transparent)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
    </div>
  )
}
