// All site copy lives here. No client names anywhere: not in text, alt text, file names or comments.

export const BRAND = 'Automated by Med'
export const EMAIL = 'dizonahmedabdullah@gmail.com'
export const MAILTO = `mailto:${EMAIL}`
export const LINKEDIN = 'https://www.linkedin.com/in/ahmed-abdullah-dizon-06459137b'
export const SITE_URL = 'https://automated-by-med.vercel.app'
// TODO: paste the Google Drive work samples folder URL. The "Work samples" link stays hidden until this is set.
export const WORK_SAMPLES_URL: string = ''

export const META = {
  title: `${BRAND} | AI Automation for Growing Teams`,
  description:
    'AI automations, GoHighLevel builds and live dashboards that remove manual work. n8n, Make, Zapier and Claude.',
}

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const HERO = {
  eyebrow: BRAND,
  headline: ['Your busywork.', 'Automated.'],
  subline:
    'I build AI automations and live dashboards that take repetitive work off your team. n8n, Make, Zapier, GoHighLevel and Claude.',
}

export type Stat = { value: number; prefix?: string; suffix: string; label: string }

export const STATS: Stat[] = [
  { value: 100, suffix: '%', label: 'Job Success' },
  { value: 2100, suffix: '+', label: 'hours on Upwork' },
  { value: 9, suffix: '+', label: 'years remote' },
]

export type Shot = {
  caption: string
  alt: string
  image?: { src: string; width: number; height: number; fit: 'cover' | 'contain'; position?: string; enlarge: boolean }
  /** Steps drawn as a simple diagram while the real screenshot is missing. */
  diagram?: string[]
}

export const CASE_STUDY_ONE = {
  eyebrow: 'Case study',
  headline: 'Student success, on autopilot.',
  sub: 'Automation and live BI for an education and coaching business (NDA)',
  steps: [
    {
      label: 'Problem',
      text: 'Compliance and pipeline were tracked by hand. Staff chased documents, and leadership had no live view.',
    },
    {
      label: 'What I built',
      items: [
        'Document collection tied to each student record',
        'Missing-document reminders',
        '3-stage escalation',
        'Cohort onboarding',
        'Weekly compliance reports',
        'AI first-draft feedback, approved by a coach',
        'Live Next.js dashboard on the GoHighLevel API',
        'Payment reconciliation',
      ],
    },
    {
      label: 'How I work',
      items: [
        'Architecture first',
        'Nothing deleted, only disabled',
        'Test on one record before any bulk change',
        'Scheduled sends only',
        'Scope changes in writing',
        'Daily reports',
        'Handover SOPs',
      ],
    },
  ],
  gallery: [
    {
      caption: 'Missing-document check across required student files.',
      alt: 'Condition panel that checks whether any of four required files is empty, with the fields named Document 1, Document 2, Workbook and Tracking sheet.',
      image: {
        src: '/case-studies/coaching/missing-doc-check.webp',
        width: 414,
        height: 1092,
        fit: 'cover',
        position: '50% 58%',
        enlarge: true,
      },
    },
    {
      caption: 'Non-compliance escalation: reminder, wait, re-check, then warning.',
      alt: 'Diagram of the escalation steps: reminder, wait, re-check, warning.',
      diagram: ['Reminder', 'Wait', 'Re-check', 'Warning'],
    },
    {
      caption: 'One cohort’s automation set: KPI reminders, warnings, late joiners, session reminders.',
      alt: 'List of five published workflows for one cohort, including a daily KPI reminder, homework warnings, late joiners, a lecture reminder and a tutorial reminder.',
      // Native size is only 475px wide, so it stays a small image with no enlarge view.
      image: {
        src: '/case-studies/coaching/cohort-workflows.webp',
        width: 475,
        height: 474,
        fit: 'contain',
        enlarge: false,
      },
    },
  ] satisfies Shot[],
  redactionNote: 'Screenshots redacted to protect client and student data.',
}

export const CASE_STUDY_TWO = {
  eyebrow: 'Case study',
  headline: 'A desk that never forgets a follow-up.',
  sub: 'AI operating system for a business development desk, built on Claude',
  points: [
    { title: 'Voice-matched drafting', text: 'A 70+ section voice guide, so every draft sounds like the sender.' },
    {
      title: 'Morning follow-up engine',
      text: 'Drafts replies for threads quiet 2+ days and leaves them unsent for review.',
    },
    { title: 'One row per partner', text: 'Trackers with a Latest activity column, so status is one glance away.' },
    { title: 'Daily EOD reports', text: 'A fixed-format end-of-day report, plus weekly summaries.' },
  ],
  stats: [
    { value: 'Up to 40', label: 'reviewed follow-ups a day' },
    { value: 'Zero', label: 'messages sent without human review' },
  ],
  closing: [
    'I don’t sell AI.',
    'I sell a desk that never forgets a follow-up, writes in your voice, and tells you every evening what moved.',
  ],
}

export type ServiceVisual = 'flow' | 'crm' | 'review' | 'chart' | 'match'

