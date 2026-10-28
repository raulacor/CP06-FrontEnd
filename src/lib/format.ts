const dateFormat = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' })

/** "2026-10-21T12:00:00Z" → "Oct 21, 2026" */
export function formatDate(iso: string) {
  return dateFormat.format(new Date(iso))
}

/** "Global-Solution-2026-UkrAid" → "Global Solution 2026 UkrAid" */
export function formatRepoName(name: string) {
  return name.replace(/[-_]+/g, ' ').trim()
}
