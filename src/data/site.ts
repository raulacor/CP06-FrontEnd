/**
 * All editable site content lives in this file.
 * Components read from here, so you can change copy, links, projects and skills
 * without touching any component code.
 *
 * Project copy was written from each repo's README and source code. Keep it that way:
 * describe what the code actually does, not what it might do.
 */

// ─── Profile ─────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Raul Azzi Corsi',
  /** Shown on two lines in the hero. */
  nameLines: ['Raul Azzi', 'Corsi'],
  headline: 'Software Engineer | C++, Python, React',
  /** Cycled by the decrypt effect in the hero. */
  roles: ['Software Engineer', 'Cybersecurity', 'C++ · Python · React'],
  intro:
    'Software Engineering student at FIAP in São Paulo, finishing an AAS in Cybersecurity at the same time. I build tools where software meets security.',
  location: 'São Paulo, Brazil',
  /** Displayed as a small detail in the hero. */
  coordinates: '23.55° S · 46.63° W',
  email: 'raul.azzi.corsi@gmail.com',
  /**
   * TODO: drop your real PDF at public/resume.pdf (same name) to replace the placeholder.
   */
  resumeUrl: '/resume.pdf',
} as const

export const links = {
  github: 'https://github.com/raulacor',
  linkedin: 'https://www.linkedin.com/in/raulacor',
  email: `mailto:${profile.email}`,
} as const

export const site = {
  url: 'https://raulacor.vercel.app', // TODO: update after your first Vercel deploy (also in index.html meta tags)
  title: 'Raul Azzi Corsi — Software Engineer',
  description:
    'Portfolio of Raul Azzi Corsi, a Software Engineering student at FIAP and cybersecurity student in São Paulo, building with C++, Python, Rust and React.',
} as const

// ─── About ───────────────────────────────────────────────────────────────────

export const about = {
  /** Large statement revealed word-by-word on scroll. */
  statement:
    'I started out as a film student who felt like an extra in his own story. Then I finished my first Python script, and from that day on nothing could stop me.',
  paragraphs: [
    'I left film school to study cybersecurity. There, mostly on my own, I learned more Python, explored C++ and fell in love with Rust.',
    'Wanting to go deeper into the engineering side of security, I added a second program. I’m now a first-year Software Engineering student at FIAP while finishing my AAS in Cybersecurity.',
  ],
  facts: [
    { label: 'Based in', value: 'São Paulo, Brazil' },
    { label: 'Studying', value: 'Software Engineering, FIAP' },
    { label: 'Finishing', value: 'AAS in Cybersecurity, FIAP' },
    { label: 'Focus', value: 'C++ · Python · React' },
  ],
} as const

// ─── Projects ────────────────────────────────────────────────────────────────

export type Project = {
  slug: string
  title: string
  /** Small label above the title. */
  kicker: string
  /** One line, shown on every card. */
  summary: string
  /** Bullet points, only shown on the featured card. */
  highlights?: string[]
  tags: string[]
  repo: string
  /** Live deployment URL, if one exists. Rendered as a second link. */
  live?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'ukraid',
    title: 'UkrAid',
    kicker: 'OSINT · FIAP Global Solution 2026',
    summary:
      'Open-source intelligence for civilians in conflict zones: local risk scores, the nearest shelters and live air-raid alerts.',
    highlights: [
      'Python CLI that scores danger from the nearest ACLED conflict events, labeled Critical to Low',
      'Nearest hospitals, shelters and bus stations within 100 km via OpenStreetMap Overpass',
      'Air-raid alerts by Ukrainian region from the UkraineAlarm API (asyncio + aiohttp)',
      'ACLED OAuth client, Nominatim reverse geocoding and a companion website',
    ],
    tags: ['Python', 'asyncio', 'ACLED API', 'OpenStreetMap', 'HTML/CSS/JS'],
    repo: 'https://github.com/raulacor/Global-Solution-2026-UkrAid',
    featured: true,
  },
  {
    slug: 'steam-sales-radar',
    title: 'Steam Sales Radar',
    kicker: 'Data pipeline · FIAP',
    summary:
      'Crawler → MongoDB → FastAPI → dashboard. Scrapes Steam discounts into dated price snapshots and serves stats and history over an API.',
    tags: ['Python', 'BeautifulSoup', 'MongoDB', 'FastAPI', 'scikit-learn'],
    repo: 'https://github.com/raulacor/CP05-CTP-WebCrawler',
  },
  {
    slug: 'tv-time',
    title: 'TV Time, Rebuilt',
    kicker: 'Frontend · FIAP',
    summary: 'React + TypeScript movie browser on the TMDB API, with detail pages, watch-lists and a WebGL hero.',
    tags: ['React', 'TypeScript', 'Vite', 'TMDB API'],
    repo: 'https://github.com/raulacor/CP04-WebDev-Criando-o-novo-TV-Time',
  },
  {
    slug: 'rust-chat',
    title: 'Async Rust Chat',
    kicker: 'Systems · Rust',
    summary: 'Multi-room TCP chat server and terminal client exchanging newline-delimited JSON over async Rust.',
    tags: ['Rust', 'async-std', 'Tokio', 'Serde'],
    repo: 'https://github.com/raulacor/Udemy-TCRC-CLI-Chat',
  },
  {
    slug: 'recon-bot',
    title: 'Black Hands Recon Bot',
    kicker: 'Security · FIAP Web Exploitation',
    summary:
      'Discord bot that puts recon behind slash commands: nmap scans, gau URL discovery, crt.sh subdomains and ipinfo lookups.',
    tags: ['Python', 'discord.py', 'nmap', 'crt.sh'],
    repo: 'https://github.com/raulacor/CP04-WebXPL-Bot',
  },
  {
    slug: 'ctf-web-recon',
    title: 'CTF Web Recon',
    kicker: 'Security · Tooling',
    summary:
      'Python script that chains whois, ffuf, Sublist3r, subfinder, httprobe and nmap into a one-shot recon pass for CTFs.',
    tags: ['Python', 'nmap', 'ffuf', 'subfinder'],
    repo: 'https://github.com/raulacor/ctf-web-recon',
  },
]

