'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X } from '@phosphor-icons/react'

type BuildGroup = { heading: string; note?: string; items: string[] }

type ShotImage = {
  src: string
  width: number
  height: number
  fit: 'cover' | 'contain'
  position?: string
  enlarge: boolean
}

type Shot = { alt: string; caption: string; image?: ShotImage }

type CaseStudy = {
  id: string
  title: string
  client: string
  role?: string
  stack: string[]
  stackLabel: string
  problem: string
  groups: BuildGroup[]
  gallery?: { hero: Shot; shots: Shot[] }
  howIWork?: string[]
  results?: string[]
  closing?: string
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '01',
    title: 'Automation and BI build for an education and coaching business',
    client: 'An education and coaching business (under NDA)',
    role: 'Automation and BI contractor',
    stackLabel: 'Stack',
    stack: [
      'GoHighLevel (CRM, workflows, API v2)',
      'Zapier',
      'n8n',
      'Google Workspace',
      'Slack',
      'Next.js on Vercel',
    ],
    problem:
      'Lead-to-enrolment and student compliance (homework, document submissions, daily job-search KPIs) were tracked by hand. Staff chased documents manually and leadership had no live pipeline view.',
    groups: [
      {
        heading: 'Track A: student-success automation',
        note: 'About 65% of hours',
        items: [
          'Document submission tied to each student’s CRM record',
          'Missing-document detection with scheduled reminders',
          'Warning escalation for non-compliant students',
          'Weekly compliance report to coaches',
          'Cohort onboarding automation',
          'Calendar and session automation',
          'KPI and activity tracking',
          'AI first-draft feedback sent to a coach review queue. A coach approves before anything reaches a student.',
        ],
      },
      {
        heading: 'Track B: live BI dashboard',
        note: 'About 35% of hours',
        items: [
          'Next.js dashboard on Vercel with live CRM data via GoHighLevel API v2',
          'Launched on CRM data first. Accounting and website integrations are scoped as a later phase.',
        ],
      },
      {
        heading: 'Data reconciliation',
        items: [
          'Matched payment records between the operations team’s files and the CRM, and flagged gaps with an action per row.',
        ],
      },
    ],
    gallery: {
      hero: {
        alt: 'Live BI dashboard with revenue, pipeline and funnel charts. Screenshot to come.',
        caption:
          'Live BI dashboard on Next.js and Vercel, pulling CRM data through the GoHighLevel API. Figures hidden for confidentiality.',
      },
      shots: [
        {
          alt: 'Workflow showing a reminder, a wait, a re-check and then a warning. Screenshot to come.',
          caption: 'Non-compliance escalation: reminder, wait, re-check, then warning.',
        },
        {
          alt: 'Condition panel that checks whether any of four required files is empty, with the fields named Document 1, Document 2, Workbook and Tracking sheet.',
          caption: 'Missing-document check across required student files.',
          image: {
            src: '/case-studies/coaching/missing-doc-check.webp',
            width: 414,
            height: 1092,
            fit: 'cover',
            position: '50% 58%',
            enlarge: true,
          },
        },
        {
          alt: 'List of five published workflows for one cohort, including a daily KPI reminder, homework warnings, late joiners, a lecture reminder and a tutorial reminder.',
          caption: 'One cohort\u2019s automation set: KPI reminders, warnings, late joiners, session reminders.',
          // Native size is only 475px wide, so it stays a small thumbnail with no enlarge view.
          image: {
            src: '/case-studies/coaching/cohort-workflows.webp',
            width: 475,
            height: 474,
            fit: 'contain',
            enlarge: false,
          },
        },
      ],
    },
    howIWork: [
      'Architecture agreed before building',
      'Nothing deleted: old steps are disabled instead, because CRM deletions cannot be undone',
      'Every bulk action tested on one contact first',
      'Scheduled sends only',
      'A log of known platform limits, so no hours are wasted twice',
      'Scope changes flagged in writing before work starts',
      'Daily start-of-day and end-of-day reports',
      'Handover SOPs',
      'AI-assisted delivery with Claude',
    ],
  },
  {
    id: '02',
    title: 'An AI operating system for a one-person BD desk',
    client: 'A one-person business development desk',
    stackLabel: 'Built with',
    stack: [
      'Claude (Projects, skills, memory)',
      'Gmail',
      'Calendar',
      'Drive',
      'Sheets',
      'Notion',
      'WhatsApp via browser',
    ],
    problem:
      'One assistant was handling hundreds of WhatsApp and email conversations, several trackers, and a manager who needed daily status. The bottleneck was remembering who needed what, and when.',
    groups: [
      {
        heading: 'What I built',
        note: 'Rule: AI drafts, a human sends',
        items: [
          'A 70+ section voice instruction set, so drafts sound like the sender',
          'A morning follow-up engine that drafts replies for threads quiet 2+ days and leaves them unsent for human review',
          'One-host-one-row tracker discipline with a "Latest activity" column',
          'Custom skills: research sorting, a listing audit, and intake form to listing doc',
          'Experience design prompts',
          'A fixed-format end-of-day report and weekly summaries',
          'SOPs and memory, so every session starts from the current state',
        ],
      },
    ],
    results: [
      'Up to about 40 reviewed follow-ups drafted per day',
      'Zero messages sent without human review',
    ],
    closing:
      'I don’t sell AI. I sell a desk that never forgets a follow-up, writes in your voice, and tells you every evening what moved.',
  },
  {
    id: '03',
    title: 'Building a host pipeline across Asia',
    client: 'A global travel platform’s experiences program across Southeast and East Asia',
    stackLabel: 'Stack',
    stack: [],
    problem:
      'One partnerships lead was covering several countries with no tracking. Follow-ups slipped and good leads went quiet.',
    groups: [
      {
        heading: 'What I did',
        items: [
          'Per-market lead research: 300+ leads in one market cut to 58 policy-compliant businesses across 19 categories, plus a 50-venue list for another city',
          'Outreach written in the lead’s voice',
          'A day 2, 4, 7, 14 and 30 follow-up ladder',
          'Objection scripts',
          'Host onboarding to review-ready listings',
          'Launch support, including reframing a launch perk as "free tickets for staff, friends and family", which lifted usage',
        ],
      },
    ],
  },
]

