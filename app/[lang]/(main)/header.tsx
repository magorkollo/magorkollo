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
      'AI Enthusiast',
      'Drone Pilot',
      'NGO Leader',
    ],
    hu: [
      'Szoftvermérnök',
      'HFT specialista',
      'MI rajongó',
      'Drónpilóta',
      'Civil vezető',
    ],
    ro: [
      'Inginer Software',
      'Specialist HFT',
      'Entuziast AI',
      'Pilot Dronă',
      'Lider ONG',
    ],
  }

  const t = {
    cv: language === 'en' ? 'CV' : language === 'hu' ? 'Önéletrajz' : 'CV',
  }

  return (
    <header className="mb-12 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }}>
          <div className="group relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full border border-zinc-300 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600">
            <Image
              src="/profile.jpg"
              alt="Magor Köllő"
              width={64}
              height={64}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:opacity-0 dark:bg-white/5" />
          </div>
        </Magnetic>

        <div>
          <Link
            href={`/${language}/cv`}
            className="block text-xl font-semibold tracking-tight text-black dark:text-white"
          >
            Magor Köllő
          </Link>
          <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-500">
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
            className="group flex items-center gap-1 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
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
