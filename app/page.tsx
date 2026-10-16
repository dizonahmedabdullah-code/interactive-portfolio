import Nav from '@/components/site/Nav'
import RevealObserver from '@/components/site/RevealObserver'
import {
  Builds,
  CaseStudyOne,
  CaseStudyTwo,
  Closing,
  Footer,
  Hero,
  HowIWork,
  Services,
  StatRow,
} from '@/components/site/sections'

// Server Component: static layout only. Motion and dialogs live in small client components.
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-[14px] text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-2"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <StatRow />
        <CaseStudyOne />
        <CaseStudyTwo />
        <Services />
        <Builds />
        <HowIWork />
        <Closing />
      </main>
      <Footer />
      <RevealObserver />
    </>
  )
}
