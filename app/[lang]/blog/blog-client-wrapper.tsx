'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { BLOG_POSTS } from '../(main)/data'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { Footer } from '../(main)/footer'
import { BlogHeader } from './blog-header'
import { PageTransitionWrapper } from '@/components/page-transition-wrapper'

function MinimalMountainHero({ title }: { title: string }) {
  const { scrollY } = useScroll()
  const height = useTransform(scrollY, [0, 300], [350, 180])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.98])
  const titleY = useTransform(scrollY, [0, 300], [0, -10])
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.9])

  return (
    <motion.div
      style={{ height, opacity }}
      className="sticky top-0 z-40 w-full overflow-hidden backdrop-blur-xl"
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
          {/* Layer 3: Farthest Peaks (Purple) */}
          <svg
            viewBox="0 0 800 200"
            className="absolute bottom-0 left-0 w-full fill-[#a78bfa]/30 dark:fill-purple-900/10"
          >
            <path d="M0 200 L100 80 L200 150 L350 30 L500 120 L650 10 L800 200 Z" />
          </svg>

          {/* Layer 2: Mid Peaks (Blue) */}
          <svg
            viewBox="0 0 800 200"
            className="absolute bottom-0 left-0 w-full fill-[#b0daeb]/30 dark:fill-blue-800/10"
          >
            <path d="M-50 200 L120 100 L280 180 L450 60 L620 150 L850 200 Z" />
          </svg>

          {/* Layer 1: Fore Peaks with Pine Trees (Green) */}
          <svg
            viewBox="0 0 800 200"
            className="absolute bottom-0 left-0 w-full fill-[#8ce687]/40 dark:fill-emerald-500/20"
          >
            <path d="M-100 200 L80 130 L250 190 L420 110 L600 170 L900 200 Z" />
            {/* Pine Silhouettes */}
            <g className="fill-white/10 dark:fill-emerald-300/10">
              <path d="M70 135 L80 115 L90 135 Z" />
              <path d="M55 145 L65 125 L75 145 Z" />
              <path d="M95 130 L105 110 L115 130 Z" />
              <path d="M380 130 L395 100 L410 130 Z" />
              <path d="M410 120 L420 95 L430 120 Z" />
              <path d="M435 125 L445 105 L455 125 Z" />
              <path d="M580 175 L590 155 L600 175 Z" />
              <path d="M605 170 L615 150 L625 170 Z" />
              <path d="M560 180 L570 160 L580 180 Z" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-transparent via-transparent to-transparent" />
      </div>
    </motion.div>
  )
}

export function BlogClientWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  const pathname = usePathname()

  const segments = pathname.split('/')
  const slug = segments[segments.length - 1]
  const currentPost = BLOG_POSTS.find((p) => p.link.endsWith(slug))
  const title = currentPost?.title[language] || 'Blog'

  return (
    <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-geist)]">
      <PageTransitionWrapper>
        <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4">
          <MinimalMountainHero title={title} />
          <div className="pt-8">
            <BlogHeader />
          </div>

          <ScrollProgress
            className="fixed top-0 z-[70] h-0.5 bg-white dark:bg-zinc-100"
            springOptions={{
              bounce: 0,
            }}
          />

          <main className="prose prose-invert prose-gray prose-h4:prose-base prose-h1:hidden prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium mt-8 pb-20">
            {children}
          </main>
          <Footer />
        </div>
      </PageTransitionWrapper>
    </div>
  )
}
