import { streamText } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { SYSTEM_PROMPT } from '@/lib/prompt'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const groqKey = process.env.GROQ_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (!groqKey && !openaiKey) {
    return new Response(
      JSON.stringify({
        error:
          'No AI API key configured. Add GROQ_API_KEY or OPENAI_API_KEY to your .env.local file.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let model

  if (groqKey) {
    const groq = createGroq({ apiKey: groqKey })
    model = groq('llama-3.3-70b-versatile')
  } else {
    const openai = createOpenAI({ apiKey: openaiKey! })
    model = openai('gpt-4o-mini')
  }

  const result = await streamText({
    model,
    system: SYSTEM_PROMPT,
    messages,
    temperature: 0.72,
    maxTokens: 600,
  })

  return result.toDataStreamResponse()
}
