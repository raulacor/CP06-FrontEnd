import { Moon, Sun } from '@/components/Icons'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`grid size-10 place-items-center rounded-full border border-line-strong bg-ink-raised/70 text-fg backdrop-blur-md transition-colors hover:bg-ink-high ${className}`}
    >
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}
