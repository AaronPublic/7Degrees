import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import Blob from '../svg/Blob.jsx'
import PourOverBrew from '../illustrations/PourOverBrew.jsx'
import { useInView } from '../../hooks/useInView.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import { cn } from '../../lib/cn.js'
import { brewing } from '../../data/content.js'

// When each step lights up (ms), matching the .brew-* timeline in index.css
const STEP_AT = [0, 1700, 3200, 5600]

export default function Brewing() {
  const [sceneRef, inView] = useInView({ threshold: 0.35 })
  const reducedMotion = usePrefersReducedMotion()
  const [run, setRun] = useState(0)
  const [step, setStep] = useState(0)
  const playing = inView && !reducedMotion

  useEffect(() => {
    if (!playing) return
    const timers = STEP_AT.slice(1).map((at, i) => setTimeout(() => setStep(i + 1), at))
    return () => timers.forEach(clearTimeout)
  }, [playing, run])

  const brewAgain = () => {
    setStep(0)
    setRun((value) => value + 1)
  }

  const activeStep = playing ? step : null

  return (
    <section id="brew" aria-labelledby="brew-title" className="overflow-hidden bg-mist-300 py-12 md:py-16 lg:py-20">
      {/* Full-bleed band; Container keeps the content aligned with the rest of the page */}
      <Container>
        <Reveal className="grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
          <div ref={sceneRef} className="relative isolate mx-auto aspect-[19/20] w-full max-w-xs sm:max-w-sm short:max-w-60 lg:order-last lg:max-w-md">
            <Blob variant="soft" className="absolute inset-0 -z-10 text-paper-50/70 motion-safe:animate-breathe" />
            <PourOverBrew key={run} playing={playing} className="size-full" />
          </div>

          <div className="flex flex-col items-start">
            <p className="text-sm font-semibold tracking-widest text-accent-500 uppercase">{brewing.eyebrow}</p>
            <h2 id="brew-title" className="mt-3 text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
              {brewing.title}
            </h2>
            <p className="mt-5 max-w-prose text-lg text-ink-muted">{brewing.description}</p>

            <ol className="mt-8 grid w-full gap-3 sm:grid-cols-2">
              {brewing.steps.map(({ icon: Icon, title, body }, i) => {
                const active = activeStep === i
                const done = activeStep != null && activeStep > i
                return (
                  <li
                    key={title}
                    aria-current={active ? 'step' : undefined}
                    className={cn(
                      'flex gap-3 rounded-2xl p-3 transition-colors duration-500',
                      active ? 'bg-paper-50 shadow-soft' : 'bg-transparent',
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-500',
                        active || done ? 'border-ink bg-ink text-white' : 'border-ink/20 text-ink',
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-bold">
                        <span className="sr-only">Step {i + 1}: </span>
                        {title}
                      </h3>
                      <p className="mt-0.5 text-sm text-ink-muted">{body}</p>
                    </div>
                  </li>
                )
              })}
            </ol>

            {!reducedMotion && (
              <Button variant="outline" size="sm" onClick={brewAgain} className="mt-6">
                <RotateCcw className="size-4" aria-hidden="true" /> Brew again
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
