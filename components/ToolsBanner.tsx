'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import type { SimpleIcon } from 'simple-icons'
import {
  siZapier, siMake, siN8n, siHubspot, siAsana, siTrello,
  siNotion, siGmail, siMeta, siFacebook, siInstagram,
  siXero, siQuickbooks, siGooglesheets, siGoogledrive,
  siGoogledocs, siGooglegemini, siAirtable, siYoutube,
} from 'simple-icons'

type IconTool    = { name: string; si: SimpleIcon; desc: string }
type FallbackTool = { name: string; initials: string; color: string; desc: string }
type Tool = IconTool | FallbackTool

const TOOLS: Tool[] = [
  { name: 'Zapier',             si: siZapier,       desc: 'No-code automation connecting 5,000+ apps. Automates repetitive tasks via trigger-action workflows without writing code.' },
  { name: 'Make.com',           si: siMake,         desc: 'Visual automation platform with advanced multi-step workflows, data transformations, and conditional routing between apps.' },
  { name: 'n8n',                si: siN8n,          desc: 'Open-source workflow automation with self-hosting support. Ideal for complex, technical workflows with custom code integration.' },
  { name: 'HighLevel',          initials: 'HL',  color: '#F97316', desc: 'All-in-one CRM and marketing automation for agencies. Includes funnels, email, SMS, and pipeline management.' },
  { name: 'ChatGPT',            initials: 'GPT', color: '#10A37F', desc: "OpenAI's conversational AI. Used for content generation, data summarization, intelligent text processing, and AI-driven responses." },
  { name: 'Google Gemini',      si: siGooglegemini, desc: "Google's multimodal AI model. Handles text, images, and data for intelligent automation and content generation." },
  { name: 'OpenRouter',         initials: 'OR',  color: '#6C5CE7', desc: 'API gateway aggregating 100+ AI models. Switch between models without changing integration code.' },
  { name: 'HubSpot',            si: siHubspot,      desc: 'CRM and marketing platform with contact management, email campaigns, deal pipelines, and sales automation.' },
  { name: 'Salesforce',         initials: 'SF',  color: '#00A1E0', desc: 'Enterprise CRM for sales, service, and marketing. Industry standard for large-scale customer relationship management.' },
  { name: 'Zoho',               initials: 'ZO',  color: '#E42527', desc: 'Suite of business apps including CRM, HR, finance, and project management — all integrated in one ecosystem.' },
  { name: 'LinkedIn',           initials: 'in',  color: '#0A66C2', desc: 'Professional networking platform for outreach, lead generation, B2B sales, and brand visibility.' },
  { name: 'Asana',              si: siAsana,        desc: 'Project and task management for teams. Tracks work with timelines, boards, dependencies, and built-in automations.' },
  { name: 'Trello',             si: siTrello,       desc: 'Kanban-style project management with boards, lists, and cards. Simple visual task tracking for individuals and teams.' },
  { name: 'Slack',              initials: 'SL',  color: '#4A154B', desc: 'Team messaging and collaboration platform. Integrates with hundreds of tools for real-time notifications and workflow alerts.' },
  { name: 'Notion',             si: siNotion,       desc: 'All-in-one workspace for notes, databases, wikis, and project management. Highly flexible and customizable.' },
  { name: 'Google Workspace',   initials: 'GW',  color: '#4285F4', desc: "Google's productivity suite — Docs, Sheets, Drive, Gmail, and Meet — for business collaboration and automation." },
  { name: 'Microsoft Office',   initials: 'MS',  color: '#D83B01', desc: "Microsoft's core productivity suite. Word, Excel, PowerPoint, and Outlook for documents, data, and communications." },
  { name: 'Gmail',              si: siGmail,        desc: "Google's email service. Used in automations for sending notifications, parsing messages, and managing communications." },
  { name: 'Meta',               si: siMeta,         desc: 'Meta Platforms — parent of Facebook, Instagram, and WhatsApp. Used for social media advertising and outreach automation.' },
  { name: 'Facebook',           si: siFacebook,     desc: 'Social media with 3B+ users. Used for page management, ad campaigns, and automated post publishing.' },
  { name: 'Instagram',          si: siInstagram,    desc: 'Visual social media platform. Used for content scheduling, engagement tracking, and brand presence automation.' },
  { name: 'Jane',               initials: 'JN',  color: '#00A9E0', desc: 'Healthcare practice management software for scheduling, billing, and patient communications in wellness clinics.' },
  { name: 'Xero',               si: siXero,         desc: 'Cloud accounting for SMBs. Handles invoicing, payroll, bank reconciliation, and automated financial reporting.' },
  { name: 'QuickBooks',         si: siQuickbooks,   desc: 'Popular accounting software for small businesses. Tracks income, expenses, payroll, and tax reporting.' },
  { name: 'Google Sheets',      si: siGooglesheets, desc: 'Cloud-based spreadsheet with real-time collaboration. A core data logging and tracking layer in most automation stacks.' },
  { name: 'Microsoft Excel',    initials: 'XL',  color: '#217346', desc: 'Industry-standard spreadsheet. Used for data analysis, reporting, financial modeling, and bulk data processing.' },
  { name: 'Google Drive',       si: siGoogledrive,  desc: 'Cloud file storage and sharing. Used as a repository for automation inputs, outputs, and document handoffs.' },
  { name: 'Google Docs',        si: siGoogledocs,   desc: 'Collaborative word processor. Used for generating, storing, and updating documents via automations.' },
  { name: 'Airtable',           si: siAirtable,     desc: 'Database-spreadsheet hybrid for structured data. Excellent for automations that need flexible, relational data storage.' },
  { name: 'Canva',              initials: 'CV',  color: '#00C4CC', desc: 'Visual design platform for graphics, presentations, and social media content — no design experience needed.' },
  { name: 'CapCut',             initials: 'CC',  color: '#6B7280', desc: 'Video editing app for short-form content. Used for subtitles, transitions, and social media-ready exports.' },
  { name: 'YouTube',            si: siYoutube,      desc: 'Video hosting and publishing platform. Used in automations for uploading AI-generated or repurposed video content.' },
  { name: 'Metricool',          initials: 'ME',  color: '#9333EA', desc: 'Social media analytics and scheduling. Manages multi-platform publishing and tracks content performance.' },
]

