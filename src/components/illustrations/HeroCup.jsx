import { useId } from 'react'
import Bean from './Bean.jsx'

const steam = [
  { d: 'M170 150C150 120 190 100 170 70C155 50 180 35 172 20', delay: '0s' },
  { d: 'M210 145C190 110 232 92 210 58C195 35 222 22 212 6', delay: '0.9s' },
  { d: 'M250 150C232 120 270 102 250 72C236 52 260 38 252 24', delay: '1.8s' },
]

/** Black latte cup on a saucer, sized to overflow its blob in the hero. */
export default function HeroCup({ className }) {
  const gradId = useId()

  return (
    <svg viewBox="0 0 420 460" role="img" aria-label="A latte with heart art in a black cup" className={className}>
      <defs>
        <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="0.55" stopColor="#1f1f1f" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>

      <ellipse cx="210" cy="428" rx="175" ry="16" fill="#0a0a0a" opacity="0.12" />

      {/* saucer */}
      <ellipse cx="210" cy="402" rx="178" ry="34" fill="#dcdcdc" />
      <ellipse cx="210" cy="392" rx="178" ry="30" fill="#ffffff" />
      <ellipse cx="210" cy="390" rx="100" ry="15" fill="#ececec" />

      {/* handle, then body over its ends */}
      <path d="M318 215C392 205 398 318 312 322" stroke="#1a1a1a" strokeWidth="26" fill="none" strokeLinecap="round" />
      <path d="M80 190C80 300 118 382 175 388H245C302 382 340 300 340 190Z" fill={`url(#${gradId})`} />
      <path d="M108 222C110 290 130 340 160 362" stroke="#fff" strokeOpacity="0.28" strokeWidth="10" fill="none" strokeLinecap="round" />
      <text x="210" y="304" textAnchor="middle" fontSize="44" fontWeight="800" fill="#ffffff" opacity="0.9">
        7°
      </text>

      {/* rim + latte */}
      <ellipse cx="210" cy="190" rx="130" ry="30" fill="#444444" />
      <ellipse cx="210" cy="192" rx="118" ry="25" fill="#f6eedf" />
      <ellipse cx="210" cy="196" rx="108" ry="21" fill="#a8714a" />
      <ellipse cx="210" cy="196" rx="108" ry="21" fill="none" stroke="#c99368" strokeWidth="4" />
      <g transform="translate(210 196) scale(1 0.32)">
        <path d="M0 52C-42 26 -50 -12 -26 -24C-12 -31 -2 -22 0 -12C2 -22 12 -31 26 -24C50 -12 42 26 0 52Z" fill="#f6e7d2" />
      </g>

      {steam.map((s) => (
        <path
          key={s.d}
          d={s.d}
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          className="motion-safe:animate-steam"
          style={{ animationDelay: s.delay }}
        />
      ))}

      <Bean x={96} y={400} rotate={-20} />
      <Bean x={318} y={406} rotate={25} />
      <Bean x={350} y={386} rotate={-40} scale={0.85} />
    </svg>
  )
}
