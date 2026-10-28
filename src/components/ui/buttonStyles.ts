export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md'

const BASE =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-fg text-ink hover:bg-fg/90',
  secondary: 'border border-line-strong text-fg hover:border-fg-subtle hover:bg-fg/5',
  ghost: 'text-fg-muted hover:bg-fg/5 hover:text-fg',
  danger: 'border border-red-500/40 text-red-500 hover:bg-red-500/10',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-12 px-5 text-sm sm:px-6',
}

/** Shared class list so <button>, <a> and router <Link> all look the same. */
export function buttonStyles(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className = '') {
  return [BASE, VARIANTS[variant], SIZES[size], className].filter(Boolean).join(' ')
}
