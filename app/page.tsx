'use client'

import { useChat } from 'ai/react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Avatar, { type AvatarState } from '@/components/Avatar'
import MouseEffect from '@/components/MouseEffect'
import {
  ArrowUp,
  EnvelopeSimple,
  LinkedinLogo,
  Sun,
  Moon,
} from '@phosphor-icons/react'

// ─── Suggestion chips ─────────────────────────────────────────────────────────
const SUGGESTIONS = [
  'Show me your best projects',
  'What tools do you use?',
  'How can we work together?',
  'Tell me a fun fact',
  "What's your automation process?",
  'How much do you charge?',
]

// ─── Welcome message ──────────────────────────────────────────────────────────
const WELCOME: { id: string; role: 'assistant'; content: string } = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hey there! 👋 I'm Ahmed — well, my AI avatar. I know everything about my work, projects, and background. Ask me anything: what I build, how I automate businesses, or just say hi. What's on your mind?",
}

// ─── Inline markdown renderer ──────────────────────────────────────────────────
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-zinc-900 dark:text-zinc-100">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="font-mono text-xs text-cyan-700 bg-sky-50 dark:text-cyan-400 dark:bg-zinc-800 px-1.5 py-0.5 rounded"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-zinc-600 dark:text-zinc-300">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n')
  return (
    <div className="text-sm leading-relaxed space-y-1.5 text-zinc-600 dark:text-zinc-300">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />

        if (line.startsWith('### ')) {
          return (
            <p key={i} className="font-semibold text-zinc-900 dark:text-zinc-100 mt-2">
              {renderInline(line.slice(4))}
            </p>
          )
        }
        if (line.startsWith('## ')) {
          return (
            <p key={i} className="font-semibold text-zinc-900 dark:text-zinc-100 text-base mt-2">
              {renderInline(line.slice(3))}
            </p>
          )
        }
        if (line.startsWith('- ') || line.startsWith('• ')) {
          const text = line.slice(2)
          return (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-cyan-600 dark:text-cyan-500 mt-0.5 flex-shrink-0 text-xs">▸</span>
              <span>{renderInline(text)}</span>
            </div>
          )
        }
        if (/^\d+\.\s/.test(line)) {
          const match = line.match(/^(\d+)\.\s(.+)/)
          if (match) {
            return (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-zinc-400 dark:text-zinc-600 flex-shrink-0 font-mono text-xs mt-0.5">
                  {match[1]}.
                </span>
                <span>{renderInline(match[2])}</span>
              </div>
            )
          }
        }
        return <p key={i}>{renderInline(line)}</p>
      })}
    </div>
  )
}

// ─── Avatar dot ───────────────────────────────────────────────────────────────
function AvatarDot() {
  return (
    <div className="flex-shrink-0 w-7 h-7 rounded-full border border-cyan-500/30 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center mt-0.5">
      <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/85 dark:bg-cyan-400/85" />
    </div>
  )
}

