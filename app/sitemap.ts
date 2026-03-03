import { MetadataRoute } from 'next'
import { BLOG_POSTS } from './[lang]/(main)/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nim-fawn.vercel.app'
  const languages = ['en', 'hu', 'ro']
  const routes = ['', '/cv', '/blog']

  const staticEntries = languages.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
  )

  const blogEntries = languages.flatMap((lang) =>
    BLOG_POSTS.map((post) => ({
      url: `${baseUrl}/${lang}${post.link}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  )

  return [...staticEntries, ...blogEntries]
}
