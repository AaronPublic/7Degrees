import { useInView } from '../../hooks/useInView.js'

/**
 * Fades and lifts its content in the first time it scrolls into view.
 * The motion lives in index.css ([data-reveal]) and is skipped for reduced motion.
 * @param {{ as?: string, delay?: number }} props  delay in ms, for staggering siblings
 */
export default function Reveal({ as: Tag = 'div', delay = 0, style, children, ...props }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      data-reveal={inView ? 'shown' : 'hidden'}
      style={delay ? { '--reveal-delay': `${delay}ms`, ...style } : style}
      {...props}
    >
      {children}
    </Tag>
  )
}
