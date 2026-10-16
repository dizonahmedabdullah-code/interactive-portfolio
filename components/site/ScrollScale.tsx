'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// Grows its child from 1.0 to 1.04 over the first screen of scrolling. Off with reduced motion.
export default function ScrollScale({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
      el.style.transform = `scale(${1 + 0.04 * p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className={`origin-[50%_30%] will-change-transform ${className}`}>
      {children}
    </div>
  )
}
