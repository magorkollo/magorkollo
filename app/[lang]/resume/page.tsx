'use client'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { ArrowUpRightIcon } from 'lucide-react'
import {
  WORK_EXPERIENCE,
  VOLUNTEERING,
  EDUCATION,
  ADDITIONAL_INFO,
  PROJECTS,
  SUMMARY,
} from './data'
import { useLanguage } from '@/lib/language-context'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  TRANSITION_SECTION,
} from '@/lib/animations'

function TimelineEntry({
  children,
  index,
}: {
  children: React.ReactNode
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-6 before:absolute before:top-2 before:left-[5px] before:h-[calc(100%+1.5rem)] before:w-[2px] before:bg-gradient-to-b before:from-teal-500/40 before:to-purple-500/40 last:before:hidden"
    >
      <div className="absolute top-2 left-0 h-3 w-3 rounded-full border-2 border-teal-400 bg-zinc-950 dark:border-[#B39DDB] dark:bg-zinc-950" />
      {children}
    </motion.div>
  )
}

export default function Resume() {
  const { language } = useLanguage()

  const t = {
    summary:
      language === 'en'
        ? 'Summary'
        : language === 'hu'
          ? 'Összegzés'
          : 'Rezumat',
    work:
      language === 'en'
        ? 'Work Experience'
        : language === 'hu'
          ? 'Munkatapasztalat'
          : 'Experiență profesională',
    volunteering:
      language === 'en'
        ? 'Volunteering'
        : language === 'hu'
          ? 'Önkéntesség'
          : 'Voluntariat',
    education:
      language === 'en'
        ? 'Education'
        : language === 'hu'
          ? 'Tanulmányok'
          : 'Educație',
    additional:
      language === 'en'
        ? 'Additional Information'
        : language === 'hu'
          ? 'További információk'
          : 'Informații adiționale',
    projects:
      language === 'en'
        ? 'Projects'
        : language === 'hu'
          ? 'Projektek'
          : 'Proiecte',
    downloadCV:
      language === 'en'
        ? 'Download CV'
        : language === 'hu'
          ? 'CV letöltése'
          : 'Descarcă CV-ul',
  }

  return (
    <motion.main
      className="space-y-10 pb-0"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">{t.summary}</h2>
            <a
              href="/Magor%20CV.pdf"
              target="_blank"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/20 hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white print:hidden"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
              >
                <path
                  d="M7.5 1.5C7.77614 1.5 8 1.72386 8 2V9.29289L10.6464 6.64645C10.8417 6.45118 11.1583 6.45118 11.3536 6.64645C11.5488 6.84171 11.5488 7.15829 11.3536 7.35355L7.85355 10.8536C7.65829 11.0488 7.34171 11.0488 7.14645 10.8536L3.64645 7.35355C3.45118 7.15829 3.45118 6.84171 3.64645 6.64645C3.84171 6.45118 4.15829 6.45118 4.35355 6.64645L7 9.29289V2C7 1.72386 7.22386 1.5 7.5 1.5Z"
                  fill="currentColor"
                />
                <path
                  d="M2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.2761 3.22386 12.5 3.5 12.5H11.5C11.7761 12.5 12 12.2761 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 12.8284 12.3284 13.5 11.5 13.5H3.5C2.67157 13.5 2 12.8284 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                  fill="currentColor"
                />
              </svg>
              {t.downloadCV}
            </a>
          </div>
          <p className="text-zinc-200 dark:text-zinc-400">
            {SUMMARY[language]}
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 border-b border-white/10 pb-2 text-xl font-semibold text-white dark:border-zinc-800">
          {t.work}
        </h3>
        <div className="flex flex-col space-y-6">
          {WORK_EXPERIENCE.map((job, i) => (
            <TimelineEntry key={job.id} index={i}>
              <div className="flex flex-col space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white dark:text-zinc-100">
                      {job.title[language]}
                    </h4>
                    <p className="text-zinc-300 dark:text-zinc-400">
                      {job.company}
                    </p>
                  </div>
                  <span className="text-sm text-zinc-300 dark:text-zinc-400">
                    {job.start} — {job.end}
                  </span>
                </div>
                <p className="text-sm text-zinc-300 dark:text-zinc-400">
                  {job.description[language]}
                </p>
                {job.tags && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-white/10 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </TimelineEntry>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 border-b border-white/10 pb-2 text-xl font-semibold text-white dark:border-zinc-800">
          {t.education}
        </h3>
        <div className="flex flex-col space-y-6">
          {EDUCATION.map((edu) => (
            <div key={edu.id} className="flex flex-col space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white dark:text-zinc-100">
                    {edu.degree[language]}
                  </h4>
                  <p className="text-zinc-300 dark:text-zinc-400">
                    {edu.institution}
                  </p>
                </div>
                <span className="text-sm text-zinc-300 dark:text-zinc-400">
                  {edu.start} — {edu.end}
                </span>
              </div>
              {edu.description && (
                <p className="text-sm text-zinc-300 italic dark:text-zinc-400">
                  {edu.description[language]}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 border-b border-white/10 pb-2 text-xl font-semibold text-white dark:border-zinc-800">
          {t.volunteering}
        </h3>
        <div className="flex flex-col space-y-6">
          {VOLUNTEERING.map((vol, i) => (
            <TimelineEntry key={vol.id} index={i}>
              <div className="flex flex-col space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white dark:text-zinc-100">
                      {vol.title[language]}
                    </h4>
                    <p className="text-zinc-300 dark:text-zinc-400">
                      {vol.company}
                    </p>
                  </div>
                  {vol.start && vol.end && (
                    <span className="text-sm text-zinc-300 dark:text-zinc-400">
                      {vol.start} — {vol.end}
                    </span>
                  )}
                </div>
                {vol.description && (
                  <p className="text-sm text-zinc-300 dark:text-zinc-400">
                    {vol.description[language]}
                  </p>
                )}
                {vol.tags && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {vol.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-white/10 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </TimelineEntry>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 border-b border-white/10 pb-2 text-xl font-semibold text-white dark:border-zinc-800">
          {t.additional}
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ADDITIONAL_INFO.map((info) => (
            <div key={info.id} className="space-y-2">
              <h4 className="font-bold text-white dark:text-zinc-100">
                {info.title[language]}
              </h4>
              <ul className="list-inside list-disc text-sm text-zinc-300 dark:text-zinc-400">
                {info.items.map((item, index) => (
                  <li key={index}>{item[language]}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 border-b border-white/10 pb-2 text-xl font-semibold text-white dark:border-zinc-800">
          {t.projects}
        </h3>
        <div className="flex flex-col space-y-5">
          {PROJECTS.map((project) => (
            <div key={project.id} className="flex flex-col space-y-1">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex w-fit items-center gap-1 font-bold text-white dark:text-zinc-100"
              >
                {project.name}
                <ArrowUpRightIcon className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute bottom-0 left-0 block h-[1px] w-full max-w-0 bg-white transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50" />
              </a>
              <p className="text-sm text-zinc-300 dark:text-zinc-400">
                {project.description[language]}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
