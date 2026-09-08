'use client'
import { cn } from '@/lib/utils'
import {
  motion,
  AnimatePresence,
  Transition,
  Variants,
  AnimatePresenceProps,
  useReducedMotion,
} from 'motion/react'
import { useState, useEffect, Children } from 'react'

export type TextLoopProps = {
  children: React.ReactNode[]
  className?: string
  interval?: number
  transition?: Transition
  variants?: Variants
  onIndexChange?: (index: number) => void
  trigger?: boolean
  mode?: AnimatePresenceProps['mode']
}

export function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  trigger = true,
  mode = 'popLayout',
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = Children.toArray(children)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // Cycling text is exactly the kind of "perpetual motion" prefers-reduced-motion
    // exists for — every caller (role loops, etc.) gets this for free rather
    // than each needing its own check.
    if (!trigger || shouldReduceMotion) return

    const intervalMs = interval * 1000
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length
        onIndexChange?.(next)
        return next
      })
    }, intervalMs)
    return () => clearInterval(timer)
  }, [items.length, interval, onIndexChange, trigger, shouldReduceMotion])

  const motionVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  }

  return (
    <div className={cn('relative inline-block whitespace-nowrap', className)}>
      <AnimatePresence mode={mode} initial={false}>
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants || motionVariants}
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
