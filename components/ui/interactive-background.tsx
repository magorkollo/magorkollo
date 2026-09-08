'use client'

import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { Spotlight } from './spotlight'
import { useEffect, useState } from 'react'

export function InteractiveBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    const updateDimensions = () => {
      setIsMobile(window.innerWidth < 768)
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateDimensions()

    const handleVisibility = () => {
      setIsVisible(document.visibilityState === 'visible')
    }

    window.addEventListener('resize', updateDimensions, { passive: true })
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      window.removeEventListener('resize', updateDimensions)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches[0]) {
        mouseX.set(event.touches[0].clientX)
        mouseY.set(event.touches[0].clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [mouseX, mouseY])

  const transformX1 = useTransform(mouseX, [0, windowSize.width], [-50, 50])
  const transformY1 = useTransform(mouseY, [0, windowSize.height], [-50, 50])
  const transformX2 = useTransform(mouseX, [0, windowSize.width], [50, -50])
  const transformY2 = useTransform(mouseY, [0, windowSize.height], [50, -50])
  const transformX3 = useTransform(mouseX, [0, windowSize.width], [-30, 30])
  const transformY3 = useTransform(mouseY, [0, windowSize.height], [-30, 30])

  // Disable interactive transforms on small screens or when reduced motion preferred to save CPU
  const disableTransforms = !mounted || isMobile || shouldReduceMotion
  const x1 = disableTransforms ? 0 : transformX1
  const y1 = disableTransforms ? 0 : transformY1
  const x2 = disableTransforms ? 0 : transformX2
  const y2 = disableTransforms ? 0 : transformY2
  const x3 = disableTransforms ? 0 : transformX3
  const y3 = disableTransforms ? 0 : transformY3

  const canAnimate = mounted && isVisible && !shouldReduceMotion

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 [transform:translateZ(0)] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"></div>
      <motion.div
        className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%]"
        style={{ x: x1, y: y1 }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-teal-400/20 blur-[80px] will-change-transform md:blur-[120px] dark:bg-[#2563EB]/30"
          animate={
            !canAnimate
              ? false
              : {
                  x: ['-5%', '5%', '-5%'],
                  y: ['-5%', '5%', '-5%'],
                }
          }
          transition={{
            duration: 40,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </motion.div>
      <motion.div
        className="absolute top-[20%] right-[-5%] h-[35%] w-[35%]"
        style={{ x: x2, y: y2 }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-slate-400/20 blur-[80px] will-change-transform md:blur-[120px] dark:bg-[#A855F7]/20"
          animate={
            !canAnimate
              ? false
              : {
                  x: ['-5%', '5%', '-5%'],
                  y: ['-5%', '5%', '-5%'],
                }
          }
          transition={{
            duration: 40,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
            delay: 20,
          }}
        />
      </motion.div>
      <motion.div
        className="absolute bottom-[-10%] left-[20%] h-[40%] w-[40%]"
        style={{ x: x3, y: y3 }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-cyan-400/20 blur-[80px] will-change-transform md:blur-[120px] dark:bg-[#7C3AED]/30"
          animate={
            !canAnimate
              ? false
              : {
                  x: ['-5%', '5%', '-5%'],
                  y: ['-5%', '5%', '-5%'],
                }
          }
          transition={{
            duration: 50,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
            delay: 10,
          }}
        />
      </motion.div>
      <Spotlight
        className="from-zinc-100/40 via-zinc-200/20 to-transparent blur-3xl dark:from-zinc-800/10 dark:via-zinc-900/5"
        size={600}
      />
    </div>
  )
}
