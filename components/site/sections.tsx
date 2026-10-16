import {
  BRAND,
  BUILDS,
  BUILDS_INTRO,
  CASE_STUDY_ONE,
  CASE_STUDY_TWO,
  CLOSING,
  FOOTER,
  HERO,
  HOW_I_WORK,
  LINKEDIN,
  MAILTO,
  SERVICES,
  STATS,
  WORK_SAMPLES_URL,
} from '@/lib/content'
import ActiveSteps from './ActiveSteps'
import BuildsCarousel from './BuildsCarousel'
import CountUp from './CountUp'
import DashboardPlaceholder from './DashboardPlaceholder'
import Gallery from './Gallery'
import ScrollScale from './ScrollScale'
import ServiceVisual from './ServiceVisual'
import { ChevronLink, Container, PillLink, Section, SectionHeader, cssVars } from './ui'

export function Hero() {
  let word = 0
  return (
    <section id="top" className="surface-light flex min-h-[100dvh] flex-col pb-[72px] pt-14 md:pb-[120px] md:pt-24">
      <Container>
        <p className="hero-after text-[19px] font-semibold tracking-[-0.015em] text-link md:text-[21px]" style={cssVars({ '--d': '0ms' })}>
          {HERO.eyebrow}
        </p>
        <h1 className="mt-3 text-hero text-ink">
          {HERO.headline.map(line => (
            <span key={line} className="block">
              {line.split(' ').map((w, i, all) => (
                <span key={w}>
                  <span className="hero-word" style={cssVars({ '--w': word++ })}>
                    {w}
                  </span>
                  {i < all.length - 1 && ' '}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-after mt-6 max-w-[36ch] text-lead text-ink-2" style={cssVars({ '--d': '360ms' })}>
          {HERO.subline}
        </p>
        <div className="hero-after mt-8 flex flex-wrap items-center gap-x-8 gap-y-3" style={cssVars({ '--d': '460ms' })}>
          <PillLink href="#work">See the work</PillLink>
          <ChevronLink href={MAILTO}>Book a call</ChevronLink>
        </div>
      </Container>

      <Container className="mt-14 md:mt-20">
        <div className="hero-after surface-dark overflow-hidden rounded-stage p-3 sm:p-6 md:p-12 lg:p-16" style={cssVars({ '--d': '560ms' })}>
          <ScrollScale>
            <DashboardPlaceholder />
          </ScrollScale>
        </div>
      </Container>
    </section>
  )
}

export function StatRow() {
  return (
    <section aria-label="Track record" className="surface-light pb-[72px] md:pb-[120px]">
      <Container>
        <dl className="grid gap-10 sm:grid-cols-3 sm:gap-6">
          {STATS.map((stat, i) => (
            <div key={stat.label} data-reveal style={cssVars({ '--i': i })} className="flex flex-col-reverse">
              <dt className="mt-2 text-lead text-ink-2">{stat.label}</dt>
              <dd className="text-stat text-ink">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <span className="sr-only">
                  {stat.prefix}
                  {stat.value.toLocaleString('en-US')}
                  {stat.suffix}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

export function CaseStudyOne() {
  const cs = CASE_STUDY_ONE
  return (
    <Section id="work" surface="dark">
      <Container>
        <SectionHeader eyebrow={cs.eyebrow} headline={cs.headline} sub={cs.sub} />

        <div id="cs1-steps" className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          {/* Pinned on desktop while the three blocks scroll past. */}
          <div className="min-w-0">
            <figure data-reveal className="lg:sticky lg:top-[max(72px,calc(50dvh_-_250px))]">
              <div className="rounded-tile bg-card p-2 sm:p-3">
                <DashboardPlaceholder />
              </div>
              <figcaption className="mt-4 text-[14px] leading-snug text-ink-2">
                Live BI dashboard on Next.js and Vercel, pulling CRM data through the GoHighLevel API.
              </figcaption>
            </figure>
          </div>

          <ol className="min-w-0 space-y-12 lg:space-y-0">
            {cs.steps.map((step, i) => (
              <li key={step.label} data-step className="group lg:flex lg:min-h-[62vh] lg:items-center">
                <div
                  data-reveal
                  className="border-l-2 border-hair pl-6 transition-colors duration-700 ease-out-expo group-data-[active]:border-link"
                >
                  <p className="text-eyebrow tabular-nums text-ink-2">0{i + 1}</p>
                  <h3 className="mt-1 text-title text-ink">{step.label}</h3>
                  {step.text && <p className="mt-4 max-w-[40ch] text-lead text-ink-2">{step.text}</p>}
                  {step.items && (
                    <ul className="mt-4 space-y-2">
                      {step.items.map(item => (
                        <li key={item} className="text-[17px] leading-snug text-ink-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <ActiveSteps targetId="cs1-steps" />

        <div className="mt-24 md:mt-32">
          <h3 data-reveal className="mb-8 text-title text-ink">
            Inside the build.
          </h3>
          <Gallery shots={cs.gallery} note={cs.redactionNote} />
        </div>
      </Container>
    </Section>
  )
}

export function CaseStudyTwo() {
  const cs = CASE_STUDY_TWO
  return (
    <Section surface="light" label="Case study: a desk that never forgets a follow-up">
      <Container>
        <SectionHeader eyebrow={cs.eyebrow} headline={cs.headline} sub={cs.sub} />

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <dl data-reveal className="surface-alt flex flex-col justify-center gap-10 rounded-tile p-8 md:p-12">
            {cs.stats.map(stat => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-lead text-ink-2">{stat.label}</dt>
                <dd className="text-stat text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="grid content-center gap-x-10 gap-y-10 sm:grid-cols-2">
            {cs.points.map((point, i) => (
              <li key={point.title} data-reveal style={cssVars({ '--i': i })}>
                <h3 className="text-[21px] font-semibold leading-snug tracking-[-0.015em] text-ink">{point.title}</h3>
                <p className="mt-2 text-[17px] leading-normal text-ink-2">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <blockquote
          data-reveal
          className="mt-20 max-w-text text-[clamp(28px,3.6vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] md:mt-28"
        >
          <span className="text-ink">{cs.closing[0]}</span> <span className="text-ink-2">{cs.closing[1]}</span>
        </blockquote>
      </Container>
    </Section>
  )
}

// Bento layout: dark and light tiles in a checkerboard, the last one full width.
const TILE_LAYOUT = [
  { surface: 'surface-dark', span: 'lg:col-span-4' },
  { surface: 'surface-light', span: 'lg:col-span-2' },
  { surface: 'surface-light', span: 'lg:col-span-2' },
  { surface: 'surface-dark', span: 'lg:col-span-4' },
  { surface: 'surface-light', span: 'md:col-span-2 lg:col-span-6' },
]

export function Services() {
  return (
    <Section id="services" surface="alt">
      <Container>
        <SectionHeader eyebrow={SERVICES.eyebrow} headline={SERVICES.headline} sub={SERVICES.sub} />
        <ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.tiles.map((tile, i) => {
            const layout = TILE_LAYOUT[i]
            const wide = i === SERVICES.tiles.length - 1
            return (
              <li
                key={tile.eyebrow}
                data-reveal
                style={cssVars({ '--i': i % 2 })}
                className={`${layout.surface} ${layout.span} flex min-h-[360px] flex-col justify-between gap-10 rounded-tile p-8 md:p-10 ${
                  wide ? 'lg:min-h-0 lg:flex-row lg:items-center' : ''
                }`}
              >
                <div className="max-w-[44ch]">
                  <p className="text-eyebrow text-link">{tile.eyebrow}</p>
                  <h3 className="mt-3 text-title text-ink">{tile.headline}</h3>
                  <p className="mt-3 text-[17px] leading-normal text-ink-2">{tile.line}</p>
                  <p className="mt-4 text-[14px] text-ink-2">{tile.tools}</p>
                </div>
                <ServiceVisual
                  kind={tile.visual}
                  className={wide ? 'lg:max-w-[320px]' : layout.span === 'lg:col-span-4' ? 'lg:max-w-[380px] lg:self-end' : ''}
                />
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

export function Builds() {
  return (
    <Section id="builds" surface="light">
      <Container>
        <SectionHeader eyebrow={BUILDS_INTRO.eyebrow} headline={BUILDS_INTRO.headline} sub={BUILDS_INTRO.sub} />
      </Container>
      <BuildsCarousel builds={BUILDS} />
    </Section>
  )
}

export function HowIWork() {
  return (
    <Section id="about" surface="alt">
      <Container>
        <SectionHeader eyebrow={HOW_I_WORK.eyebrow} headline={HOW_I_WORK.headline} sub={HOW_I_WORK.sub} />
        <ol className="mt-14 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {HOW_I_WORK.columns.map((col, i) => (
            <li key={col.title} data-reveal style={cssVars({ '--i': i })}>
              <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.02em] text-ink">{col.title}</h3>
              <p className="mt-3 text-[17px] leading-normal text-ink-2">{col.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

export function Closing() {
  return (
    <section id="contact" className="surface-dark py-[96px] md:py-[160px]">
      <Container className="text-center">
        <div data-reveal>
          <h2 className="mx-auto max-w-[16ch] text-section text-ink">{CLOSING.headline}</h2>
          <p className="mx-auto mt-5 max-w-[40ch] text-lead text-ink-2">{CLOSING.sub}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <PillLink href={MAILTO}>{CLOSING.cta}</PillLink>
            <ChevronLink href={LINKEDIN} external>
              LinkedIn
            </ChevronLink>
            {WORK_SAMPLES_URL && (
              <ChevronLink href={WORK_SAMPLES_URL} external>
                Work samples
              </ChevronLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="surface-alt py-6 text-[12px] text-ink-2">
      <Container className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-ink">{BRAND}</span>
          <span aria-hidden="true" className="hidden sm:inline"> · </span>
          <span className="block sm:inline">{FOOTER.location}</span>
        </p>
        <p>&copy; {new Date().getFullYear()}</p>
      </Container>
    </footer>
  )
}