// ── 3-D tilt tile ─────────────────────────────────────────────────────────────
function TiltToolTile({ tool, onSelect }: { tool: Tool; onSelect: (t: Tool) => void }) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [12, -12]), { stiffness: 200, damping: 22 })
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-12, 12]), { stiffness: 200, damping: 22 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - r.left - r.width / 2) / (r.width / 2))
    rawY.set((e.clientY - r.top - r.height / 2) / (r.height / 2))
  }, [rawX, rawY])

  const onLeave = useCallback(() => { rawX.set(0); rawY.set(0) }, [rawX, rawY])

  const isIcon = 'si' in tool
  const iconFill = isIcon
    ? tool.si.hex === '000000' ? '#e4e4e7' : `#${tool.si.hex}`
    : null

  return (
    <div style={{ perspective: 600 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div
        onClick={() => onSelect(tool)}
        className="flex flex-col items-center gap-3 px-4 py-5 rounded-xl border border-white/10 bg-zinc-900/60 flex-shrink-0 w-[160px] cursor-pointer hover:border-white/22 transition-colors"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Logo — translateZ so it floats above the tile surface */}
        <div
          style={{
            transform: 'translateZ(20px)',
            filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.65))',
            flexShrink: 0,
          }}
        >
          {isIcon ? (
            <svg viewBox="0 0 24 24" className="w-12 h-12" style={{ fill: iconFill! }} aria-hidden>
              <path d={tool.si.path} />
            </svg>
          ) : (
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black border border-white/25"
              style={{
                backgroundColor: (tool as FallbackTool).color,
                fontSize: (tool as FallbackTool).initials.length > 2 ? 12 : 16,
              }}
            >
              {(tool as FallbackTool).initials}
            </div>
          )}
        </div>

        <span className="text-[11px] text-zinc-400 font-medium text-center leading-tight line-clamp-2 w-full">
          {tool.name}
        </span>
      </motion.div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function ToolsBanner() {
  const [selected, setSelected] = useState<Tool | null>(null)

  const close = useCallback(() => setSelected(null), [])

  const isSelectedIcon = selected && 'si' in selected
  const selectedFill = isSelectedIcon
    ? (selected as IconTool).si.hex === '000000' ? '#e4e4e7' : `#${(selected as IconTool).si.hex}`
    : null

  return (
    <>
      <div className="relative overflow-hidden py-1">
        {/* Edge fade masks */}
        <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

        {/* Marquee */}
        <div
          className="flex gap-3 w-max"
          style={{ animation: 'marquee 70s linear infinite' }}
          onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')}
          onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')}
        >
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <TiltToolTile key={i} tool={tool} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {/* ── Click-to-expand modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                className="relative bg-zinc-950 border border-zinc-700/60 rounded-2xl p-8 max-w-xs w-full shadow-[0_32px_80px_rgba(0,0,0,0.85)] pointer-events-auto"
                initial={{ opacity: 0, scale: 0.86, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              >
                {/* Close */}
                <button
                  onClick={close}
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-zinc-500 hover:text-white hover:border-zinc-500 transition-all"
                >
                  <X size={12} />
                </button>

                {/* Logo */}
                <div className="flex justify-center mb-5">
                  {isSelectedIcon ? (
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-zinc-900 border border-zinc-800">
                      <svg viewBox="0 0 24 24" className="w-9 h-9" style={{ fill: selectedFill! }} aria-hidden>
                        <path d={(selected as IconTool).si.path} />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-lg border border-white/25"
                      style={{ backgroundColor: (selected as FallbackTool).color }}
                    >
                      {(selected as FallbackTool).initials}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-black text-white text-center mb-2">{selected.name}</h3>
                <p className="text-sm text-zinc-500 text-center leading-relaxed">{selected.desc}</p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
