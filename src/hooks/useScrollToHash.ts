import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * On every navigation: scroll to the #hash target if there is one, otherwise to the top.
 * Sections that load lazily handle their own hash once they mount (see BelowFold).
 */
export function useScrollToHash() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [pathname, hash, key])
}
