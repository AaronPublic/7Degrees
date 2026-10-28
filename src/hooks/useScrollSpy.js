import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in the middle band of the viewport,
 * or null when none of them is (e.g. at the top of the page).
 * @param {string[]} ids
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(null)
  const key = ids.join(',')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const visible = new Set()
    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // Several can overlap the band at a boundary; pick the one lowest on the page
        const current = sections.filter((section) => visible.has(section.id)).at(-1)
        setActive(current?.id ?? null)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [key])

  return active
}
