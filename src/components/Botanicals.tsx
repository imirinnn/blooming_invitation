import type { CSSProperties } from 'react'
import { rng, vars } from '../utils'

/* ─────────────────────────────────────────────────────────────────────────────
   Hand-built botanical art in the palette of the invitation template:
   peach garden roses, white jasmine-like flowers, yellow-green ivy, marigolds.
   Every shape is defined ONCE in <SvgDefs/> and re-used with <use/>, which
   keeps the DOM tiny and the animation smooth.
   ───────────────────────────────────────────────────────────────────────────── */

const STAMENS = Array.from({ length: 7 }, (_, i) => {
  const a = (i / 7) * Math.PI * 2 + 0.3
  return { x: Math.cos(a) * 7, y: Math.sin(a) * 7 }
})

/** Render once near the top of the app. Holds gradients + reusable shapes. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {/* ivy */}
        <linearGradient id="g-leaf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5d8a35" />
          <stop offset="1" stopColor="#97bf55" />
        </linearGradient>
        <linearGradient id="g-leaf2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a7430" />
          <stop offset="1" stopColor="#7ea944" />
        </linearGradient>
        <path id="leaf-shape" d="M0 0 C8 -10 28 -10 42 0 C28 10 8 10 0 0Z" />
        <g id="leaf">
          <use href="#leaf-shape" fill="url(#g-leaf)" />
          <path d="M3 0 L36 0" stroke="rgba(255,255,255,.45)" strokeWidth=".8" fill="none" />
        </g>
        <g id="leaf2">
          <use href="#leaf-shape" fill="url(#g-leaf2)" />
          <path d="M3 0 L36 0" stroke="rgba(255,255,255,.35)" strokeWidth=".8" fill="none" />
        </g>

        {/* peach garden rose */}
        <radialGradient id="g-rose-a" cx="0.5" cy="0.7" r="0.8">
          <stop offset="0" stopColor="#e58f76" />
          <stop offset="1" stopColor="#f7cdb6" />
        </radialGradient>
        <radialGradient id="g-rose-b" cx="0.5" cy="0.7" r="0.8">
          <stop offset="0" stopColor="#eba089" />
          <stop offset="1" stopColor="#fbdccb" />
        </radialGradient>
        <radialGradient id="g-rose-c" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#f6b9a0" />
          <stop offset="1" stopColor="#d97b63" />
        </radialGradient>
        <g id="rose">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="0" cy="-17" rx="15" ry="21" fill="url(#g-rose-a)" stroke="rgba(255,255,255,.4)" strokeWidth=".6" transform={`rotate(${a})`} />
          ))}
          {[30, 102, 174, 246, 318].map((a) => (
            <ellipse key={a} cx="0" cy="-10.5" rx="12" ry="15" fill="url(#g-rose-b)" stroke="rgba(255,255,255,.45)" strokeWidth=".6" transform={`rotate(${a})`} />
          ))}
          <circle r="12" fill="url(#g-rose-c)" />
          <path d="M-7 -1 C-7 -9 7 -9 7 -1 C7 5 -3 7 -4 2" fill="none" stroke="#c4654e" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M-3 -2 C-3 -5 3 -5 3 -2" fill="none" stroke="#c4654e" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* white jasmine-style flower */}
        <radialGradient id="g-white" cx="0.5" cy="0.8" r="0.9">
          <stop offset="0" stopColor="#f3e6c8" />
          <stop offset="1" stopColor="#ffffff" />
        </radialGradient>
        <g id="white">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="0" cy="-12" rx="7.5" ry="13" fill="url(#g-white)" stroke="rgba(160,140,100,.35)" strokeWidth=".6" transform={`rotate(${a})`} />
          ))}
          <circle r="4.2" fill="#f1cf6a" />
          {STAMENS.map((s, i) => (
            <circle key={i} cx={s.x * 0.5} cy={s.y * 0.5} r=".9" fill="#c99a2e" />
          ))}
        </g>

        {/* marigold / gold */}
        <radialGradient id="g-gold" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#fbe7a4" />
          <stop offset="1" stopColor="#c4943a" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export function Leaf({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="-2 -12 46 24" aria-hidden="true" focusable="false">
      <use href="#leaf" />
    </svg>
  )
}
export function Rose({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="-40 -40 80 80" aria-hidden="true" focusable="false">
      <use href="#rose" />
    </svg>
  )
}
export function WhiteFlower({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="-26 -26 52 52" aria-hidden="true" focusable="false">
      <use href="#white" />
    </svg>
  )
}

