'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { MountainEntrance } from '@/components/ui/mountain-entrance'
import { BlurryGradientBackground } from '@/components/ui/blurry-gradient-background'
import { InteractiveBackground } from '@/components/ui/interactive-background'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isTransitioning, setIsTransitioning] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsTransitioning(true)
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 1200) // Slightly shorter than the mountain exit to start content animation earlier
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="relative min-h-screen selection:bg-emerald-100 dark:selection:bg-emerald-900/30">
      <BlurryGradientBackground />
      <InteractiveBackground />

      <AnimatePresence>
        {isTransitioning && <MountainEntrance key="entrance" />}
      </AnimatePresence>

      <ScrollProgress className="fixed top-0 z-50 bg-zinc-950 dark:bg-white" />

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: '100vh' }}
        animate={
          !isTransitioning ? { opacity: 1, y: 0 } : { opacity: 0, y: '100vh' }
        }
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  )
}
