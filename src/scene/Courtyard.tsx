import type { ReactNode } from 'react'

/** Paved courtyard in one-point perspective. */
export function Floor() {
  const fan: ReactNode[] = []
  for (let i = 0; i < 17; i++) {
    fan.push(<path key={i} d={`M600 -60 L${-1100 + i * 150} 300`} stroke="rgba(110,64,26,.17)" strokeWidth="1.4" />)
  }
  const rows = [10, 28, 54, 92, 146, 220, 320]
  return (
    <svg className="floor" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="floor-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0d3a2" />
          <stop offset="0.55" stopColor="#e2b97c" />
          <stop offset="1" stopColor="#c98f55" />
        </linearGradient>
        <linearGradient id="floor-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe7c4" stopOpacity=".85" />
          <stop offset="1" stopColor="#fbe7c4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1200" height="300" fill="url(#floor-g)" />
      <g>{fan}</g>
      {rows.map((y) => (
        <path key={y} d={`M0 ${y} H1200`} stroke="rgba(110,64,26,.16)" strokeWidth="1.4" />
      ))}
      <rect width="1200" height="70" fill="url(#floor-fade)" />
    </svg>
  )
}

/** Steps leading up to the gateway. */
export function Steps() {
  return (
    <svg className="steps" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {[0, 1, 2, 3].map((i) => {
        const inset = 4 + (3 - i) * 14
        const y = i * 18
        return (
          <g key={i}>
            <rect x={inset} y={y} width={400 - inset * 2} height="9" fill="url(#st-light)" stroke="rgba(86,52,24,.35)" strokeWidth=".8" />
            <rect x={inset} y={y + 9} width={400 - inset * 2} height="9" fill="url(#st-body)" stroke="rgba(86,52,24,.3)" strokeWidth=".8" />
          </g>
        )
      })}
    </svg>
  )
}

/* Flower rangoli (padam): green leaves → yellow → orange → marigold centre. */
const ring = (n: number, cy: number, rx: number, ry: number, fills: string[]) =>
  Array.from({ length: n }, (_, i) => (
    <ellipse key={i} cx="0" cy={cy} rx={rx} ry={ry} transform={`rotate(${(360 / n) * i})`} fill={fills[i % fills.length]} stroke="rgba(255,255,255,.35)" strokeWidth=".6" />
  ))

export function Pond() {
  return (
    <div className="pond">
      <svg className="pond__water" viewBox="0 0 400 130" aria-hidden="true" focusable="false">
        <ellipse cx="200" cy="74" rx="198" ry="54" fill="#a8743f" />
        <ellipse cx="200" cy="68" rx="198" ry="54" fill="url(#st-light)" stroke="rgba(86,52,24,.4)" strokeWidth="1" />
        <ellipse cx="200" cy="70" rx="184" ry="45" fill="url(#water)" />
        <g className="pond__ripples" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.2">
          <ellipse cx="200" cy="72" rx="150" ry="34" />
          <ellipse cx="200" cy="72" rx="110" ry="24" />
          <ellipse cx="90" cy="64" rx="26" ry="6" />
          <ellipse cx="318" cy="78" rx="30" ry="7" />
        </g>
      </svg>
      <svg className="pond__padam" viewBox="0 0 300 160" aria-hidden="true" focusable="false">
        <g transform="translate(150 86) scale(1 .5)">
          <g className="pad pad--1">{ring(14, -100, 15, 33, ['#5f9a3a', '#7fb446'])}</g>
          <g className="pad pad--2">{ring(22, -74, 8.5, 24, ['#f8cf3a', '#fbe26a'])}</g>
          <g className="pad pad--3">{ring(18, -53, 8, 20, ['#f09a2a', '#f4b040'])}</g>
          <g className="pad pad--4">
            {ring(12, -33, 7, 16, ['#e8742a', '#f08a34'])}
            {ring(8, -17, 6, 12, ['#f8cf3a', '#fbe26a'])}
            <circle r="10" fill="#5a9a3a" />
            <circle r="4.5" fill="#e0527a" />
          </g>
        </g>
      </svg>
    </div>
  )
}
