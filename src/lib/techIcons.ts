import {
  siCplusplus,
  siDocker,
  siFastapi,
  siFlask,
  siGit,
  siGithubactions,
  siGnubash,
  siJavascript,
  siLinux,
  siMongodb,
  siPandas,
  siPython,
  siReact,
  siRust,
  siScikitlearn,
  siTailwindcss,
  siTypescript,
  siVite,
  type SimpleIcon,
} from 'simple-icons'
import type { StackIcon } from '@/data/site'

export const ICONS: Record<Exclude<StackIcon, 'csharp'>, SimpleIcon> = {
  cplusplus: siCplusplus,
  python: siPython,
  rust: siRust,
  javascript: siJavascript,
  typescript: siTypescript,
  react: siReact,
  vite: siVite,
  tailwindcss: siTailwindcss,
  fastapi: siFastapi,
  flask: siFlask,
  mongodb: siMongodb,
  scikitlearn: siScikitlearn,
  pandas: siPandas,
  linux: siLinux,
  gnubash: siGnubash,
  git: siGit,
  githubactions: siGithubactions,
  docker: siDocker,
}

/** Brand colors that read poorly on near-black fall back to the foreground color. */
const DARK_BRANDS = new Set(['rust', 'pandas', 'flask', 'gnubash'])

export function brandColor(icon: StackIcon) {
  if (icon === 'csharp') return '#a179dc'
  if (DARK_BRANDS.has(icon)) return 'var(--color-fg)'
  return `#${ICONS[icon].hex}`
}
