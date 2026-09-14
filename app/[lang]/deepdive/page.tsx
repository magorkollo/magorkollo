'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import {
  ArrowUpRightIcon,
  BotIcon,
  CarIcon,
  ChevronRightIcon,
  HouseIcon,
  ImageIcon,
} from 'lucide-react'
import { ProfilePhoto } from '@/components/ui/profile-photo'
import { TextLoop } from '@/components/ui/text-loop'
import { CodeBlock } from '@/components/ui/code-block'
import { CopyField } from '@/components/ui/copy-field'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  TRANSITION_SECTION,
} from '@/lib/animations'
import {
  WORKSHOP,
  SPEAKER,
  BUILDS,
  AGENDA,
  SETUP_STEPS,
  SETUP_FIELDS,
  TASKS,
  PROTOCOL,
  RECEIVER_CODE,
  GALLERY,
  ARCHITECTURE_CHAIN,
  ARCHITECTURE_NOTES,
  AI_OUTLOOK,
  RESOURCES,
} from './data'

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

function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="Workshop sections"
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

const BUILD_ICONS = {
  home: HouseIcon,
  car: CarIcon,
  arm: BotIcon,
}

const SECTION_NAV_ITEMS = [
  { id: 'workshop', label: 'Workshop' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'setup', label: 'Setup' },
  { id: 'task-1', label: 'Task 1' },
  { id: 'task-2', label: 'Task 2' },
  { id: 'task-3', label: 'Task 3' },
  { id: 'task-4', label: 'Task 4' },
  { id: 'bonus', label: 'Bonus' },
  { id: 'protocol', label: 'Protocol' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'ai', label: "What's next" },
  { id: 'resources', label: 'Resources' },
]

