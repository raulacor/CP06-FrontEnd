/**
 * All editable site content lives in this file.
 * Components read from here, so you can change copy, links and skills
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

// Projects are not listed here: they load from the GitHub API (src/services/github.ts).

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

/** Absolute hrefs (`/#about`) so the nav also works from project pages. */
export const navItems = Object.values(sections).map(s => ({ label: s.label, href: `/#${s.id}` }))
