'use client'

import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowUpIcon } from 'lucide-react'

export function ScrollToTop() {
  const { scrollY } = useScroll()
  const smoothScrollY = useSpring(scrollY, { stiffness: 200, damping: 30 })
  const opacity = useTransform(smoothScrollY, [0, 500], [0, 1])
  const scale = useTransform(smoothScrollY, [0, 500], [0.8, 1])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      onClick={handleClick}
      style={{ opacity, scale }}
      className="fixed right-6 bottom-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="h-4 w-4" />
    </motion.button>
  )
}
