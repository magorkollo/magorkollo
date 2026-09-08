import { BLOG_POSTS } from '../(main)/data'
import { WritingClientWrapper } from './writing-client-wrapper'

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => {
    const slug = post.link.replace('/writing/', '')
    return { slug }
  })
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <WritingClientWrapper>{children}</WritingClientWrapper>
}
