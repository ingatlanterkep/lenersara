// app/layout.js
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/QueryProvider';
import CookieConsentWrapper from '@/components/CookieConsentWrapper';
import NavbarWrapper from '@/components/NavbarWrapper';
import { AnalyticsProvider } from '@/context/AnalyticsContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ingatlan-Térkép | Térképes ingatlankereső',
  description: 'Eladó és kiadó ingatlanok interaktív térképes keresővel.',
  icons: {
    icon: '/logo2.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <head>
        <meta name="google-site-verification" content="yQlc1lCX5QARvKqku5GPIvO3oicfi1eOnoBeBdeU7Wo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Ingatlan-Térkép" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/l.png" />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <NavbarWrapper />
          <QueryProvider>
            {children}
          </QueryProvider>
          <CookieConsentWrapper />
          <div id="fullscreen-gallery-root"></div>
        </AnalyticsProvider>
      </body>
    </html>
  );
}