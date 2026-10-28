export default function FeatureItem({ icon: Icon, title, body, tint }) {
  return (
    <li className="flex gap-4 sm:flex-col">
      <span
        className="grid size-14 shrink-0 place-items-center rounded-full"
        style={{ color: tint.fg, backgroundColor: tint.bg }}
      >
        <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-1 text-ink-muted">{body}</p>
      </div>
    </li>
  )
}
