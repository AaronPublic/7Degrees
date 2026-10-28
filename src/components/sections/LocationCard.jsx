import { ArrowRight, Clock, MapPin } from 'lucide-react'
import BentoCard from '../ui/BentoCard.jsx'
import Button from '../ui/Button.jsx'
import { location } from '../../data/content.js'

function InfoRow({ icon: Icon, title, children }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/20 text-ink">
        <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-bold">{title}</h3>
        <div className="mt-1 text-ink-muted">{children}</div>
      </div>
    </div>
  )
}

export default function LocationCard() {
  return (
    <BentoCard variant="mist" className="flex h-full flex-col">
      <h2 className="text-3xl font-extrabold tracking-tight text-balance">Visit {location.name}</h2>

      <div className="mt-8 flex flex-col gap-6">
        <InfoRow icon={MapPin} title="Address">
          <address className="not-italic">
            {location.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </InfoRow>

        <InfoRow icon={Clock} title="Store hours">
          <p className="font-semibold text-ink">{location.hours}</p>
        </InfoRow>
      </div>

      <div className="mt-auto pt-8">
        <Button href={location.mapsUrl} target="_blank" rel="noreferrer" variant="outline" size="sm">
          Get directions <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </BentoCard>
  )
}
