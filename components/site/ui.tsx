import type { CSSProperties, ReactNode } from 'react'

/** Stops the page scrolling behind an open dialog. */
export function lockPageScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/** Sets a CSS custom property inline, e.g. the stagger index for [data-reveal]. */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-grid px-4 sm:px-6 ${className}`}>{children}</div>
}

export function Section({
  id,
  surface,
  label,
  className = '',
  children,
}: {
  id?: string
  surface: 'light' | 'alt' | 'dark'
  label?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-label={label} className={`surface-${surface} py-[72px] md:py-[120px] lg:py-[148px] ${className}`}>
      {children}
    </section>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-eyebrow text-link ${className}`}>{children}</p>
}

export function SectionHeader({
  eyebrow,
  headline,
  sub,
  className = '',
}: {
  eyebrow: string
  headline: string
  sub?: string
  className?: string
}) {
  return (
    <header data-reveal className={`max-w-text ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-section text-ink">{headline}</h2>
      {sub && <p className="mt-5 max-w-[46ch] text-lead text-ink-2">{sub}</p>}
    </header>
  )
}

const pill =
  'inline-flex items-center justify-center rounded-full bg-accent font-normal text-white transition-[background-color,transform] duration-200 ease-apple hover:bg-accent-hover active:scale-[0.98]'

export function PillLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={`${pill} min-h-[44px] px-[22px] text-[17px] ${className}`}>
      {children}
    </a>
  )
}

export function ChevronLink({
  href,
  children,
  external = false,
  className = '',
}: {
  href: string
  children: ReactNode
  external?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex min-h-[44px] items-center gap-1 text-[17px] text-link transition-transform duration-200 ease-apple hover:underline active:translate-y-[1px] ${className}`}
    >
      {children}
      <Chevron />
    </a>
  )
}

export function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 14"
      className={`h-[0.7em] w-auto transition-transform duration-200 ease-apple group-hover:translate-x-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 1.5 6.5 7l-5 5.5" />
    </svg>
  )
}

export { pill as pillClass }
