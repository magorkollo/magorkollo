'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { useParams, useRouter, usePathname } from 'next/navigation'

export type Language = 'en' | 'hu' | 'ro'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()

  // The 'lang' param comes from the dynamic route segment [lang]
  const language = (params.lang as Language) || 'en'

  const handleSetLanguage = (lang: Language) => {
    if (lang === language) return

    // Replace the current language segment in the pathname
    // Pathname starts with /en, /hu, or /ro
    const segments = pathname.split('/')
    segments[1] = lang
    const newPathname = segments.join('/')

    router.push(newPathname)
  }

  // Effect to handle root redirect if needed (though we'll handle this in the root layout/page too)
  useEffect(() => {
    if (!params.lang && pathname === '/') {
      router.replace('/en')
    }
  }, [params.lang, pathname, router])

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
