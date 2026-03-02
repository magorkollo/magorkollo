export type Content<T = string> = {
  en: T
  hu: T
  ro: T
}

type Project = {
  name: string
  description: Content
  link: string
  video: string
  id: string
}

type BlogPost = {
  title: Content
  description: Content
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Motion Primitives Pro',
    description: {
      en: 'Advanced components and templates to craft beautiful websites.',
      hu: 'Fejlett komponensek és sablonok gyönyörű weboldalak készítéséhez.',
      ro: 'Componente și șabloane avansate pentru a crea site-uri web frumoase.',
    },
    link: 'https://pro.motion-primitives.com/',
    video: 'https://drive.google.com/uc?export=preview&id=1CexcLrVMJgP3kb-PRak1TdEPqgljzQjW',
    id: 'project1',
  },
  {
    name: 'Motion Primitives',
    description: {
      en: 'UI kit to make beautiful, animated interfaces.',
      hu: 'UI készlet gyönyörű, animált felületek készítéséhez.',
      ro: 'Kit UI pentru a crea interfețe frumoase și animate.',
    },
    link: 'https://motion-primitives.com/',
    video: 'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
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
  ...Array.from({ length: 10 }, (_, i) => ({
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

export const SUMMARY: Content = {
  en: 'Software Engineer with hands-on leadership experience in fast-paced, high-impact environments, including tech and nonprofit. I am currently working in high-frequency trading, focusing on performance-critical systems, but I have a strong interest in autonomous systems, AI and drone technology too. In my spare time, I lead a NGO involved in various youth-related projects, and I also teach the next generation for STEM. I constantly reflect on how I can help make the world a better place - and I try my best to bring some of those ideas into reality. Hence, beside building software, I also try to build communities and dreams.',
  hu: 'Szoftvermérnök gyakorlati vezetői tapasztalattal pörgős, nagy hatású környezetekben, beleértve a technológiai és non-profit szektort. Jelenleg a nagyfrekvenciás kereskedésben dolgozom, a teljesítmény-kritikus rendszerekre összpontosítva, de élénken érdeklődöm az autonóm rendszerek, az MI és a dróntechnológia iránt is. Szabadidőmben egy különféle ifjúsági projektekkel foglalkozó civil szervezetet vezetek, és tanítom a következő generációt a STEM területeken. Folyamatosan azon gondolkodom, hogyan tehetném jobbá a világot - és igyekszem a legjobbamat nyújtani, hogy ezen ötletek egy részét megvalósítsam. Így a szoftverépítés mellett közösségeket és álmokat is építek.',
  ro: 'Inginer software cu experiență practică de conducere în medii dinamice și cu impact ridicat, inclusiv în sectorul tehnologic și nonprofit. În prezent lucrez în tranzacționarea de înaltă frecvență, concentrându-mă pe sisteme critice pentru performanță, dar am un interes puternic și pentru sistemele autonome, AI și tehnologia dronelor. În timpul liber, conduc un ONG implicat în diverse proiecte pentru tineret și predau următoarei generații în domeniile STEM. Reflectez constant la modul în care pot ajuta la transformarea lumii într-un loc mai bun - și fac tot posibilul să transform unele dintre aceste idei în realitate. Prin urmare, pe lângă dezvoltarea de software, încerc să construiesc comunități și visuri.',
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/magorkollo',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/magorkollo',
  },
]

export const EMAIL = 'magorors_kollo@yahoo.com'
