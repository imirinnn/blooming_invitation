import { useMemo } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMotion'
import { rng, vars } from '../utils'

const COLORS: [string, string][] = [
  ['#ffd873', '#f0a22a'], // marigold
  ['#ffb690', '#ec7d5a'], // peach rose
  ['#fbd8c6', '#ee9f86'],
  ['#fff7e8', '#f3dbb8'], // jasmine
  ['#f7c8cb', '#e592a0'],
]

type Props = {
  count: number
  /** ambient = endless gentle drift · burst = one-off wind-swept shower */
  mode?: 'ambient' | 'burst'
  /** local = positioned inside its parent instead of fixed to the viewport */
  local?: boolean
  seed?: number
}

/** Lightweight CSS-only petals: 2 DOM nodes each, transform-only animation. */
export function FloatingPetals({ count, mode = 'ambient', local = false, seed = 7 }: Props) {
  const reduced = usePrefersReducedMotion()

  const petals = useMemo(() => {
    const r = rng(seed * 101 + count)
    const burst = mode === 'burst'
    return Array.from({ length: count }, () => {
      const [c1, c2] = COLORS[Math.floor(r() * COLORS.length)]
      const dur = burst ? 5 + r() * 5 : 13 + r() * 15
      return {
        x: r() * (burst ? 120 : 100),
        s: 11 + r() * 17,
        dur,
        delay: burst ? r() * 2.8 : -r() * dur,
        sway: 18 + r() * 46,
        drift: burst ? -(14 + r() * 40) : r() * 16 - 8,
        rot: r() * 360,
        spin: 120 + r() * 260,
        op: 0.62 + r() * 0.32,
        c1,
        c2,
      }
    })
  }, [count, mode, seed])

  if (reduced) return null

  return (
    <div
      className={`petals petals--${mode}${local ? ' petals--local' : ''}`}
      aria-hidden="true"
    >
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={vars({
            '--x': `${p.x}%`,
            '--s': `${p.s}px`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--sway': `${p.sway}px`,
            '--drift': `${p.drift}vw`,
            '--r': `${p.rot}deg`,
            '--spin': `${p.spin}deg`,
            '--op': p.op,
            '--c1': p.c1,
            '--c2': p.c2,
          })}
        >
          <i />
        </span>
      ))}
    </div>
  )
}
