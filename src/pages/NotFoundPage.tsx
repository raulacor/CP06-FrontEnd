import { Link } from 'react-router'
import { buttonStyles } from '@/components/ui/buttonStyles'

export default function NotFoundPage() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="shell flex min-h-[100svh] flex-col justify-center pt-32 pb-20"
    >
      <p className="eyebrow">Error 404</p>
      <h1
        id="not-found-heading"
        className="mt-6 font-xwide text-[clamp(3rem,14vw,9rem)] leading-[0.86] font-[680] tracking-[-0.05em]"
      >
        Lost in the void.
      </h1>
      <p className="mt-8 max-w-[34rem] text-lg text-fg-muted">
        This page doesn’t exist, or it moved. The link may be old or mistyped.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/" className={buttonStyles('primary')}>
          Back to home
        </Link>
        <Link to="/#work" className={buttonStyles('secondary')}>
          See my work
        </Link>
      </div>
    </section>
  )
}
