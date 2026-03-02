'use client'

import React from 'react'
import { useParams } from 'next/navigation'

export function En({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const lang = params?.lang || 'en'
  return lang === 'en' ? <>{children}</> : null
}

export function Hu({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const lang = params?.lang || 'en'
  return lang === 'hu' ? <>{children}</> : null
}

export function Ro({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const lang = params?.lang || 'en'
  return lang === 'ro' ? <>{children}</> : null
}
