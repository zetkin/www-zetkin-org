import './globals.css';

import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import React from 'react';
import { draftMode } from 'next/headers';

import { cn } from '@/utilities/ui';
import { AdminBar } from '@/components/AdminBar';
import { Header } from '@/MainNav/Header/Component';
import { Providers } from '@/providers';
import { InitTheme } from '@/providers/Theme/InitTheme';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';
import { getServerSideURL } from '@/utilities/getURL';
import { Footer } from '@/MainNav/Footer/Component';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  const _twPreDeclare = [
    'text-z-purple',
    'text-z-green',
    'text-z-red',
    'text-z-purple!',
    'text-z-green!',
    'text-z-red!',
    'stroke-z-purple',
    'stroke-z-green',
    'stroke-z-red',
    'shadow-z-purple',
    'shadow-z-green',
    'shadow-z-red',
  ];

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
};
