import { useEffect, useState } from 'react'

/**
 * Scroll-spy: returns the id of the section crossing a thin band just above the
 * middle of the viewport, or '' while none is (e.g. in the hero).
 * Re-observes when <main>'s children change, since lazily loaded sections replace
 * their placeholders.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const inBand = new Set<string>()

    const pick = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) return setActive(ids[ids.length - 1])
      setActive(ids.findLast(id => inBand.has(id)) ?? '')
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id)
          else inBand.delete(entry.target.id)
        }
        pick()
      },
      { rootMargin: '-38% 0px -58% 0px' },
    )

    const observeAll = () => {
      observer.disconnect()
      inBand.clear()
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      }
    }
    observeAll()

    const main = document.getElementById('main')
    const mutations = new MutationObserver(observeAll)
    if (main) mutations.observe(main, { childList: true })

    // The last section can be too short to reach the band, so also check the page bottom.
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        pick()
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}