export const SERVICES = {
  eyebrow: 'Services',
  headline: 'What I build.',
  sub: 'Systems that remove manual work, scoped clearly, tested before they go live, and handed over with documentation.',
  tiles: [
    {
      eyebrow: 'Workflow automation',
      headline: 'Handoffs that run themselves.',
      line: 'Multi-step flows replace copy-paste and manual handoffs, and run without babysitting.',
      tools: 'n8n, Make, Zapier',
      visual: 'flow',
    },
    {
      eyebrow: 'CRM automation and GoHighLevel builds',
      headline: 'A CRM that keeps itself clean.',
      line: 'Pipelines, follow-ups, lead routing and booking that update on their own.',
      tools: 'GoHighLevel, HubSpot, Zoho',
      visual: 'crm',
    },
    {
      eyebrow: 'AI agents with a human in the loop',
      headline: 'AI drafts. Your team decides.',
      line: 'Agents write the first draft, and a person approves wherever a mistake would cost you.',
      tools: 'Claude, Gemini, OpenRouter',
      visual: 'review',
    },
    {
      eyebrow: 'Live dashboards and reporting',
      headline: 'Leadership sees it live.',
      line: 'Dashboards on live CRM data, so nobody waits for an export.',
      tools: 'Next.js, Vercel, CRM APIs',
      visual: 'chart',
    },
    {
      eyebrow: 'Data cleanup and reconciliation',
      headline: 'Every record matches the source.',
      line: 'Records matched, deduplicated and checked, with an action for every gap.',
      tools: 'Google Sheets, CRM imports, Python',
      visual: 'match',
    },
  ] satisfies { eyebrow: string; headline: string; line: string; tools: string; visual: ServiceVisual }[],
}

export type Build = {
  tool: 'Zapier' | 'Make' | 'n8n'
  title: string
  line: string
  image: { src: string; width: number; height: number; alt: string }
  problem: string
  steps: string[]
  result: string
}

export const BUILDS_INTRO = {
  eyebrow: 'Demos',
  headline: 'Workflow builds.',
  sub: 'Smaller builds across Zapier, Make and n8n. Open any card for the problem, the steps and the result.',
}

