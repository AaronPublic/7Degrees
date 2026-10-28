import { useEffect } from 'react'
import { MapPin } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { location } from '../../data/content.js'

export default function MobileMenu({ open, onClose, links }) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <div id="mobile-menu" hidden={!open} className="absolute inset-x-4 top-full sm:inset-x-6 md:hidden">
      <div className="rounded-bento-sm bg-paper-50 p-4 shadow-soft">
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={onClose}
                className="block rounded-2xl px-4 py-3 text-lg font-semibold hover:bg-paper-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Button href={location.mapsUrl} target="_blank" rel="noreferrer" onClick={onClose} className="mt-3 w-full">
          <MapPin className="size-4" aria-hidden="true" /> Get directions
        </Button>
      </div>
    </div>
  )
}
