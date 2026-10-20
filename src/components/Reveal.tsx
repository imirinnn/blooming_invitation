import type { ReactNode } from 'react'
import { useInView } from '../hooks/useMotion'
import { vars } from '../utils'

/** Fades + lifts its children into place when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal${inView ? ' in' : ''} ${className}`}
      style={vars({ '--d': `${delay}s` })}
    >
      {children}
    </div>
  )
}
