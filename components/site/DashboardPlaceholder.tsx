// TODO: real screenshot. Neutral wireframe standing in for the redacted BI dashboard.
// Swap it for a next/image of the redacted screenshot once one exists; it has no text or
// figures on purpose, so it can't be mistaken for real client data.
export default function DashboardPlaceholder({ className = '' }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Placeholder for the live BI dashboard screenshot"
      viewBox="0 0 1200 750"
      className={`block h-auto w-full ${className}`}
    >
      <rect x="0" y="0" width="1200" height="750" rx="18" fill="#1d1d1f" />
      {/* Window bar */}
      <circle cx="28" cy="24" r="6" fill="#3a3a3c" />
      <circle cx="48" cy="24" r="6" fill="#3a3a3c" />
      <circle cx="68" cy="24" r="6" fill="#3a3a3c" />
      <rect x="470" y="14" width="260" height="20" rx="10" fill="#2c2c2e" />
      <line x1="0" y1="48" x2="1200" y2="48" stroke="#2c2c2e" />

      {/* Sidebar */}
      <path d="M0 48.5H210V750H18A18 18 0 0 1 0 732Z" fill="#161617" />
      <rect x="18" y="76" width="174" height="34" rx="8" fill="#2c2c2e" />
      <circle cx="38" cy="93" r="6" fill="#2997ff" />
      {[132, 172, 212, 252, 292].map((y, i) => (
        <rect key={y} x="30" y={y} width={[120, 96, 132, 108, 88][i]} height="12" rx="6" fill="#3a3a3c" />
      ))}

      {/* KPI row */}
      {[234, 470, 706, 942].map((x, i) => (
        <g key={x}>
          <rect x={x} y="72" width="220" height="118" rx="14" fill="#2c2c2e" />
          <rect x={x + 20} y="94" width="72" height="10" rx="5" fill="#48484a" />
          <rect x={x + 20} y="120" width={[112, 92, 120, 100][i]} height="28" rx="8" fill="#636366" />
          <polyline
            points={`${x + 140},170 ${x + 158},162 ${x + 172},166 ${x + 186},152 ${x + 200},146`}
            fill="none"
            stroke="#2997ff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      {/* Trend chart */}
      <rect x="234" y="214" width="600" height="300" rx="14" fill="#2c2c2e" />
      <rect x="258" y="236" width="140" height="12" rx="6" fill="#48484a" />
      {[300, 350, 400, 450].map(y => (
        <line key={y} x1="258" y1={y} x2="810" y2={y} stroke="#3a3a3c" />
      ))}
      <path
        d="M258 450 C 310 430, 340 438, 380 404 S 460 352, 510 376 S 600 320, 650 306 S 740 280, 810 254 L 810 490 L 258 490 Z"
        fill="#2997ff"
        opacity="0.14"
      />
      <path
        d="M258 450 C 310 430, 340 438, 380 404 S 460 352, 510 376 S 600 320, 650 306 S 740 280, 810 254"
        fill="none"
        stroke="#2997ff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Ranked bars */}
      <rect x="858" y="214" width="304" height="300" rx="14" fill="#2c2c2e" />
      <rect x="882" y="236" width="120" height="12" rx="6" fill="#48484a" />
      {[272, 316, 360, 404, 448].map((y, i) => (
        <rect key={y} x="882" y={y} width={[240, 196, 168, 132, 96][i]} height="22" rx="6" fill={i === 0 ? '#2997ff' : '#48484a'} />
      ))}

      {/* Funnel */}
      <rect x="234" y="538" width="452" height="188" rx="14" fill="#2c2c2e" />
      {[564, 600, 636, 672].map((y, i) => {
        const w = [380, 300, 220, 140][i]
        return <rect key={y} x={460 - w / 2} y={y} width={w} height="24" rx="6" fill={i === 3 ? '#2997ff' : '#48484a'} />
      })}

      {/* Table */}
      <rect x="710" y="538" width="452" height="188" rx="14" fill="#2c2c2e" />
      {[566, 604, 642, 680].map(y => (
        <g key={y}>
          <rect x="734" y={y} width="150" height="12" rx="6" fill="#48484a" />
          <rect x="1010" y={y} width="128" height="12" rx="6" fill="#3a3a3c" />
        </g>
      ))}

      {/* Window outline drawn last so it sits over the sidebar's corner. */}
      <rect x="0.5" y="0.5" width="1199" height="749" rx="18" fill="none" stroke="#424245" />
    </svg>
  )
}
