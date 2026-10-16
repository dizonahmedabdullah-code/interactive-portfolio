# Automated by Med

Portfolio site for Ahmed Abdullah Dizon: AI automations, GoHighLevel builds and live dashboards. Live at [automated-by-med.vercel.app](https://automated-by-med.vercel.app).

## Stack

- **Next.js 15** App Router. The page is a Server Component; motion and dialogs live in small client components under `components/site/`.
- **Tailwind CSS v3** with design tokens as CSS variables in `app/globals.css`.
- **Inter** via `next/font` as the fallback behind the system font stack (SF Pro on Apple devices).
- No animation library: scroll reveals use IntersectionObserver and CSS, and all motion turns off under `prefers-reduced-motion`.

## Where things live

| File | What it holds |
|------|---------------|
| `lib/content.ts` | Every line of copy, the case studies, services and workflow builds |
| `components/site/sections.tsx` | The page sections, in order |
| `components/site/DashboardPlaceholder.tsx` | Stand-in for the BI dashboard screenshot (swap for the real redacted image) |
| `app/opengraph-image.tsx` | Share image, generated at build time |
| `public/case-studies/coaching/` | Redacted screenshots for case study 1 |

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `npm run build` and `npm run lint` before pushing.

## Rules for content

- No client names anywhere: copy, alt text, file names, comments or metadata.
- No em dashes in visible copy.
- Raw screenshots go in `_incoming/`, which is git-ignored. Only redacted images go in `public/`.
