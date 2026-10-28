import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
})

export const ArrowUpRight = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
)

export const ArrowDown = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
)

export const ArrowUp = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
)

export const Download = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />
  </svg>
)

export const Mail = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 7 7.5 6 7.5-6" />
  </svg>
)

export const Copy = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
    <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
  </svg>
)

export const Check = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

export const GitHub = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)} fill="currentColor" stroke="none">
    <path d="M12 2.25a9.75 9.75 0 0 0-3.08 19c.49.09.67-.21.67-.47v-1.66c-2.71.59-3.28-1.31-3.28-1.31-.44-1.13-1.08-1.43-1.08-1.43-.89-.6.07-.59.07-.59.98.07 1.5 1.01 1.5 1.01.87 1.49 2.29 1.06 2.85.81.09-.63.34-1.06.62-1.31-2.17-.25-4.44-1.08-4.44-4.82 0-1.07.38-1.94 1.01-2.62-.1-.25-.44-1.24.1-2.58 0 0 .82-.26 2.68 1a9.3 9.3 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .54 1.34.2 2.33.1 2.58.63.68 1.01 1.55 1.01 2.62 0 3.75-2.28 4.57-4.45 4.81.35.3.66.9.66 1.81v2.69c0 .26.18.57.68.47A9.75 9.75 0 0 0 12 2.25Z" />
  </svg>
)

export const LinkedIn = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)} fill="currentColor" stroke="none">
    <path d="M19.04 3H4.96A1.96 1.96 0 0 0 3 4.96v14.08C3 20.12 3.88 21 4.96 21h14.08A1.96 1.96 0 0 0 21 19.04V4.96A1.96 1.96 0 0 0 19.04 3ZM8.4 18.34H5.73V9.75H8.4v8.59ZM7.06 8.58a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.28 9.76h-2.67v-4.18c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.09-1.6 2.21v4.25H10V9.75h2.56v1.17h.04c.36-.68 1.23-1.39 2.53-1.39 2.7 0 3.2 1.78 3.2 4.09v4.72Z" />
  </svg>
)

export const Sun = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </svg>
)

export const Moon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
)
