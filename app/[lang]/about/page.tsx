'use client'
import { motion } from 'motion/react'
import { ProfilePhoto } from '@/components/ui/profile-photo'
import { TextLoop } from '@/components/ui/text-loop'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  TRANSITION_SECTION,
} from '@/lib/animations'
import {
  ABOUT,
  DREAMS,
  SOCIAL_LINKS,
  HISTORY,
  TRAVEL,
  LIKES,
  FUN_FACTS,
  ADMIRED_SITES,
} from '@/lib/data'
import {
  WORK_EXPERIENCE,
  VOLUNTEERING,
  EDUCATION,
  ADDITIONAL_INFO,
} from '../resume/data'
import { ROLES } from '../(main)/header'
import { useLanguage } from '@/lib/language-context'
import type { Language } from '@/lib/language-context'

// Each chapter is separated by a full-contrast rule above its heading, the
// same treatment mldangelo.com/about uses (`border-top` on the section h2).
function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 border-t border-white pt-6 dark:border-zinc-100"
    >
      <a
        href={`#${id}`}
        className="group inline-flex items-center gap-2 text-xl font-semibold text-white dark:text-zinc-100"
      >
        {title}
        <span
          aria-hidden="true"
          className="text-base font-normal text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100"
        >
          #
        </span>
      </a>
    </h2>
  )
}

function LogList({ children }: { children: React.ReactNode }) {
  return <ul className="mt-4 flex flex-col gap-3">{children}</ul>
}

// Same dot-and-line treatment as the résumé's TimelineEntry (teal-to-purple
// connecting line, teal-ringed dot) — the dot is hollow by default and fills
// solid on hover of its own entry, scoped via a per-`<li>` `group`.
function LogEntry({
  marker,
  children,
}: {
  marker: string
  children: React.ReactNode
}) {
  return (
    <li className="group relative flex gap-4 pl-6 before:absolute before:top-2 before:left-[5px] before:h-[calc(100%+0.75rem)] before:w-[2px] before:bg-gradient-to-b before:from-teal-500/40 before:to-purple-500/40 last:before:hidden">
      <span className="absolute top-1.5 left-0 h-3 w-3 rounded-full border-2 border-teal-400 bg-transparent transition-colors duration-200 group-hover:bg-teal-400 dark:border-[#B39DDB] dark:group-hover:bg-[#B39DDB]" />
      <span className="w-24 shrink-0 pt-px text-xs font-medium text-zinc-300 sm:w-32 sm:text-sm dark:text-zinc-400">
        {marker}
      </span>
      <span className="font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300">
        {children}
      </span>
    </li>
  )
}

function CompactList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 list-inside list-disc space-y-1.5 font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300">
      {children}
    </ul>
  )
}

function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="About sections"
      className="flex flex-wrap gap-x-5 gap-y-2 border-y border-white/10 py-4 text-sm dark:border-zinc-800"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white dark:text-zinc-400 dark:hover:text-white"
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

const SECTION_LABELS: Record<
  | 'history'
  | 'experience'
  | 'education'
  | 'volunteering'
  | 'travel'
  | 'likes'
  | 'funFacts'
  | 'dreams'
  | 'admiredSites'
  | 'elsewhere',
  Record<Language, string>
> = {
  history: {
    en: 'Some History',
    hu: 'Egy kis történelem',
    ro: 'Puțină istorie',
  },
  experience: {
    en: 'Work Experience',
    hu: 'Munkatapasztalat',
    ro: 'Experiență profesională',
  },
  education: {
    en: 'Education',
    hu: 'Tanulmányok',
    ro: 'Educație',
  },
  volunteering: {
    en: 'Volunteering',
    hu: 'Önkéntesség',
    ro: 'Voluntariat',
  },
  travel: {
    en: 'Travel / Geography',
    hu: 'Utazás / Földrajz',
    ro: 'Călătorii / Geografie',
  },
  likes: {
    en: 'I Like',
    hu: 'Amit szeretek',
    ro: 'Îmi place',
  },
  funFacts: {
    en: 'Fun Facts',
    hu: 'Érdekes tények',
    ro: 'Fapte amuzante',
  },
  dreams: {
    en: 'I Dream Of',
    hu: 'Miről álmodom',
    ro: 'La ce visez',
  },
  admiredSites: {
    en: 'Websites from People I Admire',
    hu: 'Oldalak emberektől, akiket csodálok',
    ro: 'Site-uri de la oameni pe care îi admir',
  },
  elsewhere: {
    en: 'Find Me Elsewhere',
    hu: 'Találj meg máshol',
    ro: 'Găsește-mă și altundeva',
  },
}

