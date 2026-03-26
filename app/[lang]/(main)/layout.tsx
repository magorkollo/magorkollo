'use client'

import { Header } from './header'
import { Footer } from './footer'
import { PageTransitionWrapper } from '@/components/page-transition-wrapper'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageTransitionWrapper>
      <Header />
      <main>{children}</main>
      <Footer />
    </PageTransitionWrapper>
  )
}
