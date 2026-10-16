'use client'

import { useEffect } from 'react'

// Adds .is-in to every [data-reveal] element as it scrolls into view (see globals.css).
// The hidden state only exists when motion is allowed, so this is a no-op otherwise.
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'))
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
