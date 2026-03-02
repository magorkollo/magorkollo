import { CvHeader } from './cv_header'
import { Footer } from '../(main)/footer'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CvHeader />
      {children}
      <Footer />
    </>
  )
}
