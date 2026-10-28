import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import BentoCard from '../ui/BentoCard.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import Blob from '../svg/Blob.jsx'
import CoffeeCart from '../illustrations/CoffeeCart.jsx'
import { coffeeCart } from '../../data/content.js'

export default function CoffeeCartSection() {
  return (
    <section id="events" aria-labelledby="events-title" className="mt-6 scroll-mt-6 md:mt-8">
      <Container>
        <BentoCard as={Reveal} variant="paper" className="grid items-center gap-8 overflow-hidden md:gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start">
            <p className="text-sm font-semibold tracking-widest text-ink-muted uppercase">{coffeeCart.eyebrow}</p>
            <h2 id="events-title" className="mt-3 text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
              {coffeeCart.title}
            </h2>
            <p className="mt-5 max-w-prose text-lg text-ink-muted">{coffeeCart.description}</p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button href="#visit" size="lg">
                Book the coffee cart <ArrowRight className="size-5" aria-hidden="true" />
              </Button>
              <Button href="#menu" variant="ghost" size="lg">
                See the menu
              </Button>
            </div>
          </div>

          <div className="relative isolate order-first mx-auto aspect-square w-full max-w-xs sm:max-w-sm lg:order-none lg:max-w-md short:max-w-60">
            <Blob variant="product" className="absolute inset-0 -z-10 text-mist-300 motion-safe:animate-breathe" />
            <CoffeeCart className="relative mx-auto w-[86%] translate-y-[6%] drop-shadow-xl" />
          </div>
        </BentoCard>
      </Container>
    </section>
  )
}
