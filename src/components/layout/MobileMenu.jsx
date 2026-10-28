import { useEffect } from 'react'
import { MapPin } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { cn } from '../../lib/cn.js'
import { location } from '../../data/content.js'

export default function MobileMenu({ open, onClose, links, active }) {
  // Close on Escape or a tap anywhere outside the header
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    const onPointerDown = (event) => {
      if (!event.target.closest('header')) onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open, onClose])

  return (
    <div id="mobile-menu" hidden={!open} className="absolute inset-x-4 top-full sm:inset-x-6 md:hidden">
      <div className="mt-2 rounded-bento-sm bg-paper-50 p-4 shadow-soft motion-safe:animate-rise [animation-duration:0.3s]">
        <ul className="flex flex-col">
          {links.map((link) => {
            const current = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={onClose}
                  aria-current={current ? 'location' : undefined}
                  className={cn(
                    'block rounded-2xl px-4 py-3 text-lg font-semibold transition-colors',
                    current ? 'bg-paper-200 text-accent-500' : 'hover:bg-paper-200',
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
        <Button href={location.mapsUrl} target="_blank" rel="noreferrer" onClick={onClose} className="mt-3 w-full">
          <MapPin className="size-4" aria-hidden="true" /> Get directions
        </Button>
      </div>
    </div>
  )
}
