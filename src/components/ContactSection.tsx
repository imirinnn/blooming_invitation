import { siteConfig } from '../config'
import { OrnamentDivider } from './Botanicals'
import { ChatIcon, PhoneIcon } from './Icons'
import { Reveal } from './Reveal'

export function ContactSection() {
  const { phone, countryCode, showWhatsApp } = siteConfig.contact
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="section__inner">
        <Reveal className="panel contact__panel">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="h2">
            We would love to hear from you
          </h2>
          <OrnamentDivider className="contact__ornament" />
          <a className="contact__number" href={`tel:+${countryCode}${phone}`} aria-label={`Call ${phone}`}>
            {phone}
          </a>
          <div className="contact__actions">
            <a className="btn" href={`tel:+${countryCode}${phone}`}>
              <PhoneIcon size={18} />
              Contact Us
            </a>
            {showWhatsApp && (
              <a className="btn btn--ghost" href={`https://wa.me/${countryCode}${phone}`} target="_blank" rel="noopener noreferrer">
                <ChatIcon size={18} />
                WhatsApp
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
