import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router'

/** Lets components that render plain <a href> (like PillNav) navigate client-side. */
export function RouterLink({ href = '/', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <Link to={href} {...props} />
}
