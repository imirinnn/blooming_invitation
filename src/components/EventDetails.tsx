import type { ReactNode } from 'react'
import { siteConfig } from '../config'
import { GoldSprig, OrnamentDivider } from './Botanicals'
import { CountdownTimer } from './CountdownTimer'
import { CalendarIcon, ClockIcon, PhoneIcon, PinIcon } from './Icons'
import { Reveal } from './Reveal'

const { event, contact } = siteConfig

const ITEMS: { label: string; icon: ReactNode; value: ReactNode }[] = [
  { label: 'Date', icon: <CalendarIcon />, value: event.dateLabel },
  { label: 'Time', icon: <ClockIcon />, value: event.timeLabel },
  { label: 'Venue', icon: <PinIcon />, value: event.venue },
  {
    label: 'Contact',
    icon: <PhoneIcon />,
    value: <a href={`tel:+${contact.countryCode}${contact.phone}`}>{contact.phone}</a>,
  },
]

export function EventDetails() {
  return (
    <section id="details" className="section details" aria-labelledby="details-title">
      <div className="section__inner">
        <Reveal className="panel invite-card">
          <GoldSprig className="sprig--tl" />
          <GoldSprig className="sprig--tr" />
          <GoldSprig className="sprig--bl" />
          <GoldSprig className="sprig--br" />

          <p className="eyebrow">The Details</p>
          <h2 id="details-title" className="h2">
            Save the Date
          </h2>
          <p className="invite-card__title">
            <span>{siteConfig.title}</span>
            <strong>{siteConfig.celebrant}</strong>
          </p>
          <OrnamentDivider className="invite-card__ornament" />

          <dl className="details__list">
            {ITEMS.map((it, i) => (
              <Reveal key={it.label} delay={0.2 + i * 0.12} className="detail">
                <dt>
                  <span className="detail__icon">{it.icon}</span>
                  {it.label}
                </dt>
                <dd>{it.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Reveal>

        <Reveal className="panel countdown" delay={0.1}>
          <p className="script countdown__script">Until we bloom together</p>
          <CountdownTimer />
        </Reveal>
      </div>
    </section>
  )
}
