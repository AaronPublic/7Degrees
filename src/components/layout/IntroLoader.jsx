import { useEffect, useLayoutEffect, useState } from 'react'
import PouringCup from '../illustrations/PouringCup.jsx'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import { cn } from '../../lib/cn.js'
import { hero } from '../../data/content.js'

// Keep in sync with the .intro-* timings in index.css
const POUR_MS = 2700
const EXIT_MS = 800

/**
 * Full-screen page-load intro: coffee pours into a cup, then the screen slides up.
 * While it plays, <html data-intro> locks scrolling and holds the hero's own
 * animations (.intro-wait) so they start as the page is revealed.
 * Click or any key skips it; reduced motion never shows it.
 */
export default function IntroLoader() {
  const reducedMotion = usePrefersReducedMotion()
  const [phase, setPhase] = useState(reducedMotion ? 'done' : 'pouring') // pouring | leaving | done

  useLayoutEffect(() => {
    if (phase !== 'pouring') return
    const root = document.documentElement
    const leave = () => setPhase('leaving')
    root.dataset.intro = ''
    const timer = setTimeout(leave, POUR_MS)
    window.addEventListener('keydown', leave)
    return () => {
      delete root.dataset.intro
      clearTimeout(timer)
      window.removeEventListener('keydown', leave)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'leaving') return
    const timer = setTimeout(() => setPhase('done'), EXIT_MS)
    return () => clearTimeout(timer)
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      aria-hidden="true"
      onClick={() => setPhase('leaving')}
      className={cn('intro-screen fixed inset-0 z-100 grid place-items-center bg-paper-100', phase === 'leaving' && 'intro-leave')}
    >
      <div className="intro-content flex flex-col items-center gap-6">
        <PouringCup className="w-36 sm:w-44 short:w-28" />
        <div className="intro-text flex flex-col items-center gap-1 text-center">
          <p className="text-2xl font-extrabold tracking-tight">7 Degrees</p>
          <p className="text-sm text-ink-muted">
            {hero.title} {hero.titleAccent}
          </p>
        </div>
      </div>
    </div>
  )
}
