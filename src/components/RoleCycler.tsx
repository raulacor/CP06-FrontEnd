import { useEffect, useRef, useState } from 'react'
import DecryptedText from '@/components/DecryptedText'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type RoleCyclerProps = {
  roles: readonly string[]
  /** ms to wait before the first decrypt, so it lands after the name reveal. */
  startDelay?: number
  /** ms each role stays on screen. */
  interval?: number
}

const GLYPHS = 'ABCDEF0123456789#$%&*+=<>/\\'

/**
 * Cycles through roles with the React Bits DecryptedText effect. Each new role
 * appears scrambled and resolves left to right. Cycling pauses while the hero is
 * off-screen or the tab is hidden. Reduced motion shows every role, static.
 */
export function RoleCycler({ roles, startDelay = 700, interval = 3400 }: RoleCyclerProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reduce) return
    const id = window.setTimeout(() => setStarted(true), startDelay)
    return () => window.clearTimeout(id)
  }, [reduce, startDelay])

  useEffect(() => {
    if (reduce || !started) return
    const node = ref.current
    let visible = true
    let timer = 0
    const schedule = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (visible && !document.hidden) setIndex(i => (i + 1) % roles.length)
        schedule()
      }, interval)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    if (node) observer.observe(node)
    schedule()
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [reduce, started, interval, roles.length])

  if (reduce) {
    return (
      <span>
        {roles.map((role, i) => (
          <span key={role} className="whitespace-nowrap">
            {role}
            {i < roles.length - 1 && <span className="px-2 text-fg-subtle">/</span>}{' '}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span ref={ref} className="relative inline-block min-h-[1.2em]">
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true">
        {started ? (
          <DecryptedText
            text={roles[index]}
            animateOn="view"
            sequential
            revealDirection="start"
            speed={32}
            characters={GLYPHS}
            encryptedClassName="text-accent/80"
          />
        ) : (
          <span className="invisible">{roles[0]}</span>
        )}
      </span>
    </span>
  )
}
