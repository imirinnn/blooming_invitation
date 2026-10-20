import { useMemo } from 'react'
import { rng, vars } from '../utils'

/** Tiny twinkling gold glints. Pure CSS animation; hidden for reduced-motion users. */
export function Sparkles({
  count = 14,
  seed = 3,
  className = '',
}: {
  count?: number
  seed?: number
  className?: string
}) {
  const items = useMemo(() => {
    const r = rng(seed * 977)
    return Array.from({ length: count }, () => ({
      x: 3 + r() * 94,
      y: 3 + r() * 94,
      s: 3 + r() * 5,
      dur: 2.8 + r() * 3.4,
      delay: -r() * 6,
    }))
  }, [count, seed])

  return (
    <div className={`sparkles ${className}`} aria-hidden="true">
      {items.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={vars({
            '--x': `${s.x}%`,
            '--y': `${s.y}%`,
            '--s': `${s.s}px`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          })}
        />
      ))}
    </div>
  )
}
