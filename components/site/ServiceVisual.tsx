import type { ServiceVisual as Kind } from '@/lib/content'

// Small line drawings for the service tiles. Decorative only, so hidden from screen readers.
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export default function ServiceVisual({ kind, className = '' }: { kind: Kind; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 120" className={`h-auto w-full max-w-[280px] text-ink-2 ${className}`}>
      {kind === 'flow' && (
        <>
          {[30, 90, 150].map(cx => (
            <circle key={cx} cx={cx} cy="60" r="14" {...stroke} />
          ))}
          <circle cx="210" cy="60" r="14" fill="var(--link)" />
          <path d="M210 54v12M204 60h12" stroke="var(--surface)" strokeWidth="1.5" strokeLinecap="round" />
          {[44, 104, 164].map(x => (
            <path key={x} d={`M${x} 60h32M${x + 26} 55l6 5-6 5`} {...stroke} />
          ))}
        </>
      )}

      {kind === 'crm' && (
        <>
          {[14, 47, 80].map((y, i) => (
            <g key={y}>
              <rect x="20" y={y} width="200" height="26" rx="13" {...stroke} />
              <rect x="64" y={y + 10} width={[96, 120, 80][i]} height="6" rx="3" fill="currentColor" opacity="0.5" />
              {i < 2 ? (
                <>
                  <circle cx="40" cy={y + 13} r="8" fill="var(--link)" />
                  <path d={`M36.5 ${y + 13}l2.5 2.5 4.5-5`} stroke="var(--surface)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </>
              ) : (
                <circle cx="40" cy={y + 13} r="8" {...stroke} />
              )}
            </g>
          ))}
        </>
      )}

      {kind === 'review' && (
        <>
          <rect x="16" y="22" width="120" height="76" rx="16" {...stroke} />
          {[42, 58, 74].map((y, i) => (
            <rect key={y} x="34" y={y} width={[84, 70, 52][i]} height="6" rx="3" fill="currentColor" opacity="0.5" />
          ))}
          <path d="M146 60h34M174 55l6 5-6 5" {...stroke} />
          <circle cx="206" cy="60" r="20" fill="var(--link)" />
          <path d="M197 60.5l6 6 11-12" stroke="var(--surface)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {kind === 'chart' && (
        <>
          <path d="M20 104h200" {...stroke} />
          {[0, 1, 2, 3, 4, 5].map(i => {
            const h = [26, 38, 34, 52, 64, 82][i]
            return (
              <rect
                key={i}
                x={28 + i * 32}
                y={98 - h}
                width="20"
                height={h}
                rx="5"
                fill={i === 5 ? 'var(--link)' : 'currentColor'}
                opacity={i === 5 ? 1 : 0.35}
              />
            )
          })}
        </>
      )}

      {kind === 'match' && (
        <>
          {[20, 47, 74, 101].map((y, i) => (
            <g key={y}>
              <circle cx="40" cy={y} r="6" {...stroke} />
              <circle cx="200" cy={y} r="6" fill={i === 2 ? 'var(--link)' : 'none'} stroke={i === 2 ? 'var(--link)' : 'currentColor'} strokeWidth="1.5" />
              <path
                d={`M48 ${y}H192`}
                {...stroke}
                stroke={i === 2 ? 'var(--link)' : 'currentColor'}
                strokeDasharray={i === 2 ? '4 6' : undefined}
              />
            </g>
          ))}
        </>
      )}
    </svg>
  )
}
