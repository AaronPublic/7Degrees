import { useState } from 'react'
import { MapPin, Menu, X } from 'lucide-react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Logo from './Logo.jsx'
import MobileMenu from './MobileMenu.jsx'
import { location, navLinks } from '../../data/content.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-30">
      <Container as="nav" aria-label="Main" className="grid grid-cols-[1fr_auto] items-center py-5 md:grid-cols-[1fr_auto_1fr]">
        <Logo className="justify-self-start" />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-pill px-4 py-2 font-medium text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="justify-self-end">
          <Button href={location.mapsUrl} target="_blank" rel="noreferrer" size="sm" className="hidden md:inline-flex">
            <MapPin className="size-4" aria-hidden="true" /> Get directions
          </Button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-paper-50 shadow-soft md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={navLinks} />
    </header>
  )
}