export default function About() {
  const { language } = useLanguage()
  const paragraphs = ABOUT[language].split('\n\n')

  const technicalSkills = ADDITIONAL_INFO.find((info) => info.id === 'info1')
  const softSkills = ADDITIONAL_INFO.find((info) => info.id === 'info2')
  const languages = ADDITIONAL_INFO.find((info) => info.id === 'info3')

  const sections = [
    { id: 'history', label: SECTION_LABELS.history[language] },
    { id: 'work-experience', label: SECTION_LABELS.experience[language] },
    { id: 'education', label: SECTION_LABELS.education[language] },
    ...(technicalSkills
      ? [{ id: 'technical-skills', label: technicalSkills.title[language] }]
      : []),
    ...(softSkills
      ? [{ id: 'soft-skills', label: softSkills.title[language] }]
      : []),
    ...(languages
      ? [{ id: 'languages', label: languages.title[language] }]
      : []),
    { id: 'volunteering', label: SECTION_LABELS.volunteering[language] },
    { id: 'travel', label: SECTION_LABELS.travel[language] },
    { id: 'likes', label: SECTION_LABELS.likes[language] },
    { id: 'fun-facts', label: SECTION_LABELS.funFacts[language] },
    { id: 'dreams', label: SECTION_LABELS.dreams[language] },
    { id: 'admired-sites', label: SECTION_LABELS.admiredSites[language] },
    { id: 'elsewhere', label: SECTION_LABELS.elsewhere[language] },
  ]

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
        className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left"
      >
        <div className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/20 sm:h-28 sm:w-28 dark:border-zinc-700">
          <ProfilePhoto />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl dark:text-zinc-50">
            Magor Köllő
          </h1>
          <TextLoop
            className="mt-1 text-base font-medium text-zinc-300 dark:text-zinc-400"
            interval={3}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {ROLES[language].map((role) => (
              <span key={role}>{role}</span>
            ))}
          </TextLoop>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionNav items={sections} />
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="history" title={SECTION_LABELS.history[language]} />
        <LogList>
          {HISTORY.map((item, index) => (
            <LogEntry key={index} marker={item.marker}>
              {item.text[language]}
            </LogEntry>
          ))}
        </LogList>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading
          id="work-experience"
          title={SECTION_LABELS.experience[language]}
        />
        <LogList>
          {WORK_EXPERIENCE.map((job) => (
            <LogEntry key={job.id} marker={`${job.start} – ${job.end}`}>
              {job.title[language]} — {job.company}
            </LogEntry>
          ))}
        </LogList>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading
          id="education"
          title={SECTION_LABELS.education[language]}
        />
        <LogList>
          {EDUCATION.map((edu) => (
            <LogEntry key={edu.id} marker={`${edu.start} – ${edu.end}`}>
              {edu.degree[language]} — {edu.institution}
            </LogEntry>
          ))}
        </LogList>
      </motion.section>

      {technicalSkills && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <SectionHeading
            id="technical-skills"
            title={technicalSkills.title[language]}
          />
          <CompactList>
            {technicalSkills.items.map((item, index) => (
              <li key={index}>{item[language]}</li>
            ))}
          </CompactList>
        </motion.section>
      )}

      {softSkills && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <SectionHeading id="soft-skills" title={softSkills.title[language]} />
          <CompactList>
            {softSkills.items.map((item, index) => (
              <li key={index}>{item[language]}</li>
            ))}
          </CompactList>
        </motion.section>
      )}

      {languages && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <SectionHeading id="languages" title={languages.title[language]} />
          <CompactList>
            {languages.items.map((item, index) => (
              <li key={index}>{item[language]}</li>
            ))}
          </CompactList>
        </motion.section>
      )}

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading
          id="volunteering"
          title={SECTION_LABELS.volunteering[language]}
        />
        <LogList>
          {VOLUNTEERING.map((vol) => (
            <LogEntry
              key={vol.id}
              marker={vol.start && vol.end ? `${vol.start} – ${vol.end}` : ''}
            >
              {vol.title[language]} — {vol.company}
            </LogEntry>
          ))}
        </LogList>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="travel" title={SECTION_LABELS.travel[language]} />
        <LogList>
          {TRAVEL.map((item, index) => (
            <LogEntry key={index} marker={item.marker}>
              {item.text[language]}
            </LogEntry>
          ))}
        </LogList>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="likes" title={SECTION_LABELS.likes[language]} />
        <CompactList>
          {LIKES.map((like, index) => (
            <li key={index}>{like[language]}</li>
          ))}
        </CompactList>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading
          id="fun-facts"
          title={SECTION_LABELS.funFacts[language]}
        />
        <CompactList>
          {FUN_FACTS.map((fact, index) => (
            <li key={index}>{fact[language]}</li>
          ))}
        </CompactList>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="dreams" title={SECTION_LABELS.dreams[language]} />
        <CompactList>
          {DREAMS.map((dream, index) => (
            <li key={index}>{dream[language]}</li>
          ))}
        </CompactList>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading
          id="admired-sites"
          title={SECTION_LABELS.admiredSites[language]}
        />
        <CompactList>
          {ADMIRED_SITES.map((site, index) => (
            <li key={index}>{site[language]}</li>
          ))}
        </CompactList>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading
          id="elsewhere"
          title={SECTION_LABELS.elsewhere[language]}
        />
        <ul className="mt-4 space-y-2 text-lg">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.link}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-200 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white dark:text-zinc-300 dark:hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.main>
  )
}
