import { useId } from 'react'
import { cn } from '../../lib/cn.js'

// Geometry in viewBox units. The cup stands in the middle as a stack of slices;
// leader lines alternate left and right to HTML labels, so text stays readable.
const WIDTH = 480
const CX = 240
const W_TOP = 140
const W_BOTTOM = 104
const GAP = 28 // space between slices when fully exploded
const PAD = 34
const LEFT_X = 118
const RIGHT_X = 362
const DEPTH = 0.14 // ellipse height as a share of width, for the 3D look

// Slice shapes. `h` is the slice height when the cup is assembled.
const SHAPES = {
  lid: { h: 16, kind: 'glass' },
  topping: { h: 14, kind: 'drizzle' },
  espresso: { h: 40 },
  tea: { h: 70 },
  ice: { h: 42, kind: 'ice' },
  base: { h: 78 },
  milk: { h: 46 },
  sweetener: { h: 26 },
  pearls: { h: 32, kind: 'pearls' },
  cup: { h: 12, kind: 'glass' },
}

const FIXED_FILL = { glass: '#ffffff', ice: '#dff1fa', pearls: '#3d2416' }
const FILL_OPACITY = { glass: 0.16, ice: 0.75 }

function layout(slotIds) {
  const slots = slotIds.map((id) => ({ id, ...SHAPES[id] }))
  const total = slots.reduce((sum, slot) => sum + slot.h, 0)
  const widthAt = (depth) => W_TOP - (W_TOP - W_BOTTOM) * (depth / total)

  let depth = 0
  const items = slots.map((slot, i) => {
    const top = depth
    depth += slot.h
    const lid = slot.id === 'lid'
    return {
      ...slot,
      y: PAD + top + i * GAP,
      wTop: lid ? W_TOP + 8 : widthAt(top),
      wBottom: lid ? W_TOP + 8 : widthAt(top + slot.h),
      // How far this slice moves down to close the gaps and assemble the cup
      drop: (slots.length - 1 - i) * GAP,
    }
  })

  const last = items.at(-1)
  return { items, height: PAD * 2 + total + (slots.length - 1) * GAP, floorY: last.y + last.h }
}

/** Front face of a slice: sides plus the front halves of its top and bottom ellipses. */
function slicePath({ y, h, wTop, wBottom }) {
  const [l1, r1, l2, r2] = [CX - wTop / 2, CX + wTop / 2, CX - wBottom / 2, CX + wBottom / 2]
  return (
    `M${l1} ${y}L${l2} ${y + h}` +
    `A${wBottom / 2} ${wBottom * DEPTH} 0 0 0 ${r2} ${y + h}` +
    `L${r1} ${y}A${wTop / 2} ${wTop * DEPTH} 0 0 1 ${l1} ${y}Z`
  )
}

function Texture({ kind, y, wTop }) {
  const ry = wTop * DEPTH

  if (kind === 'ice') {
    return [
      [-44, -6],
      [-14, -10],
      [16, -4],
      [-28, 3],
      [30, 3],
    ].map(([dx, dy]) => (
      <rect
        key={`${dx}${dy}`}
        x={CX + dx}
        y={y + dy - 6}
        width="20"
        height="14"
        rx="4"
        fill="#ffffff"
        fillOpacity="0.9"
        stroke="#a9cfe2"
        strokeWidth="1.5"
      />
    ))
  }

  if (kind === 'pearls') {
    return [-40, -20, 0, 20, 40, -30, -10, 10, 30].map((dx, i) => (
      <g key={dx}>
        <circle cx={CX + dx} cy={y + (i < 5 ? -ry * 0.25 : ry * 0.45)} r="6" fill="#1f120a" />
        <circle cx={CX + dx - 2} cy={y + (i < 5 ? -ry * 0.25 : ry * 0.45) - 2} r="1.8" fill="#ffffff" fillOpacity="0.5" />
      </g>
    ))
  }

  if (kind === 'drizzle') {
    const points = Array.from({ length: 9 }, (_, i) => {
      const x = CX - wTop * 0.36 + (i * wTop * 0.72) / 8
      return `${x},${y + (i % 2 ? ry * 0.45 : -ry * 0.45)}`
    }).join(' ')
    return <polyline points={points} fill="none" stroke="#7a4410" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  }

  return null
}

/**
 * Exploded 3D view of a drink: each ingredient is a floating, lit slice of the cup.
 * `spread` (0–1) opens the gaps between slices; `showLabels` adds the callouts.
 * Drawn for a dark background.
 * @param {{ slots: string[], layers: Record<string, {label: string, note?: string, color?: string}>,
 *           spread?: number, showLabels?: boolean, className?: string }} props
 */
