'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { MountainEntrance } from '@/components/ui/mountain-entrance'
import { BlurryGradientBackground } from '@/components/ui/blurry-gradient-background'
import { InteractiveBackground } from '@/components/ui/interactive-background'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { CursorGlow } from '@/components/ui/cursor-glow'
import { NoiseOverlay } from '@/components/ui/noise-overlay'
import { ScrollToTop } from '@/components/ui/scroll-to-top'

export function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    if (isInitialLoad) {
      // Ensure we reveal content even if something hangs
      const timer = setTimeout(() => {
        setIsInitialLoad(false)
      }, 500)
      return () => clearTimeout(timer)
    }

    window.scrollTo(0, 0)
    const timer = setTimeout(() => {
      // No-op for now, but keeps the structure if we want to add back transition states
    }, 1000)
    return () => clearTimeout(timer)
  }, [pathname, isInitialLoad])

  return (
    <div className="relative min-h-screen selection:bg-emerald-100 dark:selection:bg-emerald-900/30">
      <NoiseOverlay />
      <CursorGlow />
      <BlurryGradientBackground />
      <InteractiveBackground />

      <AnimatePresence>
        {isInitialLoad && <MountainEntrance key="entrance" />}
      </AnimatePresence>

      <ScrollProgress className="fixed top-0 z-50 bg-zinc-950 dark:bg-white" />
      <ScrollToTop />

      <motion.div
        key={pathname}
        initial={isInitialLoad ? { opacity: 0 } : { opacity: 0, y: 10 }}
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
