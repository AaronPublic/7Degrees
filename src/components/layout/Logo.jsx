import { cn } from '../../lib/cn.js'

export default function Logo({ className }) {
  return (
    <a href="#main" aria-label="7 Degrees home" className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="grid size-10 place-items-center rounded-full bg-accent-500 text-lg font-extrabold text-white">
        7°
      </span>
      <span className="text-xl font-extrabold tracking-tight">7 Degrees</span>
    </a>
  )
}
