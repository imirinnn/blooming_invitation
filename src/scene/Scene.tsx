import { useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMotion'
import { Sparkles } from '../components/Sparkles'
import { Floor, Pond, Steps } from './Courtyard'
import { Foreground } from './Foreground'
import { SceneDefs } from './SceneDefs'
import { Sky } from './Sky'
import { Hills, Temple, Trees } from './Temple'
import { useSceneScroll } from './timeline'

/**
 * The fixed, full-screen background. It starts as pure sky; scrolling builds the
 * temple layer by layer (see timeline.ts), then the page content scrolls over it.
 */
export function Scene({ rangoli = false }: { rangoli?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  useSceneScroll(ref, reduced)

  return (
    <div ref={ref} className={`scene${rangoli ? ' is-rangoli' : ''}`} aria-hidden="true">
      <SceneDefs />
      <Sky />

      <div className="cam cam--far">
        <Hills />
        <Trees side="l" />
        <Trees side="r" />
      </div>
      <div className="cam cam--mid">
        <Temple />
      </div>
      <div className="cam cam--near">
        <Floor />
        <Steps />
        <Pond />
      </div>

      <Foreground />
      <Sparkles count={28} seed={5} className="scene__sparkles" />
      <div className="scene__vignette" />
      <div className="scene__veil" />
    </div>
  )
}