export const CASE_STUDY_COUNT = CASE_STUDIES.length

// Neutral stand-in until a real, redacted screenshot exists.
function ShotPlaceholder({ shot, className = '' }: { shot: Shot; className?: string }) {
  // TODO: real screenshot
  return (
    <figure className="min-w-0">
      <div
        role="img"
        aria-label={shot.alt}
        className={`w-full flex flex-col items-center justify-center gap-1 rounded-xl border border-white/7 bg-[#0E1117] ${className}`}
      >
        <span className="text-[11px] text-[#4A5060]">Screenshot to come</span>
      </div>
      <figcaption className="mt-2 text-xs text-[#7A8090] leading-relaxed">{shot.caption}</figcaption>
    </figure>
  )
}

// A redacted screenshot as a thumbnail. Opens an enlarged view only when `enlarge` is set.
function ShotFigure({ shot, className, onEnlarge }: { shot: Shot; className: string; onEnlarge: (shot: Shot) => void }) {
  const img = shot.image
  if (!img) return <ShotPlaceholder shot={shot} className={className} />
  const frame = `relative block w-full overflow-hidden rounded-xl border border-white/7 bg-[#0E1117] ${className}`
  const picture = (
    <Image
      src={img.src}
      alt={shot.alt}
      width={img.width}
      height={img.height}
      sizes="(min-width: 640px) 33vw, 100vw"
      className={`absolute inset-0 h-full w-full ${img.fit === 'cover' ? 'object-cover' : 'object-contain'}`}
      style={{ objectPosition: img.position }}
    />
  )
  return (
    <figure className="min-w-0">
      {img.enlarge ? (
        <button
          type="button"
          onClick={() => onEnlarge(shot)}
          aria-label={`Enlarge: ${shot.caption}`}
          className={`${frame} group cursor-zoom-in transition-transform duration-200 active:scale-[0.99]`}
        >
          {picture}
          <span className="absolute bottom-2 right-2 rounded-md bg-[#080A0E]/80 px-2 py-1 text-[10px] font-medium text-[#F0EEE6]">
            Enlarge
          </span>
        </button>
      ) : (
        <div className={frame}>{picture}</div>
      )}
      <figcaption className="mt-2 text-xs text-[#7A8090] leading-relaxed">{shot.caption}</figcaption>
    </figure>
  )
}

// Full-view overlay: Esc, the close button or a click outside closes it; focus stays inside while open.
function Lightbox({ shot, onClose }: { shot: Shot; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const img = shot.image

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    const previousOverflow = document.body.style.overflow
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  if (!img) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shot.caption}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-h-full max-w-full" onClick={e => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0E1117] text-[#F0EEE6] transition-transform active:scale-[0.95]"
        >
          <X size={14} />
        </button>
        <Image
          src={img.src}
          alt={shot.alt}
          width={img.width}
          height={img.height}
          sizes="90vw"
          className="h-auto max-h-[84dvh] w-auto max-w-full rounded-xl border border-white/10"
        />
        <p className="mt-3 max-w-[60ch] text-xs text-[#C9CDD6] leading-relaxed">{shot.caption}</p>
      </div>
    </div>
  )
}

const label = 'text-[10px] font-bold text-[#4A5060] uppercase tracking-[0.18em]'

