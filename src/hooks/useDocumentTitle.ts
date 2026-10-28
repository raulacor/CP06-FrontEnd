import { useEffect } from 'react'
import { site } from '@/data/site'

/** Sets the tab title for a page, e.g. "UkrAid · Raul Azzi Corsi". */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Raul Azzi Corsi` : site.title
    return () => {
      document.title = site.title
    }
  }, [title])
}
