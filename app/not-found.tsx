import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative">
        {/* Decorative mountain layers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            viewBox="0 0 800 200"
            className="absolute bottom-0 left-0 w-full fill-purple-900/10"
          >
            <path d="M0 200 L150 40 L300 160 L450 20 L600 140 L750 50 L800 200 Z" />
          </svg>
          <svg
            viewBox="0 0 800 200"
            className="absolute bottom-0 left-0 w-full fill-blue-800/10"
          >
            <path d="M-50 200 L120 100 L280 180 L450 60 L620 150 L850 200 Z" />
          </svg>
          <svg
            viewBox="0 0 800 200"
            className="absolute bottom-0 left-0 w-full fill-emerald-500/20"
          >
            <path d="M-100 200 L80 130 L250 190 L420 110 L600 170 L900 200 Z" />
          </svg>
        </div>

        <div className="relative z-10 px-4 text-center">
          <h1 className="mb-4 text-8xl font-bold tracking-tight text-white dark:text-zinc-50">
            404
          </h1>
          <p className="mb-8 text-lg text-zinc-300 dark:text-zinc-400">
            This page drifted off into the mountains
          </p>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/20 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            &larr; Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
