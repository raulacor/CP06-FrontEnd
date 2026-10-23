import type { SVGProps } from 'react'

/**
 * Personal mark: an angular "R" with a cyan cursor block, like a terminal prompt.
 * Kept in sync with public/favicon.svg.
 */
export function Monogram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M8 25V7h8.25a5.25 5.25 0 0 1 0 10.5H8M15 17.5 21.5 25"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <rect x="22.5" y="6" width="3.5" height="5.5" fill="#5de8f6" />
    </svg>
  )
}
