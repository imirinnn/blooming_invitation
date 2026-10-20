import { siteConfig } from '../config'
import { vars } from '../utils'
import { LotusEmblem, OrnamentDivider } from './Botanicals'
import { ChevronDownIcon } from './Icons'

/** First screen: just the sky, with the invitation title floating in it. */
export function HeroSection() {
  let wordIndex = 0

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <LotusEmblem className="hero__lotus rise" />
        <p className="script hero__eyebrow rise" style={vars({ '--d': '0.15s' })}>
          You are warmly invited to
        </p>

        <h1 id="hero-title" className="hero__title">
          {siteConfig.titleLines.map((line, li) => (
            <span className="line" key={li}>
              {line.map((word, wi) => {
                const d = 0.3 + wordIndex++ * 0.16
                return (
                  <span key={word}>
                    <span
                      className={`word rise${word === 'of' ? ' word--of' : ''}${word === 'Blooming' ? ' word--accent' : ''}`}
                      style={vars({ '--d': `${d}s` })}
                    >
                      {word}
                    </span>
                    {wi < line.length - 1 ? ' ' : ''}
                  </span>
                )
              })}
            </span>
          ))}
        </h1>

        <h2 className="hero__name rise" style={vars({ '--d': '0.85s' })}>
          {siteConfig.celebrant}
        </h2>
        <OrnamentDivider className="hero__ornament rise" />
        <p className="hero__line rise" style={vars({ '--d': '1.15s' })}>
          {siteConfig.heroLine}
        </p>
      </div>

      <a className="hero__cue rise" style={vars({ '--d': '1.6s' })} href="#portrait" aria-label="Scroll down to begin the journey">
        <span>Scroll</span>
        <ChevronDownIcon size={18} />
      </a>
    </section>
  )
}