function Bullets({ items, tone = 'muted' }: { items: string[]; tone?: 'muted' | 'bright' }) {
  return (
    <ul className="space-y-1.5">
      {items.map(item => (
        <li
          key={item}
          className={`flex gap-2.5 items-start text-sm leading-relaxed ${
            tone === 'bright' ? 'text-[#F0EEE6]' : 'text-[#7A8090]'
          }`}
        >
          <span className="text-[#E8C97A]/70 flex-shrink-0 mt-[3px] text-[10px]">&#9656;</span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function CaseStudies() {
  const [enlarged, setEnlarged] = useState<Shot | null>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  const openShot = useCallback((shot: Shot) => {
    lastFocus.current = document.activeElement as HTMLElement | null
    setEnlarged(shot)
  }, [])
  const closeShot = useCallback(() => {
    setEnlarged(null)
    lastFocus.current?.focus()
  }, [])

  return (
    <div className="space-y-8">
      {CASE_STUDIES.map(cs => (
        <motion.article
          key={cs.id}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-white/7 bg-[#0E1117]/60 p-6 lg:p-8"
        >
          <p className="text-[10px] font-bold text-[#E8C97A]/80 uppercase tracking-[0.22em] mb-3">
            Case study {cs.id}
          </p>
          <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-[#F0EEE6] leading-tight max-w-[28ch] mb-6">
            {cs.title}
          </h3>

          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 pb-6 mb-6 border-b border-white/7">
            <div className="min-w-0">
              <dt className={`${label} mb-1`}>Client</dt>
              <dd className="text-sm text-[#F0EEE6]">{cs.client}</dd>
            </div>
            {cs.role && (
              <div className="min-w-0">
                <dt className={`${label} mb-1`}>Role</dt>
                <dd className="text-sm text-[#F0EEE6]">{cs.role}</dd>
              </div>
            )}
            {cs.stack.length > 0 && (
              <div className="sm:col-span-2 min-w-0">
                <dt className={`${label} mb-2`}>{cs.stackLabel}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {cs.stack.map(t => (
                    <span key={t} className="px-2.5 py-1 text-[10px] font-medium text-[#7A8090] bg-[#141820] rounded-full">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-8 lg:gap-12">
            <div className="min-w-0">
              <p className={`${label} mb-2`}>The problem</p>
              <p className="text-sm text-[#7A8090] leading-relaxed max-w-[52ch]">{cs.problem}</p>

              {cs.results && (
                <div
                  className="mt-6 p-4 rounded-xl border"
                  style={{ background: 'rgba(232,201,122,0.06)', borderColor: 'rgba(232,201,122,0.15)' }}
                >
                  <p className="text-[10px] font-bold text-[#E8C97A] uppercase tracking-[0.18em] mb-2">Results</p>
                  <Bullets items={cs.results} tone="bright" />
                </div>
              )}

              {cs.closing && (
                <p className="mt-6 pl-4 border-l border-[#E8C97A]/40 text-sm text-[#F0EEE6] leading-relaxed">
                  {cs.closing}
                </p>
              )}
            </div>

            <div className="min-w-0 space-y-6">
              {cs.groups.map(group => (
                <div key={group.heading}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2.5">
                    <p className="text-sm font-bold text-[#F0EEE6]">{group.heading}</p>
                    {group.note && <span className="text-[10px] text-[#4A5060] uppercase tracking-widest">{group.note}</span>}
                  </div>
                  <Bullets items={group.items} />
                </div>
              ))}
            </div>
          </div>

          {cs.gallery && (
            <div className="mt-8 space-y-5">
              <ShotPlaceholder shot={cs.gallery.hero} className="aspect-[16/9] sm:aspect-[21/8]" />
              <div className="grid sm:grid-cols-3 gap-5">
                {cs.gallery.shots.map(shot => (
                  <ShotFigure key={shot.caption} shot={shot} className="aspect-[16/10]" onEnlarge={openShot} />
                ))}
              </div>
              {cs.gallery.shots.some(shot => shot.image) && (
                <p className="text-xs text-[#4A5060]">Screenshots redacted to protect client and student data.</p>
              )}
            </div>
          )}

          {cs.howIWork && (
            <div
              className="mt-8 p-5 rounded-xl border"
              style={{ background: 'rgba(232,201,122,0.06)', borderColor: 'rgba(232,201,122,0.15)' }}
            >
              <p className="text-[10px] font-bold text-[#E8C97A] uppercase tracking-[0.18em] mb-3">How I work</p>
              <div className="grid sm:grid-cols-2 gap-x-8">
                <Bullets items={cs.howIWork.slice(0, Math.ceil(cs.howIWork.length / 2))} tone="bright" />
                <div className="mt-1.5 sm:mt-0">
                  <Bullets items={cs.howIWork.slice(Math.ceil(cs.howIWork.length / 2))} tone="bright" />
                </div>
              </div>
            </div>
          )}
        </motion.article>
      ))}
      {/* Portal to <body> so the overlay sits above the sticky nav, not inside the animated card. */}
      {enlarged && createPortal(<Lightbox shot={enlarged} onClose={closeShot} />, document.body)}
    </div>
  )
}
