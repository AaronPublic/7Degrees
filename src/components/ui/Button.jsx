import { cn } from '../../lib/cn.js'

const variants = {
  primary: 'bg-accent-500 text-white shadow-soft hover:bg-accent-600',
  outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-paper-50',
  ghost: 'text-ink hover:bg-ink/5',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-7 py-3.5 text-base sm:text-lg',
}

/**
 * Pill button. Renders an <a> when `href` is given, otherwise a <button>.
 * @param {{ href?: string, variant?: 'primary'|'outline'|'ghost', size?: 'sm'|'md'|'lg' }} props
 */
export default function Button({ href, variant = 'primary', size = 'md', className, children, ...props }) {
  const classes = cn(
    // Labels may wrap on the narrowest phones instead of overflowing; press feedback scales slightly
    'inline-flex min-h-11 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-pill text-center font-semibold transition-[color,background-color,border-color,scale] duration-200 motion-safe:active:scale-[0.97] sm:whitespace-nowrap',
    variants[variant],
    sizes[size],
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
