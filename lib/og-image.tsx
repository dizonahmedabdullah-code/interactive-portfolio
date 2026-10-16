import { ImageResponse } from 'next/og'
import { BRAND, HERO, META } from '@/lib/content'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_ALT = `${BRAND}: ${HERO.headline.join(' ')}`

// Shared by app/opengraph-image.tsx and app/twitter-image.tsx, generated at build time.
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#000000',
          color: '#f5f5f7',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 600, color: '#2997ff' }}>{BRAND}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 108, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.02 }}>
            {HERO.headline[0]}
          </div>
          <div style={{ display: 'flex', fontSize: 108, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.02 }}>
            {HERO.headline[1]}
          </div>
          <div style={{ display: 'flex', marginTop: 32, fontSize: 30, color: '#a1a1a6', maxWidth: 900, lineHeight: 1.35 }}>
            {META.description}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#a1a1a6' }}>automated-by-med.vercel.app</div>
      </div>
    ),
    OG_SIZE,
  )
}