// ─── Skills ──────────────────────────────────────────────────────────────────

/**
 * Logos in the scrolling loop. `icon` is a simple-icons slug (see src/components/TechIcon.tsx),
 * or 'csharp' for the custom C# mark.
 */
export const stackLogos = [
  { name: 'C++', icon: 'cplusplus' },
  { name: 'Python', icon: 'python' },
  { name: 'Rust', icon: 'rust' },
  { name: 'C#', icon: 'csharp' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'React', icon: 'react' },
  { name: 'Vite', icon: 'vite' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'FastAPI', icon: 'fastapi' },
  { name: 'Flask', icon: 'flask' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'scikit-learn', icon: 'scikitlearn' },
  { name: 'pandas', icon: 'pandas' },
  { name: 'Linux', icon: 'linux' },
  { name: 'Bash', icon: 'gnubash' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub Actions', icon: 'githubactions' },
  { name: 'Docker', icon: 'docker' },
] as const

export type StackIcon = (typeof stackLogos)[number]['icon']

/** Grouped list under the loop. Everything here appears in a repo or in coursework. */
export const skillGroups = [
  { label: 'Languages', items: ['C++', 'Python', 'Rust', 'TypeScript', 'JavaScript', 'C#', 'Assembly', 'HTML & CSS'] },
  { label: 'Frontend', items: ['React', 'React Router', 'Vite', 'Tailwind CSS', 'Bootstrap'] },
  { label: 'Backend & data', items: ['FastAPI', 'Flask', 'MongoDB', 'pandas', 'scikit-learn', 'REST APIs'] },
  { label: 'Security', items: ['OSINT', 'nmap', 'ffuf', 'subfinder', 'crt.sh', 'Recon automation'] },
  { label: 'Tooling & ops', items: ['Linux', 'Bash', 'Git', 'GitHub Actions', 'Docker', 'DevOps', 'IT governance'] },
] as const

// ─── Experience & education ──────────────────────────────────────────────────

export type TimelineEntry = {
  title: string
  org: string
  /** e.g. '2025 — Present'. Leave empty to hide. */
  period?: string
  status?: string
  detail?: string
}

/**
 * TODO: add roles from your LinkedIn here (newest first). The section only shows
 * groups that have entries, so this stays hidden until you fill it in.
 * Example:
 * { title: 'Security Intern', org: 'Company', period: '2026 — Present', detail: 'What you did, briefly.' },
 */
export const experience: TimelineEntry[] = []

export const education: TimelineEntry[] = [
  {
    title: 'Software Engineering',
    org: 'FIAP · São Paulo',
    status: 'First year',
  },
  {
    title: 'AAS, Cybersecurity',
    org: 'FIAP · São Paulo',
    status: 'Finishing',
  },
]

/** Shown as a row under the education entries. */
export const coursework = [
  'Python',
  'JavaScript & React',
  'C++',
  'Rust',
  'Cybersecurity',
  'Assembly',
  'DevOps',
  'IT governance',
]

/**
 * TODO: add certifications from your LinkedIn.
 * Example: { title: 'Certification name', org: 'Issuer', period: '2026' },
 */
export const certifications: TimelineEntry[] = []

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contact = {
  heading: 'Let’s talk.',
  body: 'Questions, opportunities, or a project you want a second pair of eyes on: my inbox is open.',
} as const

// ─── Navigation ──────────────────────────────────────────────────────────────

export const sections = {
  about: { id: 'about', index: '01', label: 'About' },
  work: { id: 'work', index: '02', label: 'Work' },
  skills: { id: 'skills', index: '03', label: 'Stack' },
  path: { id: 'path', index: '04', label: experience.length ? 'Experience' : 'Education' },
  contact: { id: 'contact', index: '05', label: 'Contact' },
} as const

export const navItems = Object.values(sections).map(s => ({ label: s.label, href: `#${s.id}` }))
