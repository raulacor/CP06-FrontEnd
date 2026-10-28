import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'

type FieldProps = { label: string; error?: string; hint?: string }

type A11yProps = { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string }

const BASE =
  'w-full rounded-xl border bg-ink-raised px-4 py-3 text-fg placeholder:text-fg-subtle transition-colors focus-visible:border-accent'

const fieldClass = (error?: string) => `${BASE} ${error ? 'border-red-500/70' : 'border-line-strong'}`

/** Label + control + error/hint, with the message linked to the control through aria-describedby. */
function FieldShell({ label, error, hint, children }: FieldProps & { children: (a11y: A11yProps) => ReactNode }) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error ?? hint

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': message ? messageId : undefined })}
      {message && (
        <p id={messageId} className={`mt-2 text-sm ${error ? 'text-red-500' : 'text-fg-subtle'}`}>
          {message}
        </p>
      )}
    </div>
  )
}

export function TextField({ label, error, hint, ...props }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell label={label} error={error} hint={hint}>
      {a11y => <input {...props} {...a11y} className={fieldClass(error)} />}
    </FieldShell>
  )
}

export function TextAreaField({
  label,
  error,
  hint,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell label={label} error={error} hint={hint}>
      {a11y => <textarea {...props} {...a11y} className={`${fieldClass(error)} min-h-36 resize-y`} />}
    </FieldShell>
  )
}
