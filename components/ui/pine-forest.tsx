import {
  FOREST_BANDS,
  MOBILE_VIEW,
  buildBand,
  type ForestBandId,
  type Tree,
} from '@/lib/forest'
import { cn } from '@/lib/utils'

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

// A tree's widest tier spans ±10 × scale, and no band's scale exceeds 0.55 —
// so a trunk just outside the mobile window can still reach into it. Those
// trees are kept, otherwise the crop edges would show a bald strip.
const TREE_OVERHANG = 6

function buildBandPaths(band: ForestBandId): {
  full: string
  mobile: string
} {
  const trees = buildBand(FOREST_BANDS[band])
  const minX = MOBILE_VIEW.x - TREE_OVERHANG
  const maxX = MOBILE_VIEW.x + MOBILE_VIEW.width + TREE_OVERHANG
  return {
    full: trees.map(treeToPath).join(''),
    mobile: trees
      .filter((t) => t.x >= minX && t.x <= maxX)
      .map(treeToPath)
      .join(''),
  }
}

// Precomputed once at module scope so the SVG path data is byte-identical
// across server and client renders, avoiding hydration mismatches while
// collapsing 960+ DOM elements into unified vector paths.
const BAND_PATHS: Record<ForestBandId, { full: string; mobile: string }> = {
  mid: buildBandPaths('mid'),
  near: buildBandPaths('near'),
  fore: buildBandPaths('fore'),
}

/**
 * A dense band of pine silhouettes for the mountain parallax. Renders its own
 * bottom-anchored SVG using batched vector paths for high-performance GPU painting.
 *
 * `cropOnMobile` swaps in a second SVG below `sm` that shows only the centre
 * `MOBILE_VIEW` slice of the band (and paints only the trees inside it), so
 * phones get trees at desktop size rather than the whole band shrunk to fit.
 */
export function PineForest({
  band,
  className,
  cropOnMobile = false,
}: {
  band: ForestBandId
  className?: string
  cropOnMobile?: boolean
}) {
  const cfg = FOREST_BANDS[band]
  const paths = BAND_PATHS[band]
  const baseClassName =
    className ?? `absolute bottom-0 left-0 w-full ${cfg.fillClassName}`

  if (!cropOnMobile) {
    return (
      <svg
        viewBox={`0 0 800 ${cfg.viewBoxHeight}`}
        className={baseClassName}
        aria-hidden="true"
      >
        <path d={paths.full} />
      </svg>
    )
  }

  return (
    <>
      <svg
        viewBox={`${MOBILE_VIEW.x} 0 ${MOBILE_VIEW.width} ${cfg.viewBoxHeight}`}
        className={cn(baseClassName, 'sm:hidden')}
        aria-hidden="true"
      >
        <path d={paths.mobile} />
      </svg>
      <svg
        viewBox={`0 0 800 ${cfg.viewBoxHeight}`}
        className={cn(baseClassName, 'hidden sm:block')}
        aria-hidden="true"
      >
        <path d={paths.full} />
      </svg>
    </>
  )
}
