import {
  FOREST_BANDS,
  buildBand,
  type ForestBandId,
  type Tree,
} from '@/lib/forest'

function treeToPath(t: Tree): string {
  const x = t.x
  const y = t.y
  const s = t.scale
  const r = (n: number) => Math.round(n * 100) / 100
  const trunk = `M${r(x - s)} ${r(y - 8 * s)}h${r(2 * s)}v${r(8 * s)}h${r(-2 * s)}Z`
  const t1 = `M${r(x)} ${r(y - 34 * s)}L${r(x + 6 * s)} ${r(y - 22 * s)}L${r(x - 6 * s)} ${r(y - 22 * s)}Z`
  const t2 = `M${r(x)} ${r(y - 26 * s)}L${r(x + 8 * s)} ${r(y - 13 * s)}L${r(x - 8 * s)} ${r(y - 13 * s)}Z`
  const t3 = `M${r(x)} ${r(y - 18 * s)}L${r(x + 10 * s)} ${r(y - 4 * s)}L${r(x - 10 * s)} ${r(y - 4 * s)}Z`
  return `${trunk}${t1}${t2}${t3}`
}

function buildBandPaths(band: ForestBandId): {
  mobile: string
  desktopExtra: string
} {
  const trees = buildBand(FOREST_BANDS[band])
  return {
    mobile: trees
      .filter((t) => t.mobile)
      .map(treeToPath)
      .join(''),
    desktopExtra: trees
      .filter((t) => !t.mobile)
      .map(treeToPath)
      .join(''),
  }
}

// Precomputed once at module scope so the SVG path data is byte-identical
// across server and client renders, avoiding hydration mismatches while
// collapsing 960+ DOM elements into unified vector paths.
const BAND_PATHS: Record<
  ForestBandId,
  { mobile: string; desktopExtra: string }
> = {
  mid: buildBandPaths('mid'),
  near: buildBandPaths('near'),
  fore: buildBandPaths('fore'),
}

/**
 * A dense band of pine silhouettes for the mountain parallax. Renders its own
 * bottom-anchored SVG using batched vector paths for high-performance GPU painting.
 */
export function PineForest({
  band,
  className,
}: {
  band: ForestBandId
  idPrefix?: string
  className?: string
}) {
  const cfg = FOREST_BANDS[band]
  const paths = BAND_PATHS[band]

  return (
    <svg
      viewBox={`0 0 800 ${cfg.viewBoxHeight}`}
      className={
        className ?? `absolute bottom-0 left-0 w-full ${cfg.fillClassName}`
      }
    >
      <path d={paths.mobile} />
      <path d={paths.desktopExtra} className="hidden md:inline" />
    </svg>
  )
}
