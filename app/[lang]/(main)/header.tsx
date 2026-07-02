'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { TextLoop } from '@/components/ui/text-loop'
import { Magnetic } from '@/components/ui/magnetic'

export function Header() {
  const { language } = useLanguage()

  const ROLES = {
    en: [
      'Software Engineer',
      'HFT Specialist',
      'AI Engineer',
      'NGO Leader',
      'STEM Teacher',
    ],
    hu: [
      'Szoftvermérnök',
      'HFT szakember',
      'AI specialista',
      'Egyesület vezető',
      'STEM Oktató',
    ],
    ro: [
      'Inginer Software',
      'Specialist HFT',
      'Entuziast AI',
      'Lider ONG',
      'Instructor STEM',
    ],
  }

  const t = {
    cv: language === 'en' ? 'CV' : language === 'hu' ? 'Önéletrajz' : 'CV',
  }

  return (
    <header className="mb-12 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }}>
          <div className="group relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full border border-white/20 transition-colors hover:border-white/40 dark:border-zinc-700 dark:hover:border-zinc-600">
            <Image
              src="/profile.jpg"
              alt="Magor Köllő"
              width={64}
              height={64}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-white/5 transition-opacity group-hover:opacity-0 dark:bg-white/5" />
          </div>
        </Magnetic>

        <div>
          <Link
            href={`/${language}/cv`}
            className="block text-xl font-semibold tracking-tight"
          >
            <span
              className="bg-gradient-to-r from-white via-teal-200 to-white bg-[length:200%_auto] bg-clip-text text-transparent"
              style={{ animation: 'gradient-shift 4s ease-in-out infinite' }}
            >
              Magor Köllő
            </span>
          </Link>
          <div className="flex items-center gap-1.5 text-zinc-300 dark:text-zinc-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <TextLoop
              className="text-sm font-medium"
              interval={3}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            >
              {ROLES[language].map((role) => (
                <span key={role}>{role}</span>
              ))}
            </TextLoop>
          </div>
        </div>
      </div>

      <div className="ml-auto">
        <Magnetic intensity={0.1}>
          <Link
            href={`/${language}/cv`}
            className="group flex items-center gap-1 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white/20 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              &rarr;
            </span>
            {t.cv}
          </Link>
        </Magnetic>
      </div>
    </header>
  )
}
