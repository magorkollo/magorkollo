import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LANGS = ['en', 'hu', 'ro']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Ha pont a gyökeret hívja meg (/), irányítsuk át az alapértelmezett nyelvre
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  // Régi útvonalak átirányítása: /cv → /resume, /blog → /writing
  const segments = pathname.split('/')
  if (LANGS.includes(segments[1])) {
    if (segments[2] === 'cv') segments[2] = 'resume'
    else if (segments[2] === 'blog') segments[2] = 'writing'
    else return NextResponse.next()

    const url = request.nextUrl.clone()
    url.pathname = segments.join('/')
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  // Megadjuk, mely útvonalakra fusson le (kihagyjuk az API, statikus fájlok stb. útvonalait)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
