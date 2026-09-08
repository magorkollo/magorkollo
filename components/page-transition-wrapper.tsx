'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { MountainEntrance } from '@/components/ui/mountain-entrance'
import { BlurryGradientBackground } from '@/components/ui/blurry-gradient-background'
import { InteractiveBackground } from '@/components/ui/interactive-background'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { CursorGlow } from '@/components/ui/cursor-glow'
import { NoiseOverlay } from '@/components/ui/noise-overlay'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { useEntrance } from '@/components/entrance-context'

export function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { hasEntered, markEntered, entranceKey } = useEntrance()
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const isInitialMount = useRef(true)
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (hasEntered) return
    // Ensure we reveal content even if something hangs. 900ms gives the
    // mountain entrance's slowest layer (the foreground pine band, which
    // finishes at 0.4s delay + 0.45s duration = 0.85s) time to complete
    // before the exit slide starts.
    const timer = setTimeout(markEntered, 900)
    return () => clearTimeout(timer)
  }, [hasEntered, markEntered])

  useEffect(() => {
    if (isInitialMount.current) {
      if (hasEntered) {
        isInitialMount.current = false
        window.scrollTo(0, 0)
      }
      return
    }

    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      if (hasEntered) {
        window.scrollTo(0, 0)
      }
    }
  }, [pathname, hasEntered])

  return (
    <div className="relative min-h-screen selection:bg-emerald-100 dark:selection:bg-emerald-900/30">
      <NoiseOverlay />
      <CursorGlow />
      <BlurryGradientBackground />
      <InteractiveBackground />

      <AnimatePresence>
        {!hasEntered && <MountainEntrance key={`entrance-${entranceKey}`} />}
      </AnimatePresence>

      <ScrollProgress className="fixed top-0 z-50 bg-zinc-950 dark:bg-white" />
      <ScrollToTop />

      <motion.div
        key={pathname}
        initial={
          shouldReduceMotion
            ? false
            : hasEntered
              ? { opacity: 0, y: 10 }
              : { opacity: 0 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  )
}