/* ── vine geometry helpers ─────────────────────────────────────────────────── */

type Pt = { x: number; y: number }
type Cubic = [Pt, Pt, Pt, Pt]

export const bez = (p: Cubic, t: number): Pt => {
  const u = 1 - t
  return {
    x: u * u * u * p[0].x + 3 * u * u * t * p[1].x + 3 * u * t * t * p[2].x + t * t * t * p[3].x,
    y: u * u * u * p[0].y + 3 * u * u * t * p[1].y + 3 * u * t * t * p[2].y + t * t * t * p[3].y,
  }
}
export const tangent = (p: Cubic, t: number): number => {
  const u = 1 - t
  const dx = 3 * u * u * (p[1].x - p[0].x) + 6 * u * t * (p[2].x - p[1].x) + 3 * t * t * (p[3].x - p[2].x)
  const dy = 3 * u * u * (p[1].y - p[0].y) + 6 * u * t * (p[2].y - p[1].y) + 3 * t * t * (p[3].y - p[2].y)
  return (Math.atan2(dy, dx) * 180) / Math.PI
}
const cubicPath = (p: Cubic) => `M${p[0].x} ${p[0].y} C${p[1].x} ${p[1].y} ${p[2].x} ${p[2].y} ${p[3].x} ${p[3].y}`

type LeafSpec = { x: number; y: number; rot: number; s: number; id: 'leaf' | 'leaf2' }
function leavesAlong(p: Cubic, n: number, seed: number, base = 0.6, spread = 0.5): LeafSpec[] {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const t = 0.04 + (i / n) * 0.94
    const pt = bez(p, t)
    const side = i % 2 === 0 ? 1 : -1
    return {
      x: pt.x,
      y: pt.y,
      rot: tangent(p, t) + side * (32 + r() * 24),
      s: base + r() * spread,
      id: r() > 0.45 ? 'leaf' : 'leaf2',
    }
  })
}
const leafUse = (l: LeafSpec, i: number) => (
  <use
    key={i}
    href={`#${l.id}`}
    transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.rot.toFixed(1)}) scale(${l.s.toFixed(2)})`}
  />
)

/* ── Hanging ivy (top edge of screen / arches) ─────────────────────────────── */

const STRANDS = (() => {
  const r = rng(77)
  const out: { path: Cubic; leaves: LeafSpec[]; delay: number; flowers: Pt[] }[] = []
  const n = 15
  for (let i = 0; i < n; i++) {
    const x = (i + 0.5) * (1200 / n) + (r() - 0.5) * 40
    const len = 110 + r() * 250 * (i % 3 === 0 ? 1.15 : 0.8)
    const sway = (r() - 0.5) * 60
    const path: Cubic = [
      { x, y: -10 },
      { x: x + sway, y: len * 0.35 },
      { x: x - sway * 0.8, y: len * 0.7 },
      { x: x + sway * 0.4, y: len },
    ]
    const flowers = r() > 0.55 ? [bez(path, 0.55 + r() * 0.35)] : []
    out.push({ path, leaves: leavesAlong(path, 9 + Math.floor(len / 32), 300 + i, 0.55, 0.55), delay: -r() * 6, flowers })
  }
  return out
})()

export function HangingVines({ className = '' }: { className?: string }) {
  return (
    <svg className={`vines ${className}`} viewBox="0 0 1200 400" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">
      {STRANDS.map((s, i) => (
        <g key={i} className="vines__strand" style={vars({ '--delay': `${s.delay}s` })}>
          <path d={cubicPath(s.path)} fill="none" stroke="#5a8433" strokeWidth="2.4" strokeLinecap="round" />
          {s.leaves.map(leafUse)}
          {s.flowers.map((f, k) => (
            <use key={k} href="#white" transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) scale(.5)`} />
          ))}
        </g>
      ))}
    </svg>
  )
}

