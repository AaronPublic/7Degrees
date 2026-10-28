import { cn } from '../../lib/cn.js'

// Apricot coat, a few shades deeper than the cream page so Mocha stands out
const FUR = '#ecc996'
const SHADE = '#d4a66a'
const INK = '#2a1a12'

/** Fluffy fur: each puff is drawn twice, a shade layer nudged down, then the fur on top. */
function Puffs({ puffs }) {
  return (
    <>
      {puffs.map(([cx, cy, r]) => (
        <circle key={`s${cx},${cy}`} cx={cx} cy={cy + 2} r={r} fill={SHADE} />
      ))}
      {puffs.map(([cx, cy, r]) => (
        <circle key={`f${cx},${cy}`} cx={cx} cy={cy} r={r} fill={FUR} />
      ))}
    </>
  )
}

const BODY = [
  [60, 100, 22],
  [42, 96, 11],
  [78, 96, 11],
  [46, 112, 11],
  [74, 112, 11],
  [60, 116, 12],
  [50, 86, 10],
  [70, 86, 10],
]
const EAR_LEFT = [
  [40, 58, 8],
  [38, 68, 9],
  [40, 78, 8],
]
const EAR_RIGHT = EAR_LEFT.map(([x, y, r]) => [120 - x, y, r])
const TOPKNOT = [
  [60, 30, 7],
  [50, 42, 8],
  [70, 42, 8],
  [60, 38, 11],
]
const TAIL_POM = [
  [93, 84, 5],
  [102, 82, 5],
  [98, 86, 8],
]

/**
 * Mocha, the 7 Degrees poodle barista. Animated by the .mascot-* classes in
 * index.css (idle breathing, tail wag, ear swing, blink); `happy` tilts the
 * head and speeds up the wag.
 */
export default function Poodle({ happy = false, className }) {
  return (
    <svg viewBox="0 0 120 140" aria-hidden="true" className={cn(happy && 'mascot-happy', className)}>
      <ellipse cx="60" cy="133" rx="38" ry="5" fill={INK} opacity="0.14" />

      {/* takeaway cup beside the paws */}
      <path d="M12 106C9 101 15 98 12 93" stroke="#a8896c" strokeWidth="2" strokeLinecap="round" fill="none" className="motion-safe:animate-steam" />
      <path d="M6 114H18L16 131H8Z" fill="#fffdf9" stroke={INK} strokeOpacity="0.2" />
      <rect x="5" y="110" width="14" height="5" rx="2" fill="#6f4327" />
      <rect x="7" y="119" width="10" height="5" fill="#a8714a" />

      <g className="mascot-breathe">
        <g className="mascot-tail">
          <path d="M80 106C88 104 94 98 96 90" stroke={FUR} strokeWidth="5" strokeLinecap="round" fill="none" />
          <Puffs puffs={TAIL_POM} />
        </g>

        {/* back paws, body, then front legs over it */}
        <Puffs puffs={[[36, 124, 7], [84, 124, 7]]} />
        <Puffs puffs={BODY} />
        <rect x="46" y="106" width="10" height="20" rx="5" fill={FUR} />
        <rect x="64" y="106" width="10" height="20" rx="5" fill={FUR} />
        <Puffs puffs={[[51, 126, 7], [69, 126, 7]]} />

        {/* barista bandana */}
        <path d="M44 78H76L60 96Z" fill="#6f4327" />
        <rect x="43" y="75" width="34" height="5" rx="2.5" fill="#573219" />

        <g className="mascot-head">
          <g className="mascot-ear-l">
            <Puffs puffs={EAR_LEFT} />
          </g>
          <g className="mascot-ear-r">
            <Puffs puffs={EAR_RIGHT} />
          </g>
          <circle cx="60" cy="58" r="17" fill={FUR} />
          <Puffs puffs={TOPKNOT} />

          <circle cx="47" cy="62" r="3" fill="#f0a8a0" opacity="0.5" />
          <circle cx="73" cy="62" r="3" fill="#f0a8a0" opacity="0.5" />
          <ellipse cx="60" cy="66" rx="9" ry="7" fill="#f7e2c2" />
          <ellipse cx="60" cy="70.5" rx="2.2" ry="1.8" fill="#e88b8b" />
          <path d="M56 67Q60 71 64 67" stroke={INK} strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <ellipse cx="60" cy="62.5" rx="3.6" ry="2.6" fill={INK} />

          <g className="mascot-blink">
            <circle cx="52" cy="55" r="2.6" fill={INK} />
            <circle cx="68" cy="55" r="2.6" fill={INK} />
            <circle cx="52.8" cy="54.2" r="0.8" fill="#fff" />
            <circle cx="68.8" cy="54.2" r="0.8" fill="#fff" />
          </g>
        </g>
      </g>
    </svg>
  )
}
