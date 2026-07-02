'use client'

import { motion } from 'framer-motion'

export function MountainEntrance() {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: '-100vh' }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#355c70] dark:bg-zinc-950"
    >
      {/* Settling Sun (Sunset) */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: -40, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-b from-rose-300 to-orange-400 shadow-[0_0_60px_rgba(245,158,11,0.3)] dark:from-rose-500 dark:to-orange-800"
      />

      {/* Layer 4: Farthest Peaks (Purple - #6f4bbd) */}
      <motion.svg
        viewBox="0 0 800 200"
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad4-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6f4bbd" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="grad4-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5b21b6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0 200 L150 40 L300 160 L450 20 L600 140 L750 50 L800 200 Z"
          className="fill-[url(#grad4-light)] dark:fill-[url(#grad4-dark)]"
        />
      </motion.svg>

      {/* Layer 3: Mid-Back Peaks (Light Blue - #b0daeb) */}
      <motion.svg
        viewBox="0 0 800 200"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad3-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d1eefb" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#b0daeb" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="grad3-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M0 200 L100 80 L200 150 L350 30 L500 120 L650 10 L800 200 Z"
          className="fill-[url(#grad3-light)] dark:fill-[url(#grad3-dark)]"
        />
      </motion.svg>

      {/* Layer 2: Mid-Front Peaks (Indigo/Blue) */}
      <motion.svg
        viewBox="0 0 800 200"
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad2-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="grad2-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          d="M-50 200 L120 100 L280 180 L450 60 L620 150 L850 200 Z"
          className="fill-[url(#grad2-light)] dark:fill-[url(#grad2-dark)]"
        />
      </motion.svg>

      {/* Layer 1: Fore Peaks (Light Green - #8ce687) */}
      <motion.div
        initial={{ y: 140 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 h-[300px] w-full"
      >
        <svg
          viewBox="0 0 800 200"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grad1-light" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bbf7b9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8ce687" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="grad1-dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#15803d" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#166534" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M-100 200 L80 130 L250 190 L420 110 L600 170 L900 200 Z"
            className="fill-[url(#grad1-light)] dark:fill-[url(#grad1-dark)]"
          />
          <g className="fill-white/20 dark:fill-black/20">
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
    </motion.div>
  )
}
