'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function BlurryGradientBackground({
  className,
}: {
  className?: string
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)

    const handleVisibility = () => {
      setIsVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  const canAnimate = mounted && isVisible && !shouldReduceMotion

  return (
    <div
      className={cn(
        'fixed inset-0 -z-50 [transform:translateZ(0)] overflow-hidden blur-2xl md:blur-3xl',
        className,
      )}
      aria-hidden="true"
    >
      {mounted && (
        <>
          <motion.div
            className="absolute top-[-20%] left-[-20%] h-[60%] w-[60%] rounded-full bg-teal-400/30 will-change-transform dark:bg-[#4F46E5]/30"
            animate={
              !canAnimate
                ? false
                : isMobile
                  ? { opacity: [0.2, 0.4, 0.2] }
                  : {
                      x: ['0%', '100%', '0%'],
                      y: ['0%', '100%', '0%'],
                    }
            }
            transition={{
              duration: isMobile ? 10 : 60,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          />
          <motion.div
            className="absolute right-[-20%] bottom-[-20%] h-[60%] w-[60%] rounded-full bg-slate-400/30 will-change-transform dark:bg-[#A855F7]/20"
            animate={
              !canAnimate
                ? false
                : isMobile
                  ? { opacity: [0.2, 0.4, 0.2] }
                  : {
                      x: ['0%', '-100%', '0%'],
                      y: ['0%', '-100%', '0%'],
                    }
            }
            transition={{
              duration: isMobile ? 10 : 60,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
              delay: isMobile ? 5 : 30,
            }}
          />
        </>
      )}
    </div>
  )
}
