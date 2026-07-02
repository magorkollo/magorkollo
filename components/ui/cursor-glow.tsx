'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'

export function CursorGlow() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <div className="h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-teal-400/8 to-purple-500/8 blur-[100px]" />
    </motion.div>
  )
}
