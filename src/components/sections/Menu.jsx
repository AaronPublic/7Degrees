import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeader from '../ui/SectionHeader.jsx'
import MenuCard from '../ui/MenuCard.jsx'
import Reveal from '../ui/Reveal.jsx'
import { cn } from '../../lib/cn.js'
import { coffeeCart, menu } from '../../data/content.js'

// Bento placement on the 4-column desktop grid:
//   coffee  coffee | milktea milktea
//   burger  burger | silog   silog
//   fries | brownies | silog  silog
const layout = {
  coffee: { variant: 'mist', className: 'lg:col-span-2' },
  milktea: { variant: 'paper', className: 'lg:col-span-2' },
  burger: { variant: 'paper', className: 'lg:col-span-2' },
  silog: { variant: 'mist', className: 'lg:col-span-2 lg:row-span-2' },
  fries: { variant: 'mist' },
  brownies: { variant: 'paper' },
}

// Links to #cart-menu (e.g. the cart section's "See the menu") open the menu filtered to cart drinks;
// links to #menu open the full menu
const CART_HASH = '#cart-menu'

const views = [
  { id: 'all', label: 'Full menu' },
  { id: 'cart', label: 'Coffee cart' },
]

export default function Menu() {
  const [view, setView] = useState(() => (window.location.hash === CART_HASH ? 'cart' : 'all'))

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === CART_HASH) setView('cart')
      else if (window.location.hash === '#menu') setView('all')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const choose = (next) => {
    setView(next)
    // Keep the URL in step with the view, so the next #menu / #cart-menu link fires hashchange
    history.replaceState(null, '', next === 'cart' ? CART_HASH : '#menu')
  }

  const cart = view === 'cart'
  const categories = cart ? menu.filter((category) => coffeeCart.menu.ids.includes(category.id)) : menu

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative pt-12 md:pt-16">
      <span id="cart-menu" aria-hidden="true" className="absolute top-0" />
      <Container>
        <Reveal>
          <SectionHeader
            id="menu-title"
            align="center"
            eyebrow={cart ? coffeeCart.menu.eyebrow : 'Made to order'}
            title={cart ? coffeeCart.menu.title : 'Our menu'}
            description={
              cart ? coffeeCart.menu.description : 'Coffee, milktea, burgers, silog and sweets, all freshly prepared.'
            }
          />
        </Reveal>

        <div
          role="group"
          aria-label="Menu view"
          className="mx-auto mt-6 flex w-fit gap-1 rounded-pill bg-paper-200 p-1"
        >
          {views.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={view === id}
              onClick={() => choose(id)}
              className={cn(
                'min-h-11 cursor-pointer touch-manipulation rounded-pill px-5 text-sm font-semibold transition-colors duration-200',
                view === id ? 'bg-ink text-white shadow-soft' : 'text-ink-muted hover:text-ink',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {cart && (
          <p
            role="note"
            className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-bento-sm border border-ink/10 bg-paper-50 p-4 text-sm shadow-soft motion-safe:animate-rise sm:items-center sm:text-base"
          >
            <Info className="mt-0.5 size-5 shrink-0 sm:mt-0" aria-hidden="true" />
            <span>{coffeeCart.menu.notice}</span>
          </p>
        )}

        <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => {
            const { variant, className } = layout[category.id]
            return (
              <Reveal key={category.id} delay={(i % 2) * 80} className={className}>
                <MenuCard {...category} variant={variant} className="h-full" />
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
