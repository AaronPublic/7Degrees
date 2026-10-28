import { useId } from 'react'

const CARAFE =
  'M152 262H208V280C246 292 258 328 252 356Q247 382 222 382H138Q113 382 108 356C102 328 114 292 152 280Z'
const DRIPS = [0, 1, 2]
const STEAM = [
  { d: 'M166 152C156 134 176 124 166 106', delay: '5.6s' },
  { d: 'M196 154C186 134 208 124 196 102', delay: '6.6s' },
]

/**
 * Gooseneck kettle pouring over a cone dripper into a glass carafe.
 * Drawn mid-pour with a full carafe; the classes in index.css (.brew-*) animate
 * the whole brew once `playing` is true. Remount (new `key`) to brew again.
 */
export default function PourOverBrew({ playing, className }) {
  const clipId = useId()

  return (
    <svg
      viewBox="0 0 380 400"
      role="img"
      aria-label="Hot water pouring from a kettle over a coffee dripper, filling a glass carafe"
      data-brewing={playing ? '' : undefined}
      className={className}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={CARAFE} />
        </clipPath>
      </defs>

      <ellipse cx="180" cy="390" rx="104" ry="8" fill="#0a0a0a" opacity="0.12" />

      {/* carafe: glass, rising coffee, falling drips, then outline over them */}
      <path d={CARAFE} fill="#ffffff" fillOpacity="0.55" />
      <g clipPath={`url(#${clipId})`}>
        <rect className="brew-anim brew-fill" x="100" y="316" width="160" height="70" fill="#6b3f22" />
      </g>
      {DRIPS.map((i) => (
        <circle
          key={i}
          className="brew-anim brew-drip"
          cx="180"
          cy="285"
          r="3.5"
          fill="#6b3f22"
          style={{ animationDelay: `${1.6 + i * 0.27}s` }}
        />
      ))}
      <path d={CARAFE} fill="none" stroke="#0a0a0a" strokeOpacity="0.2" strokeWidth="3" strokeLinejoin="round" />
      <path d="M122 312C115 330 115 350 124 366" stroke="#fff" strokeOpacity="0.7" strokeWidth="5" strokeLinecap="round" fill="none" />
      <rect x="146" y="264" width="68" height="14" rx="5" fill="#8b5e3c" />

      {/* dripper: base, cone, filter paper, grounds that bloom when wet */}
      <rect x="146" y="246" width="68" height="16" rx="4" fill="#1a1a1a" />
      <path d="M100 168H260L208 246H152Z" fill="#fffdf9" stroke="#0a0a0a" strokeOpacity="0.18" strokeWidth="3" strokeLinejoin="round" />
      <path d="M112 170H248L204 236H156Z" fill="#f6eedf" />
      <path d="M121 184H239L218 214H142Z" fill="#5c3a26" />
      <ellipse className="brew-anim brew-bloom" cx="180" cy="184" rx="59" ry="7" fill="#7a4a2a" />
      <rect x="94" y="162" width="172" height="10" rx="5" fill="#f6efe6" stroke="#0a0a0a" strokeOpacity="0.15" strokeWidth="2" />

      {STEAM.map((s) => (
        <path
          key={s.d}
          className="brew-anim brew-steam"
          d={s.d}
          stroke="#8a8a8a"
          strokeOpacity="0.6"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0"
          style={{ animationDelay: s.delay }}
        />
      ))}

      {/* water stream, drawn under the spout tip */}
      <g className="brew-anim brew-stream">
        <line x1="185" y1="110" x2="185" y2="186" stroke="#cfe3ee" strokeWidth="5" strokeLinecap="round" />
        <line className="brew-flow" x1="185" y1="110" x2="185" y2="186" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* kettle, posed mid-pour; .brew-kettle tips it in and back out */}
      <g className="brew-anim brew-kettle">
        <g transform="rotate(-20 290 100)">
          <path d="M330 74C364 74 364 124 336 128" stroke="#111111" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M246 122C222 124 216 98 208 84C203 75 196 72 188 75" stroke="#1f1f1f" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M252 62H328L338 128Q338 140 326 140H254Q242 140 242 128Z" fill="#1f1f1f" />
          <path d="M258 76L252 126" stroke="#fff" strokeOpacity="0.2" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="290" cy="62" rx="38" ry="6" fill="#3a3a3a" />
          <rect x="284" y="48" width="12" height="12" rx="4" fill="#111111" />
        </g>
      </g>
    </svg>
  )
}
