'use client'

import { useState, useRef, useEffect } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'

export function CopyField({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href?: string
}) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      // On failure leave the button in its default state, do not throw
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-800">
      <span className="text-xs font-medium tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-sm text-zinc-200 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white dark:text-zinc-300 dark:hover:text-white"
        >
          {value}
        </a>
      ) : (
        <span className="font-mono text-sm text-zinc-200 dark:text-zinc-300">
          {value}
        </span>
      )}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
        className="ml-auto inline-flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-white dark:text-zinc-500 dark:hover:text-zinc-100"
      >
        {copied ? (
          <>
            <CheckIcon className="h-3.5 w-3.5 text-teal-400 dark:text-[#B39DDB]" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <CopyIcon className="h-3.5 w-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  )
}
