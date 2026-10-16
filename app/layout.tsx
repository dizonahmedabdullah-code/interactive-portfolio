import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { BRAND, META, SITE_URL } from '@/lib/content'
import './globals.css'

// SF Pro on Apple devices through the system stack; Inter, self-hosted at build time, everywhere else.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: META.title,
  description: META.description,
  applicationName: BRAND,
  authors: [{ name: 'Ahmed Abdullah Dizon' }],
  openGraph: {
    title: META.title,
    description: META.description,
    siteName: BRAND,
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: META.title,
    description: META.description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
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
