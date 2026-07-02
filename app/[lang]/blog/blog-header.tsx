'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { TextEffect } from '@/components/ui/text-effect'

export function BlogHeader() {
  const { language } = useLanguage()

  const t = {
    role:
      language === 'en'
        ? 'Software Engineer'
        : language === 'hu'
          ? 'Szoftvermérnök'
          : 'Inginer Software',
    home: language === 'en' ? 'Home' : language === 'hu' ? 'Kezdőlap' : 'Acasă',
  }

  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/20 dark:border-zinc-700">
          <Image
            src="/profile.jpg"
            alt="Magor Köllő"
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <Link
            href={`/${language}/cv`}
            className="block text-xl font-semibold"
          >
            <span
              className="bg-gradient-to-r from-white via-teal-200 to-white bg-[length:200%_auto] bg-clip-text text-transparent"
              style={{ animation: 'gradient-shift 4s ease-in-out infinite' }}
            >
              Magor Köllő
            </span>
          </Link>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-zinc-300 dark:text-zinc-500"
            delay={0.5}
          >
            {t.role}
          </TextEffect>
        </div>
      </div>

      <div className="ml-auto">
        <Link
          href={`/${language}`}
          className="text-sm text-zinc-300 transition-colors hover:text-white dark:text-zinc-400 dark:hover:text-white"
        >
          &rarr; {t.home}
        </Link>
      </div>
    </header>
  )
}
