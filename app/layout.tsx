// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import './gnavbar.css'
import './ghero.css'
import './gauthor.css'


import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Ügyvéd Veszprém | Családjog, ingatlanjog, mediáció',
  description: 'Családjogi ügyvéd Veszprémben. Válóper, gyermekelhelyezés, ingatlan adásvételi szerződések, mediáció és öröklési ügyek. 25+ év tapasztalat.',
  icons: {
    icon: [
      { url: '/favicon32.ico', sizes: 'any' },
     ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  // Opcionális: theme color
  themeColor: '#0a1628',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body>
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}