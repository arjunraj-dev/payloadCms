export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const DURATION = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
} as const

export const REVEAL_DISTANCE = 24
export const REVEAL_VIEWPORT = { once: true, margin: '-80px' } as const

export const STAGGER_CHILDREN = 0.08

/** Milliseconds per character — higher = slower typing, lower = faster. */
export const TYPEWRITER_SPEED = {
  /** Centered page heroes (About, Updates, Get Involved, Contact, Progress). */
  hero: 32,
  /** Homepage display hero title. */
  displayTitle: 68,
  /** Homepage display hero subtitle paragraphs. */
  displaySubtitle: 40,
} as const
