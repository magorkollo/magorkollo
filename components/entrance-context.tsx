'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

type EntranceContextValue = {
  hasEntered: boolean
  isTransitioning: boolean
  entranceKey: number
  markEntered: () => void
  triggerTransition: () => void
}

const EntranceContext = createContext<EntranceContextValue | undefined>(
  undefined,
)

/**
 * Tracks whether the mountain-entrance splash has already played for this
 * page load, and provides a trigger to replay the transition on lighting toggles.
 * Lives in `[lang]/layout.tsx`, above every route's own PageTransitionWrapper instance
 * and the Header — allowing both route transitions and theme switches to coordinate.
 */
export function EntranceProvider({ children }: { children: React.ReactNode }) {
  const [hasEntered, setHasEntered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [entranceKey, setEntranceKey] = useState(0)
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current)
      }
    }
  }, [])

  const markEntered = useCallback(() => {
    setHasEntered(true)
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current)
    }
    // The exit slide animation takes 1.5s (1500ms).
    // Mark transitioning as complete once the exit animation finishes.
    exitTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
    }, 1500)
  }, [])

  const triggerTransition = useCallback(() => {
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current)
    }
    setIsTransitioning(true)
    setEntranceKey((prev) => prev + 1)
    setHasEntered(false)
  }, [])

  return (
    <EntranceContext.Provider
      value={{
        hasEntered,
        isTransitioning,
        entranceKey,
        markEntered,
        triggerTransition,
      }}
    >
      {children}
    </EntranceContext.Provider>
  )
}

export function useEntrance() {
  const context = useContext(EntranceContext)
  if (context === undefined) {
    throw new Error('useEntrance must be used within an EntranceProvider')
  }
  return context
}
