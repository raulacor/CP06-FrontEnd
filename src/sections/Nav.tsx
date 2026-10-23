import { useEffect, useState, type CSSProperties } from 'react'
import PillNav from '@/components/PillNav'
import { Monogram } from '@/components/Monogram'
import { navItems, profile } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTION_IDS = navItems.map(item => item.href.slice(1))

export function Nav() {
  const active = useActiveSection(SECTION_IDS)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-5">
      {/* Soft fade behind the nav once content scrolls underneath it. */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink via-ink/75 to-transparent transition-opacity duration-500 sm:h-28 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="relative mx-auto flex max-w-[82rem] justify-center">
        <PillNav
          className="pointer-events-auto"
          logo={<Monogram />}
          logoAlt={`${profile.name}, back to top`}
          logoHref="#top"
          items={navItems}
          activeHref={active ? `#${active}` : ''}
          ariaLabel="Primary"
          theme="dark"
          size="sm"
          surface="glass"
          itemStyle="plain"
          hoverEffect="fill"
          indicator="dot"
          barColor="rgba(15, 17, 21, 0.72)"
          highlightColor="#ecedef"
          highlightTextColor="#0a0b0e"
          textColor="#ecedef"
          style={{ '--pn-dot': 'var(--color-accent)' } as CSSProperties}
        />
      </div>
    </header>
  )
}
