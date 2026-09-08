'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ProfilePhoto } from '@/components/ui/profile-photo'
import { LatestWriting } from '@/components/latest-writing'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  TRANSITION_SECTION,
} from '@/lib/animations'
import { SUMMARY, UI_STRINGS } from '@/lib/data'
import { useLanguage } from '@/lib/language-context'

export default function Personal() {
  const { language } = useLanguage()

  const t = {
    latestWriting: UI_STRINGS.home.latestWriting[language],
    viewAll: UI_STRINGS.home.viewAll[language],
  }

  return (
    <motion.main
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between md:gap-12"
      >
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl dark:text-zinc-50">
            Magor Köllő
          </h1>
          <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300">
            {SUMMARY[language]}
          </p>
        </div>

        <div className="group relative h-40 w-40 shrink-0 overflow-hidden rounded-full border border-white/20 sm:h-48 sm:w-48 dark:border-zinc-700">
          <ProfilePhoto priority />
        </div>
      </motion.section>

      {/* Divider keeps the original gap from the hero (16/20); the section
          below it gets half that (8/10) — only that one gap is meant to
          shrink, not the hero-to-divider spacing. */}
      <div className="mt-16 border-t-2 border-white md:mt-20 dark:border-zinc-100" />

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="mt-8 md:mt-10"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">{t.latestWriting}</h2>
          <Link
            href={`/${language}/writing`}
            className="text-sm text-zinc-300 transition-colors hover:text-white dark:text-zinc-400 dark:hover:text-white"
          >
            {t.viewAll} &rarr;
          </Link>
        </div>
        <LatestWriting limit={3} />
      </motion.section>
    </motion.main>
  )
}
