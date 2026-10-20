/** Gold-carved wooden door leaf: three panels, diamond motifs, studs and a ring handle. */
function DoorLeafArt() {
  const panels = [
    { y: 14, h: 82 },
    { y: 104, h: 92 },
    { y: 204, h: 84 },
  ]
  return (
    <svg viewBox="0 0 100 300" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <rect width="100" height="300" fill="url(#pl-wood)" />
      <rect x="0" y="0" width="100" height="300" fill="rgba(255,200,120,.06)" />
      {panels.map((p, i) => {
        const cy = p.y + p.h / 2
        return (
          <g key={i} fill="none" stroke="url(#gold-v)" strokeWidth="1.2">
            <rect x="10" y={p.y} width="82" height={p.h} rx="3" />
            <rect x="15" y={p.y + 5} width="72" height={p.h - 10} rx="2" strokeWidth=".7" opacity=".8" />
            <path d={`M51 ${cy - p.h * 0.34} L74 ${cy} L51 ${cy + p.h * 0.34} L28 ${cy}Z`} />
            <path d={`M51 ${cy - p.h * 0.2} L63 ${cy} L51 ${cy + p.h * 0.2} L39 ${cy}Z`} strokeWidth=".8" />
            <circle cx="51" cy={cy} r="4" fill="url(#gold-v)" stroke="none" />
            {[22, 80].map((sx) => (
              <g key={sx}>
                <circle cx={sx} cy={p.y + 10} r="1.8" fill="url(#gold-v)" stroke="none" />
                <circle cx={sx} cy={p.y + p.h - 10} r="1.8" fill="url(#gold-v)" stroke="none" />
              </g>
            ))}
          </g>
        )
      })}
      <path d="M97 0 V300" stroke="url(#gold-v)" strokeWidth="3" />
      <circle cx="88" cy="152" r="6" fill="none" stroke="url(#gold-v)" strokeWidth="2" />
      <circle cx="88" cy="152" r="2" fill="url(#gold-v)" />
    </svg>
  )
}

/**
 * Carved double door. Toggling `open` swings the leaves inward and floods the
 * doorway with sky light — the first glimpse of the scene that follows.
 */
export function DoorAnimation({ open }: { open: boolean }) {
  return (
    <div className={`door${open ? ' is-open' : ''}`} aria-hidden="true">
      <div className="door__arch">
        <div className="door__light">
          <span className="door__sun" />
        </div>
        <div className="door__leaf door__leaf--l">
          <DoorLeafArt />
        </div>
        <div className="door__leaf door__leaf--r">
          <DoorLeafArt />
        </div>
      </div>
    </div>
  )
}
