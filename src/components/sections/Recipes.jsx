import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import ExplodedCup from '../illustrations/ExplodedCup.jsx'
import { useInView } from '../../hooks/useInView.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import { formatPrice } from '../../lib/formatPrice.js'
import { cn } from '../../lib/cn.js'
import { menu, recipes } from '../../data/content.js'

const AUTO_MS = 3800 // time on each cup before the carousel turns
const SWIPE_PX = 40

// One slide per flavor, coffee first then milktea, in menu order
const slides = recipes.drinks.flatMap((drink) => {
  const category = menu.find((item) => item.id === drink.id)
  return category.options
    .filter((flavor) => drink.flavors[flavor])
    .map((flavor) => ({
      key: `${drink.id}-${flavor}`,
      drink,
      category,
      flavor,
      layers: { ...drink.common, ...drink.flavors[flavor] },
    }))
})

/** Signed distance from the active slide, wrapping around: -2 … 2 are on stage. */
function offsetOf(i, active, n) {
  const d = (i - active + n) % n
  return d > n / 2 ? d - n : d
}

/** Coverflow pose for a slide `d` steps from center. */
function poseOf(d) {
  const abs = Math.abs(d)
  const turn = Math.sign(d) * Math.min(abs, 2)
  return {
    transform: `translateX(${d * 62}%) translateZ(${-abs * 180}px) rotateY(${-turn * 24}deg) scale(${abs ? 0.8 : 1})`,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.6 : abs === 2 ? 0.22 : 0,
    zIndex: 10 - abs,
  }
}

function RoundButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 shrink-0 cursor-pointer touch-manipulation place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
    >
      {children}
    </button>
  )
}

export default function Recipes() {
  const n = slides.length
  const reducedMotion = usePrefersReducedMotion()
  const [stageRef, inView] = useInView({ threshold: 0.3 })
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [held, setHeld] = useState(false) // hovered or focused: hold still
  const chipsRef = useRef(null)
  const drag = useRef({ x: null, moved: false })

  const autoplay = playing && !reducedMotion
  const go = (i) => setActive(((i % n) + n) % n)

  useEffect(() => {
    if (!autoplay || !inView || held) return
    const timer = setTimeout(() => setActive((a) => (a + 1) % n), AUTO_MS)
    return () => clearTimeout(timer)
  }, [autoplay, inView, held, active, n])

  // Keep the active flavor chip in view on narrow screens (scrolls the row only, never the page)
  useEffect(() => {
    const row = chipsRef.current
    const chip = row?.children[active]
    if (!chip) return
    row.scrollTo({
      left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [active, reducedMotion])

  const current = slides[active]

  return (
    <section
      id="recipes"
      aria-labelledby="recipes-title"
      className="relative isolate overflow-hidden bg-roast-950 py-14 text-white md:py-20"
    >
      {/* spotlight from above + warm glow on the floor */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_42%,var(--color-roast-800),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[62%] -z-10 mx-auto h-40 max-w-3xl rounded-[50%] bg-gold-400/15 blur-3xl"
      />

      <Container>
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold tracking-widest text-gold-400 uppercase">{recipes.eyebrow}</p>
          <h2 id="recipes-title" className="text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
            {recipes.title}
          </h2>
          <p className="mx-auto max-w-prose text-white/70">{recipes.description}</p>
        </Reveal>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Drink recipes"
          className="mt-8 md:mt-12"
          onPointerEnter={(event) => event.pointerType === 'mouse' && setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false)
          }}
        >
          {/* Stage: every cup shares one grid cell; poses place them around the carousel */}
          <div
            ref={stageRef}
            className="relative grid touch-pan-y items-end justify-items-center select-none [perspective:1400px]"
            onPointerDown={(event) => {
              drag.current = { x: event.clientX, moved: false }
            }}
            onPointerUp={(event) => {
              const { x } = drag.current
              if (x == null) return
              const dx = event.clientX - x
              drag.current = { x: null, moved: Math.abs(dx) > SWIPE_PX }
              if (drag.current.moved) go(active + (dx < 0 ? 1 : -1))
            }}
            onPointerCancel={() => {
              drag.current = { x: null, moved: false }
            }}
          >
            {slides.map((slide, i) => {
              const d = offsetOf(i, active, n)
              const isActive = d === 0
              return (
                <div
                  key={slide.key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${slide.flavor} ${slide.category.title}, ${i + 1} of ${n}`}
                  aria-hidden={!isActive}
                  onClick={() => !isActive && !drag.current.moved && go(i)}
                  className={cn(
                    'w-[min(92vw,32rem)] transition-[transform,opacity] duration-700 ease-out-soft [grid-area:1/1] motion-reduce:transition-none',
                    !isActive && Math.abs(d) <= 2 && 'cursor-pointer',
                    Math.abs(d) > 2 && 'pointer-events-none',
                  )}
                  style={poseOf(d)}
                >
                  <ExplodedCup
                    slots={slide.drink.slots}
                    layers={slide.layers}
                    spread={isActive ? 1 : 0.35}
                    showLabels={isActive}
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-col items-center gap-1 text-center" aria-live={autoplay ? 'off' : 'polite'}>
            <p className="text-sm font-semibold tracking-widest text-gold-400 uppercase">{current.category.title}</p>
            <p key={current.key} className="text-3xl font-extrabold tracking-tight motion-safe:animate-rise md:text-4xl">
              {current.flavor}
            </p>
            <p className="text-white/70">
              {current.category.size} · <span className="font-bold text-white">{formatPrice(current.category.price)}</span>
            </p>
          </div>

          <div className="mx-auto mt-6 flex max-w-4xl items-center gap-2 sm:gap-3">
            <RoundButton label="Previous flavor" onClick={() => go(active - 1)}>
              <ChevronLeft className="size-5" aria-hidden="true" />
            </RoundButton>

            <div
              ref={chipsRef}
              role="group"
              aria-label="Flavors"
              className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-px-4 py-1 lg:flex-wrap lg:justify-center"
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.key}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => go(i)}
                  className={cn(
                    'min-h-11 shrink-0 cursor-pointer touch-manipulation rounded-pill border px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200',
                    i === active
                      ? 'border-gold-400 bg-gold-400 text-roast-950'
                      : 'border-white/15 text-white/80 hover:border-white/40 hover:text-white',
                  )}
                >
                  {slide.flavor}
                </button>
              ))}
            </div>

            <RoundButton label="Next flavor" onClick={() => go(active + 1)}>
              <ChevronRight className="size-5" aria-hidden="true" />
            </RoundButton>
            {!reducedMotion && (
              <RoundButton
                label={playing ? 'Pause carousel' : 'Play carousel'}
                onClick={() => setPlaying((value) => !value)}
              >
                {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
              </RoundButton>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
