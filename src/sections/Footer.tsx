import { Link } from 'react-router'
import { ArrowUp } from '@/components/Icons'
import { profile } from '@/data/site'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Built with React, Tailwind CSS and React Bits ·{' '}
          <Link to="/dashboard" className="link-draw hover:text-fg">
            Owner area
          </Link>
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0 })}
          className="group inline-flex items-center gap-2 transition-colors hover:text-fg"
        >
          Back to top
          <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  )
}
