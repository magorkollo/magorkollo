'use client'

import { useState, useRef, useEffect } from 'react'
import { highlight } from 'sugar-high'
import { CheckIcon, CopyIcon } from 'lucide-react'

export function CodeBlock({
  code,
  label,
  language = 'javascript',
}: {
  code: string
  label?: string
  language?: string
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

  const trimmedCode = code.trim()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmedCode)
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
    <div className="overflow-hidden rounded-lg border border-white/10 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900/60">
        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
          {label ?? language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-white dark:text-zinc-500 dark:hover:text-zinc-100"
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
      {/* Explicit text colour: sugar-high emits `var(--sh-identifier)` and
          `var(--sh-break)`, neither of which globals.css defines, so those
          tokens fall through to the inherited colour. Pinning it here keeps
          the block readable on both themes regardless of the body colour. */}
      <pre className="overflow-x-auto bg-zinc-950/40 p-4 font-mono text-[13px] leading-relaxed text-zinc-100 dark:bg-zinc-950/80">
        <code dangerouslySetInnerHTML={{ __html: highlight(trimmedCode) }} />
      </pre>
    </div>
  )
}
