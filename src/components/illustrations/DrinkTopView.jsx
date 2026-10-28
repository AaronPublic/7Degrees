import { useId } from 'react'
import Bean from './Bean.jsx'

function LatteArt({ pattern, foam, liquid }) {
  // Same "7" shape as the hero cup's latte art, seen straight from above
  if (pattern === 'seven') {
    return (
      <path
        d="M-34 -40H34V-20L4 50H-14L14 -16H-34Z"
        transform="translate(100 98) scale(0.75)"
        fill={foam}
        stroke={foam}
        strokeWidth="8"
        strokeLinejoin="round"
      />
    )
  }

  if (pattern === 'heart') {
    return (
      <path
        d="M100 128C70 108 66 84 84 78C93 75 99 81 100 88C101 81 107 75 116 78C134 84 130 108 100 128Z"
        fill={foam}
      />
    )
  }

  if (pattern === 'rosetta') {
    return (
      <g fill={foam}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse key={i} cx="100" cy={128 - i * 10} rx={30 - i * 4} ry="6" />
        ))}
        <circle cx="100" cy="66" r="7" />
        <line x1="100" y1="62" x2="100" y2="140" stroke={liquid} strokeWidth="2.5" />
      </g>
    )
  }

  // swirl
  return (
    <path
      d="M70 100A30 30 0 1 1 100 130A20 20 0 1 1 80 110A10 10 0 1 1 90 120"
      stroke={foam}
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
  )
}

/** Top-down cup on a saucer, used inside circular product images. The surface swirls on .group hover. */
export default function DrinkTopView({ liquid, foam, pattern = 'heart', label, className }) {
  const gradId = useId()

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={label} className={className}>
      <defs>
        <radialGradient id={gradId} cx="0.4" cy="0.4" r="0.7">
          <stop offset="0" stopColor={liquid} stopOpacity="0.75" />
          <stop offset="1" stopColor={liquid} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="#ffffff" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#eadccb" strokeWidth="2" />
      <rect x="150" y="88" width="40" height="24" rx="12" fill="#efe3d3" />
      <circle cx="100" cy="100" r="62" fill="#f6efe6" />
      {/* coffee surface: swirls a quarter turn when the parent .group is hovered */}
      <g className="origin-center [transform-box:fill-box] motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-out motion-safe:group-hover:rotate-[-25deg]">
        <circle cx="100" cy="100" r="54" fill={`url(#${gradId})`} />
        <circle cx="100" cy="100" r="52" fill="none" stroke={foam} strokeOpacity="0.45" strokeWidth="4" />
        <LatteArt pattern={pattern} foam={foam} liquid={liquid} />
      </g>
      <Bean x={42} y={160} rotate={-30} scale={0.7} />
    </svg>
  )
}