export const BUILDS: Build[] = [
  {
    tool: 'Zapier',
    title: 'AI Content Repurposing: Audio to Blog Posts and Social Media',
    line: 'One audio upload becomes two blog posts, published to Facebook and LinkedIn.',
    image: {
      src: '/zapier-project-1.jpg',
      width: 2507,
      height: 1269,
      alt: 'Zapier editor showing the content repurposing flow from a new Drive file to Facebook and LinkedIn posts.',
    },
    problem:
      'Creating content across multiple platforms from a single piece of media is time-consuming. Most creators and businesses record audio or video but then have to manually transcribe it, write blog posts, craft social captions, and post everything one by one. The process takes hours and rarely happens consistently.',
    steps: [
      'Triggers automatically when a new file is added to a Google Drive folder',
      'Filters the file using a condition check before processing',
      'Uses AI to generate a full transcript from the audio or video file',
      'Passes the transcript to a second AI step that creates two full blog posts',
      'Loops through each blog post individually using Looping by Zapier',
      'Splits into two paths based on a keyword condition in the title or content',
      'If the condition is met, publishes the post to Facebook Pages and shares it on LinkedIn',
      'If the condition is not met, the content is held and not published',
    ],
    result:
      'One file upload triggers a complete content repurposing pipeline. Two blog posts created, reviewed by condition logic, and published to social media automatically with zero manual writing, formatting, or posting involved.',
  },
  {
    tool: 'Make',
    title: 'AI-Powered Email Attachment Organizer',
    line: 'Every attachment renamed by AI, filed in Drive and logged in Sheets.',
    image: {
      src: '/make-project-1.jpg',
      width: 2551,
      height: 1269,
      alt: 'Make scenario that watches Gmail, renames attachments with AI, uploads them to Drive, logs them in Sheets and sends a confirmation.',
    },
    problem:
      'Managing email attachments manually is one of the most time-consuming admin tasks in any business. Files arrive with generic names, get buried in inboxes, and never make it into the right folder.',
    steps: [
      'Watches Gmail inbox for incoming emails with attachments',
      'Extracts and lists all attachments automatically',
      'Uses AI to analyze each file and generate a meaningful, organized file name',
      'Uploads the renamed file directly to Google Drive',
      'Logs each attachment with metadata into a Google Sheets record',
      'Sends an automated email notification confirming the task is done',
    ],
    result:
      'Zero manual file sorting. Every attachment arrives organized, properly named, backed up to Drive, and logged, with no human involved in the process.',
  },
  {
    tool: 'Make',
    title: 'Asana to Xero Finance Data Sync',
    line: 'A completed Asana task pulls Xero transactions and attaches the CSV.',
    image: {
      src: '/make-project-2.jpg',
      width: 2557,
      height: 1269,
      alt: 'Make scenario that starts from a completed Asana task, pulls Xero transactions, logs them in Sheets and uploads a CSV back to Asana.',
    },
    problem:
      'Finance and project teams work in separate tools. Accountants live in Xero while project managers work in Asana, and syncing transaction data required manual exporting, formatting, and uploading every single time.',
    steps: [
      'Triggers automatically when an Asana task is marked as complete',
      'Pulls account transaction data from Xero via API',
      'Routes data through two parallel paths simultaneously using a Router',
      'Logs individual transactions row by row into Google Sheets',
      'Aggregates all data into a formatted CSV file',
      'Uploads the CSV as an attachment directly to the original Asana task',
      'Clears the Google Sheets range to reset for the next cycle',
    ],
    result:
      'Finance data reaches the project team automatically the moment a task is completed. No manual exports, no file transfers, no back-and-forth between departments.',
  },
  {
    tool: 'n8n',
    title: 'AI Webhook Request Handler with Gemini',
    line: 'A webhook assistant that finds the right document and answers with Gemini.',
    image: {
      src: '/n8n-project-1.jpg',
      width: 2499,
      height: 1253,
      alt: 'n8n workflow with a webhook, a filter, a document lookup and a Gemini AI agent with memory that replies over HTTP.',
    },
    problem:
      'Businesses receive repetitive questions through web forms or external apps that require intelligent, context-aware responses. Answering manually every time is slow, inconsistent, and impossible to scale.',
    steps: [
      'Receives incoming requests via Webhook from any connected app or form',
      'Routes requests through an If condition to filter valid from invalid inputs',
      'Retrieves the relevant document or knowledge base entry for valid requests',
      'Passes the document and request to a Google Gemini AI Agent with Simple Memory',
      'AI Agent generates a context-aware, intelligent response',
      'Sends the response back via HTTP Request to the originating system',
    ],
    result:
      'An always-on AI assistant that handles incoming requests intelligently, retrieves the right information, and responds automatically, without any human involvement.',
  },
  {
    tool: 'n8n',
    title: 'AI Job Application Pipeline via Slack',
    line: 'One Slack message finds jobs, tailors the resume and drafts the email.',
    image: {
      src: '/n8n-project-2.jpg',
      width: 2511,
      height: 1269,
      alt: 'n8n workflow triggered from Slack that scrapes job listings, rewrites a resume per role and creates Gmail drafts.',
    },
    problem:
      'Job hunting is repetitive and time-consuming. Searching for listings, tailoring a resume for every application, and drafting emails manually takes hours that most professionals simply do not have.',
    steps: [
      'Triggered by a Slack message with a job search query',
      'Validates the query before processing begins',
      'Scrapes live job listings from the web via HTTP request',
      'Loops through each job result individually',
      'Retrieves the user’s existing resume from Google Drive',
      'Uses OpenRouter AI to rewrite and optimize the resume for each specific role',
      'Copies and updates the tailored resume in Google Docs',
      'Auto-creates a Gmail draft ready for sending',
      'Sends a completion summary back to the user in Slack',
    ],
    result:
      'A complete job application pipeline triggered by a single Slack message. The system finds jobs, tailors the resume, and prepares the email draft, automatically, with no manual work required.',
  },
  {
    tool: 'n8n',
    title: 'Automated Short-Form Video Creator and Publisher',
    line: 'Generates, renders and uploads a short video to YouTube on a schedule.',
    image: {
      src: '/n8n-project-3.jpg',
      width: 2352,
      height: 1263,
      alt: 'n8n workflow on a schedule that writes a prompt with Gemini, generates a video through an API and uploads it to YouTube.',
    },
    problem:
      'Creating and publishing short-form video content consistently is one of the biggest challenges for creators and brands. Writing scripts, generating videos, and uploading them manually is a daily time drain that prevents real scale.',
    steps: [
      'Runs automatically on a set schedule, no manual trigger needed',
      'Uses Google Gemini AI to generate a creative video prompt',
      'Authenticates with the video generation API using secure JWT token exchange',
      'Sends the prompt to generate a short-form video via API',
      'Polls the API until the video is fully rendered',
      'Validates the output and filters errors or unusable results',
      'Converts the Base64 video string into a proper video file',
      'Uploads the finished video directly to YouTube',
    ],
    result:
      'A fully automated content machine that generates, renders, and publishes short-form videos on a schedule. No scripting, no manual uploading, no repetitive work.',
  },
]

export const HOW_I_WORK = {
  eyebrow: 'About',
  headline: 'How I work.',
  sub: '9+ years of remote work, and the same four rules on every build.',
  columns: [
    { title: 'Plan first', text: 'The architecture is agreed before anything is built, and scope changes are confirmed in writing.' },
    { title: 'Test small', text: 'Every bulk change runs on one record first, before it touches the rest.' },
    { title: 'Nothing breaks', text: 'Old steps are disabled, never deleted, and messages go out on a schedule.' },
    { title: 'You’re always updated', text: 'Start-of-day and end-of-day reports, plus handover SOPs your team can follow.' },
  ],
}

export const CLOSING = {
  headline: 'Send me the process that eats your week.',
  sub: 'I’ll tell you how I’d automate it.',
  cta: 'Email me',
}

export const FOOTER = {
  location: 'Quezon City, Philippines (UTC+8)',
}
