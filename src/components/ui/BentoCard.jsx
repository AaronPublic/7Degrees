import { cn } from '../../lib/cn.js'

const surfaces = {
  mist: 'bg-mist-300',
  paper: 'bg-paper-200',
  transparent: 'bg-transparent',
}

const paddings = {
  none: '',
  default: 'p-6 md:p-10 lg:p-14',
}

/**
 * The single source of bento radius, padding and surface color.
 * @param {{ as?: string, variant?: 'mist'|'paper'|'transparent', padding?: 'default'|'none' }} props
 */
export default function BentoCard({
  as: Tag = 'div',
  variant = 'mist',
  padding = 'default',
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        'relative isolate rounded-bento-sm md:rounded-bento',
        surfaces[variant],
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
