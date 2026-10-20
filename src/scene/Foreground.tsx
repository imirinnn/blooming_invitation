import { BlossomField, CORNER_ROSES, HangingVines, MarigoldGarlands } from '../components/Botanicals'

/** Carved pillar with a flared capital and a curved corbel reaching toward the centre. */
export function Pillar({ variant = 'wood', flip = false }: { variant?: 'wood' | 'stone'; flip?: boolean }) {
  const shaft = variant === 'wood' ? 'url(#pl-wood)' : 'url(#pl-stone)'
  const edge = variant === 'wood' ? 'rgba(20,10,4,.5)' : 'rgba(120,80,50,.4)'
  return (
    <svg
      className={`pillar-art${flip ? ' pillar-art--flip' : ''}`}
      viewBox="0 0 200 1000"
      preserveAspectRatio="none"
      overflow="visible"
      aria-hidden="true"
      focusable="false"
    >
      {/* corbel */}
      <path d="M128 84 C196 76 256 48 336 14 L344 40 C268 78 200 126 128 164Z" fill="url(#pl-bracket)" stroke="url(#gold-v)" strokeWidth="2" />
      <path d="M150 104 C206 98 252 80 306 56" fill="none" stroke="rgba(248,224,138,.7)" strokeWidth="1.6" />
      {/* capital */}
      <path d="M38 70 H162 L154 100 H46Z" fill={shaft} stroke={edge} />
      <path d="M52 100 H148 L140 132 H60Z" fill={shaft} stroke={edge} />
      <path d="M62 132 H138 L130 172 H70Z" fill={shaft} stroke={edge} />
      <path d="M38 70 H162" stroke="url(#gold-v)" strokeWidth="3" />
      <path d="M52 100 H148" stroke="url(#gold-v)" strokeWidth="2" />
      {/* shaft */}
      <rect x="70" y="172" width="60" height="710" fill={shaft} stroke={edge} />
      {[84, 100, 116].map((x) => (
        <path key={x} d={`M${x} 176 V878`} stroke="rgba(255,235,200,.14)" strokeWidth="1.2" />
      ))}
      {[300, 520, 740].map((y) => (
        <g key={y}>
          <rect x="63" y={y} width="74" height="13" rx="3" fill="url(#gold-v)" stroke="rgba(120,80,20,.5)" strokeWidth=".8" />
          {Array.from({ length: 8 }, (_, i) => (
            <circle key={i} cx={70 + i * 8.6} cy={y + 6.5} r="1.6" fill="rgba(255,248,220,.75)" />
          ))}
        </g>
      ))}
      {/* base */}
      <path d="M52 882 H148 L158 924 H42Z" fill={shaft} stroke={edge} />
      <rect x="34" y="924" width="132" height="80" fill={shaft} stroke={edge} />
      <path d="M34 924 H166" stroke="url(#gold-v)" strokeWidth="2.5" />
    </svg>
  )
}

/** Everything that frames the scene: pillars, ivy, garlands, corner roses. */
export function Foreground() {
  return (
    <>
      <div className="fg fg--pillar fg--pillar-l">
        <Pillar />
      </div>
      <div className="fg fg--pillar fg--pillar-r">
        <Pillar flip />
      </div>
      <div className="fg fg--garlands">
        <MarigoldGarlands />
      </div>
      <div className="fg fg--vines">
        <HangingVines />
      </div>
      <div className="fg fg--roses fg--roses-l">
        <BlossomField items={CORNER_ROSES} />
      </div>
      <div className="fg fg--roses fg--roses-r">
        <BlossomField items={CORNER_ROSES} />
      </div>
    </>
  )
}
