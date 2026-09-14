export type ForestBandId = 'mid' | 'near' | 'fore'

export type Tree = {
  x: number
  y: number
  scale: number
}

export type BandConfig = {
  seed: number
  count: number
  xRange: [number, number]
  viewBoxHeight: number
  yBase: number
  yJitter: number
  scaleRange: [number, number]
  fillClassName: string
}

// The horizontal slice of the 800-unit-wide mountain scene shown on phones
// (below `sm`). Squeezing all 800 units into a ~375px screen shrinks every
// ridge and tree to about a quarter of its desktop size, so small screens show
// the centre 200 units instead, at roughly desktop pixel scale (375px / 200 ≈
// 1.9px per unit, against 1440px / 800 = 1.8 on a laptop). Shared by the ridges
// and the forest bands so both crop to the same window.
export const MOBILE_VIEW = { x: 300, width: 200 } as const

// Three bands, from the distant treeline down to the foreground trees that
// frame the viewport. Colours follow the monochrome-blue atmospheric ramp:
// palest furthest away, dark navy closest. The dark ramp steps down from the
// ridges behind each band so every layer still separates at night.
export const FOREST_BANDS: Record<ForestBandId, BandConfig> = {
  mid: {
    seed: 1,
    count: 240,
    xRange: [-20, 820],
    viewBoxHeight: 180,
    yBase: 144,
    yJitter: 14,
    scaleRange: [0.1, 0.2],
    fillClassName: 'fill-[#5a7d99] dark:fill-[#142538]',
  },
  near: {
    seed: 2,
    count: 200,
    xRange: [-30, 830],
    viewBoxHeight: 240,
    yBase: 213,
    yJitter: 17,
    scaleRange: [0.16, 0.3],
    fillClassName: 'fill-[#3a5a78] dark:fill-[#0c1724]',
  },
  // The closest band: ~4x the tree count of the others and a tall `yJitter`
  // so trees stack over many implied rows rather than one line, making the
  // bottom of the entrance a solid mass of forest.
  fore: {
    seed: 3,
    count: 520,
    xRange: [-60, 860],
    viewBoxHeight: 260,
    yBase: 235,
    yJitter: 90,
    scaleRange: [0.3, 0.55],
    fillClassName: 'fill-[#1b2f4a] dark:fill-[#050a12]',
  },
}

// Deterministic PRNG (mulberry32) so the tree layout is identical on the
// server and the client — a bare Math.random() at render time would give a
// hydration mismatch.
function mulberry32(seed: number) {
  let s = seed
  return function random() {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Walks evenly-spaced x slots and jitters each tree within its slot, rather
// than sampling x uniformly at random — even jitter avoids the clumps and
// bald patches pure randomness gives at these densities. The jitter is wider
// than one slot (1.3x) so neighbours spill past each other and the treeline
// reads as an organic thicket instead of an evenly spaced picket fence.
export function buildBand(cfg: BandConfig): Tree[] {
  const rand = mulberry32(cfg.seed)
  const [xMin, xMax] = cfg.xRange
  const [scaleMin, scaleMax] = cfg.scaleRange
  const slotWidth = (xMax - xMin) / cfg.count

  const trees: Tree[] = []
  for (let i = 0; i < cfg.count; i++) {
    const slotCenter = xMin + slotWidth * (i + 0.5)
    const x = slotCenter + (rand() - 0.5) * slotWidth * 1.3
    const y = cfg.yBase + (rand() - 0.5) * cfg.yJitter
    const scale = scaleMin + rand() * (scaleMax - scaleMin)
    trees.push({ x, y, scale })
  }

  // Paint back-to-front: higher on screen (smaller y) is further away, so it
  // must be drawn first. Matters once `yJitter` is wide enough that trees at
  // different depths overlap.
  return trees.sort((a, b) => a.y - b.y)
}
