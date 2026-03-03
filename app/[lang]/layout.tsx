import type { Metadata, Viewport } from 'next'
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
  ro: 'Inginer software specializat în sisteme critice pentru performanță, AI și tehnologia dronelor.',
}

const SITE_NAME = 'Magor Köllő'
const BASE_URL = 'https://nim-fawn.vercel.app'

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
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: DESCRIPTIONS[currentLang] || DESCRIPTIONS.en,
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
              description: DESCRIPTIONS[currentLang] || DESCRIPTIONS.en,
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
  )
}
