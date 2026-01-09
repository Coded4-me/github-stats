// ============================================================================
// FILE: src/app/layout.tsx
// Root layout component
// ============================================================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHub Stats Generator - Beautiful Stats for Your README',
  description: 'Create beautiful, customizable GitHub statistics cards for your README.md. Open-source and free to use.',
  keywords: ['github', 'stats', 'readme', 'badges', 'profile', 'open-source'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'GitHub Stats Generator',
    description: 'Create beautiful GitHub statistics cards for your README',
    type: 'website',
    url: 'https://github-stats.yourdomain.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Stats Generator',
    description: 'Create beautiful GitHub statistics cards for your README',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}