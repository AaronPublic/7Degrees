const STRIPES = [0, 1, 2, 3, 4, 5]
const CUPS = [92, 132, 228]

function Cup({ cx }) {
  return (
    <g>
      <path d={`M${cx - 12} 142H${cx + 12}L${cx + 9} 172H${cx - 9}Z`} fill="#ffffff" stroke="#0a0a0a" strokeOpacity="0.25" strokeWidth="2" />
      <rect x={cx - 14} y="135" width="28" height="9" rx="3" fill="#111111" />
      <rect x={cx - 11} y="152" width="22" height="9" fill="#a8714a" />
    </g>
  )
}

/** Striped-awning coffee cart with cups on the counter. */
export default function CoffeeCart({ className }) {
  return (
    <svg viewBox="0 0 320 320" role="img" aria-label="7 Degrees coffee cart" className={className}>
      <ellipse cx="160" cy="302" rx="132" ry="12" fill="#0a0a0a" opacity="0.14" />

      {/* poles */}
      <rect x="50" y="80" width="8" height="100" fill="#111111" />
      <rect x="262" y="80" width="8" height="100" fill="#111111" />

      {/* striped, scalloped awning */}
      {STRIPES.map((i) => {
        const fill = i % 2 ? '#f6eedf' : '#111111'
        const x = 40 + i * 40
        return (
          <g key={i}>
            <rect x={x} y="44" width="40" height="38" fill={fill} />
            <path d={`M${x} 82A20 20 0 0 0 ${x + 40} 82Z`} fill={fill} />
          </g>
        )
      })}
      <rect x="40" y="44" width="240" height="40" fill="none" stroke="#0a0a0a" strokeOpacity="0.2" strokeWidth="2" />
      <rect x="32" y="34" width="256" height="12" rx="6" fill="#111111" />

      {CUPS.map((cx) => (
        <Cup key={cx} cx={cx} />
      ))}

      {/* counter + body */}
      <rect x="26" y="172" width="268" height="16" rx="6" fill="#8b5e3c" />
      <rect x="36" y="186" width="248" height="86" rx="12" fill="#1f1f1f" />
      <rect x="104" y="202" width="112" height="52" rx="12" fill="#ffffff" />
      <text x="160" y="226" textAnchor="middle" fontSize="18" fontWeight="800" fill="#0a0a0a">
        7°
      </text>
      <text x="160" y="244" textAnchor="middle" fontSize="10" fontWeight="800" letterSpacing="2" fill="#0a0a0a">
        COFFEE CART
      </text>

      {/* wheels */}
      {[88, 232].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="280" r="22" fill="#111111" />
          <circle cx={cx} cy="280" r="8" fill="#dcdcdc" />
        </g>
      ))}
    </svg>
  )
}
