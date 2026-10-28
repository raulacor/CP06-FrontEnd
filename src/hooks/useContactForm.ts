import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { hasErrors, validateContact, type ContactField, type ContactInput } from '@/lib/validation'
import { sendContactMessage } from '@/services/contact'

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

const EMPTY: ContactInput = { name: '', email: '', message: '' }
const ALL_TOUCHED = { name: true, email: true, message: true }

/** All contact-form logic, so the component only renders. */
export function useContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  // A ref updates instantly, so a fast double click can't send twice before React re-renders.
  const inFlight = useRef(false)

  const errors = validateContact(values)
  const errorFor = (field: ContactField) => (touched[field] ? errors[field] : undefined)

  const onChange = (field: ContactField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues(current => ({ ...current, [field]: event.target.value }))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const onBlur = (field: ContactField) => () => setTouched(current => ({ ...current, [field]: true }))

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inFlight.current) return
    setTouched(ALL_TOUCHED)
    if (hasErrors(errors)) return

    // Honeypot: real people never see or fill this field, bots usually do.
    if (new FormData(event.currentTarget).get('company')) {
      setStatus('success')
      return
    }

    inFlight.current = true
    setStatus('sending')
    try {
      await sendContactMessage(values)
      setValues(EMPTY)
      setTouched({})
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    } finally {
      inFlight.current = false
    }
  }

  return { values, status, errorFor, onChange, onBlur, onSubmit }
}
