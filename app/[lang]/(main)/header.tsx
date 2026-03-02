'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { TextEffect } from '@/components/ui/text-effect'

export function Header() {
  const { language } = useLanguage()

  const t = {
    role: language === 'en' ? 'Software Engineer' : language === 'hu' ? 'Szoftvermérnök' : 'Inginer Software',
  }

  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-zinc-300 dark:border-zinc-700">
          <Image
            src="/profile.jpg"
            alt="Magor Köllő"
            width={64}
            height={64}
            className="object-cover h-full w-full"
          />
        </div>

        <div>
          <Link
            href={`/${language}/cv`}
            className="block text-xl font-semibold text-black dark:text-white"
          >
            Magor Köllő
          </Link>
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-zinc-600 dark:text-zinc-500"
            delay={0.5}
          >
            {t.role}
          </TextEffect>
        </div>
      </div>

      <div className="ml-auto">
        <Link
          href={`/${language}/cv`}
          className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          &rarr; CV
        </Link>
      </div>
    </header>
  )
}
