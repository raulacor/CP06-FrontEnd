import { ArrowUp } from '@/components/Icons'
import { profile } from '@/data/site'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React, Tailwind CSS and React Bits.</p>
        <a href="#top" className="group inline-flex items-center gap-2 transition-colors hover:text-fg">
          Back to top
          <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}
