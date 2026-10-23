import type { StackIcon } from '@/data/site'
import { ICONS } from '@/lib/techIcons'

/** C# isn't in simple-icons, so it gets a matching hexagon mark drawn by hand. */
const CSharpMark = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 1.9 20.75 6.95v10.1L12 22.1l-8.75-5.05V6.95L12 1.9Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <text
      x="12"
      y="15.3"
      textAnchor="middle"
      fontSize="8.4"
      fontWeight="700"
      fontFamily="'Hubot Sans Variable', sans-serif"
      fill="currentColor"
    >
      C#
    </text>
  </svg>
)

export function TechIcon({ icon, size = 24 }: { icon: StackIcon; size?: number }) {
  if (icon === 'csharp') return <CSharpMark size={size} />
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
      <path d={ICONS[icon].path} />
    </svg>
  )
}
