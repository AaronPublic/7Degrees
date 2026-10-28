import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Blob from '../svg/Blob.jsx'
import HeroCup from '../illustrations/HeroCup.jsx'
import { hero } from '../../data/content.js'

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="intro-wait relative isolate overflow-x-clip">
      <HeroBackground />

      <Container className="pt-10 pb-12 sm:pt-14 md:pt-20 lg:pb-16 short:pt-6">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-8 short:grid-cols-[3fr_2fr] short:gap-6">
          <div className="flex flex-col items-start text-white">
            <h1 id="hero-title" className="text-display font-extrabold tracking-tight text-balance motion-safe:animate-rise">
              {hero.title} <span className="text-white/70">{hero.titleAccent}</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/85 motion-safe:animate-rise" style={{ animationDelay: '120ms' }}>
              {hero.subtitle}
            </p>

            <div
              className="mt-8 flex w-full flex-col gap-3 motion-safe:animate-rise sm:w-auto sm:flex-row sm:flex-wrap"
              style={{ animationDelay: '240ms' }}
            >
              <Button href="#menu" size="lg" className="bg-white text-ink hover:bg-paper-200">
                Order now <ArrowRight className="size-5" aria-hidden="true" />
              </Button>
              <Button
                href="#menu"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-ink"
              >
                Explore menu
              </Button>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 motion-safe:animate-rise" style={{ animationDelay: '360ms' }}>
              {hero.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-sm text-white/75">{stat.label}</dt>
                  <dd className="text-2xl font-extrabold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}

// Full-width photo + darkening gradient behind the hero content.
function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <img
        src="/Images/Cover-1600.jpg"
        srcSet="/Images/Cover-900.jpg 900w, /Images/Cover-1600.jpg 1600w, /Images/Cover-2400.jpg 2400w"
        sizes="100vw"
        alt=""
        width="2400"
        height="1340"
        fetchPriority="high"
        className="size-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-linear-to-b from-roast-950/80 via-roast-950/65 to-roast-950/45 lg:bg-linear-to-r lg:from-roast-950/85 lg:via-roast-950/60 lg:to-roast-950/25" />
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="relative isolate mx-auto aspect-square w-full max-w-xs sm:max-w-md lg:max-w-none short:max-w-64">
      <Blob variant="hero" className="absolute inset-[4%] -z-10 text-white/15 motion-safe:animate-breathe" />
      <HeroCup className="relative -mt-[6%] -ml-[6%] w-[112%] max-w-none drop-shadow-2xl" />
    </div>
  )
}
