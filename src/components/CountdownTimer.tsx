import { useEffect, useState } from 'react'
import { siteConfig } from '../config'
import { Rose } from './Botanicals'

const TARGET = Date.parse(siteConfig.event.startsAt) // ISO string carries +05:30 (Asia/Kolkata)

function remaining(now: number) {
  const diff = Math.max(0, TARGET - now)
  const s = Math.floor(diff / 1000)
  return {
    done: diff <= 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Live countdown, recalculated from the real clock every second (no drift). */
export function CountdownTimer() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    let id = 0
    const tick = () => {
      const t = Date.now()
      setNow(t)
      if (t >= TARGET) return // nothing left to count — stop the timer
      id = window.setTimeout(tick, 1000 - (t % 1000) + 5) // align to the next second
    }
    tick()
    return () => window.clearTimeout(id)
  }, [])

  const r = remaining(now)

  if (r.done) {
    return (
      <div className="count-done" role="status">
        <Rose className="count-done__bloom" />
        <p>The celebration has begun — welcome to the bloom!</p>
      </div>
    )
  }

  const cells: [string, number][] = [
    ['Days', r.days],
    ['Hours', r.hours],
    ['Minutes', r.minutes],
    ['Seconds', r.seconds],
  ]

  return (
    <div className="count" role="timer" aria-label="Time remaining until the celebration">
      {cells.map(([label, value]) => (
        <div className="count__cell" key={label}>
          <span className="count__num" key={value}>
            {pad(value)}
          </span>
          <span className="count__label">{label}</span>
        </div>
      ))}
    </div>
  )
}
