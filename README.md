# Ahmed Dizon — AI Portfolio

Interactive AI-powered portfolio. An animated avatar answers questions about Ahmed's background, projects, and automation work via streaming chat.

## Stack

- **Next.js 15** — App Router, Server Components
- **Vercel AI SDK v4** — streaming chat (`useChat` + `streamText`)
- **Groq / Llama 3.1 70B** — primary model (fast + free tier) with OpenAI GPT-4o-mini fallback
- **Framer Motion** — avatar animations, message transitions
- **Tailwind CSS v3** — utility-first styling
- **Geist Sans/Mono** — Vercel's typeface

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure AI

Copy the example env file and add your key:

```bash
cp .env.example .env.local
```

Get a **free** Groq API key at [console.groq.com](https://console.groq.com) — Llama 3.1 70B is fast and has a generous free tier.

```env
GROQ_API_KEY=gsk_...
```

Or use OpenAI instead:

```env
OPENAI_API_KEY=sk-...
```

Groq is checked first. If both are set, Groq wins.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Set `GROQ_API_KEY` (or `OPENAI_API_KEY`) in Vercel's environment variables dashboard.

## Deploy to Render

1. Push repo to GitHub
2. Create a **Web Service** on [render.com](https://render.com)
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add env variable: `GROQ_API_KEY`

## Customization

| File | What to change |
|------|----------------|
| `lib/prompt.ts` | Ahmed's full background / personality |
| `app/page.tsx` | Suggestion chips, layout, colors |
| `components/Avatar.tsx` | Avatar SVG shape, colors, animations |
| `app/globals.css` | Blink animation timing, custom styles |
| `app/api/chat/route.ts` | Model, temperature, max tokens |
