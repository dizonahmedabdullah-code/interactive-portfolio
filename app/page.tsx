'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Avatar from '@/components/Avatar'
import MouseEffect from '@/components/MouseEffect'
import ChatWidget from '@/components/ChatWidget'
import {
  ArrowRight,
  EnvelopeSimple,
  LinkedinLogo,
  Lightning,
  Funnel,
  UsersThree,
  ShareNetwork,
  Table,
  PencilSimple,
  List,
  X,
  MapPin,
  Phone,
  Sun,
  Moon,
} from '@phosphor-icons/react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

const SKILLS = [
  {
    icon: Lightning,
    category: 'Automation & AI',
    description: 'Building workflows that run themselves so teams can focus on what matters.',
    tools: ['Zapier', 'Make', 'n8n', 'GoHighLevel', 'ChatGPT'],
    featured: true,
  },
  {
    icon: UsersThree,
    category: 'Lead Generation',
    description: 'Full pipeline from cold contact to qualified, ready-to-book lead.',
    tools: ['LinkedIn Sales Navigator', 'Email Outreach', 'DM Campaigns', 'Appointment Setting'],
    featured: false,
  },
  {
    icon: Funnel,
    category: 'CRM & Sales',
    description: 'Pipeline management, follow-up sequences, and automated CRM hygiene.',
    tools: ['HubSpot', 'Salesforce', 'Zoho', 'GoHighLevel'],
    featured: false,
  },
  {
    icon: ShareNetwork,
    category: 'Social Media',
    description: 'Content calendars, scheduling, community management, and growth.',
    tools: ['Facebook', 'Instagram', 'LinkedIn', 'Meta Business Suite', 'Metricool'],
    featured: false,
  },
  {
    icon: Table,
    category: 'Data & Admin',
    description: 'Reporting, spreadsheets, documentation, and back-office ops.',
    tools: ['Google Sheets', 'Excel', 'QuickBooks', 'Google Workspace'],
    featured: false,
  },
  {
    icon: PencilSimple,
    category: 'Creative',
    description: 'Brand assets, promotional videos, and social content production.',
    tools: ['Canva', 'CapCut', 'Video Editing'],
    featured: false,
  },
]

const EXPERIENCES = [
  {
    title: 'Lead Generation & Appointment Setting Specialist',
    company: 'Fitness Company',
    period: 'Mar 2024 – Feb 2026',
    type: 'Remote',
    highlights: [
      'Rebuilt lead response process via Instagram DM and Facebook Messenger with structured follow-up sequences that boosted conversion rates',
      'Designed follow-up campaign for warm leads, consistently growing secured bookings month-over-month',
      'Built onboarding SOPs that cut ramp-up time and standardized quality across the team',
    ],
  },
  {
    title: 'Executive Assistant to Head of Sales',
    company: 'Events Company',
    period: 'May 2023 – Jan 2026',
    type: 'Remote',
    highlights: [
      'Leveraged LinkedIn Sales Navigator to systematically identify and qualify high-value event prospects',
      'Streamlined full attendee lifecycle — registration, payments, and post-event communication',
      'Built weekly/monthly sales performance reports with trend comparisons for faster decisions',
    ],
  },
  {
    title: 'Admin Assistant, SMM & Video Editor',
    company: 'Chiropractic Company',
    period: 'Aug 2023 – Feb 2025',
    type: 'Remote',
    highlights: [
      'Managed MRI forms, referrals, and patient records with zero-error accuracy across two locations',
      'Produced and edited video content that expanded patient outreach and social media presence',
    ],
  },
  {
    title: 'Technical Support Team Leader',
    company: 'Mobile Company — US Account',
    period: 'Feb 2019 – Jan 2022',
    type: 'On-site',
    highlights: [
      'Stepped into Team Leader role — coaching staff, monitoring KPIs, and handling complex escalations',
      'Facilitated daily huddles that kept the whole team aligned and consistently performing',
    ],
  },
]

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
      'Job hunting is repetitive and time-consuming. Searching for listings, reading each posting, tailoring a resume, and drafting application emails manually takes hours that most professionals simply do not have.',
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
      'Creating and publishing short-form video content consistently is one of the biggest challenges for creators and brands. Writing scripts, generating videos, and uploading them manually to multiple platforms is a daily time drain that prevents real scale.',
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

