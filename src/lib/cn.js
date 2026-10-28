import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge about our custom tokens so e.g. `text-display`
// is treated as a font size (not a color) and doesn't evict `text-ink`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display'],
      radius: ['bento', 'bento-sm', 'pill'],
      shadow: ['soft'],
    },
  },
})

export const cn = (...inputs) => twMerge(clsx(inputs))
