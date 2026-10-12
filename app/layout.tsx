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
  metadataBase: new URL('https://automated-by-med.vercel.app'),
  title: 'AI Automation Specialist | Founder, MedVentures',
  description:
    'Ahmed Dizon builds systems that remove manual work, using n8n, Make, Zapier, GoHighLevel and Claude. Upwork Top Rated, 100% Job Success Score, 2,100+ hours.',
  openGraph: {
    title: 'AI Automation Specialist | Founder, MedVentures',
    description:
      'Ahmed Dizon builds systems that remove manual work, using n8n, Make, Zapier, GoHighLevel and Claude. Upwork Top Rated, 100% Job Success Score, 2,100+ hours.',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'MedVentures: AI Automation Specialist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Specialist | Founder, MedVentures',
    description:
      'Ahmed Dizon builds systems that remove manual work, using n8n, Make, Zapier, GoHighLevel and Claude. Upwork Top Rated, 100% Job Success Score, 2,100+ hours.',
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
