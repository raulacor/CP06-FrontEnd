import { useMemo } from 'react'

const COLORS = ['#5de8f6', '#00abca', '#7c8cff', '#c084fc', '#f59e0b', '#9aa0a9']

/** Share of each language in a repository, as a stacked bar with a legend. */
export function LanguageBar({ languages }: { languages: Record<string, number> }) {
  const parts = useMemo(() => {
    const entries = Object.entries(languages).sort((a, b) => b[1] - a[1])
    const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0)
    return entries.slice(0, COLORS.length).map(([name, bytes], i) => ({
      name,
      percent: (bytes / total) * 100,
      color: COLORS[i],
    }))
  }, [languages])

  if (parts.length === 0) return <p className="text-fg-muted">No code detected.</p>

  return (
    <div>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
        {parts.map(part => (
          <span key={part.name} style={{ width: `${part.percent}%`, backgroundColor: part.color }} />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {parts.map(part => (
          <li key={part.name} className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: part.color }} />
            <span className="text-fg">{part.name}</span>
            <span className="text-fg-subtle">{part.percent.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
