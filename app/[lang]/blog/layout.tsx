import { BlogClientWrapper } from './blog-client-wrapper'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BlogClientWrapper>{children}</BlogClientWrapper>
}
