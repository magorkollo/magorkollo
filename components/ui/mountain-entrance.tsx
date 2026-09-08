'use client'

import { motion, useReducedMotion } from 'motion/react'
import { PineForest } from '@/components/ui/pine-forest'

// Flat, stylised horizontal clouds that linger around the peaks. Widths and
// offsets are hand-placed rather than generated — there are only a handful and
// their placement relative to the ridges matters.
const CLOUDS = [
  { top: '18%', left: '8%', w: 150, h: 9, delay: 0.15 },
  { top: '24%', left: '26%', w: 92, h: 7, delay: 0.25 },
  { top: '15%', left: '58%', w: 120, h: 8, delay: 0.2 },
  { top: '27%', left: '72%', w: 178, h: 9, delay: 0.3 },
  { top: '33%', left: '44%', w: 68, h: 6, delay: 0.35 },
]

export function MountainEntrance() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { y: '-100vh' }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f4f8fb] to-[#d8e5ef] dark:from-[#0a1420] dark:to-[#142435]"
    >
      {/* Flat horizontal clouds around the peak line */}
      {CLOUDS.map((cloud, i) => (
        <motion.div
          key={i}
          initial={shouldReduceMotion ? false : { x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: cloud.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.w,
            height: cloud.h,
          }}
          className="absolute rounded-full bg-white/80 dark:bg-[#22374d]/70"
        />
      ))}

      {/* Layer 4: farthest ridge — palest, nearly dissolving into the sky */}
      <motion.svg
        viewBox="0 0 800 200"
        initial={shouldReduceMotion ? false : { y: 80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full fill-[#c3d4e0] dark:fill-[#22384f]"
        preserveAspectRatio="none"
      >
        <path d="M0 200 L150 40 L300 160 L450 20 L600 140 L750 50 L800 200 Z" />
      </motion.svg>

      {/* Layer 3 */}
      <motion.svg
        viewBox="0 0 800 200"
        initial={shouldReduceMotion ? false : { y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full fill-[#a9bfd0] dark:fill-[#1d3145]"
        preserveAspectRatio="none"
      >
        <path d="M0 200 L100 80 L200 150 L350 30 L500 120 L650 10 L800 200 Z" />
      </motion.svg>

      {/* Layer 2 */}
      <motion.svg
        viewBox="0 0 800 200"
        initial={shouldReduceMotion ? false : { y: 120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full fill-[#8ba7bd] dark:fill-[#182838]"
        preserveAspectRatio="none"
      >
        <path d="M-50 200 L120 100 L280 180 L450 60 L620 150 L850 200 Z" />
      </motion.svg>

      {/* Farthest treeline — lightest blue, sitting on the mid ridges */}
      <motion.div
        initial={shouldReduceMotion ? false : { y: 130 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35, delay: 0.3, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full"
      >
        <PineForest band="mid" idPrefix="entrance" />
      </motion.div>

      {/* Layer 1: fore ridge the near forest stands on */}
      <motion.div
        initial={shouldReduceMotion ? false : { y: 140 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 h-[300px] w-full"
      >
        <svg
          viewBox="0 0 800 200"
          className="h-full w-full fill-[#6d8da8] dark:fill-[#132030]"
          preserveAspectRatio="none"
        >
          <path d="M-100 200 L80 130 L250 190 L420 110 L600 170 L900 200 Z" />
        </svg>
      </motion.div>

      {/* Mid treeline */}
      <motion.div
        initial={shouldReduceMotion ? false : { y: 170 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.35, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full"
      >
        <PineForest band="near" idPrefix="entrance" />
      </motion.div>

      {/* Foreground treeline — darkest navy, reads as a flat silhouette edge */}
      <motion.div
        initial={shouldReduceMotion ? false : { y: 220 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, delay: 0.4, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full"
      >
        <PineForest band="fore" idPrefix="entrance" />
      </motion.div>
    </motion.div>
  )
}
