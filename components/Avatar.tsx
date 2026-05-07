'use client'

import { useEffect, useRef, memo, useCallback } from 'react'
import { motion } from 'framer-motion'

const TOTAL_FRAMES = 1494
const INITIAL_FRAME = 10
const LERP_SPEED = 0.05
const PRELOAD_BATCH = 40
const PRELOAD_INTERVAL_MS = 180

// Source frame dimensions (1118×1080) — crop to centered 1080×1080 square
const SRC_X = 19
const SRC_S = 1080

export type AvatarState = 'idle' | 'thinking' | 'talking'

interface AvatarProps {
  state?: AvatarState
  size?: number
}

const Avatar = memo(function Avatar({ state = 'idle', size = 200 }: AvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map())
  const targetFrame = useRef<number>(INITIAL_FRAME)
  const currentFrameFloat = useRef<number>(INITIAL_FRAME)
  const rafId = useRef<number>()
  const preloadTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const isThinking = state === 'thinking'
  const isTalking = state === 'talking'

  // ── Frame loading ────────────────────────────────────────────────────────
  const loadFrame = useCallback((n: number): HTMLImageElement => {
    const key = Math.max(1, Math.min(TOTAL_FRAMES, n))
    if (!frameCache.current.has(key)) {
      const img = new Image()
      img.src = `/avatar-frames/frame_${String(key).padStart(4, '0')}.webp`
      frameCache.current.set(key, img)
    }
    return frameCache.current.get(key)!
  }, [])

  // ── Canvas draw ──────────────────────────────────────────────────────────
  const drawFrame = useCallback(
    (n: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const cw = canvas.width
      const ch = canvas.height

      const img = loadFrame(n)
      const paint = (image: HTMLImageElement) => {
        ctx.clearRect(0, 0, cw, ch)
        // Draw circular clip
        ctx.save()
        ctx.beginPath()
        ctx.arc(cw / 2, ch / 2, cw / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(image, SRC_X, 0, SRC_S, SRC_S, 0, 0, cw, ch)
        ctx.restore()
      }

      if (img.complete && img.naturalWidth > 0) {
        paint(img)
      } else {
        img.onload = () => {
          // Only paint if still relevant
          if (Math.abs(targetFrame.current - n) < 15) paint(img)
        }
      }
    },
    [loadFrame]
  )

  // ── Initial frame + progressive background preload ───────────────────────
  useEffect(() => {
    drawFrame(INITIAL_FRAME)

    let batch = 0
    const loadBatch = () => {
      const start = batch * PRELOAD_BATCH + 1
      if (start > TOTAL_FRAMES) return
      for (let i = start; i < start + PRELOAD_BATCH && i <= TOTAL_FRAMES; i++) {
        loadFrame(i)
      }
      batch++
      preloadTimerRef.current = setTimeout(loadBatch, PRELOAD_INTERVAL_MS)
    }
    // Start preloading after a short idle delay
    preloadTimerRef.current = setTimeout(loadBatch, 400)

    return () => {
      if (preloadTimerRef.current) clearTimeout(preloadTimerRef.current)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [drawFrame, loadFrame])

  // ── Animation loop: smooth lerp toward target frame ──────────────────────
  useEffect(() => {
    const tick = () => {
      const target = targetFrame.current
      const curr = currentFrameFloat.current
      const delta = target - curr

      if (Math.abs(delta) > 0.35) {
        currentFrameFloat.current = curr + delta * LERP_SPEED
        drawFrame(Math.round(currentFrameFloat.current))
      }

      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [drawFrame])

  // ── Mouse + touch tracking → target frame ────────────────────────────────
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      targetFrame.current = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + x * (TOTAL_FRAMES - 1))))
    }
    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX / window.innerWidth
      targetFrame.current = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + x * (TOTAL_FRAMES - 1))))
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <motion.div
      style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}
      animate={
        isThinking
          ? { rotate: [-2, 2, -2] }
          : { rotate: 0, y: [0, -5, 0] }
      }
      transition={
        isThinking
          ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      {/* 2× resolution canvas for sharp HiDPI rendering */}
      <canvas
        ref={canvasRef}
        width={size * 2}
        height={size * 2}
        style={{ width: size, height: size, display: 'block' }}
      />

      {/* Thinking: pulsing cyan ring */}
      {isThinking && (
        <motion.div
          style={{
            position: 'absolute',
            inset: -5,
            borderRadius: '50%',
            border: '2px solid rgba(34,211,238,0.45)',
            pointerEvents: 'none',
          }}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.97, 1.03, 0.97] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Talking: faster pulse ring */}
      {isTalking && (
        <motion.div
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            border: '2px solid rgba(34,211,238,0.6)',
            pointerEvents: 'none',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.38, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  )
})

export default Avatar
