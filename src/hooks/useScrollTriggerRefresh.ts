import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Scroll animations measure their trigger positions once. When content above them changes
 * height later (projects arriving from the API, skeletons swapping for cards), those
 * positions go stale and reveals fire in the wrong place or never. Re-measure whenever
 * the page height changes, at most once per frame.
 */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    let frame = 0
    let lastHeight = document.body.scrollHeight
    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight
      if (height === lastHeight || frame) return
      lastHeight = height
      frame = requestAnimationFrame(() => {
        frame = 0
        ScrollTrigger.refresh()
      })
    })
    observer.observe(document.body)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])
}
