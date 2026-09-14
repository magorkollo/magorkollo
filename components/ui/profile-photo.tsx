'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * The two-photo crossfade used everywhere the profile picture appears.
 * Renders as a pair of absolutely-positioned images filling their parent, so
 * callers keep their own sizing/border/rounded wrapper and just add `group`
 * to it (the hover trigger) — see about/page.tsx, (main)/page.tsx, footer.tsx.
 *
 * `sizes` matters here: without it, `fill` defaults to requesting a `100vw`
 * image even for the 48px footer avatar. The largest actual usage is the
 * homepage hero at up to 192px, so that's the upper bound passed through.
 *
 * Touch screens never trigger the hover crossfade: Tailwind v4 compiles every
 * `hover:` / `group-hover:` variant inside `@media (hover: hover)`. So a tap
 * toggles the colour photo instead. Mouse clicks are ignored on purpose —
 * desktop keeps plain hover, and a click there would otherwise make the
 * reveal stick after the pointer leaves.
 */
export function ProfilePhoto({ priority }: { priority?: boolean }) {
  const [revealed, setRevealed] = useState(false)
  const lastPointerType = useRef('')

  return (
    <>
      <Image
        src="/magor2.png"
        alt="Magor Köllő"
        fill
        sizes="192px"
        priority={priority}
        loading={priority ? undefined : 'eager'}
        className={cn(
          'object-cover transition-opacity duration-300 group-hover:opacity-0',
          revealed && 'opacity-0',
        )}
      />
      {/* Always eager: this layer sits at opacity-0 until hover, and browser
          native lazy-loading can otherwise leave it unfetched below the
          fold (e.g. the footer) — a hover before it loads shows nothing. */}
      <Image
        src="/magor1.png"
        alt="Magor Köllő"
        fill
        sizes="192px"
        loading="eager"
        className={cn(
          'object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          revealed && 'opacity-100',
        )}
      />
      <button
        type="button"
        aria-label="Show alternate photo"
        aria-pressed={revealed}
        onPointerDown={(e) => {
          lastPointerType.current = e.pointerType
        }}
        onClick={() => {
          // Keyboard activation has no pointer type, so it toggles too.
          if (lastPointerType.current !== 'mouse') setRevealed((r) => !r)
          lastPointerType.current = ''
        }}
        className="absolute inset-0 rounded-full [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none focus-visible:ring-inset"
      />
    </>
  )
}
