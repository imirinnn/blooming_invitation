/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EVERYTHING YOU MAY WANT TO EDIT LIVES IN THIS ONE FILE
 *  (event details · portrait photos · map link · phone · music)
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type PortraitConfig = {
  /**
   * ▼▼▼ PORTRAIT PHOTOS ▼▼▼
   * Files live in  public/images/  and are listed here in the order they should
   * appear. They cross-fade with a slow cinematic zoom.
   *
   *  • Add, remove or re-order photos simply by editing this list.
   *  • A photo can also be an ANIMATED asset: .webp .gif .apng, or a video
   *    (.webm / .mp4 / .mov — detected from the extension, plays muted + looping).
   *  • Use ONE entry for a single static portrait.
   */
  photos: string[]
  /** Describe the photos for screen readers. */
  alt: string
  /** CSS object-position for every photo, to keep the face framed in the arch. */
  objectPosition: string
  /** Seconds each photo stays on screen. */
  seconds: number
}

export const siteConfig = {
  title: 'A Celebration of Blooming',
  titleLines: [
    ['A', 'Celebration'],
    ['of', 'Blooming'],
  ] as const,
  celebrant: 'DHANASRI.M',

  /** Cover quote: first line sits left of the door, second line right of it. */
  introLines: ['A little invitation,', 'a beautiful celebration...'] as [string, string],
  heroLine: 'With joy in our hearts, we invite you to celebrate a beautiful new bloom.',

  event: {
    dateLabel: 'Sunday, 1 November 2026',
    timeLabel: '11:00 AM – 3:00 PM',
    venue: 'SRI SELVI MAHAL',
    /** Start time used by the countdown. +05:30 = Asia/Kolkata (IST). */
    startsAt: '2026-11-01T11:00:00+05:30',
    timeZone: 'Asia/Kolkata',
  },

  contact: {
    /** Shown on the page exactly like this. */
    phone: '9865661582',
    /** Used to build the +91 phone / WhatsApp links. */
    countryCode: '91',
    /** Set to false to hide the WhatsApp button. */
    showWhatsApp: true,
  },

  /** Authoritative destination link for “Get Directions”. */
  mapsUrl: 'https://maps.app.goo.gl/j7HDvqBx8jBUDsRc8?g_st=ipc',

  portrait: {
    photos: ['/images/dhanasri-1.jpg', '/images/dhanasri-2.jpg', '/images/dhanasri-3.jpg'],
    alt: 'Portrait of DHANASRI.M',
    objectPosition: 'center 18%',
    seconds: 5.5,
  } as PortraitConfig,

  closing: {
    headline: ['Every bloom tells a story.', "Let's celebrate hers."],
    blessing: 'With love, we look forward to celebrating with you.',
  },

  /** Website-builder credit shown in the footer. Set `show: false` to hide it. */
  credit: {
    show: true,
    text: 'Website built and designed by IK Studio',
    url: 'https://claude.ai',
  },
  music: {
    /**
     * Optional soft instrumental. Drop an MP3 into public/audio/ and set e.g.
     *     src: '/audio/soft-music.mp3',
     * While this is empty the music button is hidden. Music NEVER autoplays —
     * visitors start it themselves with the button.
     */
    src: '' as string,
    volume: 0.35,
  },
}

export type SiteConfig = typeof siteConfig
