import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config'
import { useInView, useMediaQuery, usePrefersReducedMotion } from '../hooks/useMotion'
import { assetUrl, vars } from '../utils'
import { BlossomField, HangingVines } from './Botanicals'
import type { FieldItem } from './Botanicals'
import { Reveal } from './Reveal'
import { Sparkles } from './Sparkles'

const isVideo = (src: string) => /\.(webm|mp4|mov|m4v)(\?|#|$)/i.test(src)

const BASE_ROSES: FieldItem[] = [
  { kind: 'leaf', x: 6, y: 90, size: 20, rot: -30 },
  { kind: 'leaf', x: 94, y: 90, size: 20, rot: -150 },
  { kind: 'leaf', x: 30, y: 88, size: 18, rot: -70 },
  { kind: 'leaf', x: 72, y: 88, size: 18, rot: -110 },
  { kind: 'rose', x: 8, y: 97, size: 20, rot: 10 },
  { kind: 'rose', x: 24, y: 100, size: 17, rot: -20 },
  { kind: 'white', x: 38, y: 94, size: 10, rot: 0 },
  { kind: 'rose', x: 50, y: 101, size: 21, rot: 30 },
  { kind: 'white', x: 62, y: 94, size: 10, rot: 20 },
  { kind: 'rose', x: 76, y: 100, size: 17, rot: 12 },
  { kind: 'rose', x: 92, y: 97, size: 20, rot: -35 },
]

/** Ceramic urn overflowing with white flowers (from the template). */
function Urn() {
  const blooms = [
    [50, 22, 0.95], [32, 34, 0.78], [68, 34, 0.78], [20, 52, 0.62], [80, 52, 0.62], [50, 46, 0.85], [38, 62, 0.6], [62, 62, 0.6],
  ]
  const leaves = [
    [50, 80, -90, 1.1], [30, 78, -135, 1], [70, 78, -45, 1], [20, 70, -160, 0.9], [80, 70, -20, 0.9], [50, 70, -90, 0.8],
  ]
  return (
    <svg className="urn" viewBox="0 0 100 180" overflow="visible" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="urn-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8aa08c" />
          <stop offset="0.45" stopColor="#c9d8c8" />
          <stop offset="1" stopColor="#7d937f" />
        </linearGradient>
      </defs>
      {leaves.map(([x, y, r, s], i) => (
        <use key={i} href="#leaf" transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />
      ))}
      {blooms.map(([x, y, s], i) => (
        <use key={i} href="#white" transform={`translate(${x} ${y}) scale(${s})`} />
      ))}
      <path d="M32 172 H68 L72 150 Q88 132 70 112 H30 Q12 132 28 150Z" fill="url(#urn-g)" stroke="rgba(60,80,62,.45)" />
      <ellipse cx="50" cy="112" rx="21" ry="5" fill="#a9bba9" stroke="rgba(60,80,62,.4)" />
      <path d="M26 150 H74" stroke="rgba(255,255,255,.5)" />
      <rect x="28" y="170" width="44" height="8" rx="2" fill="#8aa08c" stroke="rgba(60,80,62,.4)" />
    </svg>
  )
}

/**
 * Arched portrait window styled after the invitation template. The photos listed
 * in config cross-fade with a slow cinematic zoom; images can be swapped for
 * animated assets or videos (see src/config.ts).
 */
export function PortraitGallery() {
  const { photos, alt, objectPosition, seconds } = siteConfig.portrait
  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const [ref, inView] = useInView<HTMLElement>({ once: false, threshold: 0.3 })
  const [state, setState] = useState({ i: 0, prev: -1 })
  const [paused, setPaused] = useState(false)
  const frame = useRef<HTMLDivElement>(null)

  // finish the cross-fade, then forget the outgoing slide
  useEffect(() => {
    if (state.prev < 0) return
    const t = window.setTimeout(() => setState((s) => ({ ...s, prev: -1 })), 1700)
    return () => window.clearTimeout(t)
  }, [state.i, state.prev])

  // auto-advance only while visible
  useEffect(() => {
    if (reduced || paused || !inView || photos.length < 2) return
    const id = window.setInterval(() => setState((s) => ({ i: (s.i + 1) % photos.length, prev: s.i })), seconds * 1000)
    return () => window.clearInterval(id)
  }, [reduced, paused, inView, photos.length, seconds])

  // gentle 3D tilt that follows the pointer (desktop only)
  useEffect(() => {
    const el = frame.current
    if (!el || reduced || !finePointer) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2))
      const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2))
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${(-ny * 3.2).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${(nx * 4.2).toFixed(2)}deg`)
      })
    }
    const onLeave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced, finePointer])

  const go = (n: number) => setState((s) => (s.i === n ? s : { i: n, prev: s.i }))

  return (
    <section
      id="portrait"
      ref={ref}
      className="portrait-sec"
      aria-label={alt}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <Reveal className="arch-wrap">
        <div className="arch" style={vars({ '--sec': seconds })}>
          <div className="arch__vines" aria-hidden="true">
            <HangingVines />
          </div>

          <div className="arch__flowers arch__flowers--l">
            <Urn />
          </div>
          <div className="arch__flowers arch__flowers--r">
            <Urn />
          </div>

          <div ref={frame} className="arch__frame">
            <div className="arch__window">
              {photos.map((src, k) => {
                const url = assetUrl(src)
                const cls = `slide${k === state.i ? ' is-active' : ''}${k === state.prev ? ' is-prev' : ''}`
                const common = { className: 'slide__media', style: { objectPosition } }
                return (
                  <figure key={src} className={cls} style={vars({ '--kx': k % 2 ? '-2.2%' : '2.2%' })} aria-hidden={k !== state.i}>
                    {isVideo(url) ? (
                      <video {...common} src={url} autoPlay={!reduced} muted loop playsInline preload="auto" aria-label={alt} />
                    ) : (
                      <img {...common} src={url} alt={k === state.i ? alt : ''} decoding="async" />
                    )}
                  </figure>
                )
              })}
              <div className="arch__shine" />
              <Sparkles count={9} seed={29} className="arch__sparkles" />
            </div>
          </div>

          <div className="arch__roses" aria-hidden="true">
            <BlossomField items={BASE_ROSES} />
          </div>
        </div>

        {photos.length > 1 && (
          <div className="thumbs" role="group" aria-label="Choose a photo">
            {photos.map((src, k) => (
              <button
                key={src}
                type="button"
                className={`thumb${k === state.i ? ' is-active' : ''}`}
                onClick={() => go(k)}
                aria-label={`Show photo ${k + 1} of ${photos.length}`}
                aria-current={k === state.i}
              >
                <img src={assetUrl(src)} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  )
}
