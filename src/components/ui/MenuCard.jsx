import BentoCard from './BentoCard.jsx'
import DrinkTopView from '../illustrations/DrinkTopView.jsx'
import DrinkGlass from '../illustrations/DrinkGlass.jsx'
import { formatPrice } from '../../lib/formatPrice.js'
import { cn } from '../../lib/cn.js'

function MenuArt({ art, title }) {
  if (art.type === 'cup') return <DrinkTopView {...art} label={title} className="size-full" />
  return <DrinkGlass {...art} label={title} className="size-full" />
}

function Subheading({ children }) {
  return <h4 className="text-xs font-semibold tracking-widest text-ink-muted uppercase">{children}</h4>
}

/** One menu category rendered as a bento card. Fields are optional; see `menu` in data/content.js. */
export default function MenuCard({
  id,
  title,
  icon: Icon,
  tint,
  prompt,
  options,
  size,
  price,
  items,
  sizes,
  addOns,
  art,
  variant = 'mist',
  className,
}) {
  const headingId = `menu-${id}`

  return (
    <BentoCard
      as="article"
      variant={variant}
      aria-labelledby={headingId}
      className={cn('group flex flex-col gap-6 p-5 sm:p-6 md:p-8 lg:p-8', className)}
    >
      <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="flex items-center gap-3">
          <span
            className="grid size-12 shrink-0 place-items-center rounded-full"
            style={{ color: tint.fg, backgroundColor: tint.bg }}
          >
            <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <h3 id={headingId} className="text-2xl font-extrabold tracking-tight">
            {title}
          </h3>
        </div>
        {price != null && (
          <p className="shrink-0 rounded-pill bg-ink px-4 py-2 text-sm font-bold text-white">
            {size && <span className="font-medium text-white/75">{size} · </span>}
            {formatPrice(price)}
          </p>
        )}
      </header>

      <div className="flex gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {prompt && <Subheading>{prompt}</Subheading>}

          {options && (
            <ul className="-mt-3 flex flex-wrap gap-2">
              {options.map((option) => (
                <li key={option} className="rounded-pill border border-ink/15 bg-paper-50 px-4 py-2 font-medium">
                  {option}
                </li>
              ))}
            </ul>
          )}

          {items && (
            <ul className="-mt-3 divide-y divide-ink/10">
              {items.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="font-bold">{item.name}</p>
                    {item.description && <p className="mt-0.5 text-sm text-ink-muted">{item.description}</p>}
                  </div>
                  <p className="shrink-0 font-extrabold tabular-nums">{formatPrice(item.price)}</p>
                </li>
              ))}
            </ul>
          )}

          {sizes && (
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))] gap-2">
              {sizes.map((s) => (
                <li key={s.name} className="rounded-2xl bg-paper-50 px-2 py-3 text-center">
                  <p className="text-sm text-ink-muted">{s.name}</p>
                  <p className="text-lg font-extrabold tabular-nums">{formatPrice(s.price)}</p>
                </li>
              ))}
            </ul>
          )}

          {addOns && (
            <div className="flex flex-col gap-3">
              <Subheading>Add-ons</Subheading>
              <ul className="flex flex-wrap gap-2">
                {addOns.map((addOn) => (
                  <li key={addOn.name} className="rounded-pill bg-paper-50 px-4 py-2 text-sm font-medium">
                    {addOn.name} <span className="font-bold">+{formatPrice(addOn.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {art && (
          <div className="hidden w-28 shrink-0 self-center transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:-rotate-3 motion-reduce:transition-none sm:block md:w-24 xl:w-32">
            <MenuArt art={art} title={title} />
          </div>
        )}
      </div>
    </BentoCard>
  )
}
