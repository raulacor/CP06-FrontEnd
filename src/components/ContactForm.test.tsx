import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/components/ContactForm'
import { sendContactMessage } from '@/services/contact'

vi.mock('@/services/contact', () => ({ sendContactMessage: vi.fn() }))
const send = vi.mocked(sendContactMessage)

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Name'), 'Ana Souza')
  await user.type(screen.getByLabelText('Email'), 'ana@example.com')
  await user.type(screen.getByLabelText('Message'), 'Hi Raul, I would like to talk about a project.')
}

describe('<ContactForm />', () => {
  beforeEach(() => {
    send.mockReset()
  })

  it('shows a specific error for each empty field and does not send', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(screen.getByText('Please enter your name.')).toBeInTheDocument()
    expect(screen.getByText('Please enter your email.')).toBeInTheDocument()
    expect(screen.getByText('Please write a message.')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
    expect(send).not.toHaveBeenCalled()
  })

  it('shows "Invalid email address." after leaving a bad email field', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText('Email'), 'ana@example')
    await user.tab()

    expect(screen.getByText('Invalid email address.')).toBeInTheDocument()
  })

  it('asks for at least 20 characters in the message', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText('Message'), 'Too short')
    await user.tab()

    expect(screen.getByText('Message must have at least 20 characters (9/20).')).toBeInTheDocument()
  })

  it('blocks the button while sending, so a double click sends only once', async () => {
    let finish: () => void = () => {}
    send.mockImplementation(() => new Promise<void>(resolve => (finish = resolve)))
    const user = userEvent.setup()
    render(<ContactForm />)
    await fillValidForm(user)

    await user.dblClick(screen.getByRole('button', { name: 'Send message' }))

    const button = screen.getByRole('button', { name: 'Sending…' })
    expect(button).toBeDisabled()
    expect(send).toHaveBeenCalledTimes(1)

    finish()
    expect(await screen.findByText(/Your message was sent/)).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('')
  })

  it('shows an error message when sending fails', async () => {
    send.mockRejectedValue(new Error('network down'))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const user = userEvent.setup()
    render(<ContactForm />)
    await fillValidForm(user)

    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Your message couldn’t be sent')
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled()
  })
})
