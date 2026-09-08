'use client'

import Link from 'next/link'
import { BLOG_POSTS } from '@/app/[lang]/(main)/data'
import { useLanguage } from '@/lib/language-context'

// Hover treatment (bleed-padding background highlight + title underline) is
// shared with the /writing index (components/writing-table.tsx) — same
// classes, same translucent-white underline accent, so the two pages read as
// one interaction language rather than two independent implementations.
export function LatestWriting({ limit }: { limit?: number }) {
  const { language } = useLanguage()

  const posts = [...BLOG_POSTS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit)

  return (
    <div className="flex flex-col space-y-1">
      {posts.map((post) => (
        <Link
          key={post.uid}
          href={`/${language}${post.link}`}
          className="group -mx-3 flex flex-col space-y-1.5 rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
        >
          <time
            dateTime={post.date}
            className="text-xs text-zinc-300/90 dark:text-zinc-400"
          >
            {new Date(post.date).toLocaleDateString(language, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h3 className="inline w-fit font-medium text-white underline decoration-white/0 decoration-[1.5px] underline-offset-[6px] transition-colors duration-300 ease-out group-hover:decoration-white/40 dark:text-zinc-100">
            {post.title[language]}
          </h3>
          <p className="font-serif text-lg leading-relaxed text-zinc-300 dark:text-zinc-400">
            {post.description[language]}
          </p>
        </Link>
      ))}
    </div>
  )
}
