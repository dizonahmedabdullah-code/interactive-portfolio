'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Shot } from '@/lib/content'
import { lockPageScroll } from './ui'

function Diagram({ steps }: { steps: string[] }) {
  // TODO: real screenshot. Until then the caption's own steps are drawn as a simple flow.
  return (
    <ol className="grid h-full w-full grid-cols-2 content-center gap-3 p-5 sm:flex sm:items-center sm:gap-2 sm:p-6">
      {steps.map((step, i) => (
        <li key={step} className="flex min-w-0 items-center gap-2 sm:flex-1">
          <span className="text-[12px] tabular-nums text-ink-2 sm:hidden">{i + 1}</span>
          <span
            className={`flex-1 truncate rounded-full px-3 py-2 text-center text-[13px] ${
              i === steps.length - 1 ? 'bg-link text-black' : 'bg-white/10 text-ink'
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <svg aria-hidden="true" viewBox="0 0 12 12" className="hidden h-3 w-3 shrink-0 text-ink-2 sm:block">
              <path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </li>
      ))}
    </ol>
  )
}

function Frame({ shot, onOpen, tall }: { shot: Shot; onOpen: (shot: Shot) => void; tall: boolean }) {
  const img = shot.image
  const box = `relative block w-full overflow-hidden rounded-[18px] ${tall ? 'aspect-[4/5] md:aspect-auto md:flex-1' : 'aspect-[16/10]'}`

  if (!img) {
    return (
      <div role="img" aria-label={shot.alt} className={`${box} bg-card`}>
        {shot.diagram && <Diagram steps={shot.diagram} />}
      </div>
    )
  }

  const picture = (
    <Image
      src={img.src}
      alt={shot.alt}
      width={img.width}
      height={img.height}
      sizes="(min-width: 768px) 560px, 100vw"
      className={`absolute inset-0 h-full w-full ${img.fit === 'cover' ? 'object-cover' : 'object-contain p-4'}`}
      style={{ objectPosition: img.position }}
    />
  )

  if (!img.enlarge) return <div className={`${box} bg-white`}>{picture}</div>

  return (
    <button
      type="button"
      onClick={() => onOpen(shot)}
      aria-label={`Enlarge: ${shot.caption}`}
      className={`${box} group cursor-zoom-in bg-white transition-transform duration-200 ease-apple active:scale-[0.99]`}
    >
      {picture}
      <span className="absolute bottom-3 right-3 rounded-full bg-black/75 px-3 py-1 text-[12px] text-white">Enlarge</span>
    </button>
  )
}

export default function Gallery({ shots, note }: { shots: Shot[]; note: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState<Shot | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (active && dialog && !dialog.open) {
      dialog.showModal()
      lockPageScroll(true)
    }
  }, [active])

  const [first, ...rest] = shots

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2">
        <figure data-reveal className="flex min-w-0 flex-col md:row-span-2">
          <Frame shot={first} onOpen={setActive} tall />
          <figcaption className="mt-3 text-[14px] leading-snug text-ink-2">{first.caption}</figcaption>
        </figure>
        {rest.map((shot, i) => (
          <figure key={shot.caption} data-reveal style={{ ['--i' as string]: i + 1 }} className="min-w-0">
            <Frame shot={shot} onOpen={setActive} tall={false} />
            <figcaption className="mt-3 text-[14px] leading-snug text-ink-2">{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-8 text-[14px] text-ink-2">{note}</p>

      {/* Native dialog: Esc closes it, focus stays inside and returns to the thumbnail. */}
      <dialog
        ref={dialogRef}
        aria-label={active?.caption}
        onClose={() => {
          lockPageScroll(false)
          setActive(null)
        }}
        onClick={e => e.target === e.currentTarget && e.currentTarget.close()}
        className="m-auto max-h-[94dvh] max-w-[94vw] overflow-visible bg-transparent p-0 text-[#f5f5f7]"
      >
        {active?.image && (
          <div className="relative">
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="absolute -right-2 -top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-[#1d1d1f] text-[#f5f5f7] ring-1 ring-white/15 active:scale-[0.96]"
            >
              <svg aria-hidden="true" viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 2l10 10M12 2 2 12" />
              </svg>
            </button>
            <Image
              src={active.image.src}
              alt={active.alt}
              width={active.image.width}
              height={active.image.height}
              sizes="90vw"
              className="h-auto max-h-[84dvh] w-auto max-w-full rounded-[14px]"
            />
            <p className="mt-3 max-w-[60ch] text-[14px] leading-snug text-[#d2d2d7]">{active.caption}</p>
          </div>
        )}
      </dialog>
    </div>
  )
}
