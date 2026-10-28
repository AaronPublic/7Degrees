import { useId } from 'react'

// Interior of the glass, used to clip the coffee
const INSIDE = 'M64 134H176L169 260Q167 272 155 272H85Q73 272 71 260Z'
const GLASS = 'M60 130H180L172 262Q170 276 156 276H84Q70 276 68 262Z'
const STEAM = [
  { d: 'M102 118C92 102 112 94 102 76', delay: '1.9s' },
  { d: 'M138 116C128 98 150 90 138 70', delay: '2.3s' },
]

/** A liquid surface: gentle waves (period 60) across a wide strip, filled down past the glass. */
const wave = (y, amp) => `M-120 ${y}q15 -${amp} 30 0${' t30 0'.repeat(15)}V440H-120Z`

/**
 * Coffee pouring from above into a glass cup until it is full. Played by the
 * .intro-* classes in index.css; the stream runs past the top of the viewBox,
 * so give the SVG room above it (overflow is visible).
 */
export default function PouringCup({ className }) {
  const clipId = useId()

  return (
    <svg viewBox="0 0 240 300" overflow="visible" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d={INSIDE} />
        </clipPath>
      </defs>

      <g className="intro-cup">
        <ellipse cx="120" cy="288" rx="78" ry="8" fill="#0a0a0a" opacity="0.1" />
        <path d="M178 160C216 160 216 232 172 234" stroke="#dcdcdc" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d={GLASS} fill="#ffffff" fillOpacity="0.7" />

        <line
          className="intro-stream"
          x1="120"
          y1="-1200"
          x2="120"
          y2="268"
          pathLength="1"
          stroke="#6b3f22"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <g clipPath={`url(#${clipId})`}>
          <g className="intro-level">
            <path className="intro-wave-back" d={wave(146, 5)} fill="#a8714a" />
            <path className="intro-wave" d={wave(150, 4)} fill="#6b3f22" />
          </g>
        </g>

        <text x="120" y="226" textAnchor="middle" fontSize="34" fontWeight="800" fill="#ffffff" opacity="0.9">
          7°
        </text>
        <path d={GLASS} fill="none" stroke="#0a0a0a" strokeOpacity="0.2" strokeWidth="3" strokeLinejoin="round" />
        <ellipse cx="120" cy="130" rx="60" ry="5" fill="none" stroke="#0a0a0a" strokeOpacity="0.15" strokeWidth="2" />
        <path d="M78 148L86 254" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="5" strokeLinecap="round" />

        {STEAM.map((s) => (
          <path
            key={s.d}
            className="intro-steam"
            d={s.d}
            stroke="#8a8a8a"
            strokeOpacity="0.6"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            style={{ animationDelay: s.delay }}
          />
        ))}
      </g>
    </svg>
  )
}
