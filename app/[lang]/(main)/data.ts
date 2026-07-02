import type { Content, SocialLink } from '@/lib/data'
export { SOCIAL_LINKS, EMAIL } from '@/lib/data'
export type { Content, SocialLink }

export { SUMMARY } from '@/lib/data'

export type Project = {
  name: string
  description: Content
  link: string
  image: string
  id: string
}

export type BlogPost = {
  title: Content
  description: Content
  link: string
  uid: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Autonomous Robot',
    description: {
      en: 'An autonomous mobile robot platform developed for navigation and mapping in complex environments.',
      hu: 'Autonóm mobil robot platform, amelyet összetett környezetben való navigációra és térképezésre fejlesztettek ki.',
      ro: 'O platformă robotizată mobilă autonomă dezvoltată pentru navigare și cartografiere în medii complexe.',
    },
    link: 'https://github.com/magorkollo/autonomous_robot',
    image: '/waffle_parts.png',
    id: 'project1',
  },
  {
    name: 'SkillBoosters',
    description: {
      en: 'A comprehensive educational program designed to boost technical skills and foster innovation among young people.',
      hu: 'Átfogó oktatási program, amelynek célja a technikai készségek fejlesztése és az innováció ösztönzése a fiatalok körében.',
      ro: 'Un program educațional cuprinzător conceput pentru a spori abilitățile tehnice și a promova inovația în rândul tinerilor.',
    },
    link: 'https://www.youthcenter.ro/en/skillboosters/details/',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    id: 'project2',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: {
      en: 'Exploring the Intersection of Design, AI, and Design Engineering',
      hu: 'A dizájn, az MI és a dizájn-mérnökség metszéspontjának felfedezése',
      ro: 'Explorarea intersecției dintre design, AI și ingineria designului',
    },
    description: {
      en: 'How AI is changing the way we design',
      hu: 'Hogyan változtatja meg az MI a tervezés módját',
      ro: 'Cum schimbă AI modul în care proiectăm',
    },
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: {
      en: 'How to Export Metadata from MDX for Next.js SEO',
      hu: 'Metaadatok exportálása MDX-ből Next.js SEO-hoz',
      ro: 'Cum să exportați metadate din MDX pentru Next.js SEO',
    },
    description: {
      en: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
      hu: 'Útmutató a metaadatok MDX fájlokból történő exportálásához a Next.js SEO funkcióinak kihasználása érdekében.',
      ro: 'Un ghid despre exportul metadatelor din fișierele MDX pentru a utiliza funcțiile SEO Next.js.',
    },
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    title: {
      en: `Lorem Ipsum Article ${i + 1}`,
      hu: `Lorem Ipsum cikk ${i + 1}`,
      ro: `Articol Lorem Ipsum ${i + 1}`,
    },
    description: {
      en: `This is a test article ${i + 1} with some lorem ipsum content.`,
      hu: `Ez egy teszt cikk ${i + 1} némi lorem ipsum tartalommal.`,
      ro: `Acesta este un articol de test ${i + 1} cu un conținut lorem ipsum.`,
    },
    link: `/blog/lorem-ipsum-${i + 1}`,
    uid: `lorem-${i + 1}`,
  })),
]
