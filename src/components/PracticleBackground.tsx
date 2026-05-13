import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

export default function ParticleBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: {
        value: 18,
        density: { enable: true },
      },
      shape: {
        type: 'text',
        options: {
          text: {
            value: ['⚽'],
            font: { size: 20 },
          },
        },
      },
      opacity: {
        value: { min: 0.08, max: 0.2 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      size: {
        value: { min: 10, max: 22 },
      },
      move: {
        enable: true,
        speed: { min: 0.4, max: 1.2 },
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
      rotate: {
        value: { min: 0, max: 360 },
        animation: {
          enable: true,
          speed: 3,
          sync: false,
        },
      },
    },
    detectRetina: true,
  }

  if (!ready) return null

  return (
    <Particles
      id="hero-particles"
      options={options}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}