export default function ExplodedCup({ slots, layers, spread = 1, showLabels = true, className }) {
  const uid = useId()
  const { items, height, floorY } = layout(slots)
  const labelled = items.filter((item) => layers[item.id])
  const side = (item) => (labelled.indexOf(item) % 2 ? 'left' : 'right')

  return (
    <div className={cn('@container relative', className)} style={{ aspectRatio: `${WIDTH} / ${height}` }}>
      <svg viewBox={`0 0 ${WIDTH} ${height}`} aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
        <defs>
          {/* cylinder shading: dark edges, a bright specular band left of center */}
          <linearGradient id={`${uid}shade`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#000" stopOpacity="0.55" />
            <stop offset="0.16" stopColor="#000" stopOpacity="0.12" />
            <stop offset="0.34" stopColor="#fff" stopOpacity="0.32" />
            <stop offset="0.42" stopColor="#fff" stopOpacity="0.06" />
            <stop offset="0.78" stopColor="#000" stopOpacity="0.2" />
            <stop offset="1" stopColor="#000" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id={`${uid}top`} cx="0.42" cy="0.35" r="0.75">
            <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}floor`}>
            <stop offset="0" stopColor="#000" stopOpacity="0.55" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx={CX} cy={floorY + 14} rx={W_BOTTOM * 0.95} ry="14" fill={`url(#${uid}floor)`} />

        {items.map((item, i) => {
          const layer = layers[item.id]
          const fill = FIXED_FILL[item.kind] ?? layer?.color ?? '#ffffff'
          const ry = item.wTop * DEPTH
          const mid = item.y + item.h / 2
          const left = side(item) === 'left'
          const edge = CX + ((left ? -1 : 1) * Math.max(item.wTop, item.wBottom)) / 2

          return (
            <g
              key={item.id}
              className="transition-transform duration-700 ease-out-soft motion-reduce:transition-none"
              style={{ transform: `translateY(${item.drop * (1 - spread)}px)` }}
            >
              <g className="motion-safe:animate-float" style={{ animationDelay: `${i * -0.45}s` }}>
                {layer ? (
                  <>
                    <path
                      d={slicePath(item)}
                      fill={fill}
                      fillOpacity={FILL_OPACITY[item.kind] ?? 1}
                    />
                    <path d={slicePath(item)} fill={`url(#${uid}shade)`} />
                    <ellipse cx={CX} cy={item.y} rx={item.wTop / 2} ry={ry} fill={fill} fillOpacity={FILL_OPACITY[item.kind] ?? 1} />
                    <ellipse cx={CX} cy={item.y} rx={item.wTop / 2} ry={ry} fill={`url(#${uid}top)`} />
                    <ellipse
                      cx={CX}
                      cy={item.y}
                      rx={item.wTop / 2}
                      ry={ry}
                      fill="none"
                      stroke="#fff"
                      strokeOpacity={item.kind === 'glass' ? 0.6 : 0.25}
                      strokeWidth="1.5"
                    />
                    {item.kind === 'glass' && (
                      <path d={slicePath(item)} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />
                    )}
                    <Texture kind={item.kind} y={item.y} wTop={item.wTop} />
                  </>
                ) : (
                  // A slot this flavor skips: a faint dashed outline keeps the cup's shape
                  <g fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="5 5">
                    <path d={slicePath(item)} />
                    <ellipse cx={CX} cy={item.y} rx={item.wTop / 2} ry={ry} />
                  </g>
                )}

                {layer && (
                  <g className="transition-opacity duration-500" opacity={showLabels ? 1 : 0}>
                    <line
                      x1={edge + (left ? -6 : 6)}
                      y1={mid}
                      x2={left ? LEFT_X : RIGHT_X}
                      y2={mid}
                      stroke="#fff"
                      strokeOpacity="0.35"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                    />
                    <circle cx={left ? LEFT_X : RIGHT_X} cy={mid} r="3.5" fill="#d9a86c" />
                  </g>
                )}
              </g>
            </g>
          )
        })}
      </svg>

      {showLabels && (
        <ul aria-label="Ingredients, top to bottom">
          {labelled.map((item) => {
            const { label, note } = layers[item.id]
            const left = side(item) === 'left'
            const top = `${((item.y + item.h / 2) / height) * 100}%`
            return (
              <li
                key={item.id}
                className={cn('absolute -translate-y-1/2 leading-tight', left ? 'left-0 text-right' : 'right-0 text-left')}
                style={
                  left
                    ? { top, right: `${((WIDTH - LEFT_X + 10) / WIDTH) * 100}%` }
                    : { top, left: `${((RIGHT_X + 10) / WIDTH) * 100}%` }
                }
              >
                <span className="block text-[11px] font-bold text-white @sm:text-xs @md:text-sm">{label}</span>
                {note && <span className="hidden text-xs text-white/60 @sm:block">{note}</span>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
