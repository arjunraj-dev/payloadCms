'use client'

import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useCallback, type PointerEvent, type RefObject } from 'react'

export interface UseCursorParallaxOptions {
  /** Max translation in px in either direction. Keep small for a subtle effect. */
  range?: number
}

/** Spring-smoothed pointer parallax. Returns motion values to bind to x/y transforms, plus pointer handlers. Returns nulls (no-op) under prefers-reduced-motion. */
export function useCursorParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { range = 8 }: UseCursorParallaxOptions = {},
) {
  const prefersReducedMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.5 })

  const onPointerMove = useCallback(
    (event: PointerEvent<T>) => {
      if (prefersReducedMotion) return
      const bounds = ref.current?.getBoundingClientRect()
      if (!bounds) return
      const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5
      const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5
      rawX.set(relativeX * range * 2)
      rawY.set(relativeY * range * 2)
    },
    [prefersReducedMotion, range, ref, rawX, rawY],
  )

  const onPointerLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { x: prefersReducedMotion ? undefined : x, y: prefersReducedMotion ? undefined : y, onPointerMove, onPointerLeave }
}
