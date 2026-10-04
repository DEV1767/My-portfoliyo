import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SmoothScrollProvider } from '@/lib/scroll';

const interTight = localFont({
  src: '../fonts/InterTight-Variable.woff2',
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/InstrumentSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/InstrumentSerif-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: '../fonts/JetBrainsMono-Variable.woff2',
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Shivam Chaudhary — Backend & Agentic AI Developer',
  description:
    'Production portfolio of Shivam Chaudhary. Backend Developer engineering scalable systems, autonomous AI agents with LangGraph & LangChain, and production RAG pipelines.',
  metadataBase: new URL('https://my-portfoliyo-nine.vercel.app'),
  openGraph: {
    title: 'Shivam Chaudhary — Backend & Agentic AI Developer',
    description:
      'Backend Developer specializing in Generative AI & Agentic AI. Engineering scalable systems and autonomous agentic workflows.',
    url: 'https://my-portfoliyo-nine.vercel.app',
    siteName: 'Shivam Chaudhary Portfolio',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Shivam Chaudhary — Backend & Agentic AI Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivam Chaudhary — Backend & Agentic AI Developer',
    description:
      'Backend Developer specializing in Generative AI & Agentic AI. Engineering scalable systems and autonomous agentic workflows.',
    images: ['/og.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[var(--paper)] text-[var(--ink)] antialiased selection:bg-[var(--ink)] selection:text-[var(--paper)]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
