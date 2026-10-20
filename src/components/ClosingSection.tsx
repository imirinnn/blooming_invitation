import { siteConfig } from '../config'
import { useInView, useMediaQuery } from '../hooks/useMotion'
import { BlossomField, GARLAND_ITEMS, GarlandVine, OrnamentDivider } from './Botanicals'
import { FloatingPetals } from './FloatingPetals'
import { ReplayIcon } from './Icons'
import { Reveal } from './Reveal'
import { Sparkles } from './Sparkles'

/** Heartfelt finale: as it scrolls into view the garland blooms and petals fall. */
export function ClosingSection({ onReplay }: { onReplay: () => void }) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.25 })
  const small = useMediaQuery('(max-width: 640px)')
  const { headline, blessing } = siteConfig.closing

  return (
    <section ref={ref} className={`section closing${inView ? ' in' : ''}`} aria-labelledby="closing-title">
      <div className="closing__fx" aria-hidden="true">
        <Sparkles count={20} seed={33} />
        {inView && <FloatingPetals mode="burst" local count={small ? 12 : 20} seed={13} />}
      </div>

      <div className="section__inner closing__inner">
        <Reveal className="panel closing__panel">
          <OrnamentDivider className="closing__ornament" />
          <h2 id="closing-title" className="closing__headline">
            <span>{headline[0]}</span> <span>{headline[1]}</span>
          </h2>
          <p className="closing__blessing">{blessing}</p>

          <div className="garland" aria-hidden="true">
            <GarlandVine />
            <BlossomField items={GARLAND_ITEMS} className="field--bloom" />
          </div>

          <p className="closing__sign">
            {siteConfig.title} — {siteConfig.celebrant}
          </p>

          <button type="button" className="btn btn--ghost closing__replay" onClick={onReplay}>
            <ReplayIcon size={16} />
            Replay the opening
          </button>
        </Reveal>

        {siteConfig.credit.show && (
          <p className="credit">
            <a href={siteConfig.credit.url} target="_blank" rel="noopener noreferrer">
              {siteConfig.credit.text}
            </a>
          </p>
        )}
      </div>
    </section>
  )
}
