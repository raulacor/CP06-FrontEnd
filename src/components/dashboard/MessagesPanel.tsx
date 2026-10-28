import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { StatusMessage } from '@/components/ui/StatusMessage'
import { useMessages, useSetAnswered } from '@/hooks/useMessages'
import { formatDate } from '@/lib/format'
import type { Message } from '@/services/messages'

type Filter = 'pending' | 'answered' | 'all'

const FILTERS: { id: Filter; label: string; test: (m: Message) => boolean }[] = [
  { id: 'pending', label: 'Pending', test: m => !m.answered },
  { id: 'answered', label: 'Answered', test: m => m.answered },
  { id: 'all', label: 'All', test: () => true },
]

function MessageItem({ message }: { message: Message }) {
  const setAnswered = useSetAnswered()
  const busy = setAnswered.isPending

  return (
    <li className="rounded-2xl border border-line bg-ink-raised p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-medium text-fg">{message.name}</p>
          <a href={`mailto:${message.email}`} className="link-draw text-sm text-fg-muted">
            {message.email}
          </a>
        </div>
        <div className="flex items-center gap-3 text-xs text-fg-subtle">
          <time dateTime={message.created_at}>{formatDate(message.created_at)}</time>
          <span
            className={`rounded-full px-2.5 py-1 font-medium ${message.answered ? 'bg-accent/15 text-accent' : 'bg-fg/10 text-fg'}`}
          >
            {message.answered ? 'Answered' : 'Pending'}
          </span>
        </div>
      </div>
      <p className="mt-4 whitespace-pre-line text-fg-muted">{message.message}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={`mailto:${message.email}?subject=Re: your message on my portfolio`}
          className="inline-flex h-9 items-center rounded-full border border-line-strong px-4 text-xs font-semibold text-fg hover:bg-fg/5"
        >
          Reply by email
        </a>
        <Button
          size="sm"
          variant={message.answered ? 'ghost' : 'primary'}
          loading={busy}
          onClick={() => setAnswered.mutate({ id: message.id, answered: !message.answered })}
        >
          {message.answered ? 'Mark as pending' : 'Mark as answered'}
        </Button>
      </div>
    </li>
  )
}

export function MessagesPanel() {
  const { data: messages, isPending, isError, error, refetch } = useMessages()
  const [filter, setFilter] = useState<Filter>('pending')

  if (isPending) {
    return (
      <div role="status" aria-label="Loading messages" className="space-y-3">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-40 animate-pulse rounded-2xl bg-fg/[0.05] motion-reduce:animate-none" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <StatusMessage tone="error" title="Couldn’t load messages" onRetry={() => refetch()}>
        {error.message}
      </StatusMessage>
    )
  }

  const active = FILTERS.find(f => f.id === filter)!
  const visible = messages.filter(active.test)

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter messages">
        {FILTERS.map(f => (
          <button
            key={f.id}
            type="button"
            aria-pressed={f.id === filter}
            onClick={() => setFilter(f.id)}
            className="rounded-full border border-line px-4 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-ink"
          >
            {f.label} <span className="opacity-70">{messages.filter(f.test).length}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <StatusMessage title={filter === 'pending' ? 'Inbox zero' : 'No messages here'}>
          {filter === 'pending' ? 'Every message has been answered.' : 'Messages from the contact form show up here.'}
        </StatusMessage>
      ) : (
        <ul className="space-y-3">
          {visible.map(message => (
            <MessageItem key={message.id} message={message} />
          ))}
        </ul>
      )}
    </div>
  )
}
