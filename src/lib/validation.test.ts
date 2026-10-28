import { describe, expect, it } from 'vitest'
import { validateContact } from '@/lib/validation'

const valid = { name: 'Ana Souza', email: 'ana@example.com', message: 'Hi Raul, I would like to talk about a project.' }

describe('validateContact', () => {
  it('accepts a valid message', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('requires every field', () => {
    expect(validateContact({ name: '', email: '', message: '' })).toEqual({
      name: 'Please enter your name.',
      email: 'Please enter your email.',
      message: 'Please write a message.',
    })
  })

  it('treats whitespace-only values as empty', () => {
    expect(validateContact({ name: '   ', email: ' ', message: '\n\n' })).toHaveProperty(
      'name',
      'Please enter your name.',
    )
  })

  it.each(['ana', 'ana@', 'ana@example', '@example.com', 'ana @example.com'])('rejects the email "%s"', email => {
    expect(validateContact({ ...valid, email }).email).toBe('Invalid email address.')
  })

  it('requires at least 20 characters in the message and shows the count', () => {
    expect(validateContact({ ...valid, message: 'Too short' }).message).toBe(
      'Message must have at least 20 characters (9/20).',
    )
    expect(validateContact({ ...valid, message: 'x'.repeat(20) }).message).toBeUndefined()
  })

  it('limits the message to 2000 characters', () => {
    expect(validateContact({ ...valid, message: 'x'.repeat(2001) }).message).toBe(
      'Message must have at most 2000 characters.',
    )
  })

  it('requires a name with at least 2 characters', () => {
    expect(validateContact({ ...valid, name: 'A' }).name).toBe('Name must have at least 2 characters.')
  })
})
