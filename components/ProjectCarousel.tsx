'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { LayoutGroup, motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { X } from '@phosphor-icons/react'

const PROJECTS = [
  {
    id: 1,
    platform: 'Zapier',
    platformClass: 'bg-orange-600/15 text-orange-300 border border-orange-600/25',
    image: '/zapier-project-1.jpg',
    title: 'AI Content Repurposing: Audio to Blog Posts and Social Media',
    problem:
      'Creating content across multiple platforms from a single piece of media is time-consuming. Most creators and businesses record audio or video but then have to manually transcribe it, write blog posts, craft social captions, and post everything one by one. The process takes hours and rarely happens consistently.',
    whatItDoes: [
      'Triggers automatically when a new file is added to a Google Drive folder',
      'Filters the file using a condition check before processing',
      'Uses AI to generate a full transcript from the audio or video file',
      'Passes the transcript to a second AI step that creates two full blog posts',
      'Loops through each blog post individually using Looping by Zapier',
      'Splits into two paths based on a keyword condition in the title or content',
      'If the condition is met, publishes the post to Facebook Pages and shares it on LinkedIn',
      'If the condition is not met, the content is held and not published',
    ],
    result:
      'One file upload triggers a complete content repurposing pipeline. Two blog posts created, reviewed by condition logic, and published to social media automatically with zero manual writing, formatting, or posting involved.',
    tools: ['Zapier', 'Google Drive', 'AI by Zapier', 'Looping by Zapier', 'Paths by Zapier', 'Facebook Pages', 'LinkedIn'],
  },
  {
    id: 2,
    platform: 'Make.com',
    platformClass: 'bg-violet-500/15 text-violet-400 border border-violet-500/25',
    image: '/make-project-1.jpg',
    title: 'AI-Powered Email Attachment Organizer',
    problem:
      'Managing email attachments manually is one of the most time-consuming admin tasks in any business. Files arrive with generic names, get buried in inboxes, and never make it into the right folder.',
    whatItDoes: [
      'Watches Gmail inbox for incoming emails with attachments',
      'Extracts and lists all attachments automatically',
      'Uses AI to analyze each file and generate a meaningful, organized file name',
      'Uploads the renamed file directly to Google Drive',
      'Logs each attachment with metadata into a Google Sheets record',
      'Sends an automated email notification confirming the task is done',
    ],
    result:
      'Zero manual file sorting. Every attachment arrives organized, properly named, backed up to Drive, and logged — with no human involved in the process.',
    tools: ['Make (Integromat)', 'Gmail', 'Google Drive', 'Google Sheets', 'AI Module'],
  },
  {
    id: 3,
    platform: 'Make.com',
    platformClass: 'bg-violet-500/15 text-violet-400 border border-violet-500/25',
    image: '/make-project-3.jpg',
    title: 'Automated Client Onboarding Across 5 Platforms',
    problem:
      'Onboarding a new client manually means logging their details, creating a folder, sending a welcome email, notifying the team, and setting up a project card — all done one by one across multiple tools. It is repetitive, easy to miss a step, and takes time away from actual client work.',
    whatItDoes: [
      'Watches Google Forms for new client submissions',
      'Sleeps briefly to allow data to fully process before continuing',
      'Searches the Client Sheet to check if the client already exists in the tracker',
      'Routes through a Router based on whether the client is new or already in the system',
      'If new: creates a dedicated Google Drive folder for the client',
      'Adds the client as a new row in the database sheet',
      'Routes through a second Router to trigger all follow-on actions',
      'Sends a welcome email to the client via Gmail',
      'Posts a notification to the team in Slack',
      'Creates a Trello card to kick off the client project workflow',
    ],
    result:
      'One form submission triggers the entire onboarding process across five platforms with zero manual work. No missed steps, no duplicate entries, no back and forth between tools.',
    tools: ['Make (Integromat)', 'Google Forms', 'Google Sheets', 'Google Drive', 'Gmail', 'Slack', 'Trello'],
  },
  {
    id: 4,
    platform: 'Make.com',
    platformClass: 'bg-violet-500/15 text-violet-400 border border-violet-500/25',
    image: '/make-project-2.jpg',
    title: 'Asana → Xero Finance Data Sync',
    problem:
      'Finance and project teams work in separate tools. Accountants live in Xero while project managers work in Asana, and syncing transaction data required manual exporting, formatting, and uploading every single time.',
    whatItDoes: [
      'Triggers automatically when an Asana task is marked as complete',
      'Pulls account transaction data from Xero via API',
      'Routes data through two parallel paths simultaneously using a Router',
      'Logs individual transactions row by row into Google Sheets',
      'Aggregates all data into a formatted CSV file',
      'Uploads the CSV as an attachment directly to the original Asana task',
      'Clears the Google Sheets range to reset for the next cycle',
    ],
    result:
      'Finance data reaches the project team automatically the moment a task is completed. No manual exports, no file transfers, no back-and-forth between departments.',
    tools: ['Make (Integromat)', 'Asana', 'Xero', 'Google Sheets'],
  },
  {
    id: 5,
    platform: 'n8n',
    platformClass: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
    image: '/n8n-project-1.jpg',
    title: 'AI Webhook Request Handler with Gemini',
    problem:
      'Businesses receive repetitive questions through web forms or external apps that require intelligent, context-aware responses. Answering manually every time is slow, inconsistent, and impossible to scale.',
    whatItDoes: [
      'Receives incoming requests via Webhook from any connected app or form',
      'Routes requests through an If condition to filter valid from invalid inputs',
      'Retrieves the relevant document or knowledge base entry for valid requests',
      'Passes the document and request to a Google Gemini AI Agent with Simple Memory',
      'AI Agent generates a context-aware, intelligent response',
      'Sends the response back via HTTP Request to the originating system',
    ],
    result:
      'An always-on AI assistant that handles incoming requests intelligently, retrieves the right information, and responds automatically — without any human involvement.',
    tools: ['n8n', 'Webhook', 'Google Gemini', 'AI Agent', 'HTTP Request'],
  },
  {
    id: 6,
    platform: 'n8n',
    platformClass: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
    image: '/n8n-project-2.jpg',
    title: 'AI Job Application Pipeline via Slack',
    problem:
      'Job hunting is repetitive and time-consuming. Searching for listings, tailoring a resume for every application, and drafting emails manually takes hours that most professionals simply do not have.',
    whatItDoes: [
      'Triggered by a Slack message with a job search query',
      'Validates the query before processing begins',
      'Scrapes live job listings from the web via HTTP request',
      'Loops through each job result individually',
      "Retrieves the user's existing resume from Google Drive",
      'Uses OpenRouter AI to rewrite and optimize the resume for each specific role',
      'Copies and updates the tailored resume in Google Docs',
      'Auto-creates a Gmail draft ready for sending',
      'Sends a completion summary back to the user in Slack',
    ],
    result:
      'A complete job application pipeline triggered by a single Slack message. The system finds jobs, tailors the resume, and prepares the email draft — automatically, with no manual work required.',
    tools: ['n8n', 'Slack', 'HTTP Request', 'Google Drive', 'Google Docs', 'OpenRouter AI', 'Gmail'],
  },
  {
    id: 7,
    platform: 'n8n',
    platformClass: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
    image: '/n8n-project-3.jpg',
    title: 'Automated Short-Form Video Creator & Publisher',
    problem:
      'Creating and publishing short-form video content consistently is one of the biggest challenges for creators and brands. Writing scripts, generating videos, and uploading them manually is a daily time drain that prevents real scale.',
    whatItDoes: [
      'Runs automatically on a set schedule — no manual trigger needed',
      'Uses Google Gemini AI to generate a creative video prompt',
      'Authenticates with the video generation API using secure JWT token exchange',
      'Sends the prompt to generate a short-form video via API',
      'Polls the API until the video is fully rendered',
      'Validates the output and filters errors or unusable results',
      'Converts the Base64 video string into a proper video file',
      'Uploads the finished video directly to YouTube',
    ],
    result:
      'A fully automated content machine that generates, renders, and publishes short-form videos on a schedule. No scripting, no manual uploading, no repetitive work.',
    tools: ['n8n', 'Google Gemini', 'JWT', 'Video Generation API', 'HTTP Request', 'YouTube'],
  },
]

