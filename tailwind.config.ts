import type { Config } from 'tailwindcss'

// Colours point at CSS variables in app/globals.css. A section picks its palette with
// .surface-light, .surface-alt or .surface-dark, and everything inside follows.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/site/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--surface)',
        card: 'var(--card)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        link: 'var(--link)',
        hair: 'var(--hair)',
        accent: '#0071e3',
        'accent-hover': '#0077ed',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'var(--font-inter)', '"Segoe UI"', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(48px, 8vw, 96px)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' }],
        section: ['clamp(32px, 5vw, 56px)', { lineHeight: '1.07', letterSpacing: '-0.02em', fontWeight: '600' }],
        title: ['clamp(24px, 2.6vw, 32px)', { lineHeight: '1.12', letterSpacing: '-0.015em', fontWeight: '600' }],
        lead: ['clamp(19px, 1.7vw, 21px)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        body: ['17px', { lineHeight: '1.5', letterSpacing: '-0.022em' }],
        eyebrow: ['14px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        stat: ['clamp(48px, 6vw, 80px)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '600' }],
      },
      maxWidth: {
        text: '980px',
        grid: '1200px',
      },
      borderRadius: {
        tile: '24px',
        stage: '28px',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
