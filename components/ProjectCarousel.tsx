'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

const PROJECTS = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    platform: 'n8n',
    platformClass: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
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
    id: 4,
    platform: 'n8n',
    platformClass: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
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
    id: 5,
    platform: 'n8n',
    platformClass: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
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

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
}

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const prev = () => { if (current > 0) go(current - 1) }
  const next = () => { if (current < PROJECTS.length - 1) go(current + 1) }

  const proj = PROJECTS[current]

  return (
    <div>
      {/* Slide */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/30">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={proj.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            {/* Full image — no crop, natural aspect ratio */}
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-auto block"
            />

            {/* Content below image */}
            <div className="p-6 lg:p-8 border-t border-zinc-800/50">
              {/* Platform badge + title */}
              <div className="mb-6">
                <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full mb-3 ${proj.platformClass}`}>
                  {proj.platform}
                </span>
                <h3 className="text-xl lg:text-2xl font-black text-white leading-tight">{proj.title}</h3>
              </div>

              {/* 3-col grid on desktop, stack on mobile */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Problem */}
                <div>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.18em] mb-2">The Problem</p>
                  <p className="text-sm text-zinc-500 leading-relaxed">{proj.problem}</p>
                </div>

                {/* What it does */}
                <div>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.18em] mb-2.5">What It Does</p>
                  <ul className="space-y-1.5">
                    {proj.whatItDoes.map((item, j) => (
                      <li key={j} className="flex gap-2 items-start text-sm text-zinc-400">
                        <span className="text-green-500 flex-shrink-0 mt-[3px] text-[10px]">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Result + tools */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border" style={{ background: 'rgba(34,197,94,0.06)', borderColor: 'rgba(34,197,94,0.15)' }}>
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-[0.18em] mb-1.5">The Result</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{proj.result}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tools.map(t => (
                      <span key={t} className="px-2.5 py-1 text-[10px] font-medium text-zinc-400 bg-zinc-800/80 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation row */}
      <div className="flex items-center justify-between mt-5">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-400 border border-zinc-800 rounded-xl hover:border-green-500/40 hover:text-green-400 disabled:opacity-25 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <ArrowLeft size={15} weight="bold" />
          Previous
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-green-500'
                  : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === PROJECTS.length - 1}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-400 border border-zinc-800 rounded-xl hover:border-green-500/40 hover:text-green-400 disabled:opacity-25 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          Next
          <ArrowRight size={15} weight="bold" />
        </button>
      </div>

      {/* Counter */}
      <p className="text-center text-xs text-zinc-700 mt-3">
        {current + 1} / {PROJECTS.length}
      </p>
    </div>
  )
}
