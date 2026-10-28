import { cn } from '../../lib/cn.js'

export default function Logo({ className }) {
  return (
    <a href="#main" aria-label="7 Degrees home" className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src="/Images/logo-circle.png"
        alt=""
        width="44"
        height="44"
        className="size-11 shrink-0 rounded-full bg-white shadow-soft"
      />
      <span className="text-xl font-extrabold tracking-tight">7 Degrees</span>
    </a>
  )
}
