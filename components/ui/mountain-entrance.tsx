'use client'

import { motion } from 'framer-motion'

export function MountainEntrance() {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: '-100vh' }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950"
    >
      {/* Settling Sun (Sunset) */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        animate={{ y: -40, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-b from-orange-400 to-red-500 shadow-[0_0_60px_rgba(251,146,60,0.4)] dark:from-orange-600 dark:to-red-900"
      />

      {/* Atmospheric Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 h-64 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[100px] dark:bg-orange-500/20"
      />

      {/* Layer 3: Farthest Peaks (Lavender/Violet) */}
      <motion.svg
        viewBox="0 0 800 200"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 0.4 }}
        transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full fill-purple-300 dark:fill-purple-900/40"
      >
        <path d="M0 200 L100 80 L200 150 L350 30 L500 120 L650 10 L800 200 Z" />
      </motion.svg>

      {/* Layer 2: Mid Peaks (Royal Blue) */}
      <motion.svg
        viewBox="0 0 800 200"
        initial={{ y: 140, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full fill-blue-500/60 dark:fill-blue-800/50"
      >
        <path d="M-50 200 L120 100 L280 180 L450 60 L620 150 L850 200 Z" />
      </motion.svg>

      {/* Layer 1: Fore Peaks with Pine Trees (Emerald/Forest) */}
      <motion.div
        initial={{ y: 160, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 h-[300px] w-full"
      >
        <svg
          viewBox="0 0 800 200"
          className="h-full w-full fill-emerald-600 dark:fill-emerald-500/80"
          preserveAspectRatio="none"
        >
          {/* Ground Peaks (Corrected path to be visually lower) */}
          <path d="M-100 200 L80 130 L250 190 L420 110 L600 170 L900 200 Z" />

          {/* Pine Silhouettes */}
          <g className="fill-emerald-800/40 dark:fill-emerald-300/20">
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
      </motion.div>

      {/* Deep Ground Shadow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80"
      />
    </motion.div>
  )
}
