import { useId } from 'react'

const GLASS = 'M50 30H150L139 205Q138 215 128 215H72Q62 215 61 205Z'
const BOTTOM = 215
const ICE = [
  { x: 68, y: 70, w: 28, h: 26, r: -12 },
  { x: 100, y: 84, w: 30, h: 28, r: 10 },
  { x: 80, y: 112, w: 26, h: 24, r: 4 },
]
// Tapioca pearls resting at the bottom of the glass
const PEARLS = [
  [72, 206], [86, 208], [100, 207], [114, 208], [128, 206],
  [78, 194], [93, 195], [107, 194], [121, 195], [86, 182], [114, 183],
]

/**
 * Side view of a drink in a tall glass.
 * @param {{ layers: {color: string, size: number}[], ice?: boolean, pearls?: boolean,
 *           topping?: 'foam'|'none', garnish?: 'orange'|'none', label: string }} props
 */
export default function DrinkGlass({
  layers,
  ice = false,
  pearls = false,
  topping = 'none',
  garnish = 'none',
  label,
  className,
}) {
  const clipId = useId()
  const liquidTop = topping === 'foam' ? 66 : 56
  const liquidHeight = BOTTOM - liquidTop
  const total = layers.reduce((sum, layer) => sum + layer.size, 0)

  let cursor = BOTTOM
  const bands = layers.map((layer) => {
    const height = (layer.size / total) * liquidHeight
    cursor -= height
    return { ...layer, y: cursor, height }
  })

  return (
    <svg viewBox="0 0 200 240" role="img" aria-label={label} className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d={GLASS} />
        </clipPath>
      </defs>

      <ellipse cx="100" cy="224" rx="54" ry="7" fill="#0a0a0a" opacity="0.12" />
      <path d={GLASS} fill="#fff" opacity="0.35" />

      <g clipPath={`url(#${clipId})`}>
        {bands.map((band) => (
          <rect key={band.color} x="40" y={band.y} width="120" height={band.height + 1} fill={band.color} />
        ))}
        {topping === 'foam' && (
          <path d="M40 66V46Q60 40 80 46T120 46T160 46V66Z" fill="#f2f2f2" />
        )}
        {ice &&
          ICE.map((cube) => (
            <rect
              key={`${cube.x}-${cube.y}`}
              x={cube.x}
              y={cube.y}
              width={cube.w}
              height={cube.h}
              rx="6"
              fill="#fff"
              fillOpacity="0.35"
              stroke="#fff"
              strokeOpacity="0.7"
              strokeWidth="2"
              transform={`rotate(${cube.r} ${cube.x + cube.w / 2} ${cube.y + cube.h / 2})`}
            />
          ))}
        {pearls &&
          PEARLS.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" fill="#3b2416" />)}
      </g>

      <rect x="118" y="4" width="10" height="150" rx="5" fill="#1a1a1a" transform="rotate(12 123 79)" />
      <path d={GLASS} fill="none" stroke="#0a0a0a" strokeOpacity="0.18" strokeWidth="3" strokeLinejoin="round" />
      <path d="M62 46L70 192" stroke="#fff" strokeOpacity="0.6" strokeWidth="5" strokeLinecap="round" />

      {garnish === 'orange' && (
        <g transform="translate(56 34)">
          <circle r="19" fill="#9a9a9a" />
          <circle r="15" fill="#c4c4c4" />
          <g stroke="#eeeeee" strokeWidth="2">
            {[0, 45, 90, 135].map((angle) => (
              <line key={angle} x1="-14" x2="14" transform={`rotate(${angle})`} />
            ))}
          </g>
        </g>
      )}
    </svg>
  )
}
