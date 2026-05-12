'use client'

import { memo } from 'react'
import type { SimpleIcon } from 'simple-icons'
import {
  siZapier, siMake, siN8n, siHubspot, siAsana, siTrello,
  siNotion, siGmail, siMeta, siFacebook, siInstagram,
  siXero, siQuickbooks, siGooglesheets, siGoogledrive,
  siGoogledocs, siGooglegemini, siAirtable, siYoutube,
  siLooker, siZoho,
} from 'simple-icons'

type IconTool = { name: string; si: SimpleIcon }
type FallbackTool = { name: string; initials: string; color: string }
type Tool = IconTool | FallbackTool

const TOOLS: Tool[] = [
  { name: 'Zapier',            si: siZapier },
  { name: 'Make.com',          si: siMake },
  { name: 'n8n',               si: siN8n },
  { name: 'GoHighLevel',       initials: 'GHL', color: '#F97316' },
  { name: 'ChatGPT',           initials: 'GPT', color: '#10A37F' },
  { name: 'Google Gemini',     si: siGooglegemini },
  { name: 'OpenRouter',        initials: 'OR',  color: '#6C5CE7' },
  { name: 'HubSpot',           si: siHubspot },
  { name: 'Salesforce',        initials: 'SF',  color: '#00A1E0' },
  { name: 'Zoho',              si: siZoho },
  { name: 'LinkedIn',          initials: 'in',  color: '#0A66C2' },
  { name: 'Asana',             si: siAsana },
  { name: 'Trello',            si: siTrello },
  { name: 'Slack',             initials: 'SL',  color: '#4A154B' },
  { name: 'Notion',            si: siNotion },
  { name: 'Google Workspace',  initials: 'GW',  color: '#4285F4' },
  { name: 'Microsoft Office',  initials: 'MS',  color: '#D83B01' },
  { name: 'Gmail',             si: siGmail },
  { name: 'Meta',              si: siMeta },
  { name: 'Facebook',          si: siFacebook },
  { name: 'Instagram',         si: siInstagram },
  { name: 'Jane',              initials: 'JN',  color: '#00A9E0' },
  { name: 'Xero',              si: siXero },
  { name: 'QuickBooks',        si: siQuickbooks },
  { name: 'Google Sheets',     si: siGooglesheets },
  { name: 'Microsoft Excel',   initials: 'XL',  color: '#217346' },
  { name: 'Google Drive',      si: siGoogledrive },
  { name: 'Google Docs',       si: siGoogledocs },
  { name: 'Airtable',          si: siAirtable },
  { name: 'Canva',             initials: 'CV',  color: '#00C4CC' },
  { name: 'CapCut',            initials: 'CC',  color: '#6B7280' },
  { name: 'YouTube',           si: siYoutube },
  { name: 'Metricool',         initials: 'ME',  color: '#9333EA' },
  { name: 'Looker Studio',     si: siLooker },
]

function ToolTile({ tool }: { tool: Tool }) {
  const isIcon = 'si' in tool
  const iconFill = isIcon
    ? tool.si.hex === '000000' ? '#d4d4d8' : `#${tool.si.hex}`
    : null

  return (
    <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl border border-zinc-800/60 bg-zinc-900/50 flex-shrink-0 w-[96px]">
      {isIcon ? (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" style={{ fill: iconFill! }} aria-hidden>
          <path d={tool.si.path} />
        </svg>
      ) : (
        <div
          className="w-5 h-5 rounded flex items-center justify-center text-white font-black flex-shrink-0"
          style={{ backgroundColor: tool.color, fontSize: tool.initials.length > 2 ? 6 : 8 }}
        >
          {tool.initials}
        </div>
      )}
      <span className="text-[9px] text-zinc-500 font-medium text-center leading-tight line-clamp-2 w-full">
        {tool.name}
      </span>
    </div>
  )
}

const ToolsBanner = memo(function ToolsBanner() {
  return (
    <div className="relative overflow-hidden py-1">
      {/* Edge fade masks matching page bg */}
      <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

      {/* Marquee — two copies so the loop is seamless */}
      <div
        className="flex gap-3 w-max"
        style={{ animation: 'marquee 55s linear infinite' }}
        onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')}
        onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')}
      >
        {[...TOOLS, ...TOOLS].map((tool, i) => (
          <ToolTile key={i} tool={tool} />
        ))}
      </div>
    </div>
  )
})

export default ToolsBanner
