# A Celebration of Blooming — DHANASRI.M

An interactive digital invitation in the style of a traditional Indian invitation
card. It opens with a carved door; behind it the page starts as **pure sky**, and
as you scroll an Indian temple is **built layer by layer** — hills, trees, the
gopuram tier by tier, courtyard, pond, pillars, ivy, marigold garlands, a flower
rangoli and roses. Her photographs sit in an animated arch above the event
details, live countdown, directions and contact buttons.

React + Vite + TypeScript, plain CSS, no runtime dependencies besides React.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173  (also on your phone via the "Network" URL)
npm run build      # type-checks, then writes the production site to dist/
npm run preview    # serve dist/ locally to test the production build
```

Requires Node 18+.

## Where to edit things — one file: `src/config.ts`

| What | Key |
|---|---|
| Date / time / venue text | `event.dateLabel`, `event.timeLabel`, `event.venue` |
| Countdown target (Asia/Kolkata, +05:30) | `event.startsAt` |
| Phone number, WhatsApp on/off | `contact.phone`, `contact.countryCode`, `contact.showWhatsApp` |
| Google Maps link | `mapsUrl` |
| **Photos / animation** | `portrait.photos`, `portrait.seconds`, `portrait.objectPosition` |
| Cover quote (left / right of the door) | `introLines` |
| Builder credit in footer | `credit` |
| Background music | `music.src` |

## Photos

Her three photos are in `public/images/` (`dhanasri-1.jpg` … `dhanasri-3.jpg`) and
listed in `portrait.photos`. They cross-fade with a slow cinematic zoom, only
while the arch is on screen; hovering pauses them, and the small round buttons
under the arch jump to a photo.

* **Replace / add / reorder:** drop files into `public/images/` and edit the list.
* **One photo only:** keep a single entry — it just gets the slow zoom.
* **Crop:** change `portrait.objectPosition` (e.g. `'center 12%'`) to keep her face
  nicely inside the arch.
* **Animated assets:** an entry may also be `.webp`, `.gif`, `.apng`, or a video
  (`.webm`, `.mp4`, `.mov`). Videos are detected from the extension and play
  muted, looping and inline.

## How the temple scene works

`src/scene/timeline.ts` lists every layer with a `[start, end]` window along the
scroll (0 → 1 across the hero + the empty "journey" space). Edit those numbers to
reorder or retime layers — e.g. make the pond appear earlier. The scroll is
smoothed so even a notchy mouse wheel feels fluid. The drawing itself lives in
`src/scene/*.tsx` (each temple tier is its own small SVG so it can rise in on
its own); colours are in `src/scene/SceneDefs.tsx`.

The length of the journey is `.journey { height: 280svh }` in `src/styles.css`.

## Fonts

The title uses the *Great Vibes* script (Google Fonts, loaded in `index.html`; set in `--display` in `src/styles.css`). Try `Allura` or `Parisienne` there for a different look.

## Accessibility & performance

* `prefers-reduced-motion`: the finished scene is shown statically, particles are
  hidden, photos don't auto-advance.
* Animation is transform/opacity only; petals and sparkles are CSS-only.
* Music never autoplays — set `music.src` (file in `public/audio/`) and a
  speaker button appears.

## Publishing

1. `npm run build` → upload the `dist/` folder to any static host (Netlify,
   Vercel, GitHub Pages, Cloudflare Pages…).
2. If hosted in a sub-folder, set `base` in `vite.config.ts`.
3. Test the Maps and phone buttons on a real phone after deploying.