export default function DeepDive() {
  return (
    <motion.main
      className="space-y-10 pb-20"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* 1. Hero */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-4"
      >
        <div>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-teal-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-[#B39DDB]">
            {WORKSHOP.eyebrow}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl dark:text-zinc-100">
          {WORKSHOP.title}
        </h1>
        <p className="font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300">
          {WORKSHOP.subtitle}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {WORKSHOP.meta.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://makecode.microbit.org/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-400 transition-colors hover:bg-teal-400/20 dark:border-[#B39DDB]/30 dark:bg-[#B39DDB]/10 dark:text-[#B39DDB] dark:hover:bg-[#B39DDB]/20"
          >
            <span>Open MakeCode</span>
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
          <a
            href="#task-1"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            Jump to tasks
          </a>
        </div>
      </motion.section>

      {/* 2. Speaker */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-4"
      >
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
          <div className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/10 sm:h-28 sm:w-28 dark:border-zinc-800">
            <ProfilePhoto />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl dark:text-zinc-100">
              {SPEAKER.name}
            </h2>
            <TextLoop
              className="mt-1 text-base font-medium text-zinc-300 dark:text-zinc-400"
              interval={3}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {SPEAKER.roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </TextLoop>
          </div>
        </div>
        <p className="font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300">
          {SPEAKER.bio}
        </p>
      </motion.section>

      {/* 3. About this workshop */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="workshop" title="About this workshop" />
        <div className="mt-4 space-y-4">
          {WORKSHOP.description.map((paragraph, idx) => (
            <p
              key={idx}
              className="font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {BUILDS.map((build) => {
            const Icon = BUILD_ICONS[build.icon]
            return (
              <div
                key={build.title}
                className="rounded-xl border border-white/10 bg-white/5 p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <Icon className="h-5 w-5 text-teal-400 dark:text-[#B39DDB]" />
                <h3 className="mt-3 font-semibold text-white dark:text-zinc-100">
                  {build.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-300 dark:text-zinc-400">
                  {build.description}
                </p>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* 4. SectionNav */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionNav items={SECTION_NAV_ITEMS} />
      </motion.section>

      {/* 5. Agenda */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="agenda" title="Agenda" />
        <LogList>
          {AGENDA.map((item) => (
            <LogEntry key={item.marker} marker={item.marker}>
              {item.text}
            </LogEntry>
          ))}
        </LogList>
      </motion.section>

      {/* 6. Setup */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="setup" title="Setup" />
        <ol className="mt-4 list-inside list-decimal space-y-2 font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300">
          {SETUP_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="mt-6 space-y-3">
          {SETUP_FIELDS.map((field) => (
            <CopyField
              key={field.label}
              label={field.label}
              value={field.value}
              href={field.href}
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-zinc-300 dark:text-zinc-400">
          Note: Each team will be assigned a unique radio group number so teams
          do not interfere with each other&apos;s hardware.
        </p>
      </motion.section>

      {/* 7. Tasks */}
      {TASKS.map((task) => (
        <motion.section
          key={task.id}
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <SectionHeading id={task.id} title={task.title} />
          <p className="mt-4 font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300">
            {task.goal}
          </p>
          <div className="mt-4">
            <CodeBlock code={task.code} label="MakeCode — JavaScript" />
          </div>
          <div className="mt-4 rounded-xl border-l-2 border-teal-400 bg-white/5 px-4 py-3 dark:border-[#B39DDB] dark:bg-zinc-900/60">
            <span className="block text-xs font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              Expected result
            </span>
            <p className="mt-1 text-sm text-zinc-300 dark:text-zinc-400">
              {task.expected}
            </p>
          </div>
        </motion.section>
      ))}

      {/* 8. Protocol */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="protocol" title="Protocol" />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs font-medium tracking-wider text-zinc-400 uppercase dark:border-zinc-800 dark:text-zinc-500">
                <th className="pr-4 pb-3 font-medium">Name</th>
                <th className="pr-4 pb-3 font-medium">Value</th>
                <th className="pb-3 font-medium">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 dark:divide-zinc-800/50">
              {PROTOCOL.map((row) => (
                <tr key={row.name}>
                  <td className="py-3 pr-4 font-mono text-zinc-200 dark:text-zinc-300">
                    {row.name}
                  </td>
                  <td className="py-3 pr-4 font-mono text-zinc-300 dark:text-zinc-400">
                    {row.value}
                  </td>
                  <td className="py-3 text-zinc-300 dark:text-zinc-400">
                    {row.meaning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <CodeBlock
            code={RECEIVER_CODE}
            label="Already flashed on the peripherals"
          />
        </div>
      </motion.section>

      {/* 9. Hardware */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="hardware" title="Hardware" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {GALLERY.map((item) => (
            <figure key={item.alt}>
              {item.src ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 dark:border-zinc-800">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
                  <ImageIcon className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
                  <span className="text-center font-mono text-xs break-all text-zinc-400 dark:text-zinc-500">
                    public/deepdive/{item.file}
                  </span>
                </div>
              )}
              <figcaption className="mt-2 text-sm text-zinc-300 dark:text-zinc-400">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </motion.section>

      {/* 10. Architecture */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="architecture" title="Architecture" />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {ARCHITECTURE_CHAIN.map((node, index) => (
            <div key={node} className="flex items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
                {node}
              </span>
              {index < ARCHITECTURE_CHAIN.length - 1 && (
                <ChevronRightIcon className="h-3 w-3 shrink-0 text-zinc-400 dark:text-zinc-500" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {ARCHITECTURE_NOTES.map((note, idx) => (
            <p
              key={idx}
              className="font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300"
            >
              {note}
            </p>
          ))}
        </div>
      </motion.section>

      {/* 11. What's next */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="ai" title="What's next" />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {AI_OUTLOOK.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <h3 className="font-semibold text-white dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-300 dark:text-zinc-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 12. Resources */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <SectionHeading id="resources" title="Resources" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {RESOURCES.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/60"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-white dark:text-zinc-100">
                  {resource.label}
                </h3>
                <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-500" />
              </div>
              <p className="mt-2 text-sm text-zinc-300 dark:text-zinc-400">
                {resource.description}
              </p>
            </a>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
