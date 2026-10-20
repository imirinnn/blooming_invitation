/** Gradients shared by every scene layer (stone, wood, gold, water, clouds…). */
export function SceneDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {/* warm sandstone */}
        <linearGradient id="st-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ecd0a2" />
          <stop offset="1" stopColor="#d4a66c" />
        </linearGradient>
        <linearGradient id="st-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e2bb" />
          <stop offset="1" stopColor="#e3bf86" />
        </linearGradient>
        <linearGradient id="st-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9c78f" />
          <stop offset="1" stopColor="#c8935a" />
        </linearGradient>
        <linearGradient id="st-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6a4527" />
          <stop offset="1" stopColor="#3b2412" />
        </linearGradient>
        <linearGradient id="st-door" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a2b14" />
          <stop offset="1" stopColor="#1f1008" />
        </linearGradient>
        <linearGradient id="gold-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8e08a" />
          <stop offset="1" stopColor="#c08a2c" />
        </linearGradient>
        {/* pillars */}
        <linearGradient id="pl-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2c190c" />
          <stop offset="0.35" stopColor="#6b4324" />
          <stop offset="0.52" stopColor="#80532e" />
          <stop offset="0.75" stopColor="#573620" />
          <stop offset="1" stopColor="#26150a" />
        </linearGradient>
        <linearGradient id="pl-stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d8b8a0" />
          <stop offset="0.4" stopColor="#f7e3d1" />
          <stop offset="0.55" stopColor="#fff4e8" />
          <stop offset="1" stopColor="#e5c5ab" />
        </linearGradient>
        <linearGradient id="pl-bracket" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b3f1d" />
          <stop offset="1" stopColor="#d47f3c" />
        </linearGradient>
        {/* land + water */}
        <linearGradient id="hill-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9d0c6" />
          <stop offset="1" stopColor="#8cbba9" />
        </linearGradient>
        <linearGradient id="hill-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#79ad92" />
          <stop offset="1" stopColor="#5d9279" />
        </linearGradient>
        <radialGradient id="tree-a" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#5fa04c" />
          <stop offset="1" stopColor="#2b6a37" />
        </radialGradient>
        <radialGradient id="tree-b" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#4a8e47" />
          <stop offset="1" stopColor="#1f5230" />
        </radialGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fb3b8" />
          <stop offset="1" stopColor="#1f7d8c" />
        </linearGradient>
        <linearGradient id="cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dbe9f5" />
        </linearGradient>
      </defs>
    </svg>
  )
}
