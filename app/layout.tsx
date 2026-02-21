import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Global Education Council | Study Abroad & University Partnerships',
  description: 'Global Education Council (GEC) connects Indian students with world-class European and overseas universities. Expert B2B partnership intermediary for international education.',
  keywords: ['study abroad', 'university partnerships', 'Indian students', 'international education', 'GEC', 'Global Education Council', 'B2B education'],
  authors: [{ name: 'Global Education Council' }],
  metadataBase: new URL('https://gecouncil.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Global Education Council | Connecting Students with Global Universities',
    description: 'B2B partnership intermediary connecting European and overseas universities with Indian students.',
    url: 'https://gecouncil.com',
    siteName: 'Global Education Council',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Education Council | Study Abroad',
    description: 'Connecting Indian students with world-class international education.',
  },
  verification: {
    google: 'google896fad6ca96741da',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
