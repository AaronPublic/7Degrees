import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import Poodle from '../illustrations/Poodle.jsx'
import { cn } from '../../lib/cn.js'
import { mascot } from '../../data/content.js'

const GREET_MS = 4500 // after the page-load intro has cleared
const BUBBLE_MS = 8000 // speech bubbles tidy themselves away
const HIDDEN_KEY = '7d-mascot-hidden'

const readHidden = () => {
  try {
    return sessionStorage.getItem(HIDDEN_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Mocha, the floating poodle in the bottom-right corner. Says hi once, then
 * shows a new tip each tap. Visitors can hide Mocha for the rest of the visit.
 */
export default function Mascot() {
  const [hidden, setHidden] = useState(readHidden)
  const [open, setOpen] = useState(false)
  const [tip, setTip] = useState(0)
  const [hops, setHops] = useState(0) // remounts the dog to replay the hop
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (hidden) return
    const timer = setTimeout(() => setOpen(true), GREET_MS)
    return () => clearTimeout(timer)
  }, [hidden])

  // Close the bubble after a while, unless the pointer is resting on it
  useEffect(() => {
    if (!open || hovered) return
    const timer = setTimeout(() => setOpen(false), BUBBLE_MS)
    return () => clearTimeout(timer)
  }, [open, tip, hovered])

  if (hidden) return null

  const current = mascot.tips[tip]

  const onDogClick = () => {
    setHops((value) => value + 1)
    if (open) setTip((value) => (value + 1) % mascot.tips.length)
    else setOpen(true)
  }

  const hide = () => {
    setHidden(true)
    try {
      sessionStorage.setItem(HIDDEN_KEY, '1')
    } catch {
      // ignore: Mocha just comes back next load
    }
  }

  return (
    <div
      className="intro-wait pointer-events-none fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-end gap-2 sm:right-5"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div role="status" aria-live="polite" className="pointer-events-auto">
        {open && (
          <div
            key={tip}
            className="relative mr-6 w-64 max-w-[calc(100vw-2rem)] rounded-2xl bg-paper-50 p-4 pr-10 text-sm shadow-soft ring-1 ring-ink/5 motion-safe:animate-rise [animation-duration:0.35s]"
          >
            <p className="font-bold text-accent-500">{mascot.name}</p>
            <p className="mt-1 text-ink">{current.text}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              {current.cta && (
                <a
                  href={current.cta.href}
                  {...(current.cta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-9 items-center rounded-pill bg-accent-500 px-4 font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  {current.cta.label}
                </a>
              )}
              <button
                type="button"
                onClick={hide}
                className="cursor-pointer text-xs font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline"
              >
                Hide {mascot.name}
              </button>
            </div>
            <button
              type="button"
              aria-label="Close message"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 grid size-8 cursor-pointer place-items-center rounded-full text-ink-muted transition-colors hover:bg-paper-200 hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
            {/* bubble tail pointing at the dog */}
            <span aria-hidden="true" className="absolute -bottom-1.5 right-8 size-3 rotate-45 bg-paper-50" />
          </div>
        )}
      </div>

      <button
        type="button"
        aria-label={`${mascot.name} the poodle: tap for a tip`}
        aria-expanded={open}
        onClick={onDogClick}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="mascot-enter pointer-events-auto size-20 cursor-pointer touch-manipulation rounded-full drop-shadow-lg sm:size-24"
      >
        <span key={hops} className={cn('block size-full', hops > 0 && 'mascot-hop')}>
          <Poodle happy={hovered || open} className="size-full" />
        </span>
      </button>
    </div>
  )
}
