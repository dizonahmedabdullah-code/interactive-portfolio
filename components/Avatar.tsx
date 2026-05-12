'use client'

import { memo, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export type AvatarState = 'idle' | 'thinking' | 'talking'

interface AvatarProps {
  state?: AvatarState
  size?: number
}

const Avatar = memo(function Avatar({ state = 'idle', size = 200 }: AvatarProps) {
  const isThinking = state === 'thinking'
  const isTalking = state === 'talking'

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateX = useSpring(useTransform(rawY, [-1, 1], [16, -16]), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-16, 16]), { stiffness: 220, damping: 22 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2))
    rawY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2))
  }, [rawX, rawY])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <div
      style={{ perspective: 900, perspectiveOrigin: 'center', flexShrink: 0 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          position: 'relative',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={isThinking ? { rotate: [-2, 2, -2] } : { y: [0, -6, 0] }}
        transition={
          isThinking
            ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Circular crop — yellow corners clipped, rainbow ring in image shows */}
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <img
            src="/new-avatar.png"
            alt="Ahmed Abdullah Dizon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
            }}
          />
        </div>

        {/* Thinking: slow pulsing outer ring */}
        {isThinking && (
          <motion.div
            style={{
              position: 'absolute',
              inset: -7,
              borderRadius: '50%',
              border: '2px solid rgba(34,197,94,0.5)',
              pointerEvents: 'none',
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.97, 1.03, 0.97] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Talking: fast pulse ring */}
        {isTalking && (
          <motion.div
            style={{
              position: 'absolute',
              inset: -7,
              borderRadius: '50%',
              border: '2px solid rgba(34,197,94,0.65)',
              pointerEvents: 'none',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.38, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>
    </div>
  )
})

export default Avatar
