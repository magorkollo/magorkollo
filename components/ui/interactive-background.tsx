'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Spotlight } from './spotlight'
import { useEffect, useState } from 'react'

export function InteractiveBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize() // Set initial size
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  const transformX1 = useTransform(mouseX, [0, windowSize.width], [-50, 50])
  const transformY1 = useTransform(mouseY, [0, windowSize.height], [-50, 50])
  const transformX2 = useTransform(mouseX, [0, windowSize.width], [50, -50])
  const transformY2 = useTransform(mouseY, [0, windowSize.height], [50, -50])
  const transformX3 = useTransform(mouseX, [0, windowSize.width], [-30, 30])
  const transformY3 = useTransform(mouseY, [0, windowSize.height], [-30, 30])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"></div>
      <motion.div
        className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%]"
        style={{ x: transformX1, y: transformY1 }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-purple-500/20 blur-[120px] dark:bg-purple-500/30"
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-5%', '5%', '-5%'],
          }}
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
        style={{ x: transformX2, y: transformY2 }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-blue-500/20 blur-[120px] dark:bg-blue-800/20"
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-5%', '5%', '-5%'],
          }}
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
        style={{ x: transformX3, y: transformY3 }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-emerald-500/20 blur-[120px] dark:bg-emerald-900/20"
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-5%', '5%', '-5%'],
          }}
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
