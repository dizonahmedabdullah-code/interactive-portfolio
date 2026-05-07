'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Droplet {
  angle: number
  dist: number
  hueShift: number
  size: number
}

interface Splash {
  id: number
  x: number
  y: number
  hue: number
  droplets: Droplet[]
}

interface MouseEffectProps {
  glowRef: React.RefObject<HTMLDivElement | null>
  isDark: boolean
}

function makeDroplets(): Droplet[] {
  return Array.from({ length: 8 }, (_, i) => ({
    angle: (i / 8) * Math.PI * 2 + ((i * 7 + 3) % 13) / 13 * 0.6 - 0.3,
    dist: 28 + ((i * 11 + 5) % 17) * 3.5,
    hueShift: (i * 28) % 90,
    size: 4 + (i % 3) * 2,
  }))
}

export default function MouseEffect({ glowRef, isDark }: MouseEffectProps) {
  const hueRef = useRef(0)
  const mousePosRef = useRef({ x: -9999, y: -9999 })
  const activeRef = useRef(false)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const rafRef = useRef<number>()
  const [splashes, setSplashes] = useState<Splash[]>([])
  const nextIdRef = useRef(0)

  // RAF loop: advance hue + repaint gradient
  useEffect(() => {
    const tick = () => {
      hueRef.current = (hueRef.current + 0.55) % 360

      if (glowRef.current && activeRef.current) {
        const { x, y } = mousePosRef.current
        const h1 = hueRef.current
        const h2 = (h1 + 55) % 360
        const h3 = (h1 + 115) % 360
        const a1 = isDark ? 0.14 : 0.09
        const a2 = isDark ? 0.09 : 0.055

        glowRef.current.style.background = [
          `radial-gradient(560px at ${x}px ${y}px, hsla(${h1},100%,62%,${a1}), transparent 55%)`,
          `radial-gradient(340px at ${x + 55}px ${y - 38}px, hsla(${h2},100%,62%,${a2}), transparent 55%)`,
          `radial-gradient(440px at ${x - 62}px ${y + 48}px, hsla(${h3},100%,62%,${a2}), transparent 55%)`,
        ].join(',')
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [glowRef, isDark])

  // Mouse tracking → show / fade glow
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }

      if (!activeRef.current) {
        activeRef.current = true
        if (glowRef.current) glowRef.current.style.opacity = '1'
      }

      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
      fadeTimerRef.current = setTimeout(() => {
        activeRef.current = false
        if (glowRef.current) glowRef.current.style.opacity = '0'
      }, 2200)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
  }, [glowRef])

  // Click → liquid splash
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const id = nextIdRef.current++
      setSplashes(prev => [
        ...prev,
        { id, x: e.clientX, y: e.clientY, hue: hueRef.current, droplets: makeDroplets() },
      ])
      setTimeout(() => setSplashes(prev => prev.filter(s => s.id !== id)), 950)
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <AnimatePresence>
      {splashes.map(splash => (
        <div
          key={splash.id}
          style={{
            position: 'fixed',
            left: splash.x,
            top: splash.y,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          {/* Expanding rings */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                border: `${1.8 - i * 0.4}px solid hsla(${(splash.hue + i * 32) % 360},100%,65%,0.88)`,
              }}
              initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.95 }}
              animate={{
                width: 72 + i * 52,
                height: 72 + i * 52,
                x: -(36 + i * 26),
                y: -(36 + i * 26),
                opacity: 0,
              }}
              transition={{ duration: 0.52 + i * 0.13, ease: 'easeOut', delay: i * 0.04 }}
            />
          ))}

          {/* Scattered droplets */}
          {splash.droplets.map((d, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: d.size,
                height: d.size,
                borderRadius: '50%',
                background: `hsla(${(splash.hue + d.hueShift) % 360},100%,65%,0.92)`,
                boxShadow: `0 0 ${d.size * 2}px hsla(${(splash.hue + d.hueShift) % 360},100%,65%,0.45)`,
              }}
              initial={{ x: -(d.size / 2), y: -(d.size / 2), opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos(d.angle) * d.dist - d.size / 2,
                y: Math.sin(d.angle) * d.dist - d.size / 2,
                opacity: 0,
                scale: 0.15,
              }}
              transition={{ duration: 0.42 + i * 0.025, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
      ))}
    </AnimatePresence>
  )
}
