'use client'
import { motion } from 'motion/react'
import { XIcon, ArrowUpRightIcon } from 'lucide-react'
import { Magnetic } from '@/components/ui/magnetic'
import { useState, useEffect } from 'react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { Spotlight } from '@/components/ui/spotlight'
import { TextEffect } from '@/components/ui/text-effect'
import {
  VARIANTS_CONTAINER,
  VARIANTS_SECTION,
  TRANSITION_SECTION,
} from '@/lib/animations'
import { SUMMARY } from '@/lib/data'
import { PROJECTS, BLOG_POSTS, EMAIL, SOCIAL_LINKS } from './data'
import { useLanguage } from '@/lib/language-context'

type ProjectImageProps = {
  src: string
  alt: string
  priority?: boolean
}

function ProjectImage({ src, alt, priority }: ProjectImageProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <Image src={src} alt={alt} fill className="rounded-xl object-cover" />
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

// Wrapper to keep the ArrowUpRightIcon from lucide
function SocialLink({
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
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-white/10 px-2.5 py-1 text-sm text-white transition-colors duration-200 hover:bg-white/20 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
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
  const [isMobile, setIsMobile] = useState(true)
  const postsPerPage = 5

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

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
            <p className="text-lg leading-relaxed text-zinc-200 dark:text-zinc-300">
              {SUMMARY[language]}
            </p>
          </div>
          <div className="hidden md:block">
            <TextEffect
              as="p"
              preset="fade"
              per="word"
              className="text-lg leading-relaxed text-zinc-200 dark:text-zinc-300"
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
        <h3 className="mb-4 text-lg font-medium text-white">{t.blog}</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-xl bg-white/10 dark:bg-zinc-900/80"
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
                  <h4 className="font-medium text-white dark:text-zinc-100">
                    {post.title[language]}
                  </h4>
                  <p className="text-sm text-zinc-300 dark:text-zinc-400">
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
                  ? 'bg-white text-[#355c70] dark:bg-zinc-100 dark:text-black'
                  : 'bg-white/10 text-white hover:bg-white/20 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700'
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
        <h3 className="mb-6 text-lg font-medium text-white">{t.projects}</h3>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.name}
              className="group space-y-4"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="relative rounded-2xl bg-white/5 p-1 ring-1 ring-white/10 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectImage
                  src={project.image}
                  alt={project.name}
                  priority={index === 0}
                />
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-flex items-center gap-1 font-[500] text-white dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                >
                  {project.name}
                  <ArrowUpRightIcon className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-white transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
                </a>
                <p className="text-sm leading-relaxed text-zinc-300 dark:text-zinc-400">
                  {project.description[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="relative"
      >
        <Spotlight
          className="from-white/20 via-white/10 to-transparent dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-600"
          size={160}
        />
        <h3 className="mb-5 text-lg font-medium text-white">{t.connect}</h3>
        <p className="mb-6 text-zinc-300 dark:text-zinc-400">
          {t.contactMe}{' '}
          <a
            className="font-medium underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white dark:text-zinc-300 dark:decoration-zinc-700 dark:hover:decoration-zinc-100"
            href={`mailto:${EMAIL}`}
          >
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} link={link.link}>
              {link.label}
            </SocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
