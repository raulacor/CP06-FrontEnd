export type ContactInput = { name: string; email: string; message: string }
export type ContactField = keyof ContactInput
export type ContactErrors = Partial<Record<ContactField, string>>

export const NAME_MIN = 2
export const NAME_MAX = 100
export const MESSAGE_MIN = 20
export const MESSAGE_MAX = 2000

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Pure function: same input, same errors. Returns an empty object when everything is valid. */
export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  const name = input.name.trim()
  const email = input.email.trim()
  const message = input.message.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < NAME_MIN) errors.name = `Name must have at least ${NAME_MIN} characters.`
  else if (name.length > NAME_MAX) errors.name = `Name must have at most ${NAME_MAX} characters.`

  if (!email) errors.email = 'Please enter your email.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Invalid email address.'

  if (!message) errors.message = 'Please write a message.'
  else if (message.length < MESSAGE_MIN)
    errors.message = `Message must have at least ${MESSAGE_MIN} characters (${message.length}/${MESSAGE_MIN}).`
  else if (message.length > MESSAGE_MAX) errors.message = `Message must have at most ${MESSAGE_MAX} characters.`

  return errors
}

export const hasErrors = (errors: ContactErrors) => Object.keys(errors).length > 0
