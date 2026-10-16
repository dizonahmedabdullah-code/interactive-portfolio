'use client'

import { useEffect, useRef, useState } from 'react'

const format = (n: number, prefix: string, suffix: string) => `${prefix}${Math.round(n).toLocaleString('en-US')}${suffix}`

// Counts up once, the first time the number is mostly on screen. The server renders the
// final value, so it is correct without scripts and with reduced motion.
export default function CountUp({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setShown(0)
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const duration = 1400
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          setShown(value * (1 - Math.pow(1 - p, 3)))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref} aria-hidden="true" className="tabular-nums">
      {format(shown, prefix, suffix)}
    </span>
  )
}
