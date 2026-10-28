import type { ButtonHTMLAttributes } from 'react'
import { Spinner } from '@/components/ui/Spinner'
import { buttonStyles, type ButtonSize, type ButtonVariant } from '@/components/ui/buttonStyles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Shows a spinner and blocks clicks, e.g. while a form is submitting. */
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles(variant, size, className)}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
