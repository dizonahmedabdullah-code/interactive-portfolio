'use client'

import { useEffect, useRef } from 'react'

const format = (n: number, prefix: string, suffix: string) => `${prefix}${Math.round(n).toLocaleString('en-US')}${suffix}`
// Exponential ease-out: quick at first, then a long, soft landing on the final number.
const easeOutExpo = (p: number) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p))

// Counts up once, the first time the number is mostly on screen. The server renders the
// final value, so it is correct without scripts and with reduced motion. Frames write the
// text directly instead of re-rendering through React.
export default function CountUp({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.textContent = format(0, prefix, suffix)
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const duration = 1800
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          el.textContent = format(value * easeOutExpo(p), prefix, suffix)
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
      el.textContent = format(value, prefix, suffix)
    }
  }, [value, prefix, suffix])

  return (
    <span ref={ref} aria-hidden="true" className="tabular-nums">
      {format(value, prefix, suffix)}
    </span>
  )
}
