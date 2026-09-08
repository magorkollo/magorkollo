'use client'
import Link from 'next/link'
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
} from 'lucide-react'
import { ProfilePhoto } from '@/components/ui/profile-photo'
import { TextLoop } from '@/components/ui/text-loop'
import { UI_STRINGS } from '@/lib/data'
import { useLanguage } from '@/lib/language-context'
import { ROLES } from './header'

// lucide-react has no TikTok glyph — inlined from Simple Icons (MIT).
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

const CONNECT_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/magorkollo',
    icon: LinkedinIcon,
  },
  { label: 'GitHub', href: 'https://github.com/magorkollo', icon: GithubIcon },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/magorkollo/',
    icon: InstagramIcon,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/magorors.kollo/',
    icon: FacebookIcon,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@magor.kollo',
    icon: TikTokIcon,
  },
]

const EXPLORE_LINKS: {
  href: string
  label: Record<'en' | 'hu' | 'ro', string>
}[] = [
  { href: '/about', label: { en: 'About', hu: 'Rólam', ro: 'Despre' } },
  {
    href: '/resume',
    label: { en: 'Resume', hu: 'Önéletrajz', ro: 'Resume' },
  },
  { href: '/writing', label: { en: 'Writing', hu: 'Blog', ro: 'Blog' } },
]

export function Footer() {
  const { language } = useLanguage()

  const t = {
    explore: UI_STRINGS.common.explore[language],
    connect: UI_STRINGS.common.connect[language],
  }

  return (
    <footer className="w-full">
      {/* Top section: Profile on left/top, Explore and Connect in 2 columns on mobile */}
      <div className="flex flex-col gap-8 sm:grid sm:grid-cols-3 sm:gap-10">
        {/* Profile Card */}
        <div className="flex items-start gap-3.5">
          <div className="group relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20 dark:border-zinc-700">
            <ProfilePhoto />
          </div>
          <div>
            <p className="font-semibold text-white dark:text-zinc-100">
              Magor Köllő
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-zinc-300 dark:text-zinc-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              <TextLoop
                className="text-sm"
                interval={3}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {ROLES[language].map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </TextLoop>
            </div>
          </div>
        </div>

        {/* Links: 2 columns on mobile, individual columns on desktop */}
        <div className="grid grid-cols-2 gap-6 sm:contents">
          <div>
            <p className="text-xs font-semibold tracking-wider text-white uppercase dark:text-zinc-200">
              {t.explore}
            </p>
            <ul className="mt-3 space-y-2">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${language}${item.href}`}
                    className="text-sm text-zinc-300 transition-colors hover:text-white dark:text-zinc-400 dark:hover:text-white"
                  >
                    {item.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-white uppercase dark:text-zinc-200">
              {t.connect}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONNECT_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-zinc-200 transition-colors hover:bg-white/20 hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Location Bar */}
      <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-zinc-300/80 sm:flex-row dark:border-zinc-800 dark:text-zinc-500">
        <p>&copy; 2026 Magor Köllő &bull; Transylvania</p>
        <p className="text-[11px] text-zinc-300/60 dark:text-zinc-600">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
