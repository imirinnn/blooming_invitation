import { useCallback, useEffect, useRef, useState } from 'react'
import { SvgDefs } from './components/Botanicals'
import { ClosingSection } from './components/ClosingSection'
import { ContactSection } from './components/ContactSection'
import { EventDetails } from './components/EventDetails'
import { FloatingPetals } from './components/FloatingPetals'
import { HeroSection } from './components/HeroSection'
import { ReplayIcon } from './components/Icons'
import { InvitationIntro } from './components/InvitationIntro'
import type { Phase } from './components/InvitationIntro'
import { MusicToggle } from './components/MusicToggle'
import { PortraitGallery } from './components/PortraitGallery'
import { VenueSection } from './components/VenueSection'
import { useMediaQuery, usePrefersReducedMotion } from './hooks/useMotion'
import { Scene } from './scene/Scene'

/*
  Opening choreography
    0 ms      click  → the carved doors swing open onto the sky      (phase: opening)
    3000 ms          → we "walk through": cover zooms + dissolves, the
                       hero rises, petals shower down                 (phase: leaving)
    4100 ms          → cover removed, page becomes interactive        (phase: open)
*/
export default function App() {
  const [phase, setPhase] = useState<Phase>('closed')
  const [burstKey, setBurstKey] = useState(0)
  const [burst, setBurst] = useState(false)
  const timers = useRef<number[]>([])
  const main = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const small = useMediaQuery('(max-width: 640px)')

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])
  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  // Keep the page still while the cover is showing
  useEffect(() => {
    if (phase === 'open') return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [phase])

  const open = () => {
    if (phase !== 'closed') return
    window.scrollTo(0, 0)
    if (reduced) {
      setPhase('open')
      return
    }
    setPhase('opening')
    later(() => {
      setPhase('leaving')
      setBurstKey((k) => k + 1)
      setBurst(true)
    }, 3000)
    later(() => {
      setPhase('open')
      main.current?.focus({ preventScroll: true })
    }, 4100)
    later(() => setBurst(false), 4100 + 9000)
  }

  const replay = () => {
    clearTimers()
    setBurst(false)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    setPhase('closed')
  }

  const revealed = phase === 'leaving' || phase === 'open'

  return (
    <>
      <SvgDefs />
      <Scene rangoli={phase !== 'closed'} />

      {phase !== 'open' && <InvitationIntro phase={phase} onOpen={open} />}

      <main
        ref={main}
        tabIndex={-1}
        className={`stage${revealed ? ' is-revealed' : ''}`}
        inert={phase !== 'open'}
      >
        <HeroSection />
        {/* scroll distance during which the temple is built layer by layer */}
        <div id="journey" className="journey" aria-hidden="true" />
        <PortraitGallery />
        <EventDetails />
        <VenueSection />
        <ContactSection />
        <ClosingSection onReplay={replay} />
      </main>

      {revealed && <FloatingPetals mode="ambient" count={small ? 7 : 12} seed={2} />}
      {burst && <FloatingPetals key={burstKey} mode="burst" count={small ? 22 : 34} seed={17} />}

      {phase === 'open' && (
        <div className="dock">
          <MusicToggle />
          <button type="button" className="dock__btn" onClick={replay} aria-label="Replay the opening animation" title="Replay opening">
            <ReplayIcon />
          </button>
        </div>
      )}
    </>
  )
}
