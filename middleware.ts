import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Ha pont a gyökeret hívja meg (/), irányítsuk át az alapértelmezett nyelvre
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Megadjuk, mely útvonalakra fusson le (kihagyjuk az API, statikus fájlok stb. útvonalait)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
