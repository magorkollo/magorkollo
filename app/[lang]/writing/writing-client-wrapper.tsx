'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { BLOG_POSTS } from '../(main)/data'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { PineForest } from '@/components/ui/pine-forest'
import { PageTransitionWrapper } from '@/components/page-transition-wrapper'

// Mountain-parallax hero used for individual post pages only — the /writing
// index keeps a plain static heading (no parallax motion).
function MinimalMountainHero({ title }: { title: string }) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  // Pin every range to its own end value under reduced motion, rather than
  // skipping the hooks — conditionally calling hooks isn't allowed, and this
  // way the hero just renders at rest with no scroll-linked change at all.
  const height = useTransform(
    scrollY,
    [0, 300],
    shouldReduceMotion ? [220, 220] : [350, 180],
  )
  const opacity = useTransform(
    scrollY,
    [0, 300],
    shouldReduceMotion ? [1, 1] : [1, 0.98],
  )
  const titleY = useTransform(
    scrollY,
    [0, 300],
    shouldReduceMotion ? [0, 0] : [0, -10],
  )
  const titleScale = useTransform(
    scrollY,
    [0, 300],
    shouldReduceMotion ? [1, 1] : [1, 0.9],
  )

  return (
    <motion.div
      style={{ height, opacity, top: 'var(--site-header-height, 0px)' }}
      className="sticky z-30 w-full overflow-hidden backdrop-blur-xl"
    >
      <div className="relative mx-auto flex h-full w-full max-w-4xl flex-col items-center px-4 pt-16">
        {/* Atmospheric Glow (Matching MountainEntrance) */}
        <div className="absolute top-1/2 left-1/2 h-64 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-[100px] dark:bg-orange-500/10" />

        <motion.div
          style={{ y: titleY, scale: titleScale }}
          className="relative z-50 w-full pb-12 text-center"
        >
          <h1 className="px-6 text-2xl font-bold tracking-tight text-white md:text-4xl dark:text-zinc-50">
            {title}
          </h1>
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[200px] w-full">
          {/* Ridges use the same monochrome-blue atmospheric ramp as the
              entrance, at lower opacity so the post title stays dominant. */}
          <svg
            viewBox="0 0 800 200"
            className="absolute bottom-0 left-0 w-full fill-[#c3d4e0]/40 dark:fill-[#22384f]/40"
          >
            <path d="M0 200 L100 80 L200 150 L350 30 L500 120 L650 10 L800 200 Z" />
          </svg>

          <svg
            viewBox="0 0 800 200"
            className="absolute bottom-0 left-0 w-full fill-[#8ba7bd]/40 dark:fill-[#182838]/50"
          >
            <path d="M-50 200 L120 100 L280 180 L450 60 L620 150 L850 200 Z" />
          </svg>

          <svg
            viewBox="0 0 800 200"
            className="absolute bottom-0 left-0 w-full fill-[#6d8da8]/45 dark:fill-[#132030]/60"
          >
            <path d="M-100 200 L80 130 L250 190 L420 110 L600 170 L900 200 Z" />
          </svg>

          {/* Pine silhouettes, shared with the mountain entrance */}
          <PineForest
            band="near"
            idPrefix="writing"
            className="absolute bottom-0 left-0 w-full fill-[#3a5a78]/45 dark:fill-[#101d2c]/60"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-transparent via-transparent to-transparent" />
      </div>
    </motion.div>
  )
}

const WRITING_TITLE = { en: 'Writing', hu: 'Blog', ro: 'Blog' }

export function WritingClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { language } = useLanguage()
  const pathname = usePathname()

  const segments = pathname.split('/')
  const slug = segments[segments.length - 1]
  const isIndex = slug === 'writing'
  const currentPost = BLOG_POSTS.find((p) => p.link.endsWith(slug))
  const title = isIndex
    ? WRITING_TITLE[language]
    : currentPost?.title[language] || WRITING_TITLE[language]

  return (
    <PageTransitionWrapper>
      {isIndex ? (
        <h1 className="pt-4 pb-2 text-2xl font-bold tracking-tight text-white md:text-3xl dark:text-zinc-50">
          {title}
        </h1>
      ) : (
        <MinimalMountainHero title={title} />
      )}

      <ScrollProgress
        className="fixed top-0 z-[70] h-0.5 bg-white dark:bg-zinc-100"
        springOptions={{
          bounce: 0,
        }}
      />

      <main
        className={
          isIndex
            ? 'pt-4 pb-20'
            : 'prose prose-invert prose-gray prose-h4:prose-base prose-h1:hidden prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium mt-8 pb-20 text-lg leading-relaxed'
        }
      >
        {children}
      </main>
    </PageTransitionWrapper>
  )
}
