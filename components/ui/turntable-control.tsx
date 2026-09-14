'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface TurntableControlProps {
  count: number
  value: number
  onChange: (index: number) => void
  fps?: number
  className?: string
  children?: React.ReactNode
  ariaLabel?: string
  disabled?: boolean
}

/**
 * Interactive turntable controller for 360-degree relief inspection.
 * - Horizontal pointer drag shifts frames (~1 frame per 8px) with wrapping
 * - Inertia after drag release with exponential velocity decay
 * - Auto-rotation at `fps` kicks in after ~3 seconds of idle time
 * - Keyboard focusable (tabIndex 0) with ArrowLeft / ArrowRight support
 * - Pointer capture for uninterrupted dragging outside the element
 * - touch-action: pan-y so vertical scrolling on mobile works seamlessly
 * - Dispatches onChange ONLY when the integer frame index actually changes
 */
export function TurntableControl({
  count,
  value,
  onChange,
  fps = 12,
  className,
  children,
  ariaLabel = 'Turntable rotation control',
  disabled = false,
}: TurntableControlProps) {
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const valueRef = useRef(value)
  valueRef.current = value

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const countRef = useRef(count)
  countRef.current = count

  const fpsRef = useRef(fps)
  fpsRef.current = fps

  const currentPosRef = useRef(value)
  const lastReportedIndexRef = useRef(value)
  const isDraggingRef = useRef(false)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const velocityRef = useRef(0)

  const inertiaRafRef = useRef<number | null>(null)
  const autoRotateRafRef = useRef<number | null>(null)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

  const stopInertia = useCallback(() => {
    if (inertiaRafRef.current !== null) {
      cancelAnimationFrame(inertiaRafRef.current)
      inertiaRafRef.current = null
    }
  }, [])

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRafRef.current !== null) {
      cancelAnimationFrame(autoRotateRafRef.current)
      autoRotateRafRef.current = null
    }
  }, [])

  const startAutoRotate = useCallback(() => {
    stopAutoRotate()
    let lastTime = performance.now()

    const step = (now: number) => {
      const dt = now - lastTime
      lastTime = now

      const currentFps = fpsRef.current || 12
      const frameDelta = (dt / 1000) * currentFps
      const total = countRef.current
      if (total > 0) {
        currentPosRef.current = (currentPosRef.current + frameDelta) % total
        const nextIndex = Math.floor(currentPosRef.current) % total
        if (nextIndex !== lastReportedIndexRef.current) {
          lastReportedIndexRef.current = nextIndex
          onChangeRef.current(nextIndex)
        }
      }

      autoRotateRafRef.current = requestAnimationFrame(step)
    }

    autoRotateRafRef.current = requestAnimationFrame(step)
  }, [stopAutoRotate])

  const scheduleIdleAutoRotate = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = setTimeout(() => {
      startAutoRotate()
    }, 3000)
  }, [startAutoRotate])

  const resetActivity = useCallback(() => {
    stopAutoRotate()
    stopInertia()
    scheduleIdleAutoRotate()
  }, [stopAutoRotate, stopInertia, scheduleIdleAutoRotate])

  // Sync currentPosRef and lastReportedIndexRef when external value changes while not dragging
  useEffect(() => {
    lastReportedIndexRef.current = value
    if (
      !isDraggingRef.current &&
      inertiaRafRef.current === null &&
      autoRotateRafRef.current === null
    ) {
      currentPosRef.current = value
    }
  }, [value])

  // Start initial idle timer on mount
  useEffect(() => {
    if (!disabled) {
      scheduleIdleAutoRotate()
    }
    return () => {
      stopAutoRotate()
      stopInertia()
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
  }, [disabled, scheduleIdleAutoRotate, stopAutoRotate, stopInertia])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || e.button !== 0) return

    stopAutoRotate()
    stopInertia()
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }

    const target = e.currentTarget
    try {
      target.setPointerCapture(e.pointerId)
    } catch {
      // Ignore if pointer capture fails
    }

    isDraggingRef.current = true
    setIsDragging(true)
    lastXRef.current = e.clientX
    lastTimeRef.current = performance.now()
    velocityRef.current = 0
    currentPosRef.current = valueRef.current
    lastReportedIndexRef.current = valueRef.current
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || disabled) return

    const now = performance.now()
    const dt = now - lastTimeRef.current
    const dx = e.clientX - lastXRef.current

    if (dt > 0) {
      const instantVelocity = dx / dt
      // Exponential moving average for velocity
      velocityRef.current = velocityRef.current * 0.4 + instantVelocity * 0.6
    }

    lastXRef.current = e.clientX
    lastTimeRef.current = now

    // ~1 frame per 8px: dragging left increases angle/frame, dragging right decreases
    const total = countRef.current
    if (total > 0) {
      const deltaFrames = -dx / 8
      currentPosRef.current =
        (currentPosRef.current + deltaFrames + total * 1000) % total
      const nextIndex = Math.floor(currentPosRef.current) % total
      if (nextIndex !== lastReportedIndexRef.current) {
        lastReportedIndexRef.current = nextIndex
        onChangeRef.current(nextIndex)
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Ignore
    }

    isDraggingRef.current = false
    setIsDragging(false)

    // Inertia simulation if released with velocity
    const initialVelocity = velocityRef.current
    if (Math.abs(initialVelocity) > 0.05) {
      let vel = initialVelocity
      let lastTime = performance.now()

      const stepInertia = (now: number) => {
        const dt = now - lastTime
        lastTime = now

        // Friction decay
        vel *= Math.pow(0.92, dt / 16.67)

        const total = countRef.current
        if (total > 0) {
          const deltaFrames = -(vel * dt) / 8
          currentPosRef.current =
            (currentPosRef.current + deltaFrames + total * 1000) % total
          const nextIndex = Math.floor(currentPosRef.current) % total
          if (nextIndex !== lastReportedIndexRef.current) {
            lastReportedIndexRef.current = nextIndex
            onChangeRef.current(nextIndex)
          }
        }

        if (Math.abs(vel) > 0.02) {
          inertiaRafRef.current = requestAnimationFrame(stepInertia)
        } else {
          inertiaRafRef.current = null
          scheduleIdleAutoRotate()
        }
      }

      inertiaRafRef.current = requestAnimationFrame(stepInertia)
    } else {
      scheduleIdleAutoRotate()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    const total = countRef.current
    if (total === 0) return

    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      resetActivity()
      const nextIndex = (valueRef.current - 1 + total) % total
      currentPosRef.current = nextIndex
      if (nextIndex !== lastReportedIndexRef.current) {
        lastReportedIndexRef.current = nextIndex
        onChangeRef.current(nextIndex)
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      resetActivity()
      const nextIndex = (valueRef.current + 1) % total
      currentPosRef.current = nextIndex
      if (nextIndex !== lastReportedIndexRef.current) {
        lastReportedIndexRef.current = nextIndex
        onChangeRef.current(nextIndex)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={Math.max(0, count - 1)}
      aria-valuenow={value}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      style={{ touchAction: 'pan-y' }}
      className={cn(
        'outline-none select-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 dark:focus-visible:ring-[#B39DDB]',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
        disabled && 'pointer-events-none cursor-default',
        className,
      )}
    >
      {children}
    </div>
  )
}
