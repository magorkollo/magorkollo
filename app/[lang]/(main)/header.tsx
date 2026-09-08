'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { MoonIcon, SunIcon, ChevronDown } from 'lucide-react'
import { useLanguage, Language } from '@/lib/language-context'
import { useEntrance } from '@/components/entrance-context'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { cn } from '@/lib/utils'
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

const HOME_LABEL: Content = { en: 'Home', hu: 'Kezdőlap', ro: 'Acasă' }
const MENU_LABEL: Content = { en: 'Menu', hu: 'Menü', ro: 'Meniu' }

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
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [gradientKey, setGradientKey] = useState(0)

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

  // Close dropdown on click outside or escape key
  useEffect(() => {
    if (!isMenuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  // Close dropdown on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Strip the /<lang> prefix and any nested slug so nav items can match on
  // the top-level route, e.g. /en/writing/some-post -> /writing
  const segments = pathname.split('/')
  const activeHref = `/${segments[2] || ''}`
  const activeItem = NAV_ITEMS.find((item) => activeHref === item.href)
  const currentNavTitle = activeItem
    ? activeItem.label[language]
    : activeHref === '/'
      ? HOME_LABEL[language]
      : MENU_LABEL[language]

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#355c70]/90 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/90"
    >
      <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 md:px-12">
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

        {/* Desktop Nav links (md+) */}
        <nav className="hidden min-w-0 md:flex">
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
                className="rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap text-zinc-300 uppercase transition-colors hover:text-white data-[checked=true]:text-white dark:text-zinc-400 dark:hover:text-zinc-50 dark:data-[checked=true]:text-zinc-50"
              >
                {item.label[language]}
              </Link>
            ))}
          </AnimatedBackground>
        </nav>

        {/* Mobile Dropdown Menu (< md) */}
        <div ref={dropdownRef} className="relative md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label="Navigation menu"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 active:bg-white/25 dark:bg-zinc-800/90 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            <span>{currentNavTitle}</span>
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 transition-transform duration-200',
                isMenuOpen && 'rotate-180',
              )}
            />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute left-1/2 mt-2 w-44 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/20 bg-[#254353]/95 p-1.5 shadow-2xl backdrop-blur-2xl dark:border-zinc-800 dark:bg-zinc-900/95"
              >
                <Link
                  href={`/${language}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors',
                    activeHref === '/'
                      ? 'bg-white/20 font-semibold text-white dark:bg-zinc-800 dark:text-zinc-50'
                      : 'text-zinc-200 hover:bg-white/10 hover:text-white dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-100',
                  )}
                >
                  <span>{HOME_LABEL[language]}</span>
                  {activeHref === '/' && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  )}
                </Link>

                {NAV_ITEMS.map((item) => {
                  const isActive = activeHref === item.href
                  return (
                    <Link
                      key={item.href}
                      href={`/${language}${item.href}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-white/20 font-semibold text-white dark:bg-zinc-800 dark:text-zinc-50'
                          : 'text-zinc-200 hover:bg-white/10 hover:text-white dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-100',
                      )}
                    >
                      <span>{item.label[language]}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      )}
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions: language switch + theme toggle, far right */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
