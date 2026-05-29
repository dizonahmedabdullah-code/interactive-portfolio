import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Ahmed Dizon — AI Automation Specialist',
  description:
    'AI Automation Specialist & Virtual Assistant based in the Philippines. Expert in Zapier, Make, n8n, and GoHighLevel. Talk to my AI avatar.',
  openGraph: {
    title: 'Ahmed Dizon — AI Automation Specialist',
    description:
      'Ask my AI avatar anything about automation, workflows, and how I can eliminate manual work from your business.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-5X4H7H11GK" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-5X4H7H11GK');
      `}</Script>
    </html>
  )
}
