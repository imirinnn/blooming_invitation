import type { CSSProperties } from 'react'
import { vars } from '../utils'

/* Banana leaves + a traditional brass standing lamp for the opening cover. */

const VEINS = Array.from({ length: 24 }, (_, i) => 30 + i * 15)

/** One large banana leaf (tip at the top, stalk at the bottom). */
export function BananaLeaf({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const blade = 'M100 6 C152 38 194 140 184 262 C177 334 142 382 100 398 C58 382 23 334 16 262 C6 140 48 38 100 6Z'
  return (
    <svg className={`bleaf ${className}`} style={style} viewBox="0 0 200 400" overflow="visible" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bl-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8cc044" />
          <stop offset="0.48" stopColor="#5e9a30" />
          <stop offset="0.52" stopColor="#3f7d28" />
          <stop offset="1" stopColor="#2f6a22" />
        </linearGradient>
        <clipPath id="bl-clip">
          <path d={blade} />
        </clipPath>
      </defs>
      <path d={blade} fill="url(#bl-g)" />
      <g clipPath="url(#bl-clip)" fill="none" strokeLinecap="round">
        {VEINS.map((y) => (
          <g key={y}>
            <path d={`M100 ${y} Q58 ${y + 4} 6 ${y + 34}`} stroke="rgba(30,70,20,.3)" strokeWidth="1.4" />
            <path d={`M100 ${y} Q142 ${y + 4} 194 ${y + 34}`} stroke="rgba(20,60,18,.38)" strokeWidth="1.4" />
          </g>
        ))}
        {/* torn-leaf slits, as on a real banana leaf */}
        {[96, 168, 252].map((y, i) => (
          <g key={y} stroke="rgba(30,70,20,.55)" strokeWidth="2.2">
            <path d={`M${i % 2 ? 22 : 34} ${y + 10} L${88 - (i % 2) * 6} ${y - 2}`} />
            <path d={`M${178 - (i % 2) * 6} ${y + 24} L${116 + (i % 2) * 6} ${y + 12}`} />
          </g>
        ))}
        <path d="M100 8 C100 140 100 280 100 398" stroke="#d9e89a" strokeWidth="3.4" opacity=".9" />
        <path d="M100 8 C100 140 100 280 100 398" stroke="#3b7022" strokeWidth="1" opacity=".6" />
        <path d={blade} stroke="rgba(255,255,200,.22)" strokeWidth="3" />
      </g>
    </svg>
  )
}

/** Banana leaves framing the cover: hanging from the top corners, rising from the floor. */
const LEAVES = [
  // hanging (rotated 180°) — x/y in %, h in svh
  { x: -5, y: -14, h: 64, r: 192, d: 0 },
  { x: 7, y: -22, h: 54, r: 172, d: -2 },
  { x: 15, y: -26, h: 44, r: 186, d: -4 },
  { x: 95, y: -14, h: 64, r: 168, d: -1 },
  { x: 85, y: -22, h: 54, r: 188, d: -3 },
  { x: 76, y: -26, h: 44, r: 174, d: -5 },
  // rising from the ground
  { x: -4, y: 52, h: 56, r: 14, d: -1 },
  { x: 7, y: 64, h: 44, r: -6, d: -3 },
  { x: 96, y: 52, h: 56, r: -14, d: -2 },
  { x: 85, y: 64, h: 44, r: 6, d: -4 },
]

export function CoverLeaves() {
  return (
    <div className="intro__leaves" aria-hidden="true">
      {LEAVES.map((l, i) => (
        <BananaLeaf
          key={i}
          className={i % 3 === 1 ? 'bleaf--pale' : ''}
          style={vars({ '--x': `${l.x}%`, '--y': `${l.y}%`, '--h': l.h, '--r': `${l.r}deg`, '--d': `${l.d}s` })}
        />
      ))}
    </div>
  )
}

/** Brass standing lamp (kuthuvilakku) with three flickering flames. */
export function BrassLamp({ className = '' }: { className?: string }) {
  const brass = 'url(#gold-v)'
  const edge = 'rgba(110,70,16,.55)'
  const flame = 'M0 0 C-7 -11 -4 -22 0 -34 C4 -22 7 -11 0 0Z'
  return (
    <svg className={`lamp ${className}`} viewBox="0 0 120 270" overflow="visible" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="lamp-glow">
          <stop offset="0" stopColor="#fff2b0" stopOpacity=".95" />
          <stop offset="0.35" stopColor="#ffc860" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffc860" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lamp-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f0781e" />
          <stop offset="0.55" stopColor="#ffc43a" />
          <stop offset="1" stopColor="#fff6c0" />
        </linearGradient>
      </defs>

      <circle className="lamp__glow" cx="60" cy="62" r="62" fill="url(#lamp-glow)" />

      {/* base */}
      <path d="M22 262 H98 L92 246 H28Z" fill={brass} stroke={edge} />
      <path d="M32 246 H88 L82 232 H38Z" fill={brass} stroke={edge} />
      {/* stem: bulbs and rings */}
      <ellipse cx="60" cy="214" rx="24" ry="17" fill={brass} stroke={edge} />
      <rect x="50" y="192" width="20" height="8" rx="3" fill={brass} stroke={edge} />
      <ellipse cx="60" cy="174" rx="16" ry="13" fill={brass} stroke={edge} />
      <rect x="53" y="150" width="14" height="8" rx="3" fill={brass} stroke={edge} />
      <ellipse cx="60" cy="130" rx="11" ry="10" fill={brass} stroke={edge} />
      <path d="M56 120 H64 V100 H56Z" fill={brass} stroke={edge} />
      {/* oil bowl with rim */}
      <path d="M14 82 C20 106 42 112 60 112 C78 112 100 106 106 82Z" fill={brass} stroke={edge} />
      <ellipse cx="60" cy="82" rx="46" ry="8" fill="#e8c365" stroke={edge} />
      <ellipse cx="60" cy="82" rx="38" ry="5" fill="#8a5a1c" opacity=".55" />
      {/* tall centre cup + side spouts */}
      <path d="M52 82 L55 66 H65 L68 82Z" fill={brass} stroke={edge} />
      <path d="M22 82 L26 74 H34 L36 82Z" fill={brass} stroke={edge} />
      <path d="M84 82 L86 74 H94 L98 82Z" fill={brass} stroke={edge} />

      {/* flames */}
      <g transform="translate(60 66)">
        <path className="lamp__flame" d={flame} fill="url(#lamp-flame)" />
      </g>
      <g transform="translate(30 74) scale(.7)">
        <path className="lamp__flame lamp__flame--b" d={flame} fill="url(#lamp-flame)" />
      </g>
      <g transform="translate(90 74) scale(.7)">
        <path className="lamp__flame lamp__flame--c" d={flame} fill="url(#lamp-flame)" />
      </g>
    </svg>
  )
}

/** White kolam (rice-flour rangoli) that draws itself on the cover floor once the gate opens. */
export function Kolam() {
  const petal = 'M0 -22 C13 -38 13 -60 0 -80 C-13 -60 -13 -38 0 -22Z'
  const small = 'M0 -8 C6 -14 6 -22 0 -30 C-6 -22 -6 -14 0 -8Z'
  const dots = Array.from({ length: 28 }, (_, i) => (i / 28) * Math.PI * 2)
  return (
    <svg className="kolam" viewBox="-110 -52 220 104" aria-hidden="true" focusable="false">
      <g transform="scale(1 .46)" fill="none" stroke="#fffaf0" strokeWidth="1.8" strokeLinecap="round">
        {[100, 90, 62, 20].map((r, i) => (
          <circle key={r} className="kolam__line" pathLength={1} r={r} style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} className="kolam__line" pathLength={1} d={petal} transform={`rotate(${i * 22.5})`} style={{ animationDelay: `${0.5 + i * 0.07}s` }} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} className="kolam__line" pathLength={1} d={small} transform={`rotate(${i * 45})`} style={{ animationDelay: `${1.3 + i * 0.05}s` }} />
        ))}
        {dots.map((a, i) => (
          <circle
            key={i}
            className="kolam__dot"
            cx={Math.sin(a) * 95.5}
            cy={-Math.cos(a) * 95.5}
            r="2.6"
            fill={i % 2 ? '#f6b630' : '#e8742a'}
            stroke="none"
            style={{ animationDelay: `${1.6 + i * 0.035}s` }}
          />
        ))}
        <circle className="kolam__dot" r="6" fill="#e0527a" stroke="none" style={{ animationDelay: '2.2s' }} />
      </g>
    </svg>
  )
}