/* ── Marigold garlands (draped arcs) ───────────────────────────────────────── */

export function MarigoldGarlands({ className = '' }: { className?: string }) {
  return (
    <svg className={`garlands ${className}`} viewBox="0 0 1200 300" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">
      {[
        { d: 'M-30 30 Q300 190 600 70 T1230 30', delay: 0 },
        { d: 'M-30 74 Q250 250 560 128 T1230 82', delay: -2.4 },
      ].map((g, i) => (
        <g key={i} className="garlands__arc" style={vars({ '--delay': `${g.delay}s` })} fill="none" strokeLinecap="round">
          <path d={g.d} stroke="#5f8a37" strokeWidth="5" />
          <path d={g.d} stroke="#e8781c" strokeWidth="17" strokeDasharray="0 15" />
          <path d={g.d} stroke="#f8c32a" strokeWidth="13" strokeDasharray="0 15" strokeDashoffset="7" />
          <path d={g.d} stroke="#fff0a8" strokeWidth="4" strokeDasharray="0 15" strokeDashoffset="3" opacity=".8" />
        </g>
      ))}
    </svg>
  )
}

/* ── Positioned flower field (arch base, bottom corners, closing garland) ──── */

export type FieldItem = {
  kind?: 'rose' | 'leaf' | 'white'
  x: number // % of container width
  y: number // % of container height
  size: number // % of container width
  rot?: number
}

export function BlossomField({ items, className = '' }: { items: FieldItem[]; className?: string }) {
  return (
    <div className={`field ${className}`} aria-hidden="true">
      {items.map((it, i) => (
        <span
          key={i}
          className="field__item"
          style={vars({ '--x': `${it.x}%`, '--y': `${it.y}%`, '--w': `${it.size}%`, '--rot': `${it.rot ?? 0}deg`, '--i': i })}
        >
          {it.kind === 'leaf' ? <Leaf className="field__art" /> : it.kind === 'white' ? <WhiteFlower className="field__art" /> : <Rose className="field__art" />}
        </span>
      ))}
    </div>
  )
}

/** Rose + leaf cluster that hugs a corner (used on both bottom corners). */
export const CORNER_ROSES: FieldItem[] = [
  { kind: 'leaf', x: 10, y: 38, size: 34, rot: -60 },
  { kind: 'leaf', x: 62, y: 34, size: 30, rot: -125 },
  { kind: 'leaf', x: 36, y: 8, size: 30, rot: -90 },
  { kind: 'leaf', x: 88, y: 66, size: 28, rot: -160 },
  { kind: 'rose', x: 22, y: 60, size: 38, rot: 10 },
  { kind: 'rose', x: 54, y: 66, size: 30, rot: -25 },
  { kind: 'white', x: 38, y: 36, size: 20, rot: 20 },
  { kind: 'rose', x: 80, y: 84, size: 34, rot: 40 },
  { kind: 'rose', x: 40, y: 92, size: 40, rot: -8 },
  { kind: 'white', x: 66, y: 46, size: 17, rot: 0 },
  { kind: 'rose', x: 10, y: 88, size: 30, rot: 25 },
]

/* ── Closing garland ───────────────────────────────────────────────────────── */

const G1: Cubic = [{ x: 0, y: 150 }, { x: 140, y: 90 }, { x: 260, y: 210 }, { x: 400, y: 150 }]
const G2: Cubic = [{ x: 400, y: 150 }, { x: 540, y: 90 }, { x: 660, y: 210 }, { x: 800, y: 150 }]
const GARLAND_LEAVES = [...leavesAlong(G1, 12, 41, 0.9, 0.5), ...leavesAlong(G2, 12, 43, 0.9, 0.5)]

