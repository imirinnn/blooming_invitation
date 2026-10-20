import { siteConfig } from '../config'
import { NavigationIcon } from './Icons'
import { Reveal } from './Reveal'

/** Decorative “garden map” illustration — NOT a real map; no coordinates are implied. */
function MapIllustration() {
  return (
    <svg className="map__svg" viewBox="0 0 400 340" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="map-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdf1e0" />
          <stop offset="1" stopColor="#f6e2c8" />
        </linearGradient>
        <linearGradient id="map-pin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e5896a" />
          <stop offset="1" stopColor="#a8452f" />
        </linearGradient>
      </defs>
      <rect width="400" height="340" fill="url(#map-bg)" />
      <g fill="#dbe6c4" opacity=".95">
        <path d="M-10 250 C60 210 130 270 210 240 S350 200 410 235 V350 H-10Z" />
        <path d="M-10 -10 H250 C262 22 214 38 168 54 C118 72 58 96 -10 78Z" />
        <ellipse cx="335" cy="95" rx="70" ry="42" />
      </g>
      <g fill="none" stroke="#b98a3e" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 9">
        <path d="M-10 190 C90 150 130 230 210 190 S330 130 410 170" />
        <path d="M60 350 C100 280 150 250 200 200" />
        <path d="M340 350 C310 290 270 250 214 204" />
      </g>
      <g fill="none" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" opacity=".7">
        <path d="M-10 190 C90 150 130 230 210 190 S330 130 410 170" />
      </g>
      {[[70, 130, 12], [112, 112, 9], [300, 270, 13], [345, 245, 9], [48, 285, 10], [360, 160, 8]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? '#a9c37a' : '#8fb25f'} />
      ))}
      <g className="map__pulse">
        <ellipse cx="205" cy="212" rx="46" ry="14" fill="none" stroke="#d9824f" strokeWidth="1.5" />
      </g>
      <g className="map__pulse map__pulse--2">
        <ellipse cx="205" cy="212" rx="46" ry="14" fill="none" stroke="#d9824f" strokeWidth="1.5" />
      </g>
      <ellipse cx="205" cy="212" rx="16" ry="5" fill="rgba(120,60,30,.25)" />
      <g className="map__pin">
        <path d="M205 212 C175 172 168 156 168 138 a37 37 0 0 1 74 0 c0 18 -7 34 -37 74Z" fill="url(#map-pin)" stroke="#fff" strokeWidth="3" />
        <circle cx="205" cy="138" r="15" fill="#fff7ee" />
        <circle cx="205" cy="138" r="6" fill="#c4943a" />
      </g>
    </svg>
  )
}

export function VenueSection() {
  return (
    <section id="venue" className="section venue" aria-labelledby="venue-title">
      <div className="section__inner">
        <Reveal className="panel venue__panel">
          <div className="map">
            <MapIllustration />
          </div>
          <div className="venue__text">
            <p className="eyebrow">Visit the Venue</p>
            <h2 id="venue-title" className="h2">
              Find Your Way
            </h2>
            <p className="venue__name">{siteConfig.event.venue}</p>
            <p className="venue__note">Tap below to open the exact location in Google Maps.</p>
            <a className="btn" href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
              <NavigationIcon size={18} />
              Get Directions
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
