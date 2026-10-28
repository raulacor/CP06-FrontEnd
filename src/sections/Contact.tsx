import { useEffect, useRef, useState } from 'react'
import { ContactForm } from '@/components/ContactForm'
import Magnet from '@/components/Magnet'
import StarBorder from '@/components/StarBorder'
import { Reveal } from '@/components/Reveal'
import { ArrowUpRight, Check, Copy, Download, GitHub, LinkedIn, Mail } from '@/components/Icons'
import { contact, links, profile, sections } from '@/data/site'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = links.email
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium text-fg-muted transition-colors duration-200 hover:border-line-strong hover:text-fg"
    >
      {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  )
}

const SOCIALS = [
  { label: 'GitHub', handle: '@raulacor', href: links.github, Icon: GitHub, external: true },
  { label: 'LinkedIn', handle: 'in/raulacor', href: links.linkedin, Icon: LinkedIn, external: true },
  { label: 'Résumé', handle: 'PDF', href: profile.resumeUrl, Icon: Download, external: false },
]

export function Contact() {
  const { id, index, label } = sections.contact

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative overflow-hidden border-t border-line">
      {/* A faint accent horizon behind the CTA, the only glow outside the hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_60%_at_50%_100%,rgb(0_171_202/0.14),transparent_70%)]"
      />

      <div className="shell pt-20 pb-24 sm:pt-28 sm:pb-32">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-fg-muted">{index}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
          <span>{label}</span>
        </p>

        <Reveal className="mt-10">
          <h2
            id={`${id}-heading`}
            className="font-xwide text-[clamp(3.25rem,16.5vw,10.5rem)] leading-[0.86] font-[680] tracking-[-0.05em]"
          >
            {contact.heading}
          </h2>
          <p className="mt-8 max-w-[34rem] text-lg text-fg-muted">{contact.body}</p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-7" delay={0.1}>
            <ContactForm />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="eyebrow mb-6">Prefer email?</p>
            <div className="flex flex-wrap items-center gap-4">
              <Magnet padding={70} magnetStrength={3.5} maxOffset={12}>
                <StarBorder
                  as="a"
                  href={links.email}
                  color="#5de8f6"
                  radius={999}
                  thickness={1}
                  duration={5}
                  glow={0.7}
                  backgroundColor="var(--color-ink-raised)"
                  textColor="var(--color-fg)"
                  borderColor="var(--color-line-strong)"
                  className="h-14 gap-3 px-6! text-base sm:h-16 sm:px-8! sm:text-lg focus-visible:outline-accent!"
                >
                  <Mail size={20} className="hidden text-accent xs:block" />
                  <span className="font-medium">{profile.email}</span>
                  <ArrowUpRight size={18} className="text-fg-muted" />
                </StarBorder>
              </Magnet>
              <CopyEmail />
            </div>
          </Reveal>
        </div>

        <Reveal stagger={0.06} className="mt-20 grid border-t border-line sm:grid-cols-3">
          {SOCIALS.map(({ label: name, handle, href, Icon, external }) => (
            <a
              key={name}
              href={href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : { download: true })}
              className="group flex items-center justify-between gap-4 border-b border-line py-6 transition-colors hover:text-fg sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <span className="flex items-center gap-3">
                <Icon size={18} className="text-fg-muted transition-colors group-hover:text-fg" />
                <span className="font-medium">{name}</span>
                <span className="text-sm text-fg-subtle">{handle}</span>
              </span>
              <ArrowUpRight
                size={16}
                className="text-fg-subtle transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
              />
              {external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
