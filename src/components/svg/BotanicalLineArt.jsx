// Leaf pairs along a gently curved stem: [leaf outline, midrib]
const leaves = [
  ['M99 196C72 192 56 174 50 156C72 158 92 172 99 196Z', 'M99 196C82 182 66 168 50 156'],
  ['M100 166C126 160 142 142 148 124C126 126 106 142 100 166Z', 'M100 166C116 152 132 136 148 124'],
  ['M99 132C74 126 60 108 56 90C78 94 96 108 99 132Z', 'M99 132C84 118 70 104 56 90'],
  ['M100 102C124 96 138 80 142 62C122 66 104 80 100 102Z', 'M100 102C114 88 128 74 142 62'],
  ['M98 72C80 64 72 48 72 32C90 40 100 54 98 72Z', 'M98 72C88 58 80 46 72 32'],
]

export default function BotanicalLineArt({ className }) {
  return (
    <svg
      viewBox="0 0 200 240"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M100 236C98 186 104 128 97 70C94 50 98 34 104 18" />
      {leaves.map(([outline, rib]) => (
        <g key={outline}>
          <path d={outline} />
          <path d={rib} strokeWidth="1" />
        </g>
      ))}
      <circle cx="106" cy="14" r="4" />
    </svg>
  )
}
