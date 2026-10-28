import { useEffect, useState } from 'react'
import { MapPin, Menu, X } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Logo from './Logo.jsx'
import MobileMenu from './MobileMenu.jsx'
import { useScrollSpy } from '../../hooks/useScrollSpy.js'
import { cn } from '../../lib/cn.js'
import { location, navLinks } from '../../data/content.js'

const sectionIds = navLinks.map((link) => link.href.slice(1))

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(sectionIds)

  // Frosted background once the page moves under the header. Height never changes, so nothing below shifts.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        scrolled || open ? 'bg-paper-100/85 shadow-soft backdrop-blur-md' : 'bg-paper-100',
      )}
    >
      <Container as="nav" aria-label="Main" className="grid grid-cols-[1fr_auto] items-center py-3 md:grid-cols-[1fr_auto_1fr]">
        <Logo className="justify-self-start" />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const current = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={current ? 'location' : undefined}
                  className={cn(
                    'rounded-pill px-4 py-2 font-medium transition-colors duration-200',
                    current ? 'bg-ink/8 text-ink' : 'text-ink-muted hover:bg-ink/5 hover:text-ink',
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="justify-self-end">
          <Button href={location.mapsUrl} target="_blank" rel="noreferrer" size="sm" className="hidden md:inline-flex">
            <MapPin className="size-4" aria-hidden="true" /> Get directions
          </Button>
          <button
            type="button"
            className="grid size-11 cursor-pointer touch-manipulation place-items-center rounded-full bg-paper-50 shadow-soft md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={navLinks} active={active} />
    </header>
  )
}
