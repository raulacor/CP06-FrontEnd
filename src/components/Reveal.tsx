import type { ReactNode } from 'react'
import AnimatedContent from '@/components/AnimatedContent'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds. */
  delay?: number
  /** Seconds between direct children; animates each child instead of the wrapper. */
  stagger?: number
}

/**
 * The one scroll-entrance used across the site: a short fade-up (24px, 600ms).
 * Reduced motion is handled inside AnimatedContent (content renders in place).
 */
export function Reveal({ children, className, delay = 0, stagger = 0 }: RevealProps) {
  return (
    <AnimatedContent
      className={className}
      distance={24}
      duration={0.6}
      ease="power3.out"
      threshold={0.12}
      delay={delay}
      stagger={stagger}
    >
      {children}
    </AnimatedContent>
  )
}
