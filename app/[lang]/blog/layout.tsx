import { BLOG_POSTS } from '../(main)/data'
import { BlogClientWrapper } from './blog-client-wrapper'

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => {
    const slug = post.link.replace('/blog/', '')
    return { slug }
  })
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BlogClientWrapper>{children}</BlogClientWrapper>
}
