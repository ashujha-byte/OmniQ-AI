import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://omniq.app'),
  title: 'OmniQ — Search Everything. Create Anything.',
  description:
    'OmniQ is a unified AI dashboard: smart search, vision analysis, logo/poster generation, and video-to-shorts conversion.',
  openGraph: {
    title: 'OmniQ — Search Everything. Create Anything.',
    description:
      'A unified AI dashboard powered by Gemini 2.5 Flash with Google Search Grounding.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#18181b',
              border: '1px solid #27272a',
              color: '#fafafa',
            },
          }}
        />
      </body>
    </html>
  );
}
