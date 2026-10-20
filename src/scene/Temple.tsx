import type { CSSProperties, ReactNode } from 'react'
import { rng, vars } from '../utils'

/* ─────────────────────────────────────────────────────────────────────────────
   Temple artboard: 1200 × 800 units, ground line at the bottom edge.
   Every part is its own small <svg> (a separate compositor layer), positioned in
   artboard percentages, so scroll-driven reveals only move/fade pre-painted
   layers instead of repainting one huge drawing.
   ───────────────────────────────────────────────────────────────────────────── */

const AW = 1200
const AH = 800
const CX = 600
const GROUND = 796

const TIERS = [
  { w: 330, h: 120 },
  { w: 290, h: 78 },
  { w: 256, h: 70 },
  { w: 224, h: 64 },
  { w: 194, h: 58 },
  { w: 166, h: 52 },
  { w: 140, h: 46 },
]

const pct = (v: number, total: number) => `${((v / total) * 100).toFixed(3)}%`
const OUT = 'rgba(86,52,24,.38)'

function Part({
  x, y, w, h, className, style, children,
}: { x: number; y: number; w: number; h: number; className: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <svg
      className={`part ${className}`}
      style={{ left: pct(x, AW), top: pct(y, AH), width: pct(w, AW), height: pct(h, AH), ...style }}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

/** One storey of the gopuram: niches, pilasters, cornice, mini-domes, end gables. */
function TierArt({ w, h, base }: { w: number; h: number; base?: boolean }) {
  const W = w + 40
  const x0 = 20
  const y0 = 38
  const yb = y0 + h
  const cx = W / 2
  const n = Math.max(3, Math.round((w - 40) / 46))
  const doms = Math.max(5, Math.round(w / 24))

  const niches: ReactNode[] = []
  for (let k = 0; k < n; k++) {
    const nx = x0 + (w * (k + 0.5)) / n
    if (base && Math.abs(nx - cx) < 46) continue
    niches.push(
      <g key={`n${k}`}>
        <path
          d={`M${nx - 9} ${yb - 12} V${y0 + 22} Q${nx - 9} ${y0 + 12} ${nx} ${y0 + 10} Q${nx + 9} ${y0 + 12} ${nx + 9} ${y0 + 22} V${yb - 12}Z`}
          fill="url(#st-dark)"
          stroke="rgba(246,226,187,.5)"
          strokeWidth=".8"
        />
        <ellipse cx={nx} cy={y0 + h * 0.52} rx="3.4" ry={Math.min(7, h * 0.14)} fill="#d9a441" />
        <circle cx={nx} cy={y0 + h * 0.52 - Math.min(9, h * 0.17)} r="2.4" fill="#e8b956" />
      </g>,
    )
  }
  const pilasters: ReactNode[] = []
  for (let k = 0; k <= n; k++) {
    pilasters.push(<rect key={`p${k}`} x={x0 + (w * k) / n - 2.5} y={y0} width="5" height={h} fill="url(#st-light)" opacity=".9" />)
  }
  const domes: ReactNode[] = []
  for (let k = 0; k < doms; k++) {
    const dx = x0 - 4 + ((k + 0.5) * (w + 8)) / doms
    domes.push(
      <g key={`d${k}`}>
        <path d={`M${dx - 6} ${y0 - 9} Q${dx - 6} ${y0 - 19} ${dx} ${y0 - 21} Q${dx + 6} ${y0 - 19} ${dx + 6} ${y0 - 9}Z`} fill="url(#st-roof)" stroke={OUT} strokeWidth=".6" />
        <circle cx={dx} cy={y0 - 22} r="1.3" fill="#d9a441" />
      </g>,
    )
  }
  const gable = (gx: number, key: string) => (
    <g key={key}>
      <path
        d={`M${gx - 16} ${y0 - 9} V${y0 - 22} Q${gx - 16} ${y0 - 36} ${gx} ${y0 - 37} Q${gx + 16} ${y0 - 36} ${gx + 16} ${y0 - 22} V${y0 - 9}Z`}
        fill="url(#st-roof)"
        stroke={OUT}
        strokeWidth=".8"
      />
      {[-8, 0, 8].map((d) => (
        <path key={d} d={`M${gx + d} ${y0 - 9} V${y0 - 31 + Math.abs(d) * 0.5}`} stroke="rgba(86,52,24,.3)" strokeWidth="1" />
      ))}
      <circle cx={gx} cy={y0 - 37} r="2" fill="url(#gold-v)" />
    </g>
  )

  return (
    <>
      <rect x={x0} y={y0} width={w} height={h} fill="url(#st-body)" />
      <rect x={x0 + w * 0.84} y={y0} width={w * 0.16} height={h} fill="rgba(90,50,20,.14)" />
      {pilasters}
      {niches}
      {base && (
        <g>
          <path
            d={`M${cx - 30} ${yb - 7} V${y0 + 42} Q${cx - 30} ${y0 + 16} ${cx} ${y0 + 10} Q${cx + 30} ${y0 + 16} ${cx + 30} ${y0 + 42} V${yb - 7}Z`}
            fill="url(#st-door)"
            stroke="url(#gold-v)"
            strokeWidth="3"
          />
          <path d={`M${cx - 20} ${yb - 7} V${y0 + 48} Q${cx - 20} ${y0 + 28} ${cx} ${y0 + 24} Q${cx + 20} ${y0 + 28} ${cx + 20} ${y0 + 48} V${yb - 7}`} fill="none" stroke="rgba(248,224,138,.35)" strokeWidth="1" />
          <circle cx={cx} cy={yb - 36} r="1.6" fill="#f8e08a" opacity=".8" />
        </g>
      )}
      <rect x={x0 - 5} y={yb - 7} width={w + 10} height="7" fill="url(#st-light)" stroke={OUT} strokeWidth=".6" />
      <rect x={x0 - 9} y={y0 - 9} width={w + 18} height="11" rx="2" fill="url(#st-light)" stroke={OUT} strokeWidth=".7" />
      <rect x={x0 - 9} y={y0 + 2} width={w + 18} height="4" fill="rgba(80,45,20,.32)" />
      {domes}
      {gable(x0 + 12, 'g1')}
      {gable(x0 + w - 12, 'g2')}
      <rect x={x0} y={y0} width={w} height={h} fill="none" stroke={OUT} strokeWidth=".8" />
    </>
  )
}

/** Barrel-vault crown with golden kalasam finials. */
function CrownArt() {
  const ribs: ReactNode[] = []
  for (let k = 1; k < 7; k++) {
    const x = 30 + (160 * k) / 7
    const top = 124 - 78 * Math.sqrt(Math.max(0, 1 - ((x - 110) / 82) ** 2))
    ribs.push(<path key={k} d={`M${x} 124 V${top + 4}`} stroke="rgba(86,52,24,.28)" strokeWidth="1.2" />)
  }
  const kal = [
    { x: 56, s: 0.62, y: 64 },
    { x: 83, s: 0.84, y: 50 },
    { x: 110, s: 1.15, y: 43 },
    { x: 137, s: 0.84, y: 50 },
    { x: 164, s: 0.62, y: 64 },
  ]
  return (
    <>
      <path d="M26 124 V92 Q26 48 110 41 Q194 48 194 92 V124Z" fill="url(#st-roof)" stroke={OUT} strokeWidth=".9" />
      {ribs}
      <path d="M26 92 Q26 48 110 41 Q194 48 194 92" fill="none" stroke="url(#gold-v)" strokeWidth="3.2" />
      <rect x="22" y="116" width="176" height="9" rx="2" fill="url(#st-light)" stroke={OUT} strokeWidth=".7" />
      {kal.map((k) => (
        <g key={k.x} transform={`translate(${k.x} ${k.y}) scale(${k.s})`}>
          <ellipse cx="0" cy="-6" rx="7" ry="8" fill="url(#gold-v)" stroke="rgba(120,80,20,.5)" strokeWidth=".6" />
          <rect x="-2.6" y="-19" width="5.2" height="8" fill="url(#gold-v)" />
          <path d="M-3.6 -19 L0 -38 L3.6 -19Z" fill="url(#gold-v)" />
        </g>
      ))}
    </>
  )
}

/** Long colonnaded prakaram hall flanking the gateway. */
function WingArt({ mirror }: { mirror?: boolean }) {
  const pillars: ReactNode[] = []
  for (let x = 12; x < 400; x += 30) {
    pillars.push(
      <g key={x}>
        <rect x={x} y="50" width="9" height="76" fill="url(#st-light)" />
        <rect x={x - 2} y="46" width="13" height="6" fill="url(#st-body)" stroke={OUT} strokeWidth=".4" />
        <rect x={x - 2} y="122" width="13" height="5" fill="url(#st-body)" />
      </g>,
    )
  }
  const frieze: ReactNode[] = []
  for (let x = 6; x < 404; x += 20) frieze.push(<rect key={x} x={x} y="34" width="9" height="9" rx="1.5" fill="rgba(86,52,24,.3)" />)
  const parapet: ReactNode[] = []
  for (let x = 10; x < 404; x += 22) {
    parapet.push(<path key={x} d={`M${x} 16 Q${x} 4 ${x + 8} 3 Q${x + 16} 4 ${x + 16} 16Z`} fill="url(#st-roof)" stroke={OUT} strokeWidth=".5" />)
  }
  return (
    <g transform={mirror ? 'translate(410 0) scale(-1 1)' : undefined}>
      {parapet}
      <rect x="0" y="16" width="410" height="16" fill="url(#st-light)" stroke={OUT} strokeWidth=".7" />
      <rect x="0" y="30" width="410" height="16" fill="url(#st-body)" />
      {frieze}
      <rect x="0" y="46" width="410" height="82" fill="url(#st-dark)" />
      {pillars}
      <rect x="0" y="16" width="8" height="112" fill="url(#st-body)" stroke={OUT} strokeWidth=".6" />
      <rect x="0" y="126" width="410" height="4" fill="rgba(60,34,14,.4)" />
    </g>
  )
}

export function Temple() {
  // stack the tiers from the ground up
  let yTop = GROUND
  const tiers = TIERS.map((t, i) => {
    yTop -= t.h
    return { ...t, i, top: yTop }
  })
  const last = tiers[tiers.length - 1]

  return (
    <div className="temple">
      <Part x={40} y={GROUND - 130} w={410} h={130} className="part--wing part--wing-l">
        <WingArt />
      </Part>
      <Part x={AW - 40 - 410} y={GROUND - 130} w={410} h={130} className="part--wing part--wing-r">
        <WingArt mirror />
      </Part>

      {tiers.map((t) => (
        <Part
          key={t.i}
          x={CX - (t.w + 40) / 2}
          y={t.top - 38}
          w={t.w + 40}
          h={t.h + 38}
          className="part--tier"
          style={vars({ '--k': `var(--l-t${t.i})` })}
        >
          <TierArt w={t.w} h={t.h} base={t.i === 0} />
        </Part>
      ))}

      <Part x={CX - 110} y={last.top - 124 + 8} w={220} h={130} className="part--tier" style={vars({ '--k': 'var(--l-crown)' })}>
        <CrownArt />
      </Part>
    </div>
  )
}

/* ── far scenery: hills + tree clusters ────────────────────────────────────── */

export function Hills() {
  return (
    <svg className="hills" viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 150 C120 60 260 120 380 90 S620 20 760 80 S1010 40 1200 110 V240 H0Z" fill="url(#hill-a)" />
      <path d="M0 190 C140 120 240 170 400 140 S660 90 820 150 S1060 130 1200 170 V240 H0Z" fill="url(#hill-b)" />
    </svg>
  )
}

const CLUSTER = (() => {
  const r = rng(12)
  const dots: { x: number; y: number; r: number; dark: boolean }[] = []
  for (let i = 0; i < 16; i++) {
    const t = i / 15
    dots.push({ x: 40 + t * 300 + (r() - 0.5) * 50, y: 150 - Math.sin(t * Math.PI) * 70 + (r() - 0.5) * 40, r: 36 + r() * 30, dark: r() > 0.5 })
  }
  return dots
})()

export function Trees({ side }: { side: 'l' | 'r' }) {
  return (
    <div className={`trees trees--${side}`}>
      <svg viewBox="0 0 400 260" aria-hidden="true" focusable="false">
        <rect x="0" y="206" width="400" height="60" fill="url(#tree-b)" />
        {CLUSTER.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y + 50} r={d.r} fill={d.dark ? 'url(#tree-b)' : 'url(#tree-a)'} />
        ))}
      </svg>
    </div>
  )
}