// ─── Typing indicator ──────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex gap-3 items-start"
    >
      <AvatarDot />
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
            transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [avatarState, setAvatarState] = useState<AvatarState>('idle')
  const [inputHeight, setInputHeight] = useState(48)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  // ── Theme toggle ─────────────────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    document.documentElement.classList.add('theme-transitioning')
    setIsDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return next
    })
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 300)
  }, [])

  // ── Chat ─────────────────────────────────────────────────────────────────
  const {
    messages,
    input,
    handleInputChange: baseHandleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
  } = useChat({
    api: '/api/chat',
    initialMessages: [WELCOME],
    onResponse: (res) => { if (res.ok) setAvatarState('talking') },
    onFinish: () => {
      finishTimerRef.current = setTimeout(() => setAvatarState('idle'), 600)
    },
    onError: () => setAvatarState('idle'),
  })

  useEffect(() => {
    if (isLoading) setAvatarState((prev) => (prev === 'idle' ? 'thinking' : prev))
  }, [isLoading])

  useEffect(() => () => { if (finishTimerRef.current) clearTimeout(finishTimerRef.current) }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      baseHandleInputChange(e)
      const el = e.target
      el.style.height = 'auto'
      const next = Math.min(el.scrollHeight, 120)
      el.style.height = `${next}px`
      setInputHeight(next)
    },
    [baseHandleInputChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
        if (textareaRef.current) {
          textareaRef.current.style.height = '48px'
          setInputHeight(48)
        }
      }
    },
    [handleSubmit]
  )

  const sendSuggestion = useCallback(
    (text: string) => append({ role: 'user', content: text }),
    [append]
  )

  const hasUserMessages = messages.some((m) => m.role === 'user')

  return (
    <main className="flex h-[100dvh] overflow-hidden relative bg-[#f2f0ec] dark:bg-[#050505]">
      {/* ── Rainbow glow layer (absolute, behind all content) ─────────────── */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0, transition: 'opacity 1.8s ease', zIndex: 0 }}
      />

      {/* ── Mouse effect: splash only (glow managed via ref above) ────────── */}
      <MouseEffect glowRef={glowRef} isDark={isDark} />

      {/* ── Theme toggle (fixed, top-right) ───────────────────────────────── */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors duration-150 active:scale-[0.94]"
      >
        {isDark ? <Sun size={14} weight="regular" /> : <Moon size={14} weight="regular" />}
      </button>

      {/* ── Left panel — bio (desktop only) ───────────────────────────────── */}
      <aside className="hidden md:flex flex-col justify-center items-start w-[220px] xl:w-[260px] border-r border-zinc-200/60 dark:border-zinc-900/50 px-7 xl:px-9 py-10 relative overflow-hidden flex-shrink-0" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 grid-texture pointer-events-none opacity-60 dark:opacity-100" />

        <div className="relative z-10 flex flex-col items-start gap-0">
          {/* Name + title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-0.5"
          >
            <h1 className="font-sans text-[clamp(1rem,1.4vw,1.25rem)] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Ahmed Abdullah Dizon
            </h1>
            <p className="text-[10px] font-medium text-cyan-600 dark:text-cyan-400 tracking-[0.12em] uppercase">
              AI Automation Specialist
            </p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 pt-0.5">Philippines · UTC+8</p>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-500">Available for projects</span>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="mt-6 flex flex-col gap-2.5"
          >
            <a
              href="mailto:dizonahmedabdullah@gmail.com"
              className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-600 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
            >
              <EnvelopeSimple size={12} weight="regular" />
              dizonahmedabdullah@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/ahmed-abdullah-dizon-06459137b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-600 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
            >
              <LinkedinLogo size={12} weight="regular" />
              LinkedIn Profile
            </a>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6"
          >
            <a
              href="mailto:dizonahmedabdullah@gmail.com?subject=Let%27s%20Work%20Together"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[10px] font-semibold text-white bg-cyan-600 dark:text-[#050505] dark:bg-cyan-400 rounded-lg hover:bg-cyan-500 dark:hover:bg-cyan-300 transition-colors duration-200 active:scale-[0.97]"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </aside>

      {/* ── Center panel — avatar (desktop only) ──────────────────────────── */}
      <div className="hidden md:flex flex-col justify-center items-center flex-1 relative overflow-hidden" style={{ zIndex: 1 }}>
        {/* Accent glow behind avatar */}
        <div className="absolute w-[320px] h-[320px] bg-cyan-500/[0.05] dark:bg-cyan-400/[0.04] rounded-full blur-3xl pointer-events-none" />
        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 35%, ${isDark ? '#050505' : '#f2f0ec'} 100%)`,
          }}
        />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Avatar state={avatarState} size={260} />
        </motion.div>
      </div>

      {/* ── Right panel — chat ─────────────────────────────────────────────── */}
      <div className="flex-1 md:flex-none md:w-[340px] xl:w-[380px] flex flex-col border-l border-zinc-200/60 dark:border-zinc-900/50 min-w-0" style={{ zIndex: 1 }}>
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-zinc-200/70 dark:border-zinc-900/50 flex-shrink-0 bg-[#f2f0ec] dark:bg-[#050505]">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <Avatar state={avatarState} size={36} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">Ahmed</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-600 mt-0.5">AI Automation Specialist</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-zinc-500 dark:text-zinc-600">Online</span>
          </div>
        </header>

        {/* Desktop chat header */}
        <div className="hidden md:flex items-center justify-between px-5 xl:px-7 pt-3 pb-2 flex-shrink-0">
          <p className="text-xs text-zinc-500 dark:text-zinc-600 uppercase tracking-wider">
            Chat with Ahmed&apos;s AI
          </p>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-700 mr-10">
            Groq Llama 3.3 · All info from Ahmed&apos;s actual background
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto chat-scroll px-4 md:px-5 xl:px-6 pt-2 pb-4 space-y-5">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}
              >
                {message.role === 'assistant' && <AvatarDot />}

                <div
                  className={`max-w-[78%] md:max-w-[82%] ${
                    message.role === 'user'
                      ? 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl rounded-tr-sm px-4 py-2.5'
                      : 'border-l-2 border-cyan-500/30 dark:border-cyan-500/25 pl-3.5 pt-0.5'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <MarkdownContent content={message.content} />
                  ) : (
                    <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                      {message.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isLoading && avatarState === 'thinking' && <TypingIndicator />}
          </AnimatePresence>

          {/* Error state */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 items-start"
              >
                <AvatarDot />
                <div className="border-l-2 border-red-400/40 pl-3.5 pt-0.5">
                  <p className="text-sm text-red-500 dark:text-red-400">
                    Something went wrong. Check your{' '}
                    <code className="font-mono text-xs">.env.local</code> API key and restart the server.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggestion chips */}
          <AnimatePresence>
            {!hasUserMessages && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2"
              >
                <p className="text-[10px] text-zinc-400 dark:text-zinc-700 uppercase tracking-[0.1em] mb-3">
                  Try asking
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => sendSuggestion(s)}
                      className="px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-full bg-white dark:bg-zinc-900/40 hover:border-cyan-400/50 dark:hover:border-cyan-500/40 hover:text-zinc-800 dark:hover:text-zinc-300 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97]"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input bar ──────────────────────────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-zinc-200/60 dark:border-zinc-900/50 px-4 md:px-5 xl:px-6 py-3">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              rows={1}
              style={{ height: `${inputHeight}px`, minHeight: '48px', maxHeight: '120px' }}
              className="w-full bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 pr-12 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 dark:focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/15 resize-none transition-all duration-200 font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="absolute right-2.5 bottom-2.5 w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-600 dark:bg-cyan-400 text-white dark:text-[#050505] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-cyan-500 dark:hover:bg-cyan-300 transition-all duration-200 active:scale-[0.93] flex-shrink-0"
            >
              <ArrowUp size={15} weight="bold" />
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
