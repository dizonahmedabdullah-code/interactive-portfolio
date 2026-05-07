'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'

export type AvatarState = 'idle' | 'thinking' | 'talking'

interface AvatarProps {
  state?: AvatarState
  size?: number
}

const RING = 4 // rainbow ring thickness in px

const Avatar = memo(function Avatar({ state = 'idle', size = 200 }: AvatarProps) {
  const isThinking = state === 'thinking'
  const isTalking = state === 'talking'
  const containerSize = size + RING * 2

  return (
    <motion.div
      style={{ width: containerSize, height: containerSize, position: 'relative', flexShrink: 0 }}
      animate={isThinking ? { rotate: [-2, 2, -2] } : { y: [0, -6, 0] }}
      transition={
        isThinking
          ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      {/* Rotating rainbow ring */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #6366f1, #ec4899, #ef4444)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Photo — inset by RING px so only the ring border shows */}
      <div
        style={{
          position: 'absolute',
          top: RING,
          left: RING,
          right: RING,
          bottom: RING,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img
          src="/professional-photo.png"
          alt="Ahmed Abdullah Dizon"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
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
  )
})

export default Avatar
