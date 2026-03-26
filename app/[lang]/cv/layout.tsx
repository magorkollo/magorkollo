'use client'

import { CvHeader } from './cv_header'
import { Footer } from '../(main)/footer'
import { PageTransitionWrapper } from '@/components/page-transition-wrapper'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageTransitionWrapper>
      <CvHeader />
      {children}
      <Footer />
    </PageTransitionWrapper>
  )
}
