'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Identify the Bottleneck',
    desc: 'Locate the exact manual task consuming the most hours or generating the most errors across the workflow.',
  },
  {
    num: '02',
    title: 'Map the Workflow',
    desc: 'Design the full logic before building — triggers, conditions, branches, and outputs drawn out end-to-end.',
  },
  {
    num: '03',
    title: 'Build & Connect',
    desc: 'Wire up every tool, configure AI steps, set conditions, and handle edge cases until the automation runs clean.',
  },
  {
    num: '04',
    title: 'Deploy & Monitor',
    desc: 'Launch with live tests, set error alerts, then hand it off — it runs without babysitting.',
  },
]

const TICK = 3000

export default function ProcessSteps() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % STEPS.length), TICK)
    return () => clearInterval(t)
  }, [])

  const step = STEPS[current]

  return (
    <div className="w-full max-w-[460px]">
      <div
        className="relative rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-8 overflow-hidden"
        style={{ minHeight: 280 }}
      >
        {/* Ambient glow */}
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(34,197,94,0.06)' }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Step number */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-mono text-5xl font-black leading-none select-none"
                style={{ color: 'rgba(34,197,94,0.22)' }}
              >
                {step.num}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-green-500/20 to-transparent" />
            </div>

            <h3 className="text-2xl font-black text-white mb-3 leading-tight">{step.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Step indicator + progress bar */}
        <div className="absolute bottom-6 left-8 right-8">
          <div className="flex items-center gap-1.5 mb-2.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Step ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-green-500' : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                }`}
              />
            ))}
          </div>
          <div className="w-full h-px bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              key={`bar-${current}`}
              className="h-full rounded-full"
              style={{ background: 'rgba(34,197,94,0.5)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: (TICK - 100) / 1000, ease: 'linear' }}
            />
          </div>
        </div>
      </div>

      <p className="text-[10px] text-zinc-700 uppercase tracking-[0.2em] mt-4">
        How I approach every automation
      </p>
    </div>
  )
}
