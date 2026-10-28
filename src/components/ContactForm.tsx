import { Button } from '@/components/ui/Button'
import { TextAreaField, TextField } from '@/components/ui/TextField'
import { useContactForm } from '@/hooks/useContactForm'
import { MESSAGE_MIN } from '@/lib/validation'

export function ContactForm() {
  const { values, status, errorFor, onChange, onBlur, onSubmit } = useContactForm()
  const sending = status === 'sending'

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Contact form" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={onChange('name')}
          onBlur={onBlur('name')}
          error={errorFor('name')}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={onChange('email')}
          onBlur={onBlur('email')}
          error={errorFor('email')}
        />
      </div>
      <TextAreaField
        label="Message"
        name="message"
        value={values.message}
        onChange={onChange('message')}
        onBlur={onBlur('message')}
        error={errorFor('message')}
        hint={`At least ${MESSAGE_MIN} characters.`}
      />

      {/* Honeypot for bots: hidden from people and screen readers. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" loading={sending}>
          {sending ? 'Sending…' : 'Send message'}
        </Button>
        <p aria-live="polite" className="text-sm">
          {status === 'success' && <span className="text-accent">Thanks! Your message was sent. I’ll reply soon.</span>}
        </p>
      </div>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-500">
          Your message couldn’t be sent. Please try again, or email me directly.
        </p>
      )}
    </form>
  )
}
