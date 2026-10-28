import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollTriggerRefresh } from '@/hooks/useScrollTriggerRefresh'
import { Contact } from '@/sections/Contact'
import { Path } from '@/sections/Path'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

/**
 * Everything below About ships as one lazily loaded chunk, so the hero's critical
 * path stays small. It mounts in a single commit, then re-measures scroll triggers
 * and honors a deep link such as /#work that arrived before the content existed.
 */
export default function BelowFold() {
  useScrollTriggerRefresh()

  useEffect(() => {
    ScrollTrigger.refresh()
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <Projects />
      <Skills />
      <Path />
      <Contact />
    </>
  )
}
