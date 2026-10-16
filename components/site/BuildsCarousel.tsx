'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Build } from '@/lib/content'
import { Chevron, lockPageScroll } from './ui'

// Lines the first card up with the page container while the row scrolls to the screen edge.
const edgePad = 'max(var(--gutter), calc((100% - 1200px) / 2 + 24px))'

export default function BuildsCarousel({ builds }: { builds: Build[] }) {
  const listRef = useRef<HTMLUListElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  // The last opened build stays rendered after closing, so the dialog can fade out with its content.
  const [shownIndex, setShownIndex] = useState<number | null>(null)
  const [openCount, setOpenCount] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  // At most once per frame, and only re-renders when an arrow button's state flips.
  const measure = useCallback(() => {
    const el = listRef.current
    if (!el) return
    const start = el.scrollLeft <= 4
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    setEdges(prev => (prev.start === start && prev.end === end ? prev : { start, end }))
  }, [])

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0
          measure()
        })
    }
    measure()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [measure])

  useEffect(() => {
    const dialog = dialogRef.current
    if (openCount > 0 && dialog && !dialog.open) {
      dialog.showModal()
      lockPageScroll(true)
    }
  }, [openCount])

  const openBuild = (i: number) => {
    setShownIndex(i)
    setOpenCount(n => n + 1)
  }

  const page = (dir: 1 | -1) => {
    const el = listRef.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: reduce ? 'auto' : 'smooth' })
  }

  const open = shownIndex === null ? null : builds[shownIndex]

  return (
    <div>
      <ul
        ref={listRef}
        aria-label="Workflow builds"
        className="scroller mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:snap-proximity"
        style={{ paddingInline: edgePad, scrollPaddingInline: edgePad }}
      >
        {builds.map((build, i) => (
          <li
            key={build.title}
            data-reveal
            style={{ ['--i' as string]: Math.min(i, 3) }}
            className="w-[min(82vw,372px)] shrink-0 snap-start"
          >
            <article className="surface-alt group relative flex h-full flex-col overflow-hidden rounded-tile transition-transform duration-200 ease-apple active:scale-[0.99]">
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <Image
                  src={build.image.src}
                  alt={build.image.alt}
                  width={build.image.width}
                  height={build.image.height}
                  sizes="(min-width: 640px) 372px, 82vw"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-eyebrow text-link">{build.tool}</p>
                <h3 className="mt-2 text-[19px] font-semibold leading-snug tracking-[-0.015em] text-ink">{build.title}</h3>
                <p className="mt-2 text-[15px] leading-normal text-ink-2">{build.line}</p>
                <button
                  type="button"
                  onClick={() => openBuild(i)}
                  aria-label={`Learn more about ${build.title}`}
                  className="mt-auto inline-flex items-center gap-1 self-start pt-5 text-[15px] text-link after:absolute after:inset-0 after:content-[''] hover:underline"
                >
                  Learn more
                  <Chevron />
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-4 flex w-full max-w-grid justify-end gap-3 px-4 sm:px-6">
        {([-1, 1] as const).map(dir => (
          <button
            key={dir}
            type="button"
            onClick={() => page(dir)}
            disabled={dir === -1 ? edges.start : edges.end}
            aria-label={dir === -1 ? 'Previous builds' : 'Next builds'}
            className="grid h-11 w-11 place-items-center rounded-full bg-[#e8e8ed] text-[#1d1d1f] transition-[opacity,transform] duration-200 ease-apple hover:bg-[#dcdce1] active:scale-[0.96] disabled:opacity-40"
          >
            <Chevron className={`h-3.5 ${dir === -1 ? 'rotate-180' : ''}`} />
          </button>
        ))}
      </div>

      {/* Native dialog: Esc closes it, focus stays inside and returns to the card. */}
      <dialog
        ref={dialogRef}
        aria-labelledby="build-dialog-title"
        onClose={() => lockPageScroll(false)}
        onClick={e => e.target === e.currentTarget && e.currentTarget.close()}
        className="sheet surface-light m-auto max-h-[92dvh] w-[min(94vw,880px)] max-w-none overflow-y-auto rounded-stage p-0"
      >
        {open && (
          <div>
            <div className="sticky top-0 z-10 flex justify-end p-3">
              <button
                type="button"
                autoFocus
                onClick={() => dialogRef.current?.close()}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full bg-[#e8e8ed] text-[#1d1d1f] active:scale-[0.96]"
              >
                <svg aria-hidden="true" viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2 2l10 10M12 2 2 12" />
                </svg>
              </button>
            </div>
            <div className="-mt-[60px] bg-card">
              <Image
                src={open.image.src}
                alt={open.image.alt}
                width={open.image.width}
                height={open.image.height}
                sizes="(min-width: 940px) 880px, 94vw"
                className="h-auto w-full"
              />
            </div>
            <div className="p-6 sm:p-10">
              <p className="text-eyebrow text-link">{open.tool}</p>
              <h2 id="build-dialog-title" className="mt-2 text-title text-ink">
                {open.title}
              </h2>
              <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10">
                <div>
                  <h3 className="text-[17px] font-semibold text-ink">The problem</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{open.problem}</p>
                  <h3 className="mt-6 text-[17px] font-semibold text-ink">The result</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{open.result}</p>
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-ink">What it does</h3>
                  <ol className="mt-3 space-y-2.5">
                    {open.steps.map((step, i) => (
                      <li key={step} className="flex gap-3 text-[15px] leading-snug text-ink-2">
                        <span className="w-5 shrink-0 tabular-nums text-ink">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
