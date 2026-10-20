import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config'
import { assetUrl } from '../utils'
import { VolumeIcon, VolumeOffIcon } from './Icons'

/**
 * Optional soft music. Renders nothing until `music.src` is set in config.
 * Never autoplays: audio only starts when the visitor presses the button.
 */
export function MusicToggle() {
  const { src, volume } = siteConfig.music
  const audio = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(
    () => () => {
      audio.current?.pause()
      audio.current = null
    },
    [],
  )

  if (!src) return null

  const toggle = async () => {
    if (!audio.current) {
      const a = new Audio(assetUrl(src))
      a.loop = true
      a.volume = volume
      a.addEventListener('pause', () => setPlaying(false))
      a.addEventListener('play', () => setPlaying(true))
      audio.current = a
    }
    const a = audio.current
    if (a.paused) {
      try {
        await a.play()
      } catch {
        setPlaying(false) // browser refused or file missing — stay silent, stay calm
      }
    } else {
      a.pause()
    }
  }

  return (
    <button
      type="button"
      className="dock__btn"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause background music' : 'Play soft background music'}
      title={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? <VolumeIcon /> : <VolumeOffIcon />}
    </button>
  )
}
