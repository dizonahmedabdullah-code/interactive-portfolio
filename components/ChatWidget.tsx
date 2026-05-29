'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from 'ai/react'
import { ArrowUp, X, Robot } from '@phosphor-icons/react'

const WELCOME = {
  id: 'welcome',
  role: 'assistant' as const,
  content:
    "Hey! I'm Ahmed's AI avatar. Ask me anything about my automation work, background, or how we can work together.",
}

const SUGGESTIONS = [
  'What do you specialize in?',
  'Show me your best project',
  'What tools do you use?',
  'How much do you charge?',
]

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="font-semibold text-[#F0EEE6]">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="font-mono text-xs text-[#E8C97A] bg-[#E8C97A]/10 px-1.5 py-0.5 rounded">{part.slice(1, -1)}</code>
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i} className="italic text-[#7A8090]">{part.slice(1, -1)}</em>
    return part
  })
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="text-sm leading-relaxed space-y-1.5 text-[#7A8090]">
      {content.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        if (line.startsWith('## ') || line.startsWith('### '))
          return <p key={i} className="font-semibold text-[#F0EEE6] mt-2">{renderInline(line.replace(/^#{2,3}\s/, ''))}</p>
        if (line.startsWith('- ') || line.startsWith('• '))
          return (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-[#E8C97A] mt-0.5 flex-shrink-0 text-xs">▸</span>
              <span>{renderInline(line.slice(2))}</span>
            </div>
          )
        const numbered = line.match(/^(\d+)\.\s(.+)/)
        if (numbered)
          return (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-[#4A5060] flex-shrink-0 font-mono text-xs mt-0.5">{numbered[1]}.</span>
              <span>{renderInline(numbered[2])}</span>
            </div>
          )
        return <p key={i}>{renderInline(line)}</p>
      })}
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex gap-2.5 items-start">
      <div className="w-6 h-6 rounded-full bg-[#E8C97A]/10 border border-[#E8C97A]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#E8C97A]/70" />
      </div>
      <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#0E1117]">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-zinc-500"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
            transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState<'idle' | 'thinking' | 'talking'>('idle')
  const [inputHeight, setInputHeight] = useState(44)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { messages, input, handleInputChange: baseChange, handleSubmit, isLoading, error, append } =
    useChat({
      api: '/api/chat',
      initialMessages: [WELCOME],
      onResponse: res => { if (res.ok) setTyping('talking') },
      onFinish: () => { finishTimer.current = setTimeout(() => setTyping('idle'), 600) },
      onError: () => setTyping('idle'),
    })

  useEffect(() => { if (isLoading) setTyping(p => p === 'idle' ? 'thinking' : p) }, [isLoading])
  useEffect(() => () => { if (finishTimer.current) clearTimeout(finishTimer.current) }, [])
  useEffect(() => { if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isLoading, open])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    baseChange(e)
    const el = e.target
    el.style.height = 'auto'
    const h = Math.min(el.scrollHeight, 120)
    el.style.height = `${h}px`
    setInputHeight(h)
  }, [baseChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
      if (textareaRef.current) { textareaRef.current.style.height = '44px'; setInputHeight(44) }
    }
  }, [handleSubmit])

  const hasUserMsg = messages.some(m => m.role === 'user')
  const statusText = typing === 'thinking' ? 'Thinking…' : typing === 'talking' ? 'Typing…' : 'Online · Ask me anything'

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 bg-[#E8C97A] rounded-2xl font-semibold text-sm text-[#080A0E] shadow-[0_0_28px_rgba(232,201,122,0.3)] hover:shadow-[0_0_40px_rgba(232,201,122,0.45)] transition-shadow"
          >
            <Robot size={16} weight="bold" />
            Chat with AI
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col bg-[#080A0E] border border-white/7 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden"
            style={{ width: 'min(380px, calc(100vw - 2rem))', height: 'min(560px, calc(100dvh - 5rem))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/7 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8C97A] opacity-40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8C97A]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#F0EEE6] leading-none">Ahmed&apos;s AI Avatar</p>
                  <p className="text-[10px] text-[#4A5060] mt-0.5">{statusText}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#7A8090] hover:text-[#F0EEE6] hover:bg-[#141820] transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto chat-scroll px-4 pt-4 pb-3 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`flex gap-2.5 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-[#E8C97A]/10 border border-[#E8C97A]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E8C97A]/70" />
                      </div>
                    )}
                    <div className={`max-w-[83%] ${msg.role === 'user'
                      ? 'bg-[#0E1117] border border-white/7 rounded-2xl rounded-tr-sm px-3.5 py-2'
                      : 'border-l-2 border-[#E8C97A]/25 pl-3 pt-0.5'}`}
                    >
                      {msg.role === 'assistant'
                        ? <MarkdownContent content={msg.content} />
                        : <p className="text-sm leading-relaxed text-[#F0EEE6]">{msg.content}</p>}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {isLoading && typing === 'thinking' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <TypingDots />
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <div className="border-l-2 border-[#E8C97A]/40 pl-3">
                  <p className="text-sm text-red-400">Something went wrong. Check your API key.</p>
                </div>
              )}

              {!hasUserMsg && !isLoading && (
                <div className="pt-1">
                  <p className="text-[10px] text-[#4A5060] uppercase tracking-[0.1em] mb-2.5">Try asking</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map(s => (
                      <button
                        key={s}
                        onClick={() => append({ role: 'user', content: s })}
                        className="px-2.5 py-1 text-xs text-[#7A8090] border border-white/7 rounded-full hover:border-[#E8C97A]/40 hover:text-[#F0EEE6] transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 border-t border-white/7 px-3 pt-3 pb-3">
              <form onSubmit={handleSubmit} className="relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything…"
                  rows={1}
                  style={{ height: `${inputHeight}px`, minHeight: '44px', maxHeight: '120px' }}
                  className="w-full bg-[#0E1117] border border-white/7 rounded-xl px-4 py-2.5 pr-11 text-[16px] md:text-sm text-[#F0EEE6] placeholder:text-[#4A5060] focus:outline-none focus:border-white/13 resize-none transition-all font-sans"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 bottom-2 w-7 h-7 flex items-center justify-center rounded-lg bg-[#E8C97A] text-[#080A0E] disabled:opacity-25 hover:bg-[#C4A35A] transition-all active:scale-95"
                >
                  <ArrowUp size={13} weight="bold" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
