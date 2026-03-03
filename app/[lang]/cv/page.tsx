'use client'
import { motion } from 'motion/react'
import { Magnetic } from '@/components/ui/magnetic'
import {
  WORK_EXPERIENCE,
  EDUCATION,
  ADDITIONAL_INFO,
  EMAIL,
  SOCIAL_LINKS,
  SUMMARY,
} from './data'
import { useLanguage } from '@/lib/language-context'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function CV() {
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
    connect:
      language === 'en'
        ? 'Connect'
        : language === 'hu'
          ? 'Kapcsolat'
          : 'Contact',
    contactMe:
      language === 'en'
        ? 'Feel free to contact me at'
        : language === 'hu'
          ? 'Bátran keress meg az alábbi címen:'
          : 'Nu ezita să mă contactezi la',
  }

  return (
    <motion.main
      className="space-y-10 pb-20"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex-1">
          <h2 className="mb-4 text-2xl font-bold">{t.summary}</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            {SUMMARY[language]}
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 border-b border-zinc-200 pb-2 text-xl font-semibold dark:border-zinc-800">
          {t.work}
        </h3>
        <div className="flex flex-col space-y-6">
          {WORK_EXPERIENCE.map((job) => (
            <div key={job.id} className="flex flex-col space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100">
                    {job.title[language]}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {job.company}
                  </p>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">
                  {job.start} — {job.end}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {job.description[language]}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 border-b border-zinc-200 pb-2 text-xl font-semibold dark:border-zinc-800">
          {t.education}
        </h3>
        <div className="flex flex-col space-y-6">
          {EDUCATION.map((edu) => (
            <div key={edu.id} className="flex flex-col space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100">
                    {edu.degree[language]}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {edu.institution}
                  </p>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">
                  {edu.start} — {edu.end}
                </span>
              </div>
              {edu.description && (
                <p className="text-sm text-zinc-600 italic dark:text-zinc-400">
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
        <h3 className="mb-5 border-b border-zinc-200 pb-2 text-xl font-semibold dark:border-zinc-800">
          {t.additional}
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ADDITIONAL_INFO.map((info) => (
            <div key={info.id} className="space-y-2">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100">
                {info.title[language]}
              </h4>
              <ul className="list-inside list-disc text-sm text-zinc-600 dark:text-zinc-400">
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
        <h3 className="mb-5 text-lg font-medium">{t.connect}</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          {t.contactMe}{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
