'use client'

import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { PineForest } from '@/components/ui/pine-forest'
import { MOBILE_VIEW } from '@/lib/forest'

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

// The rise-in runs as a CSS animation (`animate-entrance-in`, globals.css)
// rather than through Framer Motion. This overlay is server-rendered, so CSS
// starts the moment the page first paints, whereas a JS animation only starts
// after hydration — on a phone that is late, and the main thread busy enough
// right after it, that the whole rise got swallowed and the layers just
// appeared in place.
function entranceIn({
  x = 0,
  y = 0,
  fade = false,
  duration,
  delay,
}: {
  x?: number
  y?: number
  fade?: boolean
  duration: number
  delay: number
}): CSSProperties {
  return {
    '--entrance-from-x': `${x}px`,
    '--entrance-from-y': `${y}px`,
    '--entrance-from-opacity': fade ? 0 : 1,
    '--entrance-duration': `${duration}s`,
    '--entrance-delay': `${delay}s`,
  } as CSSProperties
}

const LAYER_CLASS_NAME =
  'animate-entrance-in absolute bottom-0 left-0 w-full motion-reduce:animate-none'

// Desktop stretches each ridge across the full 800-unit viewBox. Phones get
// the centre `MOBILE_VIEW` slice at its natural aspect instead — same window
// the forest bands crop to — so the peaks keep desktop proportions rather than
// being squashed into a thin strip along the bottom of the screen.
function Ridge({
  d,
  fillClassName,
  desktopClassName = '',
}: {
  d: string
  fillClassName: string
  desktopClassName?: string
}) {
  return (
    <>
      <svg
        viewBox={`${MOBILE_VIEW.x} 0 ${MOBILE_VIEW.width} 200`}
        className={`block w-full sm:hidden ${fillClassName}`}
        aria-hidden="true"
      >
        <path d={d} />
      </svg>
      <svg
        viewBox="0 0 800 200"
        preserveAspectRatio="none"
        className={`hidden w-full sm:block ${desktopClassName} ${fillClassName}`}
        aria-hidden="true"
      >
        <path d={d} />
      </svg>
    </>
  )
}

export function MountainEntrance() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { y: '-100vh' }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f4f8fb] to-[#d8e5ef] dark:from-[#070e18] dark:to-[#1b2e44]"
    >
      {/* Flat horizontal clouds around the peak line */}
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.w,
            height: cloud.h,
            ...entranceIn({
              x: -30,
              fade: true,
              duration: 0.9,
              delay: cloud.delay,
            }),
          }}
          className="animate-entrance-in absolute rounded-full bg-white/80 motion-reduce:animate-none dark:bg-[#2c4560]/70"
        />
      ))}

      {/* Layer 4: farthest ridge — palest, nearly dissolving into the sky */}
      <div
        className={LAYER_CLASS_NAME}
        style={entranceIn({ y: 80, duration: 0.8, delay: 0 })}
      >
        <Ridge
          d="M0 200 L150 40 L300 160 L450 20 L600 140 L750 50 L800 200 Z"
          fillClassName="fill-[#c3d4e0] dark:fill-[#34506f]"
        />
      </div>

      {/* Layer 3 */}
      <div
        className={LAYER_CLASS_NAME}
        style={entranceIn({ y: 100, duration: 0.7, delay: 0.08 })}
      >
        <Ridge
          d="M0 200 L100 80 L200 150 L350 30 L500 120 L650 10 L800 200 Z"
          fillClassName="fill-[#a9bfd0] dark:fill-[#283f5a]"
        />
      </div>

      {/* Layer 2 */}
      <div
        className={LAYER_CLASS_NAME}
        style={entranceIn({ y: 120, duration: 0.6, delay: 0.16 })}
      >
        <Ridge
          d="M-50 200 L120 100 L280 180 L450 60 L620 150 L850 200 Z"
          fillClassName="fill-[#8ba7bd] dark:fill-[#1d3148]"
        />
      </div>

      {/* Farthest treeline — lightest blue, sitting on the mid ridges */}
      <div
        className={LAYER_CLASS_NAME}
        style={entranceIn({ y: 130, duration: 0.55, delay: 0.24 })}
      >
        <PineForest band="mid" cropOnMobile />
      </div>

      {/* Layer 1: fore ridge the near forest stands on */}
      <div
        className={LAYER_CLASS_NAME}
        style={entranceIn({ y: 140, duration: 0.5, delay: 0.24 })}
      >
        <Ridge
          d="M-100 200 L80 130 L250 190 L420 110 L600 170 L900 200 Z"
          fillClassName="fill-[#6d8da8] dark:fill-[#12202f]"
          desktopClassName="h-[300px]"
        />
      </div>

      {/* Mid treeline */}
      <div
        className={LAYER_CLASS_NAME}
        style={entranceIn({ y: 170, duration: 0.6, delay: 0.3 })}
      >
        <PineForest band="near" cropOnMobile />
      </div>

      {/* Foreground treeline — darkest navy, reads as a flat silhouette edge */}
      <div
        className={LAYER_CLASS_NAME}
        style={entranceIn({ y: 220, duration: 0.65, delay: 0.36 })}
      >
        <PineForest band="fore" cropOnMobile />
      </div>
    </motion.div>
  )
}
