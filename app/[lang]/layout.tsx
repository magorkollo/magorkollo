import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider, Language } from '@/lib/language-context'
import { Bricolage_Grotesque, Newsreader } from 'next/font/google'
import { Header } from './(main)/header'
import { Footer } from './(main)/footer'
import { EntranceProvider } from '@/components/entrance-context'
import { WEBSITE_URL } from '@/lib/constants'

// Display face for headings (h1-h6, see globals.css) paired with a serif for
// long-form body copy — the same two-role pairing mldangelo.com uses, with
// our own faces. UI chrome (nav, buttons, badges) is left on the system sans
// stack rather than either of these, matching how that pairing is actually
// used there: serif is reserved for reading content, not everything.
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
})

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'hu' }, { lang: 'ro' }]
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#355c70',
}

const DESCRIPTIONS = {
  en: 'Software Engineer specializing in performance-critical systems, AI, and drone technology.',
  hu: 'Szoftvermérnök, szakterülete a teljesítmény-kritikus rendszerek, az MI és a dróntechnológia.',
  ro: 'Inginer software specializat în sisteme critice pentru performanță, AI și tehnologia dronelor.',
}

const SITE_NAME = 'Magor Köllő'
const BASE_URL = WEBSITE_URL

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const currentLang = lang as Language

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: DESCRIPTIONS[currentLang] || DESCRIPTIONS.en,
    alternates: {
      canonical: `/${currentLang}`,
      languages: {
        en: '/en',
        hu: '/hu',
        ro: '/ro',
      },
    },
    openGraph: {
      title: SITE_NAME,
      description: DESCRIPTIONS[currentLang] || DESCRIPTIONS.en,
      url: `${BASE_URL}/${currentLang}`,
      siteName: SITE_NAME,
      locale:
        currentLang === 'hu'
          ? 'hu_HU'
          : currentLang === 'ro'
            ? 'ro_RO'
            : 'en_US',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - Software Engineer & Team Lead`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: DESCRIPTIONS[currentLang] || DESCRIPTIONS.en,
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const currentLang = lang as Language

  return (
    <html lang={currentLang} suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${newsreader.variable} bg-[#355c70] tracking-tight text-zinc-50 antialiased dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <ThemeProvider
          enableSystem
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <LanguageProvider>
            <EntranceProvider>
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
                      'https://www.instagram.com/magorkollo/',
                      'https://www.facebook.com/magorors.kollo/',
                      'https://www.tiktok.com/@magor.kollo',
                    ],
                    description: DESCRIPTIONS[currentLang] || DESCRIPTIONS.en,
                  }),
                }}
              />
              <div className="flex min-h-screen w-full flex-col">
                <Header />
                <div className="relative mx-auto w-full max-w-4xl flex-1 px-6 pt-8 md:px-12">
                  {children}
                </div>
                <div className="mt-16 w-full border-t border-white/15 dark:border-zinc-800" />
                <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 md:px-12">
                  <Footer />
                </div>
              </div>
            </EntranceProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
