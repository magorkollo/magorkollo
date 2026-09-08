import Image from 'next/image'

/**
 * The two-photo crossfade used everywhere the profile picture appears.
 * Renders as a pair of absolutely-positioned images filling their parent, so
 * callers keep their own sizing/border/rounded wrapper and just add `group`
 * to it (the hover trigger) — see about/page.tsx, (main)/page.tsx, footer.tsx.
 *
 * `sizes` matters here: without it, `fill` defaults to requesting a `100vw`
 * image even for the 48px footer avatar. The largest actual usage is the
 * homepage hero at up to 192px, so that's the upper bound passed through.
 */
export function ProfilePhoto({ priority }: { priority?: boolean }) {
  return (
    <>
      <Image
        src="/magor2.png"
        alt="Magor Köllő"
        fill
        sizes="192px"
        priority={priority}
        loading={priority ? undefined : 'eager'}
        className="object-cover transition-opacity duration-300 group-hover:opacity-0"
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
        className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </>
  )
}
