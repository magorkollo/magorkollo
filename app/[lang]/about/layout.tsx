'use client'

import { PageTransitionWrapper } from '@/components/page-transition-wrapper'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageTransitionWrapper>
      <main>{children}</main>
    </PageTransitionWrapper>
  )
}