// ─── Fade-in-view wrapper ──────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-green-500 mb-4">
      <span className="w-6 h-px bg-green-500" />
      {children}
    </p>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.add('theme-transitioning')
    setIsDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      return next
    })
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 300)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }, [])

  return (
    <div className="bg-[#080808] text-zinc-100 overflow-x-hidden">
      {/* Global mouse gradient overlay */}
      <div ref={glowRef} className="fixed inset-0 pointer-events-none" style={{ opacity: 0, transition: 'opacity 1.8s ease', zIndex: 0 }} />
      <MouseEffect glowRef={glowRef} isDark={isDark} />

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/5 bg-[#080808]/85 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo('home')}
            className="text-xl font-black text-white tracking-tight hover:scale-105 transition-transform"
          >
            Ahmed.
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="relative text-sm text-zinc-400 hover:text-white transition-colors group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-green-600 to-green-900 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 hidden md:flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            {/* Hire CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-green-700 to-green-900 rounded-xl text-white hover:scale-[1.03] active:scale-[0.97] transition-transform shadow-[0_0_20px_rgba(22,163,74,0.25)]"
            >
              Hire Me
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-400"
            >
              {mobileOpen ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="md:hidden border-t border-zinc-800/60 bg-[#080808]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4"
          >
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left text-sm text-zinc-400 hover:text-white transition-colors py-1"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-1 w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-green-700 to-green-900 rounded-xl text-white"
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20">
        {/* Background blobs */}
        <div className="absolute top-32 left-8 w-[480px] h-[480px] bg-green-800/8 rounded-full blur-[140px] pointer-events-none" />
        <div
          className="absolute bottom-24 right-8 w-[400px] h-[400px] bg-green-900/6 rounded-full blur-[140px] pointer-events-none animate-pulse"
          style={{ animationDelay: '0.7s', animationDuration: '4s' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold tracking-[0.28em] uppercase text-green-400 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                AI AUTOMATION SPECIALIST
              </div>

              {/* Heading */}
              <h1 className="text-5xl lg:text-[5.5rem] font-black leading-[1.04] tracking-tight text-white mb-6">
                I Build<br />
                <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Automations
                </span>
                <br />That Scale.
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed max-w-[500px] mb-10">
                9+ years eliminating manual work from businesses. Expert in Zapier, Make, n8n, and GoHighLevel.
                Philippines-based, globally available.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => scrollTo('contact')}
                  className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-green-700 to-green-900 rounded-xl font-semibold text-white overflow-hidden hover:scale-[1.03] active:scale-[0.97] transition-transform shadow-[0_0_24px_rgba(22,163,74,0.35)]"
                >
                  <span className="absolute inset-0 bg-white/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
                  <span className="relative">Let&apos;s Collaborate</span>
                  <ArrowRight size={16} weight="bold" className="relative" />
                </button>
                <button
                  onClick={() => scrollTo('projects')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-zinc-700 rounded-xl font-semibold text-zinc-300 hover:border-green-500/50 hover:text-white transition-all duration-300"
                >
                  View My Work
                </button>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3">
                {[
                  { icon: EnvelopeSimple, href: 'mailto:dizonahmedabdullah@gmail.com', label: 'Email' },
                  { icon: LinkedinLogo, href: 'https://linkedin.com/in/ahmed-abdullah-dizon-06459137b', label: 'LinkedIn' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 text-zinc-500 hover:text-green-400 hover:border-green-500/50 transition-all duration-300"
                  >
                    <Icon size={17} />
                  </a>
                ))}
                <span className="text-xs text-zinc-600 ml-1">Philippines · UTC+8</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow ring behind avatar */}
              <div className="absolute inset-[-20px] rounded-full bg-green-800/8 blur-3xl pointer-events-none" />
              <Avatar state="idle" size={300} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative flex justify-center lg:justify-start">
              <div className="absolute inset-[-16px] rounded-full bg-green-700/6 blur-3xl pointer-events-none" />
              <Avatar state="idle" size={280} />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <SectionLabel>About Me</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
              A Problem Solver<br />
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                By Instinct
              </span>
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-8">
              <p>
                I look at broken processes and immediately start thinking about how to fix them. That instinct is
                what led me into AI automation. With 9+ years of remote work across lead generation, executive
                support, and social media, I kept finding the same problem: businesses drowning in manual,
                repetitive work.
              </p>
              <p>
                Now I build the systems that eliminate it — multi-step automations, CRM pipelines, AI-powered
                workflows — across industries and time zones.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '9+', label: 'Years Remote' },
                { value: '5', label: 'Automation Platforms' },
                { value: '8+', label: 'Industries' },
              ].map(stat => (
                <div key={stat.label} className="p-4 bg-zinc-900/50 border border-zinc-800/60 rounded-xl text-center">
                  <p className="text-2xl font-black text-white mb-0.5">{stat.value}</p>
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="mailto:dizonahmedabdullah@gmail.com?subject=Let%27s%20Work%20Together"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-green-700 to-green-900 rounded-xl font-semibold text-white hover:scale-[1.03] active:scale-[0.97] transition-transform shadow-[0_0_20px_rgba(22,163,74,0.25)]"
            >
              Get in Touch <ArrowRight size={15} weight="bold" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 lg:py-32 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>What I Do</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Skills &{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-zinc-500 max-w-[52ch] mb-14">
              From automation architecture to content creation — every service I offer is built around one goal: removing friction from your business.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((skill, i) => {
              const Icon = skill.icon
              return (
                <FadeIn key={skill.category} delay={i * 0.06}>
                  <div className={`group h-full p-6 rounded-2xl border transition-all duration-300 hover:border-green-500/30 hover:-translate-y-1 ${
                    skill.featured
                      ? 'bg-gradient-to-br from-green-600/10 to-zinc-900/50 border-green-500/25'
                      : 'bg-zinc-900/40 border-zinc-800/60'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      skill.featured ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-zinc-400 group-hover:text-green-400 group-hover:bg-green-500/15 transition-all'
                    }`}>
                      <Icon size={20} weight="bold" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{skill.category}</h3>
                    <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{skill.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.tools.map(t => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-medium text-zinc-400 bg-zinc-800/80 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 lg:py-32 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>Work History</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white mb-14 leading-tight">
              Experience
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-zinc-800 hidden lg:block" />

            <div className="space-y-8">
              {EXPERIENCES.map((exp, i) => (
                <FadeIn key={exp.title} delay={i * 0.07}>
                  <div className="lg:pl-10 relative">
                    {/* Dot */}
                    <div className="absolute left-[-4.5px] top-2 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#080808] hidden lg:block" />

                    <div className="p-6 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl hover:border-zinc-700/60 transition-colors">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="font-bold text-white text-lg leading-tight">{exp.title}</h3>
                          <p className="text-sm text-green-400/80 mt-0.5">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="px-2.5 py-1 text-[10px] font-semibold text-zinc-400 bg-zinc-800 rounded-full">
                            {exp.type}
                          </span>
                          <span className="text-xs text-zinc-600">{exp.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-1.5">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2.5 items-start text-sm text-zinc-500">
                            <span className="text-green-500/70 mt-0.5 flex-shrink-0 text-xs">▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 lg:py-32 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>Case Studies</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Automation{' '}
              <span className="bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-zinc-500 max-w-[52ch] mb-14">
              Real workflows built on Make.com and n8n. Each one replaced hours of manual work with a system that runs itself.
            </p>
          </FadeIn>

          <div className="space-y-8">
            {PROJECTS.map((proj, i) => (
              <FadeIn key={proj.id}>
                <div className="grid lg:grid-cols-5 rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700/60 transition-colors">
                  {/* Screenshot */}
                  <div className={`lg:col-span-2 relative min-h-[220px] lg:min-h-0 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    {/* Fade edge toward content */}
                    <div className={`absolute inset-0 ${i % 2 === 1
                      ? 'bg-gradient-to-l from-zinc-900/30 to-transparent'
                      : 'bg-gradient-to-r from-transparent to-zinc-900/30'} hidden lg:block`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent lg:hidden" />
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-3 p-6 lg:p-8 flex flex-col gap-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {/* Platform + title */}
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full mb-3 ${proj.platformClass}`}>
                        {proj.platform}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-black text-white leading-tight">{proj.title}</h3>
                    </div>

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
                          <li key={j} className="flex gap-2.5 items-start text-sm text-zinc-400">
                            <span className="text-green-500 flex-shrink-0 mt-[3px] text-[10px]">▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Result */}
                    <div className="p-4 bg-green-500/8 border border-green-500/15 rounded-xl">
                      <p className="text-[10px] font-bold text-green-500 uppercase tracking-[0.18em] mb-1.5">The Result</p>
                      <p className="text-sm text-zinc-300 leading-relaxed">{proj.result}</p>
                    </div>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tools.map(t => (
                        <span key={t} className="px-2.5 py-1 text-[10px] font-medium text-zinc-400 bg-zinc-800/80 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 lg:py-32 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>Get In Touch</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Let&apos;s Work{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-zinc-500 max-w-[52ch] mb-14">
              Open for freelance automation builds, full-time AI roles, and consulting. Best reached by email.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: EnvelopeSimple,
                label: 'Email',
                value: 'dizonahmedabdullah@gmail.com',
                href: 'mailto:dizonahmedabdullah@gmail.com',
              },
              {
                icon: LinkedinLogo,
                label: 'LinkedIn',
                value: 'ahmed-abdullah-dizon',
                href: 'https://linkedin.com/in/ahmed-abdullah-dizon-06459137b',
              },
              {
                icon: Phone,
                label: 'Phone',
                value: '+63 977 115 6569',
                href: 'tel:+639771156569',
              },
              {
                icon: MapPin,
                label: 'Location',
                value: 'Philippines · UTC+8',
                href: undefined,
              },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <FadeIn key={label} delay={i * 0.07}>
                <div
                  className={`p-5 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl hover:border-zinc-700/60 transition-colors ${href ? 'group' : ''}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-green-500/20 group-hover:text-green-400 text-zinc-500 transition-all">
                    <Icon size={17} />
                  </div>
                  <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-zinc-300 hover:text-green-400 transition-colors break-all"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-zinc-300">{value}</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-12 text-center">
            <a
              href="mailto:dizonahmedabdullah@gmail.com?subject=Let%27s%20Work%20Together"
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-700 to-green-900 rounded-2xl font-bold text-lg text-white overflow-hidden hover:scale-[1.03] active:scale-[0.97] transition-transform shadow-[0_0_32px_rgba(22,163,74,0.35)]"
            >
              <span className="absolute inset-0 bg-white/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
              <span className="relative">Send Me an Email</span>
              <ArrowRight size={18} weight="bold" className="relative" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-black text-white tracking-tight">Ahmed.</p>
          <div className="flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-700">© 2025 Ahmed Abdullah Dizon</p>
        </div>
      </footer>

      {/* ── Floating chat widget ───────────────────────────────────────────── */}
      <ChatWidget />
    </div>
  )
}
