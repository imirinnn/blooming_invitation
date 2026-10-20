import { vars } from '../utils'

function CloudShape() {
  return (
    <svg viewBox="0 0 240 100" aria-hidden="true" focusable="false">
      <g fill="url(#cloud)">
        <circle cx="62" cy="58" r="32" />
        <circle cx="104" cy="42" r="40" />
        <circle cx="152" cy="54" r="32" />
        <circle cx="190" cy="64" r="24" />
        <ellipse cx="120" cy="74" rx="108" ry="22" />
      </g>
    </svg>
  )
}

const CLOUDS = [
  { top: 7, w: 34, dur: 150, delay: -40, op: 0.95, depth: 0.1 },
  { top: 21, w: 26, dur: 200, delay: -130, op: 0.8, depth: 0.16 },
  { top: 2, w: 22, dur: 175, delay: -75, op: 0.7, depth: 0.07 },
  { top: 33, w: 32, dur: 230, delay: -15, op: 0.55, depth: 0.2 },
  { top: 14, w: 42, dur: 250, delay: -170, op: 0.85, depth: 0.13 },
]

const BIRDS = [
  { top: 24, dur: 46, delay: -6, s: 1 },
  { top: 31, dur: 58, delay: -26, s: 0.75 },
  { top: 18, dur: 52, delay: -40, s: 0.85 },
]

/** Sky, sun, drifting clouds and birds. Always visible — it is the first thing seen. */
export function Sky() {
  return (
    <div className="sky">
      <div className="sky__base" />
      <div className="sky__gold" />
      <div className="sky__sun" />
      <div className="sky__rays" />
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="cloud"
          style={vars({ '--top': `${c.top}%`, '--w': `${c.w}vw`, '--dur': `${c.dur}s`, '--delay': `${c.delay}s`, '--op': c.op, '--depth': c.depth })}
        >
          <div className="cloud__in">
            <CloudShape />
          </div>
        </div>
      ))}
      {BIRDS.map((b, i) => (
        <div key={i} className="bird" style={vars({ '--top': `${b.top}%`, '--dur': `${b.dur}s`, '--delay': `${b.delay}s`, '--s': b.s })}>
          <svg viewBox="0 0 30 12" aria-hidden="true" focusable="false">
            <path d="M1 8 Q8 -3 15 7 Q22 -3 29 8" fill="none" stroke="#2f3a4a" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </div>
  )
}
