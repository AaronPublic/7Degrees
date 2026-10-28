import { useId, useState } from 'react'
import { CircleCheck, Send } from 'lucide-react'
import BentoCard from '../ui/BentoCard.jsx'
import Button from '../ui/Button.jsx'
import BotanicalLineArt from '../svg/BotanicalLineArt.jsx'
import { cn } from '../../lib/cn.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^\+?[\d\s-]{7,}$/
const CART_TOPIC = 'Coffee cart for an event'
const TOPICS = [CART_TOPIC, 'Menu and orders', 'Something else']
const EMPTY = { name: '', email: '', phone: '', topic: TOPICS[0], date: '', message: '' }
// Order matters: the first invalid field in this list gets focus on submit
const FIELD_ORDER = ['name', 'email', 'phone', 'message']

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter an email like you@example.com.'
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Use digits only, e.g. 0917 123 4567.'
  }
  if (!values.message.trim()) errors.message = 'Let us know what you would like to ask.'
  return errors
}

const inputClass = (invalid) =>
  cn(
    'w-full min-h-12 rounded-2xl border-2 bg-paper-50 px-4 py-3 text-base placeholder:text-ink-muted/70 focus:outline-none focus-visible:border-accent-500',
    invalid ? 'border-accent-600' : 'border-transparent',
  )

/** Label, control and an error line wired together with aria-describedby. */
function Field({ id, label, optional, error, className, children }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional ? (
          <span className="font-normal text-ink-muted"> (optional)</span>
        ) : (
          <span className="text-ink-muted" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-accent-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default function InquiryCard() {
  const uid = useId()
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)

  const errors = validate(values)
  const errorFor = (field) => ((touched[field] || submitted) && errors[field]) || null

  // Props shared by every control: value, change, validate-on-blur, error wiring
  const bind = (field) => ({
    id: `${uid}${field}`,
    name: field,
    value: values[field],
    onChange: (event) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
      setSent(false)
    },
    onBlur: () => setTouched((current) => ({ ...current, [field]: true })),
    'aria-invalid': Boolean(errorFor(field)),
    'aria-describedby': errorFor(field) ? `${uid}${field}-error` : undefined,
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    const firstInvalid = FIELD_ORDER.find((field) => errors[field])
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid].focus()
      return
    }
    // No backend yet: connect this to your email or form service (e.g. Formspree, EmailJS).
    setSent(true)
    setValues(EMPTY)
    setTouched({})
    setSubmitted(false)
  }

  return (
    <BentoCard variant="paper" className="flex h-full flex-col overflow-hidden">
      <BotanicalLineArt className="pointer-events-none absolute -right-6 -bottom-8 -z-10 h-64 rotate-[-12deg] text-mist-500 md:h-80" />

      <h2 className="text-3xl font-extrabold tracking-tight text-balance">Inquire</h2>
      <p className="mt-3 max-w-md text-ink-muted">
        Planning an event or have a question? Send us a message and we&apos;ll get back to you.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}name`} label="Name" error={errorFor('name')}>
          <input type="text" autoComplete="name" placeholder="Juan dela Cruz" className={inputClass(errorFor('name'))} {...bind('name')} />
        </Field>

        <Field id={`${uid}email`} label="Email" error={errorFor('email')}>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass(errorFor('email'))}
            {...bind('email')}
          />
        </Field>

        <Field id={`${uid}phone`} label="Contact number" optional error={errorFor('phone')}>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0917 123 4567"
            className={inputClass(errorFor('phone'))}
            {...bind('phone')}
          />
        </Field>

        <Field id={`${uid}topic`} label="Inquiry about">
          <select className={cn(inputClass(false), 'cursor-pointer')} {...bind('topic')}>
            {TOPICS.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </Field>

        {/* Only cart bookings need a date */}
        {values.topic === CART_TOPIC && (
          <Field id={`${uid}date`} label="Event date" optional className="sm:col-span-2">
            <input type="date" className={inputClass(false)} {...bind('date')} />
          </Field>
        )}

        <Field id={`${uid}message`} label="Message" error={errorFor('message')} className="sm:col-span-2">
          <textarea
            rows={4}
            placeholder="Tell us about your event or question: number of guests, location, drinks you're interested in…"
            className={cn(inputClass(errorFor('message')), 'resize-y')}
            {...bind('message')}
          />
        </Field>

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
          <Button type="submit" className="w-full sm:w-auto">
            <Send className="size-4" aria-hidden="true" /> Submit
          </Button>
          <p aria-live="polite" className="min-h-6 text-sm font-medium">
            {sent && (
              <span className="inline-flex items-center gap-2 text-mist-700">
                <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
                Thanks! Your inquiry was sent. We&apos;ll reply soon.
              </span>
            )}
          </p>
        </div>
      </form>
    </BentoCard>
  )
}
