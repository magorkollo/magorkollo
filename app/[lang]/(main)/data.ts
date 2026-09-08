import type { Content, SocialLink } from '@/lib/data'
export { SOCIAL_LINKS, EMAIL } from '@/lib/data'
export type { Content, SocialLink }

export { SUMMARY } from '@/lib/data'

export type BlogPost = {
  title: Content
  description: Content
  link: string
  date: string
  uid: string
}

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
    link: '/writing/exploring-the-intersection-of-design-ai-and-design-engineering',
    date: '2025-01-15',
    uid: 'blog-1',
  },
  // NOTE: placeholder post — realistic title/description, lorem-ipsum body.
  // Replace or remove before treating the site as final.
  {
    title: {
      en: 'Optimizing Low-Latency Market Data Pipelines in C++',
      hu: 'Alacsony késleltetésű piaci adat csővezetékek optimalizálása C++-ban',
      ro: 'Optimizarea pipeline-urilor de date de piață cu latență redusă în C++',
    },
    description: {
      en: 'A look at the architectural decisions behind sub-microsecond market connectivity, from lock-free queues to kernel bypass networking.',
      hu: 'Áttekintés a mikroszekundum alatti piaci kapcsolat architekturális döntéseiről, a lock-free sorképzéstől a kernel-bypass hálózatig.',
      ro: 'O privire asupra deciziilor arhitecturale din spatele conectivității de piață sub-microsecundă, de la cozi lock-free la rețele kernel bypass.',
    },
    link: '/writing/optimizing-low-latency-market-data-pipelines',
    date: '2025-08-01',
    uid: 'blog-placeholder-1',
  },
  // NOTE: placeholder post — realistic title/description, lorem-ipsum body.
  {
    title: {
      en: 'Building Autonomous GenAI Workflows with LangGraph and MCP',
      hu: 'Autonóm GenAI munkafolyamatok építése LangGraph-fal és MCP-vel',
      ro: 'Construirea unor fluxuri de lucru GenAI autonome cu LangGraph și MCP',
    },
    description: {
      en: 'How a small team automated parts of its own development lifecycle using RAG pipelines, agentic tooling, and the Model Context Protocol.',
      hu: 'Hogyan automatizált egy kis csapat részeket a saját fejlesztési életciklusából RAG csővezetékek, ügynök-alapú eszközök és a Model Context Protocol segítségével.',
      ro: 'Cum a automatizat o echipă mică părți din propriul ciclu de dezvoltare folosind pipeline-uri RAG, unelte agentice și Model Context Protocol.',
    },
    link: '/writing/building-autonomous-genai-workflows-langgraph-mcp',
    date: '2025-06-15',
    uid: 'blog-placeholder-2',
  },
  // NOTE: placeholder post — realistic title/description, lorem-ipsum body.
  {
    title: {
      en: 'Lessons from Leading a Distributed Engineering Team',
      hu: 'Tanulságok egy elosztott mérnökcsapat vezetéséből',
      ro: 'Lecții din conducerea unei echipe de inginerie distribuite',
    },
    description: {
      en: 'Notes on mentoring, code review culture, and keeping a distributed team of engineers aligned across time zones.',
      hu: 'Jegyzetek a mentorálásról, a code review kultúráról és arról, hogyan tartható össze egy elosztott mérnökcsapat különböző időzónákban.',
      ro: 'Note despre mentorat, cultura code review și cum se menține alinierea unei echipe distribuite de ingineri în fusuri orare diferite.',
    },
    link: '/writing/lessons-from-leading-a-distributed-engineering-team',
    date: '2025-03-20',
    uid: 'blog-placeholder-3',
  },
]

export type ExternalWriting = {
  title: Content
  description: Content
  link: string
  source: string
  date: string
  uid: string
}

// Placeholder only — the link is a dead '#' on purpose. Replace with a real
// external publication/guest post, or delete this array and its section
// entirely if there's nothing to list here.
export const EXTERNAL_WRITING: ExternalWriting[] = [
  {
    title: {
      en: 'Example External Article (replace me)',
      hu: 'Példa külső cikk (cseréld le)',
      ro: 'Exemplu de articol extern (înlocuiește-mă)',
    },
    description: {
      en: 'Placeholder entry for an external publication or guest post — replace with a real link once available.',
      hu: 'Helyőrző bejegyzés egy külső publikációhoz vagy vendégcikkhez — cseréld le valós linkre, ha elérhető.',
      ro: 'Intrare de test pentru o publicație externă sau un articol invitat — înlocuiește cu un link real când este disponibil.',
    },
    link: '#',
    source: 'Example Publication',
    date: '2025-02-01',
    uid: 'ext-placeholder-1',
  },
]
