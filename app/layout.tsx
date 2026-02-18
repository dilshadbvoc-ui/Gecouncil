import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Global Education Council - Connecting Indian Students with World-Class Universities',
  description: 'B2B partnership intermediary connecting European and overseas universities with Indian students. Bringing quality international education to India.',
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
