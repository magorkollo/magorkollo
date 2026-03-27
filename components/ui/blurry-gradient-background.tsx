'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function BlurryGradientBackground({
  className,
}: {
  className?: string
}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div
      className={cn(
        'fixed inset-0 -z-50 overflow-hidden blur-2xl md:blur-3xl',
        className,
      )}
    >
      <motion.div
        className="absolute top-[-20%] left-[-20%] h-[60%] w-[60%] rounded-full bg-purple-500/50 dark:bg-purple-900/50"
        animate={
          isMobile
            ? { opacity: [0.3, 0.5, 0.3] }
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
        className="absolute right-[-20%] bottom-[-20%] h-[60%] w-[60%] rounded-full bg-blue-500/50 dark:bg-blue-900/50"
        animate={
          isMobile
            ? { opacity: [0.3, 0.5, 0.3] }
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
    </div>
  )
}
