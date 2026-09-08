'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useLanguage, Language } from '@/lib/language-context'
import { useEntrance } from '@/components/entrance-context'
import { AnimatedBackground } from '@/components/ui/animated-background'
import type { Content } from '@/lib/data'

// Kept here (not in the header markup anymore) so the footer's profile block
// can reuse the same cycling role text.
export const ROLES = {
  en: [
    'Software Engineer',
    'HFT Specialist',
    'AI Engineer',
    'NGO Leader',
    'STEM Educator',
  ],
  hu: [
    'Szoftvermérnök',
    'HFT specialista',
    'MI mérnök',
    'STEM oktató',
    'NGO vezető',
  ],
  ro: [
    'Inginer Software',
    'Specialist HFT',
    'Inginer AI',
    'Educator STEM',
    'Lider ONG',
  ],
}

const NAV_ITEMS: { href: string; label: Content }[] = [
  { href: '/about', label: { en: 'About', hu: 'Rólam', ro: 'Despre' } },
  {
    href: '/resume',
    label: { en: 'Resume', hu: 'Önéletrajz', ro: 'Resume' },
  },
  {
    href: '/writing',
    label: { en: 'Writing', hu: 'Blog', ro: 'Blog' },
  },
]

const LANGUAGE_OPTIONS: { label: string; id: Language }[] = [
  { label: 'en', id: 'en' },
  { label: 'hu', id: 'hu' },
  { label: 'ro', id: 'ro' },
]

// Single toggle: defaults to the OS/browser preference (next-themes'
// `enableSystem` resolves that internally, the same mechanism
// `window.matchMedia('(prefers-color-scheme: dark)')` implements), then
// flips explicitly between light/dark on click — no separate "System" option.
function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { isTransitioning, triggerTransition } = useEntrance()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-8 w-8 shrink-0" aria-hidden="true" />
  }

  const isDark = resolvedTheme === 'dark'

  const handleToggle = () => {
    if (isTransitioning) return
    triggerTransition()
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isTransitioning}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 text-zinc-200 transition-colors hover:bg-white/20 hover:text-white disabled:pointer-events-none dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={
            shouldReduceMotion ? false : { opacity: 0, rotate: -90, scale: 0.5 }
          }
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, rotate: 90, scale: 0.5 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AnimatedBackground
      className="pointer-events-none rounded-lg bg-white/10 dark:bg-zinc-800"
      defaultValue={language}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.2,
      }}
      enableHover={false}
      onValueChange={(id) => {
        setLanguage(id as Language)
      }}
    >
      {LANGUAGE_OPTIONS.map((lang) => {
        return (
          <button
            key={lang.id}
            className="inline-flex h-8 items-center justify-center px-2 text-[10px] font-medium text-zinc-300 uppercase transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-white dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
            type="button"
            aria-label={`Switch to ${lang.label} language`}
            data-id={lang.id}
          >
            {lang.label}
          </button>
        )
      })}
    </AnimatedBackground>
  )
}

export function Header() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  // Remounting the gradient span (via `key`) is the reliable way to restart a
  // CSS animation on demand in React — changing the key forces a fresh DOM
  // node, so the one-shot `animate-gradient-shift` keyframe always replays
  // from the start instead of a same-value re-declaration that most browsers
  // won't restart.
  const [gradientKey, setGradientKey] = useState(0)

  // Publish the header's rendered height as a CSS var so other sticky
  // elements (e.g. the per-post mountain hero) can stack below it instead of
  // both competing for `top: 0`.
  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const setHeightVar = () => {
      document.documentElement.style.setProperty(
        '--site-header-height',
        `${el.offsetHeight}px`,
      )
    }

    setHeightVar()
    const observer = new ResizeObserver(setHeightVar)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Strip the /<lang> prefix and any nested slug so nav items can match on
  // the top-level route, e.g. /en/writing/some-post -> /writing
  const segments = pathname.split('/')
  const activeHref = `/${segments[2] || ''}`

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#355c70]/90 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/90"
    >
      <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between gap-4 px-6 md:px-12">
        {/* Logo */}
        <Link
          href={`/${language}`}
          className="shrink-0 text-base font-semibold tracking-tight"
        >
          <span
            key={gradientKey}
            onMouseEnter={() => setGradientKey((k) => k + 1)}
            className="animate-gradient-shift bg-gradient-to-r from-white via-teal-200 to-white bg-[length:200%_auto] bg-clip-text text-transparent transition-opacity duration-200 hover:opacity-80 motion-reduce:animate-none dark:from-zinc-100 dark:via-[#311B92] dark:to-zinc-100"
          >
            Magor Köllő
          </span>
        </Link>

        {/* Nav links */}
        <nav className="min-w-0 overflow-x-auto">
          <AnimatedBackground
            defaultValue={activeHref}
            enableHover={false}
            className="rounded-full bg-white/10 dark:bg-zinc-800"
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={`/${language}${item.href}`}
                data-id={item.href}
                className="rounded-full px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-zinc-300 uppercase transition-colors hover:text-white data-[checked=true]:text-white sm:px-3 sm:text-sm dark:text-zinc-400 dark:hover:text-zinc-50 dark:data-[checked=true]:text-zinc-50"
              >
                {item.label[language]}
              </Link>
            ))}
          </AnimatedBackground>
        </nav>

        {/* Actions: language switch + theme toggle, far right */}
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
