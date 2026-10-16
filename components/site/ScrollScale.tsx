'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// Grows its child from 1.0 to 1.04 over the first screen of scrolling. Browsers with
// scroll-linked CSS animations do it off the main thread (.scroll-scale in globals.css);
// this script is only the fallback, eased toward the target so wheel steps don't jump.
export default function ScrollScale({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.CSS?.supports?.('animation-timeline: scroll()')) return

    let raf = 0
    let current = -1
    const target = () => Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
    const tick = () => {
      const goal = target()
      current = current < 0 ? goal : current + (goal - current) * 0.18
      if (Math.abs(goal - current) < 0.0005) current = goal
      el.style.transform = `scale(${1 + 0.04 * current})`
      raf = current === goal ? 0 : requestAnimationFrame(tick)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className={`scroll-scale origin-[50%_30%] will-change-transform ${className}`}>
      {children}
    </div>
  )
}
