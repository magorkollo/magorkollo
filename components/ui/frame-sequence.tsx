'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

export const FRAME_LRU_SIZE = 24
export const LRU_SIZE = FRAME_LRU_SIZE

export interface FrameSequence {
  getBitmap: (index: number) => ImageBitmap | null
  request: (index: number) => void
  version: number
  isLoaded: boolean
  progress: number
  loadedCount: number
}

export type FrameSequenceState = FrameSequence

/**
 * Loads a sequence of image frames into compressed Blobs with bounded concurrency (~6).
 * Lazily decodes frames into ImageBitmaps on demand using an LRU cache of at most 24 bitmaps.
 * Automatically aborts fetch and decodes on unmount, and closes all bitmaps.
 */
export function useFrameSequence(
  urls: string[],
  enabled = true,
  loop = false,
): FrameSequence {
  const [fetchState, setFetchState] = useState({
    loadedCount: 0,
    progress: 0,
    isLoaded: false,
  })
  const [version, setVersion] = useState(0)

  const urlsKey = urls.join('|')
  const total = urls.length

  const blobsRef = useRef<(Blob | null)[]>([])
  const blobResolversRef = useRef<
    (((blob: Blob | null) => void) | undefined)[]
  >([])
  const blobPromisesRef = useRef<(Promise<Blob | null> | undefined)[]>([])

  const lruRef = useRef<Map<number, ImageBitmap>>(new Map())
  const inFlightRef = useRef<Map<number, Promise<ImageBitmap | null>>>(
    new Map(),
  )

  const lastRequestedIndexRef = useRef<number | null>(null)
  const requestIdRef = useRef(0)
  const isMountedRef = useRef(true)
  const totalRef = useRef(total)
  totalRef.current = total
  const loopRef = useRef(loop)
  loopRef.current = loop

  useEffect(() => {
    isMountedRef.current = true

    if (!enabled || urls.length === 0 || typeof window === 'undefined') {
      blobsRef.current = []
      blobResolversRef.current = []
      blobPromisesRef.current = []
      setFetchState({
        loadedCount: 0,
        progress: 0,
        isLoaded: false,
      })
      return
    }

    const controller = new AbortController()
    const { signal } = controller
    const count = urls.length
    totalRef.current = count

    const blobs: (Blob | null)[] = new Array(count).fill(null)
    blobsRef.current = blobs

    const resolvers: (((blob: Blob | null) => void) | undefined)[] = new Array(
      count,
    )
    blobResolversRef.current = resolvers

    const promises: (Promise<Blob | null> | undefined)[] = new Array(count)
    for (let i = 0; i < count; i++) {
      promises[i] = new Promise<Blob | null>((resolve) => {
        resolvers[i] = resolve
      })
    }
    blobPromisesRef.current = promises

    setFetchState({
      loadedCount: 0,
      progress: 0,
      isLoaded: false,
    })

    let loaded = 0
    const concurrency = Math.min(6, count)
    let nextIndex = 0

    const worker = async () => {
      while (nextIndex < count && !signal.aborted) {
        const index = nextIndex++
        const url = urls[index]
        try {
          const res = await fetch(url, { signal })
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`)
          }
          const blob = await res.blob()
          if (signal.aborted) {
            resolvers[index]?.(null)
            return
          }

          blobs[index] = blob
          resolvers[index]?.(blob)
          loaded++

          if (isMountedRef.current) {
            setFetchState({
              loadedCount: loaded,
              progress: count > 0 ? loaded / count : 1,
              isLoaded: loaded === count,
            })
          }
        } catch (err: unknown) {
          if (signal.aborted) {
            resolvers[index]?.(null)
            return
          }
          console.warn(`Failed to fetch frame blob ${url}:`, err)
          resolvers[index]?.(null)
        }
      }
    }

    const workers = Array.from({ length: concurrency }, () => worker())
    void Promise.all(workers)

    const currentLru = lruRef.current
    const currentInFlight = inFlightRef.current

    return () => {
      isMountedRef.current = false
      controller.abort()
      for (const resolve of resolvers) {
        resolve?.(null)
      }
      for (const bmp of currentLru.values()) {
        try {
          bmp.close()
        } catch {
          // Already closed
        }
      }
      currentLru.clear()
      currentInFlight.clear()
    }
  }, [urlsKey, enabled, urls])

  const decodeFrame = useCallback(
    async (idx: number): Promise<ImageBitmap | null> => {
      const count = totalRef.current
      if (idx < 0 || idx >= count) return null
      if (!isMountedRef.current) return null

      // Check LRU cache
      const cached = lruRef.current.get(idx)
      if (cached) {
        lruRef.current.delete(idx)
        lruRef.current.set(idx, cached)
        return cached
      }

      // Check in-flight decode
      const inFlight = inFlightRef.current.get(idx)
      if (inFlight) {
        return inFlight
      }

      // Decode lazily
      const decodePromise = (async () => {
        try {
          let blob = blobsRef.current[idx]
          if (!blob) {
            const pendingPromise = blobPromisesRef.current[idx]
            if (pendingPromise) {
              blob = await pendingPromise
            }
          }
          if (!blob || !isMountedRef.current) {
            return null
          }

          const bmp = await createImageBitmap(blob)
          if (!isMountedRef.current) {
            try {
              bmp.close()
            } catch {
              // Already closed
            }
            return null
          }

          // Insert into LRU
          if (lruRef.current.has(idx)) {
            const old = lruRef.current.get(idx)!
            if (old !== bmp) {
              try {
                old.close()
              } catch {
                // Already closed
              }
            }
            lruRef.current.delete(idx)
          }
          lruRef.current.set(idx, bmp)

          // Evict until size <= FRAME_LRU_SIZE
          // Evicting from LRU calls bitmap.close().
          // Never evict the bitmap for the most recently requested index.
          while (lruRef.current.size > FRAME_LRU_SIZE) {
            let evicted = false
            for (const [key, b] of lruRef.current.entries()) {
              if (key !== lastRequestedIndexRef.current) {
                try {
                  b.close()
                } catch {
                  // Already closed
                }
                lruRef.current.delete(key)
                evicted = true
                break
              }
            }
            if (!evicted) {
              break
            }
          }

          setVersion((v) => v + 1)
          return bmp
        } catch (err) {
          console.warn(`Failed to decode frame ${idx}:`, err)
          return null
        } finally {
          inFlightRef.current.delete(idx)
        }
      })()

      inFlightRef.current.set(idx, decodePromise)
      return decodePromise
    },
    [],
  )

  const request = useCallback(
    (index: number) => {
      const count = totalRef.current
      if (count === 0) return

      const loop = loopRef.current
      const targetIndex = loop
        ? ((index % count) + count) % count
        : Math.max(0, Math.min(count - 1, index))

      lastRequestedIndexRef.current = targetIndex
      const reqId = ++requestIdRef.current

      const toDecode: number[] = [targetIndex]
      const seen = new Set<number>([targetIndex])

      for (let offset = 1; offset <= 4; offset++) {
        for (const sign of [1, -1]) {
          const raw = index + sign * offset
          const clampedOrWrapped = loop
            ? ((raw % count) + count) % count
            : Math.max(0, Math.min(count - 1, raw))
          if (!seen.has(clampedOrWrapped)) {
            seen.add(clampedOrWrapped)
            toDecode.push(clampedOrWrapped)
          }
        }
      }

      void (async () => {
        // Decode target index first
        await decodeFrame(targetIndex)

        // Decode neighbours in background
        for (let i = 1; i < toDecode.length; i++) {
          if (requestIdRef.current !== reqId || !isMountedRef.current) {
            break
          }
          await decodeFrame(toDecode[i])
        }
      })()
    },
    [decodeFrame],
  )

  const getBitmap = useCallback((index: number): ImageBitmap | null => {
    const count = totalRef.current
    if (count === 0) return null
    const loop = loopRef.current
    const targetIndex = loop
      ? ((index % count) + count) % count
      : Math.max(0, Math.min(count - 1, index))

    const bmp = lruRef.current.get(targetIndex)
    if (!bmp) return null
    lruRef.current.delete(targetIndex)
    lruRef.current.set(targetIndex, bmp)
    return bmp
  }, [])

  return {
    getBitmap,
    request,
    version,
    isLoaded: fetchState.isLoaded,
    progress: fetchState.progress,
    loadedCount: fetchState.loadedCount,
  }
}

export interface FrameCanvasProps {
  sequence?: FrameSequence
  bitmap?: ImageBitmap | null
  bitmaps?: (ImageBitmap | null)[]
  index?: number
  sequenceKey?: string
  ariaLabel?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Canvas that draws a frame bitmap with contain fit, centered, scaled by devicePixelRatio.
 * Lazily requests frames via sequence.request(index). If not yet decoded, preserves last drawn frame.
 * Crossfade between sequences copies canvas pixels into an offscreen snapshot canvas.
 */
export function FrameCanvas({
  sequence,
  bitmap,
  bitmaps,
  index = 0,
  sequenceKey = 'default',
  ariaLabel,
  className,
  style,
}: FrameCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const lastSequenceKeyRef = useRef<string>(sequenceKey)
  const crossfadeRef = useRef<{
    snapshotCanvas: HTMLCanvasElement
    startTime: number
  } | null>(null)
  const hasDrawnRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)

  // Request target frame and neighbours on sequence or index change
  useEffect(() => {
    if (sequence) {
      sequence.request(index)
    }
  }, [sequence, index])

  const drawContain = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      bmp: ImageBitmap,
      cw: number,
      ch: number,
      alpha = 1,
    ) => {
      try {
        const bw = bmp.width
        const bh = bmp.height
        if (bw === 0 || bh === 0) return

        const scale = Math.min(cw / bw, ch / bh)
        const dw = bw * scale
        const dh = bh * scale
        const dx = (cw - dw) / 2
        const dy = (ch - dh) / 2

        ctx.globalAlpha = alpha
        ctx.drawImage(bmp, dx, dy, dw, dh)
      } catch {
        // Bitmap might have been closed or detached
      }
    },
    [],
  )

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cw = canvas.width
    const ch = canvas.height
    if (cw === 0 || ch === 0) return

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }

    // Snapshot crossfade on sequenceKey change without depending on ImageBitmaps staying alive
    if (sequenceKey !== lastSequenceKeyRef.current) {
      if (
        hasDrawnRef.current &&
        typeof document !== 'undefined' &&
        cw > 0 &&
        ch > 0
      ) {
        try {
          const snapshot = document.createElement('canvas')
          snapshot.width = cw
          snapshot.height = ch
          const snapCtx = snapshot.getContext('2d')
          if (snapCtx) {
            snapCtx.drawImage(canvas, 0, 0)
            crossfadeRef.current = {
              snapshotCanvas: snapshot,
              startTime: performance.now(),
            }
          }
        } catch {
          // Snapshot failed, proceed without crossfade
        }
      }
      lastSequenceKeyRef.current = sequenceKey
    }

    // Resolve target bitmap
    const bmp = sequence
      ? sequence.getBitmap(index)
      : (bitmap ?? bitmaps?.[index] ?? null)

    const crossfade = crossfadeRef.current
    if (crossfade) {
      const elapsed = performance.now() - crossfade.startTime
      const t = Math.min(1, elapsed / 250)

      ctx.clearRect(0, 0, cw, ch)

      // Draw snapshot of previous sequence
      ctx.globalAlpha = 1
      ctx.drawImage(crossfade.snapshotCanvas, 0, 0, cw, ch)

      // Fade new frame in on top if available
      if (bmp) {
        drawContain(ctx, bmp, cw, ch, t)
        hasDrawnRef.current = true
      }

      ctx.globalAlpha = 1

      if (t < 1) {
        rafIdRef.current = requestAnimationFrame(renderFrame)
      } else {
        crossfadeRef.current = null
      }
    } else {
      if (bmp) {
        ctx.clearRect(0, 0, cw, ch)
        ctx.globalAlpha = 1
        drawContain(ctx, bmp, cw, ch, 1)
        hasDrawnRef.current = true
      }
      // If bmp is not yet decoded, leave last drawn frame on canvas (no flash)
    }
  }, [sequence, index, sequenceKey, bitmap, bitmaps, drawContain])

  const version = sequence?.version ?? 0

  // Redraw when renderFrame or version changes
  useEffect(() => {
    renderFrame()
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
    }
  }, [renderFrame, version])

  // ResizeObserver to handle container size changes and devicePixelRatio
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      const dpr =
        typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
      const targetW = Math.max(1, Math.round(rect.width * dpr))
      const targetH = Math.max(1, Math.round(rect.height * dpr))

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW
        canvas.height = targetH
      }
      renderFrame()
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(container)
    handleResize()

    return () => observer.disconnect()
  }, [renderFrame])

  return (
    <div
      ref={containerRef}
      className={cn('relative h-full w-full overflow-hidden', className)}
      style={{
        maskImage:
          'radial-gradient(ellipse 75% 75% at 50% 50%, black 50%, transparent 95%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 75% 75% at 50% 50%, black 50%, transparent 95%)',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={ariaLabel}
        className="block h-full w-full"
      />
    </div>
  )
}
