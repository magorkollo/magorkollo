'use client'

import Link from 'next/link'
import { BLOG_POSTS, EXTERNAL_WRITING } from '@/app/[lang]/(main)/data'
import { UI_STRINGS } from '@/lib/data'
import { useLanguage, Language } from '@/lib/language-context'

function formatDate(date: string, language: Language) {
  return new Date(date).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Hover treatment (bleed-padding background highlight + title underline) is
// shared with the homepage's "Latest Writing" preview (components/latest-writing.tsx)
// — same classes, same translucent-white underline accent, one interaction
// language across both pages rather than two independently-tuned lists.
export function WritingTable() {
  const { language } = useLanguage()

  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))
  const external = [...EXTERNAL_WRITING].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  )

  const t = {
    onThisSite: UI_STRINGS.writing.onThisSite[language],
    elsewhere: UI_STRINGS.writing.elsewhere[language],
  }

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="mb-2 text-xs font-semibold tracking-wide text-zinc-300 uppercase dark:text-zinc-400">
          {t.onThisSite}
        </h2>
        <div className="flex flex-col">
          {posts.map((post) => (
            <Link
              key={post.uid}
              href={`/${language}${post.link}`}
              className="group -mx-3 grid grid-cols-[6rem_1fr] gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-white/5 sm:grid-cols-[8rem_1fr]"
            >
              <time
                dateTime={post.date}
                className="pt-0.5 text-xs text-zinc-300/90 sm:text-sm dark:text-zinc-400"
              >
                {formatDate(post.date, language)}
              </time>
              <div>
                <h3 className="inline w-fit font-semibold text-white underline decoration-white/0 decoration-[1.5px] underline-offset-[6px] transition-colors duration-300 ease-out group-hover:decoration-white/40 dark:text-zinc-50">
                  {post.title[language]}
                </h3>
                <p className="mt-1 font-serif text-lg leading-relaxed text-zinc-300 dark:text-zinc-400">
                  {post.description[language]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {external.length > 0 && (
        <section>
          <h2 className="mb-2 text-xs font-semibold tracking-wide text-zinc-300 uppercase dark:text-zinc-400">
            {t.elsewhere}
          </h2>
          <div className="flex flex-col">
            {external.map((item) => (
              <a
                key={item.uid}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group -mx-3 grid grid-cols-[6rem_1fr] gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-white/5 sm:grid-cols-[8rem_1fr]"
              >
                <div className="pt-0.5 text-xs text-zinc-300/90 sm:text-sm dark:text-zinc-400">
                  <time dateTime={item.date}>
                    {formatDate(item.date, language)}
                  </time>
                  <div className="mt-0.5 text-zinc-400 dark:text-zinc-500">
                    {item.source} ↗
                  </div>
                </div>
                <div>
                  <h3 className="inline w-fit font-semibold text-white underline decoration-white/0 decoration-[1.5px] underline-offset-[6px] transition-colors duration-300 ease-out group-hover:decoration-white/40 dark:text-zinc-50">
                    {item.title[language]}
                  </h3>
                  <p className="mt-1 font-serif text-lg leading-relaxed text-zinc-300 dark:text-zinc-400">
                    {item.description[language]}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
