import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether the element is in view. With `once` (the default) it flips to
 * true the first time and stops watching; with `once: false` it follows the
 * element in and out, e.g. to pause work while it is off screen.
 * @returns {[import('react').RefObject<Element>, boolean]}
 */
export function useInView({ threshold = 0, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        } else {
          setInView(entry.isIntersecting)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
