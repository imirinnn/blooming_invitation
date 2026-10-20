import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Scroll timeline for the temple scene.
 *
 * `p` runs 0 → 1 across the hero + journey scroll distance. Each layer has a
 * [start, end] window inside that range; its eased progress is written to the
 * CSS custom property  --l-<name>  (0 = hidden, 1 = fully built). CSS then turns
 * those numbers into opacity / transform. Reorder or retime layers here.
 */
type Ease = 'out' | 'io'

export const TIMELINE: Record<string, [number, number, Ease]> = {
  cam: [0.04, 0.68, 'io'], // camera tilts down from the sky to the temple
  hills: [0.07, 0.22, 'out'],
  trees: [0.14, 0.3, 'out'],
  wing: [0.2, 0.4, 'out'],
  t0: [0.18, 0.28, 'out'], // gopuram tiers rise one by one, bottom → top
  t1: [0.23, 0.33, 'out'],
  t2: [0.28, 0.38, 'out'],
  t3: [0.33, 0.43, 'out'],
  t4: [0.38, 0.48, 'out'],
  t5: [0.43, 0.53, 'out'],
  t6: [0.48, 0.58, 'out'],
  crown: [0.53, 0.66, 'out'],
  floor: [0.4, 0.6, 'out'],
  pond: [0.52, 0.68, 'out'],
  pillars: [0.56, 0.76, 'out'],
  vines: [0.64, 0.84, 'out'],
  garland: [0.72, 0.9, 'out'],
  pad1: [0.72, 0.82, 'out'], // flower rangoli blooms ring by ring
  pad2: [0.78, 0.88, 'out'],
  pad3: [0.84, 0.93, 'out'],
  pad4: [0.88, 0.97, 'out'],
  roses: [0.78, 0.96, 'out'],
  fx: [0.85, 1, 'out'],
}

const EASE: Record<Ease, (t: number) => number> = {
  out: (t) => 1 - Math.pow(1 - t, 3),
  io: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
}
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const varName = (k: string) => (k === 'cam' ? '--cam' : `--l-${k}`)

/**
 * Reads the page scroll, smooths it (so even a notchy mouse wheel feels fluid)
 * and writes the layer variables onto the scene element.
 * With reduced motion the finished scene is shown and nothing is scroll-driven.
 */
export function useSceneScroll(ref: RefObject<HTMLElement | null>, reduced: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const last: Record<string, string> = {}
    const set = (k: string, v: number) => {
      const s = v.toFixed(4)
      if (last[k] !== s) {
        last[k] = s
        el.style.setProperty(k, s)
      }
    }

    if (reduced) {
      Object.keys(TIMELINE).forEach((k) => set(varName(k), 1))
      set('--sy', 0)
      set('--gold', 0)
      set('--veil', 0.18)
      return
    }

    let range = 1
    let docMax = 1
    let target = window.scrollY
    let cur = target
    let raf = 0

    const measure = () => {
      const hero = document.getElementById('hero')
      const track = document.getElementById('journey')
      const vh = window.innerHeight
      range = Math.max(1, (hero?.offsetHeight ?? vh) + (track?.offsetHeight ?? 2.8 * vh) - vh)
      docMax = Math.max(1, document.documentElement.scrollHeight - vh)
    }
    const apply = (y: number) => {
      const p = clamp(y / range)
      for (const [k, [a, b, e]] of Object.entries(TIMELINE)) set(varName(k), EASE[e](clamp((p - a) / (b - a))))
      set('--sy', y)
      set('--gold', smooth(0.82, 1, clamp(y / docMax)))
      set('--veil', 0.3 * clamp((y - range) / (window.innerHeight * 1.2)))
    }
    const tick = () => {
      raf = 0
      cur += (target - cur) * 0.13
      if (Math.abs(target - cur) < 0.4) cur = target
      apply(cur)
      if (cur !== target) raf = requestAnimationFrame(tick)
    }
    const onScroll = () => {
      target = window.scrollY
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onResize = () => {
      measure()
      target = window.scrollY
      cur = target
      apply(cur)
    }

    measure()
    apply(cur)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // layout can settle a moment after mount (fonts, images)
    const settle = window.setTimeout(onResize, 400)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(settle)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, reduced])
}
