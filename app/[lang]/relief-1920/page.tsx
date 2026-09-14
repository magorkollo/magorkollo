'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { FrameCanvas, useFrameSequence } from '@/components/ui/frame-sequence'
import { TurntableControl } from '@/components/ui/turntable-control'
import { RELIEF_STRINGS } from './data'
import { cn } from '@/lib/utils'

interface MetaSequence {
  count: number
  loop: boolean
  fps?: number
}

interface LegendStop {
  value: number
  color: string
}

interface ReliefMeta {
  version: number
  ext: string
  pad: number
  sets: {
    desktop: { width: number; height: number }
    mobile: { width: number; height: number }
  }
  sequences: {
    globe: MetaSequence
    approach: MetaSequence
    turntable: MetaSequence
  }
  legend: {
    unit: string
    stops: LegendStop[]
  }
  poster: string
}

function ReliefLegend({
  legend,
  title,
  className,
}: {
  legend: ReliefMeta['legend']
  title: string
  className?: string
}) {
  const stops = legend.stops
  if (!stops || stops.length === 0) return null

  const minVal = stops[0].value
  const maxVal = stops[stops.length - 1].value
  const range = maxVal - minVal || 1

  const gradientStops = stops
    .map((s) => {
      const pct = ((s.value - minVal) / range) * 100
      return `${s.color} ${pct.toFixed(1)}%`
    })
    .join(', ')

  const backgroundStyle = `linear-gradient(to top, ${gradientStops})`
  const reversedStops = [...stops].reverse()

  return (
    <div
      className={cn(
        'rounded-xl border border-white/15 bg-zinc-950/80 p-3 shadow-2xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/80',
        className,
      )}
    >
      <div className="mb-2 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
        {title}
      </div>
      <div className="flex items-stretch gap-2.5">
        <div
          className="w-2.5 rounded-full border border-white/10 shadow-inner"
          style={{ background: backgroundStyle, height: '140px' }}
          aria-hidden="true"
        />
        <div className="flex h-[140px] flex-col justify-between font-mono text-[10px] leading-none text-zinc-300">
          {reversedStops.map((stop, index) => (
            <div key={stop.value} className="flex items-center gap-1">
              <span>{stop.value}</span>
              {index === 0 && (
                <span className="text-zinc-400">{legend.unit}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Relief1920Page() {
  const { language } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const isReducedMotion = Boolean(shouldReduceMotion)

  const [meta, setMeta] = useState<ReliefMeta | null>(null)
  const [selectedSet, setSelectedSet] = useState<'desktop' | 'mobile'>(
    'desktop',
  )
  const [scrollProgress, setScrollProgress] = useState(0)

  // Globe autoplay frame index (at fps via RAF)
  const [globeFrameIndex, setGlobeFrameIndex] = useState(0)
  const globeFrameIndexRef = useRef(0)

  // Turntable frame index driven by TurntableControl
  const [turntableIndex, setTurntableIndex] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)

  // Decide set once on mount & fetch meta.json
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    setSelectedSet(isMobile ? 'mobile' : 'desktop')

    fetch('/relief-1920/meta.json')
      .then((res) => res.json())
      .then((data: ReliefMeta) => setMeta(data))
      .catch((err) => {
        console.error('Failed to load relief-1920 meta:', err)
      })
  }, [])

  // Build frame URLs based on runtime metadata
  const globeUrls = useMemo(() => {
    if (!meta) return []
    const count = meta.sequences.globe.count
    const pad = meta.pad
    const ext = meta.ext
    return Array.from(
      { length: count },
      (_, i) =>
        `/relief-1920/${selectedSet}/globe/${String(i).padStart(pad, '0')}.${ext}`,
    )
  }, [meta, selectedSet])

  const approachUrls = useMemo(() => {
    if (!meta) return []
    const count = meta.sequences.approach.count
    const pad = meta.pad
    const ext = meta.ext
    return Array.from(
      { length: count },
      (_, i) =>
        `/relief-1920/${selectedSet}/approach/${String(i).padStart(pad, '0')}.${ext}`,
    )
  }, [meta, selectedSet])

  const turntableUrls = useMemo(() => {
    if (!meta) return []
    const count = meta.sequences.turntable.count
    const pad = meta.pad
    const ext = meta.ext
    return Array.from(
      { length: count },
      (_, i) =>
        `/relief-1920/${selectedSet}/turntable/${String(i).padStart(pad, '0')}.${ext}`,
    )
  }, [meta, selectedSet])

  // Disable frame sequence fetching when reduced motion is requested
  const canLoadSequences = Boolean(meta) && !isReducedMotion

  // Sequential loading: globe -> approach -> turntable with loop settings
  const globeSequence = useFrameSequence(
    globeUrls,
    canLoadSequences,
    meta?.sequences.globe.loop ?? true,
  )
  const approachSequence = useFrameSequence(
    approachUrls,
    canLoadSequences && globeSequence.isLoaded,
    meta?.sequences.approach.loop ?? false,
  )
  const turntableSequence = useFrameSequence(
    turntableUrls,
    canLoadSequences && approachSequence.isLoaded,
    meta?.sequences.turntable.loop ?? true,
  )

  // Track scroll position within the 500vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest)
  })

  // Determine current active sequence
  const p = Math.min(1, Math.max(0, scrollProgress))
  const isGlobePhase = p < 0.12
  const isApproachPhase = p >= 0.12 && p <= 0.8
  const isTurntablePhase = p > 0.8

  const currentSequenceKey = isGlobePhase
    ? 'globe'
    : isApproachPhase
      ? 'approach'
      : 'turntable'

  // Globe loop playback via requestAnimationFrame
  // Avoids render churn: only call setGlobeFrameIndex when the integer index actually changes
  useEffect(() => {
    if (currentSequenceKey !== 'globe' || !meta || isReducedMotion) return
    const fps = meta.sequences.globe.fps || 12
    const count = meta.sequences.globe.count || 72
    let lastTime = performance.now()
    let rafId: number
    let lastIntIndex = Math.floor(globeFrameIndexRef.current) % count

    const tick = (now: number) => {
      const dt = now - lastTime
      lastTime = now
      globeFrameIndexRef.current =
        (globeFrameIndexRef.current + (dt / 1000) * fps) % count
      const nextIndex = Math.floor(globeFrameIndexRef.current) % count
      if (nextIndex !== lastIntIndex) {
        lastIntIndex = nextIndex
        setGlobeFrameIndex(nextIndex)
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [currentSequenceKey, meta, isReducedMotion])

  // Current active frame index and active sequence
  const approachCount = meta?.sequences.approach.count || 48
  const approachIndex = Math.min(
    approachCount - 1,
    Math.max(0, Math.round(((p - 0.12) / 0.68) * (approachCount - 1))),
  )

  const activeSequence = isGlobePhase
    ? globeSequence
    : isApproachPhase
      ? approachSequence
      : turntableSequence

  const activeIndex = isGlobePhase
    ? globeFrameIndex
    : isApproachPhase
      ? approachIndex
      : turntableIndex

  const titleText = RELIEF_STRINGS.title[language]

  // Reduced motion: static poster frame with title, lede, legend, note, and credits
  if (isReducedMotion) {
    const posterUrl = meta
      ? `/relief-1920/${selectedSet}/${meta.poster}.${meta.ext}`
      : ''

    return (
      <div className="relative mx-auto max-w-4xl space-y-8 py-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl dark:text-zinc-100">
            {titleText}
          </h1>
          <p className="font-serif text-lg leading-relaxed text-zinc-200 dark:text-zinc-300">
            {RELIEF_STRINGS.lede[language]}
          </p>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e10] shadow-2xl">
          {posterUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterUrl}
              alt={titleText}
              className="h-full w-full object-contain"
            />
          )}
          {meta?.legend && (
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
              <ReliefLegend
                legend={meta.legend}
                title={RELIEF_STRINGS.legend[language]}
              />
            </div>
          )}
        </div>

        <div className="space-y-2 border-t border-white/10 pt-6 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
          <p>{RELIEF_STRINGS.note[language]}</p>
          <p>{RELIEF_STRINGS.credits[language]}</p>
        </div>
      </div>
    )
  }

  // Calculate overlay opacities
  // Globe overlay fades out as p goes from 0 to 0.10
  const globeOverlayOpacity = Math.max(0, 1 - p / 0.1)
  // Turntable and legend fade in as p crosses 0.80 to 0.88
  const turntableOverlayOpacity = Math.min(1, Math.max(0, (p - 0.8) / 0.08))

  return (
    <div className="relative w-full overflow-x-clip">
      {/* 500vh tall scroll section for smooth scrubbing */}
      <section
        ref={sectionRef}
        className="relative left-1/2 -mr-[50vw] -ml-[50vw] h-[500vh] w-screen max-w-[100vw]"
      >
        {/* Sticky full-viewport stage */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-zinc-950">
          {/* Main frame canvas */}
          <FrameCanvas
            sequence={activeSequence}
            index={activeIndex}
            sequenceKey={currentSequenceKey}
            ariaLabel={titleText}
            className="h-full w-full"
          />

          {/* Loading progress bar before globe is ready */}
          {!globeSequence.isLoaded && (
            <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-zinc-950/40 backdrop-blur-xs">
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-medium tracking-wide text-zinc-300">
                  {RELIEF_STRINGS.loading[language]}
                </span>
                <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-teal-400 transition-all duration-150 ease-out dark:bg-[#B39DDB]"
                    style={{
                      width: `${Math.round(globeSequence.progress * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Globe phase overlay: title + lede + scrollHint */}
          <div
            className={cn(
              'pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-between p-6 text-center transition-opacity duration-200 sm:p-12',
              globeOverlayOpacity > 0 ? 'opacity-100' : 'opacity-0',
            )}
            style={{ opacity: globeOverlayOpacity }}
          >
            <div className="max-w-2xl space-y-4 pt-8 sm:pt-14">
              <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl dark:text-zinc-100">
                {titleText}
              </h1>
              <p className="font-serif text-base leading-relaxed text-zinc-200 drop-shadow-sm sm:text-lg dark:text-zinc-300">
                {RELIEF_STRINGS.lede[language]}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1 pb-8 text-sm font-medium text-zinc-300">
              <span>{RELIEF_STRINGS.scrollHint[language]}</span>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </div>
          </div>

          {/* Turntable interaction controller layer */}
          <TurntableControl
            count={meta?.sequences.turntable.count || 72}
            value={turntableIndex}
            onChange={setTurntableIndex}
            fps={meta?.sequences.turntable.fps || 12}
            disabled={!isTurntablePhase}
            ariaLabel={titleText}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            {/* Drag hint */}
            <div
              className={cn(
                'pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-300',
                isTurntablePhase && turntableOverlayOpacity > 0
                  ? 'opacity-100'
                  : 'opacity-0',
              )}
              style={{ opacity: turntableOverlayOpacity }}
            >
              <div className="rounded-full border border-white/15 bg-zinc-950/80 px-4 py-2 text-xs font-medium text-zinc-200 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
                {RELIEF_STRINGS.dragHint[language]}
              </div>
            </div>
          </TurntableControl>

          {/* Elevation legend in bottom-left */}
          {meta?.legend && (
            <div
              className={cn(
                'pointer-events-none absolute bottom-6 left-6 z-20 transition-opacity duration-300 sm:bottom-8 sm:left-8',
                isTurntablePhase && turntableOverlayOpacity > 0
                  ? 'opacity-100'
                  : 'opacity-0',
              )}
              style={{ opacity: turntableOverlayOpacity }}
            >
              <ReliefLegend
                legend={meta.legend}
                title={RELIEF_STRINGS.legend[language]}
              />
            </div>
          )}
        </div>
      </section>

      {/* Note and credits below the scroll section */}
      <div className="relative z-10 mx-auto max-w-2xl space-y-2 px-4 py-16 text-center text-xs text-zinc-400 dark:text-zinc-500">
        <p>{RELIEF_STRINGS.note[language]}</p>
        <p>{RELIEF_STRINGS.credits[language]}</p>
      </div>
    </div>
  )
}
