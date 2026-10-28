/** A single roasted coffee bean, placed with SVG coordinates. */
export default function Bean({ x, y, rotate = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <ellipse rx="14" ry="9" fill="#5c3a26" />
      <path d="M-11 0C-4 -4 4 4 11 0" stroke="#3e2618" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  )
}
