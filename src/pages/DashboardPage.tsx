import { useSearchParams } from 'react-router'
import { FeaturedPanel } from '@/components/dashboard/FeaturedPanel'
import { MessagesPanel } from '@/components/dashboard/MessagesPanel'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const TABS = [
  { id: 'messages', label: 'Messages' },
  { id: 'featured', label: 'Featured projects' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function DashboardPage() {
  useDocumentTitle('Dashboard')
  const { session, signOut } = useAuth()
  // The tab lives in the URL (?tab=featured), so a refresh keeps it.
  const [params, setParams] = useSearchParams()
  const tab: TabId = params.get('tab') === 'featured' ? 'featured' : 'messages'

  return (
    <div className="shell pt-12 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Signed in as {session?.user.email}</p>
          <h1 className="mt-4 font-wide text-[clamp(2.25rem,6vw,3.75rem)] leading-none font-[680] tracking-[-0.035em]">
            Dashboard
          </h1>
        </div>
        <Button variant="secondary" size="sm" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>

      <div role="tablist" aria-label="Dashboard sections" className="mt-10 flex gap-6 border-b border-line">
        {TABS.map(t => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setParams(t.id === 'messages' ? {} : { tab: t.id })}
            className="-mb-px border-b-2 border-transparent pb-3 text-sm font-medium text-fg-muted transition-colors hover:text-fg aria-selected:border-fg aria-selected:text-fg"
          >
            {t.label}
          </button>
        ))}
      </div>

      <section role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-8">
        {tab === 'messages' ? <MessagesPanel /> : <FeaturedPanel />}
      </section>
    </div>
  )
}
