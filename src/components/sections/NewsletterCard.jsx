import { useState } from 'react'
import BentoCard from '../ui/BentoCard.jsx'
import Button from '../ui/Button.jsx'
import BotanicalLineArt from '../svg/BotanicalLineArt.jsx'
import { cn } from '../../lib/cn.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterCard() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error')
      return
    }
    // No backend yet — wire this to your email provider.
    setStatus('success')
    setEmail('')
  }

  return (
    <BentoCard variant="paper" className="flex h-full flex-col overflow-hidden">
      <BotanicalLineArt className="pointer-events-none absolute -right-6 -bottom-8 -z-10 h-64 rotate-[-12deg] text-mist-500 md:h-80" />

      <h2 className="max-w-sm text-3xl font-extrabold tracking-tight text-balance">
        Stay in the loop
      </h2>
      <p className="mt-3 max-w-sm text-ink-muted">
        New flavors, menu updates and coffee cart news. One email a month, never spam.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
          aria-invalid={status === 'error'}
          aria-describedby="newsletter-status"
          className={cn(
            'min-w-0 flex-1 rounded-pill border-2 bg-paper-50 px-5 py-3 placeholder:text-ink-muted/70 focus:outline-none focus-visible:border-accent-500',
            status === 'error' ? 'border-accent-500' : 'border-transparent',
          )}
        />
        <Button type="submit">Subscribe</Button>
      </form>

      <p id="newsletter-status" aria-live="polite" className="mt-3 min-h-6 text-sm font-medium">
        {status === 'error' && <span className="text-accent-600">Please enter a valid email address.</span>}
        {status === 'success' && <span className="text-mist-700">You're in! Watch your inbox for updates.</span>}
      </p>
    </BentoCard>
  )
}