export const GARLAND_ITEMS: FieldItem[] = (() => {
  const out: FieldItem[] = []
  const place = (p: Cubic, ts: number[], offset: number) =>
    ts.forEach((t, i) => {
      const pt = bez(p, t)
      const d = 92 + 70 * (1 - Math.abs(pt.x - 400) / 400)
      out.push({
        kind: (i + offset) % 3 === 2 ? 'white' : 'rose',
        x: (pt.x / 800) * 100,
        y: ((pt.y + (i % 2 ? -14 : 12)) / 240) * 100,
        size: ((((i + offset) % 3 === 2 ? 0.8 : 1) * d) / 800) * 100,
        rot: (i * 47 + offset * 31) % 360,
      })
    })
  place(G1, [0.08, 0.3, 0.52, 0.74, 0.94], 0)
  place(G2, [0.1, 0.3, 0.52, 0.74, 0.92], 2)
  out.push({ kind: 'rose', x: 50, y: 60, size: 21, rot: 12 })
  return out
})()

export function GarlandVine() {
  return (
    <svg className="garland__vine" viewBox="0 0 800 240" aria-hidden="true" focusable="false">
      <path
        d={`${cubicPath(G1)} C${G2[1].x} ${G2[1].y} ${G2[2].x} ${G2[2].y} ${G2[3].x} ${G2[3].y}`}
        fill="none"
        stroke="#5a8433"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {GARLAND_LEAVES.map(leafUse)}
    </svg>
  )
}

/* ── Fine gold ornament divider ────────────────────────────────────────────── */

export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <svg className={`ornament ${className}`} viewBox="0 0 240 28" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#b98a3e" strokeWidth="1" strokeLinecap="round">
        <path d="M6 14 H98" />
        <path d="M142 14 H234" />
        <path d="M98 14 q5 -7 10 0" />
        <path d="M142 14 q-5 -7 -10 0" />
        <g transform="translate(120 14)">
          {[0, 72, 144, 216, 288].map((a) => (
            <path key={a} d="M0 0 C-5 -3 -6 -9 0 -12 C6 -9 5 -3 0 0Z" transform={`rotate(${a})`} />
          ))}
          <circle r="1.7" fill="#b98a3e" stroke="none" />
        </g>
      </g>
      <circle cx="3" cy="14" r="1.6" fill="#b98a3e" />
      <circle cx="237" cy="14" r="1.6" fill="#b98a3e" />
    </svg>
  )
}

/** Gold lotus emblem (replaces the template's invocation symbol — no text). */
export function LotusEmblem({ className = '' }: { className?: string }) {
  return (
    <svg className={`lotus ${className}`} viewBox="-50 -40 100 70" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#b98a3e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 22 C-12 14 -14 -6 0 -30 C14 -6 12 14 0 22Z" fill="rgba(251,231,164,.55)" />
        <path d="M-4 22 C-26 20 -38 4 -40 -14 C-24 -12 -10 -2 -4 22Z" fill="rgba(251,231,164,.35)" />
        <path d="M4 22 C26 20 38 4 40 -14 C24 -12 10 -2 4 22Z" fill="rgba(251,231,164,.35)" />
        <path d="M-8 24 C-36 28 -48 16 -50 4 C-34 4 -16 8 -8 24Z" />
        <path d="M8 24 C36 28 48 16 50 4 C34 4 16 8 8 24Z" />
        <path d="M-20 27 H20" />
      </g>
    </svg>
  )
}

/** Small gold line-art sprig used in the corners of the printed-style card. */
export function GoldSprig({ className = '' }: { className?: string }) {
  return (
    <svg className={`sprig ${className}`} viewBox="0 0 70 70" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#b98a3e" strokeWidth="1" strokeLinecap="round">
        <path d="M4 4 C20 6 34 18 40 40 S50 62 66 66" />
        <path d="M18 10 C20 18 26 20 32 20 C30 14 24 10 18 10Z" />
        <path d="M30 26 C36 28 40 34 40 40 C34 38 30 32 30 26Z" />
        <path d="M42 48 C48 48 54 52 56 58 C50 58 44 54 42 48Z" />
        <circle cx="12" cy="22" r="2.2" />
        <circle cx="24" cy="40" r="2.2" />
      </g>
    </svg>
  )
}