const GROUPS: { platform: string; accentClass: string }[] = [
  { platform: 'Zapier',   accentClass: 'text-orange-300 border-orange-600/30' },
  { platform: 'Make.com', accentClass: 'text-violet-400 border-violet-500/30' },
  { platform: 'n8n',      accentClass: 'text-amber-400  border-amber-500/30'  },
]

// ── Magnifying glass (modal image only) ───────────────────────────────────────
const ZOOM = 2.5
const LENS = 152

function MagnifyImage({ src, alt }: { src: string; alt: string }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const w = containerRef.current?.offsetWidth ?? 0

  return (
    <div
      ref={containerRef}
      className="relative select-none cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos(null)}
    >
      <img src={src} alt={alt} className="w-full h-auto block rounded-t-2xl" draggable={false} />
      {pos && w > 0 && (
        <div
          className="absolute pointer-events-none rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.18),0_8px_32px_rgba(0,0,0,0.6)]"
          style={{
            width: LENS,
            height: LENS,
            left: pos.x - LENS / 2,
            top: pos.y - LENS / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${w * ZOOM}px auto`,
            backgroundPosition: `${-(pos.x * ZOOM - LENS / 2)}px ${-(pos.y * ZOOM - LENS / 2)}px`,
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  )
}

// ── 3-D tilt tile ─────────────────────────────────────────────────────────────
type Project = (typeof PROJECTS)[0]

interface TiltTileProps {
  proj: Project
  hidden: boolean
  onSelect: (id: number) => void
}

function TiltTile({ proj, hidden, onSelect }: TiltTileProps) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [14, -14]), { stiffness: 210, damping: 22 })
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-14, 14]), { stiffness: 210, damping: 22 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - r.left - r.width / 2) / (r.width / 2))
    rawY.set((e.clientY - r.top - r.height / 2) / (r.height / 2))
  }, [rawX, rawY])

  const onLeave = useCallback(() => { rawX.set(0); rawY.set(0) }, [rawX, rawY])

  return (
    <div style={{ perspective: 700 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div
        layoutId={`proj-${proj.id}`}
        onClick={() => !hidden && onSelect(proj.id)}
        className="cursor-pointer rounded-xl overflow-hidden border border-zinc-800/60 bg-zinc-900/40 hover:border-green-500/30 transition-colors"
        animate={{ opacity: hidden ? 0 : 1 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.15 }}
        whileTap={{ scale: 0.985 }}
      >
        <img src={proj.image} alt={proj.title} className="w-full h-auto block" draggable={false} />
        <div className="px-3 py-2.5 border-t border-zinc-800/50">
          <span className={`inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-full mb-1.5 ${proj.platformClass}`}>
            {proj.platform}
          </span>
          <p className="text-xs font-bold text-zinc-200 leading-snug line-clamp-2">{proj.title}</p>
        </div>
      </motion.div>
    </div>
  )
}

const SPRING = { type: 'spring' as const, stiffness: 120, damping: 22, mass: 1 }

// ── Main component ────────────────────────────────────────────────────────────
export default function ProjectCarousel() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [hiddenId, setHiddenId] = useState<number | null>(null)
  const selected = PROJECTS.find(p => p.id === selectedId) ?? null
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    document.body.style.overflow = selectedId !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedId])

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  const handleClose = useCallback(() => {
    const id = selectedId
    setHiddenId(id)
    setSelectedId(null)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setHiddenId(null), 820)
  }, [selectedId])

  return (
    <LayoutGroup>
      {/* ── Grouped tile grid ──────────────────────────────────────────────── */}
      <div className="space-y-10">
        {GROUPS.map(group => {
          const tiles = PROJECTS.filter(p => p.platform === group.platform)
          return (
            <div key={group.platform}>
              {/* Sub-category label */}
              <div className={`flex items-center gap-3 mb-4 pb-3 border-b ${group.accentClass}`}>
                <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${group.accentClass.split(' ')[0]}`}>
                  {group.platform}
                </span>
                <span className="text-[10px] text-zinc-700 font-medium">
                  {tiles.length} project{tiles.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tiles.map(proj => (
                  <TiltTile
                    key={proj.id}
                    proj={proj}
                    hidden={proj.id === selectedId || proj.id === hiddenId}
                    onSelect={setSelectedId}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Backdrop ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* ── Expanded modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              layoutId={`proj-${selected.id}`}
              className="relative w-full max-w-[92vw] xl:max-w-6xl max-h-[90dvh] overflow-y-auto rounded-2xl border border-zinc-700/60 bg-zinc-950 shadow-[0_32px_80px_rgba(0,0,0,0.8)] pointer-events-auto"
              transition={SPRING}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.25, duration: 0.2 }}
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
              >
                <X size={14} />
              </motion.button>

              {/* Full-width screenshot — hover to magnify */}
              <MagnifyImage src={selected.image} alt={selected.title} />

              {/* Detail content */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ delay: 0.28, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 lg:p-8"
              >
                {/* Platform + title */}
                <div className="mb-6">
                  <span className={`inline-block px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full mb-3 ${selected.platformClass}`}>
                    {selected.platform}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-black text-white leading-tight">{selected.title}</h3>
                </div>

                {/* 3-col grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.18em] mb-2">The Problem</p>
                    <p className="text-sm text-zinc-500 leading-relaxed">{selected.problem}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.18em] mb-2.5">What It Does</p>
                    <ul className="space-y-1.5">
                      {selected.whatItDoes.map((item, j) => (
                        <li key={j} className="flex gap-2 items-start text-sm text-zinc-400">
                          <span className="text-green-500 flex-shrink-0 mt-[3px] text-[10px]">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div
                      className="p-4 rounded-xl border"
                      style={{ background: 'rgba(34,197,94,0.06)', borderColor: 'rgba(34,197,94,0.15)' }}
                    >
                      <p className="text-[10px] font-bold text-green-500 uppercase tracking-[0.18em] mb-1.5">The Result</p>
                      <p className="text-sm text-zinc-300 leading-relaxed">{selected.result}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.tools.map(t => (
                        <span key={t} className="px-2.5 py-1 text-[10px] font-medium text-zinc-400 bg-zinc-800/80 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}
