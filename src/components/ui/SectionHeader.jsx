import { cn } from '../../lib/cn.js'

/**
 * @param {{ id?: string, eyebrow?: string, title: string, description?: string,
 *           align?: 'left'|'center', action?: React.ReactNode }} props
 */
export default function SectionHeader({ id, eyebrow, title, description, align = 'left', action, className }) {
  const centered = align === 'center'

  return (
    <div className={cn('flex flex-col gap-3', centered && 'items-center text-center', className)}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-widest text-ink-muted uppercase">{eyebrow}</p>
      )}
      <h2 id={id} className="text-3xl font-extrabold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={cn('max-w-prose text-ink-muted', centered && 'mx-auto')}>{description}</p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
