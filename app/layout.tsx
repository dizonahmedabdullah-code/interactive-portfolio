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
  title: 'MedVentures | AI Automation Systems for Growing Businesses',
  description:
    'MedVentures builds production-grade automation systems on n8n, Make, Zapier, GoHighLevel, and HubSpot. Founded by Ahmed Dizon.',
  openGraph: {
    title: 'MedVentures | AI Automation Systems for Growing Businesses',
    description:
      'MedVentures builds production-grade automation systems on n8n, Make, Zapier, GoHighLevel, and HubSpot. Founded by Ahmed Dizon.',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'MedVentures' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedVentures | AI Automation Systems for Growing Businesses',
    description:
      'MedVentures builds production-grade automation systems on n8n, Make, Zapier, GoHighLevel, and HubSpot. Founded by Ahmed Dizon.',
    images: ['/og-image.jpg'],
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
