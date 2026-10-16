'use client'

import { useEffect } from 'react'

// Marks the [data-step] block crossing the middle of the screen with data-active,
// so the sticky case study can highlight the block being read.
export default function ActiveSteps({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId)
    const steps = root ? Array.from(root.querySelectorAll<HTMLElement>('[data-step]')) : []
    if (!steps.length || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          steps.forEach(step => step.toggleAttribute('data-active', step === entry.target))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    steps.forEach(step => io.observe(step))
    return () => io.disconnect()
  }, [targetId])

  return null
}
