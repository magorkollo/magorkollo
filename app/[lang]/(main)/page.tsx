'use client'
import { motion } from 'motion/react'
import { XIcon, ArrowUpRightIcon } from 'lucide-react'
import { Magnetic } from '@/components/ui/magnetic'
import { useState } from 'react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { Spotlight } from '@/components/ui/spotlight'
import { TextEffect } from '@/components/ui/text-effect'
import { PROJECTS, BLOG_POSTS, SUMMARY, EMAIL, SOCIAL_LINKS } from './data'
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

type ProjectVideoProps = {
  src: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="aspect-video w-full cursor-zoom-in rounded-xl transition-transform duration-300 hover:scale-[1.02]"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
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
        <ArrowUpRightIcon className="h-3 w-3" />
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  const { language } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = BLOG_POSTS.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(BLOG_POSTS.length / postsPerPage)

  const t = {
    blog: language === 'en' ? 'Blog' : language === 'hu' ? 'Blog' : 'Blog',
    projects:
      language === 'en'
        ? 'Selected Projects'
        : language === 'hu'
          ? 'Válogatott projektek'
          : 'Proiecte selectate',
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
      className="space-y-16"
      variants={VARIANTS_CONTAINER}
      initial={isMobile ? 'visible' : 'hidden'}
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="relative"
      >
        <div className="flex-1">
          <div className="md:hidden">
            <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              {SUMMARY[language]}
            </p>
          </div>
          <div className="hidden md:block">
            <TextEffect
              as="p"
              preset="fade"
              per="word"
              className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300"
            >
              {SUMMARY[language]}
            </TextEffect>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-4 text-lg font-medium">{t.blog}</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-xl bg-zinc-100 dark:bg-zinc-900/80"
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          >
            {currentPosts.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-4"
                href={`/${language}${post.link}`}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {post.title[language]}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {post.description[language]}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-8 w-8 rounded-full text-xs font-medium transition-all ${
                currentPage === page
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
                  : 'bg-zinc-100 text-black hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-6 text-lg font-medium">{t.projects}</h3>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="group space-y-4">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectVideo src={project.video} />
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-flex items-center gap-1 font-[500] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                >
                  {project.name}
                  <ArrowUpRightIcon className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
                </a>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="relative"
      >
        <Spotlight
          className="from-zinc-100 via-zinc-200 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-600"
          size={160}
        />
        <h3 className="mb-5 text-lg font-medium">{t.connect}</h3>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          {t.contactMe}{' '}
          <a
            className="font-medium underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900 dark:text-zinc-300 dark:decoration-zinc-700 dark:hover:decoration-zinc-100"
            href={`mailto:${EMAIL}`}
          >
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
