'use client'

import { useEffect, useState } from 'react'
import { BRAND, MAILTO, NAV_LINKS } from '@/lib/content'

const icon = 'origin-center transition-transform duration-500 ease-out-expo [transform-box:fill-box]'

const bookCall =
  'inline-flex min-h-[28px] items-center rounded-full bg-accent px-3.5 text-[13px] text-white transition-[background-color,transform] duration-200 ease-apple hover:bg-accent-hover active:scale-[0.98]'

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-40 border-b border-black/[0.08] transition-[background-color] duration-300 ease-apple ${
        open ? 'bg-white' : 'glass'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-12 w-full max-w-grid items-center justify-between px-4 sm:px-6">
        <a href="#top" onClick={close} className="text-[17px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
          {BRAND}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] text-[#1d1d1f]/80 transition-colors duration-200 hover:text-[#1d1d1f]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={MAILTO} className={bookCall}>
            Book a call
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a href={MAILTO} className={bookCall}>
            Book a call
          </a>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2.5 grid h-11 w-11 place-items-center text-[#1d1d1f] active:scale-[0.98]"
          >
            {/* Two lines that fold into an X. */}
            <svg aria-hidden="true" viewBox="0 0 18 18" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 6h14" className={`${icon} ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
              <path d="M2 12h14" className={`${icon} ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hidden with visibility (not display) so it can fade and drop in, and stays out of the tab order when closed. */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full border-b border-black/[0.08] bg-white px-4 pb-8 pt-3 transition-[opacity,transform,visibility] md:hidden ${
          open ? 'visible translate-y-0 opacity-100 duration-500 ease-out-expo' : 'invisible -translate-y-2 opacity-0 duration-200 ease-apple'
        }`}
      >
        <ul>
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              className={`transition-[opacity,transform] ease-out-expo ${open ? 'translate-y-0 opacity-100 duration-700' : '-translate-y-1 opacity-0 duration-150'}`}
              style={{ transitionDelay: open ? `${60 + i * 50}ms` : '0ms' }}
            >
              <a
                href={link.href}
                onClick={close}
                className="block py-2.5 text-[28px] font-semibold tracking-[-0.02em] text-[#1d1d1f]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
