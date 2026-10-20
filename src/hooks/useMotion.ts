import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { RefObject } from 'react'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', notify)
      return () => m.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Becomes true when the element scrolls into view (once by default). */
export function useInView<T extends Element>(opts: { once?: boolean; threshold?: number } = {}) {
  const { once = true, threshold = 0.18 } = opts
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, threshold])

  return [ref, inView] as const
}

/**
 * Writes `--py` (pixels scrolled past the element's top) onto the element,
 * so children can translate by `calc(var(--py) * speed)`. rAF-throttled, passive.
 */
export function useScrollParallax(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    let raf = 0
    const update = () => {
      raf = 0
      const top = el.getBoundingClientRect().top
      el.style.setProperty('--py', String(Math.min(Math.max(-top, 0), window.innerHeight * 1.2)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, enabled])
}
