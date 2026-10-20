import { siteConfig } from '../config'
import { useMediaQuery } from '../hooks/useMotion'
import { Pillar } from '../scene/Foreground'
import { BrassLamp, CoverLeaves, Kolam } from './CoverArt'
import { BlossomField, CORNER_ROSES, HangingVines, LotusEmblem } from './Botanicals'
import { DoorAnimation } from './DoorAnimation'
import { FloatingPetals } from './FloatingPetals'
import { Sparkles } from './Sparkles'

export type Phase = 'closed' | 'opening' | 'leaving' | 'open'

/** Full-screen cover: a closed carved door and “Open Your Invitation”. */
export function InvitationIntro({ phase, onOpen }: { phase: Phase; onOpen: () => void }) {
  const small = useMediaQuery('(max-width: 640px)')
  const opening = phase !== 'closed'

  return (
    <section
      className={`intro${opening ? ' is-opening' : ''}${phase === 'leaving' ? ' intro--leaving' : ''}`}
      aria-label="Invitation cover"
    >
      <CoverLeaves />
      <div className="intro__pillar intro__pillar--l">
        <Pillar variant="stone" />
      </div>
      <div className="intro__pillar intro__pillar--r">
        <Pillar variant="stone" flip />
      </div>
      <div className="intro__vines">
        <HangingVines />
      </div>
      <div className="intro__floor" />
      <Kolam />
      <div className="intro__roses intro__roses--l">
        <BlossomField items={CORNER_ROSES} />
      </div>
      <div className="intro__roses intro__roses--r">
        <BlossomField items={CORNER_ROSES} />
      </div>
      <Sparkles count={small ? 10 : 18} seed={11} />
      <FloatingPetals count={small ? 6 : 10} local seed={5} />

      <div className="intro__content">
        <LotusEmblem className="intro__lotus" />
        <div className="intro__row">
          <div className="intro__side intro__side--l">
            <p className="intro__msg">{siteConfig.introLines[0]}</p>
            <BrassLamp className="intro__lamp" />
          </div>
          <DoorAnimation open={opening} />
          <div className="intro__side intro__side--r">
            <p className="intro__msg">{siteConfig.introLines[1]}</p>
            <BrassLamp className="intro__lamp" />
          </div>
        </div>
        <button type="button" className="btn intro__btn" onClick={onOpen} disabled={opening} autoFocus>
          Open Your Invitation
        </button>
      </div>
    </section>
  )
}
