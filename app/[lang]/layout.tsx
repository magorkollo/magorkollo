import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './(main)/globals.css'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider, Language } from '@/lib/language-context'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'hu' }, { lang: 'ro' }]
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

const DESCRIPTIONS = {
  en: 'Software Engineer specializing in performance-critical systems, AI, and drone technology.',
  hu: 'Szoftvermérnök, szakterülete a teljesítmény-kritikus rendszerek, az MI és a dróntechnológia.',
  ro: 'Inginer software specializat în sisteme critice pentru performanță, AI și tehnologia dronelor.'
};

const SITE_NAME = 'Magor Köllő';
const BASE_URL = 'https://nim-fawn.vercel.app';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Language;
  
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`
    },
    description: DESCRIPTIONS[lang] || DESCRIPTIONS.en,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'hu': '/hu',
        'ro': '/ro',
      },
    },
    openGraph: {
      title: SITE_NAME,
      description: DESCRIPTIONS[lang] || DESCRIPTIONS.en,
      url: `${BASE_URL}/${lang}`,
      siteName: SITE_NAME,
      locale: lang === 'hu' ? 'hu_HU' : lang === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: DESCRIPTIONS[lang] || DESCRIPTIONS.en,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  const lang = params.lang as Language;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <LanguageProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Person',
                  name: 'Magor Köllő',
                  url: BASE_URL,
                  jobTitle: 'Software Engineer',
                  sameAs: [
                    'https://github.com/magorkollo',
                    'https://www.linkedin.com/in/magorkollo',
                  ],
                  description: DESCRIPTIONS[lang] || DESCRIPTIONS.en,
                }),
              }}
            />
            <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
              <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
                {children}
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
