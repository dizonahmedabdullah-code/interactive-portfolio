'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Avatar from '@/components/Avatar'
import ProcessSteps from '@/components/ProcessSteps'
import ToolsBanner from '@/components/ToolsBanner'
import MouseEffect from '@/components/MouseEffect'
import ChatWidget from '@/components/ChatWidget'
import ProjectCarousel from '@/components/ProjectCarousel'
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
  Globe,
  CalendarCheckIcon,
  ArrowUp,
  Plus,
  Minus,
} from '@phosphor-icons/react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

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
    <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#E8C97A] mb-4">
      <span className="w-6 h-px bg-[#E8C97A]" />
      {children}
    </p>
  )
}

const TICKER_ITEMS = [
  'Zapier', 'Make.com', 'n8n', 'GoHighLevel', 'Lead Generation',
  'CRM Automation', 'Workflow Automation', 'AI Chatbots',
  'Data Extraction', 'Content Repurposing', 'LinkedIn Outreach', 'Appointment Setting',
]

const FAQS = [
  {
    q: 'What tools and platforms do you work with?',
    a: 'I work with Zapier, Make.com, n8n, GoHighLevel, HubSpot, Salesforce, Zoho, ChatGPT, Google Workspace, Airtable, Notion, Slack, Xero, QuickBooks, Canva, and CapCut among others.',
  },
  {
    q: 'What industries have you worked in?',
    a: 'Fitness, chiropractic, events, real estate, staffing, entertainment, and e-commerce across 9+ years of remote work.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a free 30-minute strategy call via my Calendly. We will map out your biggest bottleneck and I will tell you exactly how to automate it.',
  },
  {
    q: 'Are you available for long-term contracts?',
    a: 'Yes. I am open to both project-based and ongoing retainer arrangements depending on the scope of work.',
  },
  {
    q: 'What is your timezone and availability?',
    a: 'I am based in the Philippines at UTC+8 and am available to overlap with US, European, and Australian business hours.',
  },
]

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24 lg:py-32 border-t border-white/7">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[#F0EEE6] mb-12 leading-tight">
            Frequently Asked<br />Questions
          </h2>
        </FadeIn>
        <div className="max-w-3xl space-y-3">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="border border-white/7 rounded-2xl bg-[#0E1117]/40 overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#141820]/40 transition-colors"
                >
                  <span className="font-bold text-[#F0EEE6] text-sm leading-snug">{faq.q}</span>
                  <span className="flex-shrink-0 text-[#E8C97A]">
                    {open === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 pt-1 text-sm text-[#7A8090] leading-relaxed border-t border-white/7">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, phone, message } = fields
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    )
    window.location.href = `mailto:dizonahmedabdullah@gmail.com?subject=Inquiry from ${encodeURIComponent(name)}&body=${body}`
    setSent(true)
  }

  const inputClass =
    'w-full bg-[#0E1117] border border-white/7 rounded-xl px-4 py-3 text-sm text-[#F0EEE6] placeholder-[#4A5060] focus:outline-none focus:border-white/13 transition-colors'

  return (
    <div className="bg-[#0E1117] border border-white/7 rounded-2xl p-8">
      {sent ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 rounded-full bg-[#E8C97A]/10 border border-[#E8C97A]/20 flex items-center justify-center mb-4">
            <CalendarCheckIcon size={26} className="text-[#E8C97A]" />
          </div>
          <p className="text-lg font-black text-white mb-1">Message sent</p>
          <p className="text-sm text-zinc-500">I&apos;ll get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-[#4A5060] uppercase tracking-widest block mb-1.5">Name</label>
              <input
                type="text"
                required
                placeholder="Juan dela Cruz"
                className={inputClass}
                value={fields.name}
                onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#4A5060] uppercase tracking-widest block mb-1.5">Email</label>
              <input
                type="email"
                required
                placeholder="juan@company.com"
                className={inputClass}
                value={fields.email}
                onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-1.5">Contact Number</label>
            <input
              type="tel"
              placeholder="+63 912 345 6789"
              className={inputClass}
              value={fields.phone}
              onChange={e => setFields(f => ({ ...f, phone: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-1.5">Message</label>
            <textarea
              required
              rows={4}
              placeholder="Tell me what you're working on and where you're losing the most time..."
              className={`${inputClass} resize-none`}
              value={fields.message}
              onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#141820] hover:bg-[#141820]/80 border border-white/7 text-sm font-bold text-[#F0EEE6] transition-colors active:scale-[0.98]"
          >
            Send Message
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-white/7" />
            <span className="text-[10px] text-[#4A5060] uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/7" />
          </div>

          <a
            href="https://calendly.com/dizonahmedabdullah/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl font-black text-sm text-zinc-900 overflow-hidden active:scale-[0.98] transition-transform"
            style={{ background: 'linear-gradient(135deg, #E8C97A 0%, #C4A35A 100%)' }}
          >
            <span className="absolute inset-0 bg-white/20 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
            <CalendarCheckIcon size={18} className="relative flex-shrink-0" />
            <span className="relative">Book My Free Strategy Call</span>
          </a>
        </form>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Restore saved theme preference
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.add('theme-transitioning')
    setIsDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 300)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }, [])

  return (
    <div className={`${isDark ? 'bg-[#080A0E] text-[#F0EEE6]' : 'bg-[#f5f5f0] text-zinc-900'} overflow-x-hidden transition-colors`}>
      {/* Global mouse gradient overlay */}
      <div ref={glowRef} className="fixed inset-0 pointer-events-none" style={{ opacity: 0, transition: 'opacity 1.8s ease', zIndex: 0 }} />
      <MouseEffect glowRef={glowRef} isDark={isDark} />

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? `border-b backdrop-blur-xl ${isDark ? 'border-white/5 bg-[#080A0E]/90' : 'border-black/6 bg-[#f5f5f0]/90'}`
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo('home')}
            className="text-xl font-black text-[#F0EEE6] tracking-tight hover:scale-105 transition-transform"
          >
            Automated by Med.
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="relative text-sm text-[#7A8090] hover:text-[#F0EEE6] transition-colors group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#E8C97A] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 hidden md:flex items-center justify-center rounded-lg border border-white/7 text-[#7A8090] hover:text-[#F0EEE6] hover:border-white/13 transition-all"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            {/* Hire CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#E8C97A] rounded-xl text-[#080A0E] hover:scale-[1.03] active:scale-[0.97] transition-transform"
            >
              Hire Me
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/7 text-[#7A8090]"
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
            className="md:hidden border-t border-white/7 bg-[#080A0E]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4"
          >
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left text-sm text-[#7A8090] hover:text-[#F0EEE6] transition-colors py-1"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-1 w-full py-2.5 text-sm font-semibold bg-[#E8C97A] rounded-xl text-[#080A0E]"
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20">
        {/* ── Ticker strip ─────────────────────────────────────────────────── */}
        <div className="absolute top-16 left-0 right-0 z-10 border-y border-white/7 bg-[#080A0E]/80 backdrop-blur-sm overflow-hidden py-2.5">
          <div
            className="flex w-max gap-0"
            style={{ animation: 'marquee 28s linear infinite' }}
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center text-[11px] font-bold tracking-[0.2em] uppercase text-[#4A5060] whitespace-nowrap">
                {item}
                <span className="mx-4 text-[#E8C97A]/30">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Background blobs */}
        <div className="absolute top-32 left-8 w-[480px] h-[480px] bg-[#E8C97A]/8 rounded-full blur-[140px] pointer-events-none" />
        <div
          className="absolute bottom-24 right-8 w-[400px] h-[400px] bg-[#E8C97A]/6 rounded-full blur-[140px] pointer-events-none animate-pulse"
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold tracking-[0.28em] uppercase text-[#E8C97A] bg-[#E8C97A]/10 border border-[#E8C97A]/20 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8C97A] animate-pulse" />
                AI AUTOMATION SPECIALIST
              </div>

              {/* Heading */}
              <h1 className="text-5xl lg:text-[5.5rem] font-black leading-[1.04] tracking-tight text-[#F0EEE6] mb-6">
                I Build<br />
                <span className="bg-gradient-to-r from-[#E8C97A] to-[#C4A35A] bg-clip-text text-transparent">
                  Automations
                </span>
                <br />That Scale.
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed max-w-[500px] mb-10">
                9+ years eliminating manual work from businesses. Expert in Zapier, Make, n8n, and GoHighLevel.
                Philippines-based, globally available.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => scrollTo('contact')}
                  className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#E8C97A] rounded-xl font-semibold text-[#080A0E] overflow-hidden hover:scale-[1.03] active:scale-[0.97] transition-transform"
                >
                  <span className="absolute inset-0 bg-white/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
                  <span className="relative">Let&apos;s Collaborate</span>
                  <ArrowRight size={16} weight="bold" className="relative" />
                </button>
                <button
                  onClick={() => scrollTo('projects')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/7 rounded-xl font-semibold text-[#7A8090] hover:border-[#E8C97A]/40 hover:text-[#F0EEE6] transition-all duration-300"
                >
                  View My Work
                </button>
              </div>

              {/* Stats row */}
              <div className="border-t border-white/7 pt-6 mb-8 grid grid-cols-4 gap-x-4 gap-y-4">
                {[
                  { value: '9+', label: 'Years Remote' },
                  { value: '5',  label: 'Automation Platforms' },
                  { value: '8+', label: 'Industries Served' },
                  { value: '7',  label: 'Case Studies' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-black text-[#F0EEE6] leading-none mb-1">{value}</p>
                    <p className="text-[10px] text-[#4A5060] uppercase tracking-[0.16em] leading-tight">{label}</p>
                  </div>
                ))}
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
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/7 text-[#7A8090] hover:text-[#E8C97A] hover:border-[#E8C97A]/40 transition-all duration-300"
                  >
                    <Icon size={17} />
                  </a>
                ))}
                <span className="text-xs text-[#4A5060] ml-1">Philippines · UTC+8</span>
              </div>
            </motion.div>
          </div>

          {/* Right: 4-step process */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <ProcessSteps />
          </motion.div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative flex justify-center lg:justify-start">
              <div className="absolute inset-[-16px] rounded-full bg-[#E8C97A]/6 blur-3xl pointer-events-none" />
              <Avatar state="idle" size={420} />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <SectionLabel>About Me</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[#F0EEE6] mb-6 leading-tight">
              A Problem Solver<br />
              <span className="bg-gradient-to-r from-[#E8C97A] to-[#C4A35A] bg-clip-text text-transparent">
                By Instinct
              </span>
            </h2>
            <div className="space-y-4 text-[#7A8090] leading-relaxed mb-8">
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
                <div key={stat.label} className="p-4 bg-[#0E1117] border border-white/7 rounded-xl text-center">
                  <p className="text-2xl font-black text-[#F0EEE6] mb-0.5">{stat.value}</p>
                  <p className="text-xs text-[#7A8090]">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="mailto:dizonahmedabdullah@gmail.com?subject=Let%27s%20Work%20Together"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#E8C97A] rounded-xl font-semibold text-[#080A0E] hover:scale-[1.03] active:scale-[0.97] transition-transform"
            >
              Get in Touch <ArrowRight size={15} weight="bold" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 lg:py-32 border-t border-white/7">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>What I Do</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[#F0EEE6] mb-4 leading-tight">
              Skills &{' '}
              <span className="bg-gradient-to-r from-[#E8C97A] to-[#C4A35A] bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-[#7A8090] max-w-[52ch] mb-14">
              From automation architecture to content creation — every service I offer is built around one goal: removing friction from your business.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((skill, i) => {
              const Icon = skill.icon
              return (
                <FadeIn key={skill.category} delay={i * 0.06}>
                  <div className={`group h-full p-6 rounded-2xl border transition-all duration-300 hover:border-[#E8C97A]/25 hover:-translate-y-1 ${
                    skill.featured
                      ? 'bg-gradient-to-br from-[#E8C97A]/8 to-[#0E1117]/80 border-[#E8C97A]/20'
                      : 'bg-[#0E1117]/60 border-white/7'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      skill.featured ? 'bg-[#E8C97A]/15 text-[#E8C97A]' : 'bg-[#141820] text-[#7A8090] group-hover:text-[#E8C97A] group-hover:bg-[#E8C97A]/10 transition-all'
                    }`}>
                      <Icon size={20} weight="bold" />
                    </div>
                    <h3 className="font-bold text-[#F0EEE6] mb-2">{skill.category}</h3>
                    <p className="text-sm text-[#7A8090] mb-4 leading-relaxed">{skill.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.tools.map(t => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-medium text-[#7A8090] bg-[#141820] rounded-md">
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

      {/* ── Tools Banner ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/7 pt-8 pb-6">
        <p className="text-[10px] text-[#4A5060] uppercase tracking-[0.22em] text-center mb-5">
          Tools &amp; Platforms
        </p>
        <ToolsBanner />
      </div>

      {/* ── Projects ───────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 lg:py-32 border-t border-white/7">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>Case Studies</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[#F0EEE6] mb-4 leading-tight">
              Automation{' '}
              <span className="bg-gradient-to-r from-[#E8C97A] to-[#C4A35A] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-[#7A8090] max-w-[52ch] mb-14">
              Real workflows built on Make.com and n8n. Each one replaced hours of manual work with a system that runs itself.
            </p>
          </FadeIn>

          <FadeIn>
            <ProjectCarousel />
          </FadeIn>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 lg:py-32 border-t border-white/7">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel>Work History</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[#F0EEE6] mb-14 leading-tight">
              Experience
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-white/7 hidden lg:block" />

            <div className="space-y-8">
              {EXPERIENCES.map((exp, i) => (
                <FadeIn key={exp.title} delay={i * 0.07}>
                  <div className="lg:pl-10 relative">
                    {/* Dot */}
                    <div className="absolute left-[-4.5px] top-2 w-2.5 h-2.5 rounded-full bg-[#E8C97A] border-2 border-[#080A0E] hidden lg:block" />

                    <div className="p-6 bg-[#0E1117]/60 border border-white/7 rounded-2xl hover:border-white/13 transition-colors">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="font-bold text-[#F0EEE6] text-lg leading-tight">{exp.title}</h3>
                          <p className="text-sm text-[#E8C97A]/80 mt-0.5">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="px-2.5 py-1 text-[10px] font-semibold text-[#7A8090] bg-[#141820] rounded-full">
                            {exp.type}
                          </span>
                          <span className="text-xs text-[#4A5060]">{exp.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-1.5">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2.5 items-start text-sm text-[#7A8090]">
                            <span className="text-[#E8C97A]/60 mt-0.5 flex-shrink-0 text-xs">▸</span>
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

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 lg:py-32 border-t border-white/7">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — info block */}
            <FadeIn>
              <SectionLabel>Get In Touch</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[#F0EEE6] mb-6 leading-tight">
                Ready to get your<br />time back?
              </h2>
              <p className="text-[#7A8090] leading-relaxed mb-10 max-w-[48ch]">
                If you&apos;re spending hours on tasks that could run on their own, let&apos;s talk. I&apos;ll map out exactly where automation can free up your time — no fluff, no pressure, just a clear plan.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: EnvelopeSimple,
                    label: 'Email',
                    value: 'dizonahmedabdullah@gmail.com',
                    href: 'mailto:dizonahmedabdullah@gmail.com',
                  },
                  {
                    icon: Globe,
                    label: 'Website',
                    value: 'automated-by-med.vercel.app',
                    href: 'https://automated-by-med.vercel.app',
                  },
                  {
                    icon: MapPin,
                    label: 'Location',
                    value: 'Philippines · UTC+8',
                    href: undefined,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0E1117] border border-white/7 flex items-center justify-center text-[#7A8090] flex-shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-[#4A5060] uppercase tracking-widest mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-[#F0EEE6] hover:text-[#E8C97A] transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#F0EEE6]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Right — lead capture form */}
            <FadeIn delay={0.12}>
              <ContactForm />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/7 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-black text-[#F0EEE6] tracking-tight">Automated by Med.</p>
          <div className="flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-xs text-[#4A5060] hover:text-[#7A8090] transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#4A5060]">© 2025 Ahmed Abdullah Dizon</p>
        </div>
      </footer>

      {/* ── Back to top ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-24 right-5 z-50 w-11 h-11 flex items-center justify-center rounded-xl bg-[#0E1117] border border-white/7 text-[#7A8090] hover:text-[#F0EEE6] hover:border-white/13 shadow-lg transition-colors"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Floating chat widget ───────────────────────────────────────────── */}
      <ChatWidget />
    </div>
  )
}
