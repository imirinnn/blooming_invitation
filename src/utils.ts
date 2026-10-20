import type { CSSProperties } from 'react'

/** Typed helper for passing CSS custom properties in inline styles. */
export const vars = (v: Record<string, string | number>): CSSProperties =>
  v as unknown as CSSProperties

/** Small deterministic PRNG so decorative layouts are stable between renders. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Resolve a public-folder path so it also works when the site is hosted in a sub-folder. */
export function assetUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
