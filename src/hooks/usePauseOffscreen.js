import { useEffect } from 'react'

/**
 * Marks page sections that are off screen with [data-offscreen]; index.css pauses
 * every animation inside them. Keeps phones from spending CPU/GPU (and battery)
 * on steam, floating cups and blobs nobody can see.
 */
export function usePauseOffscreen(selector = 'main > section, footer') {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const sections = document.querySelectorAll(selector)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute('data-offscreen', !entry.isIntersecting)
        }
      },
      // A little margin so animations are already running as a section scrolls in
      { rootMargin: '200px 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [selector])
}
