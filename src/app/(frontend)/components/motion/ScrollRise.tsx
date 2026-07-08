'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'framer-motion'
import React, { useRef } from 'react'

export interface ScrollRiseProps extends Omit<
  HTMLMotionProps<'div'>,
  'style' | 'ref' | 'children'
> {
  children?: React.ReactNode
  /** How far below (px) the element starts, before rising into place as you scroll it into view. */
  distance?: number
  /** Starting scale before it settles at 1. Set to 1 to disable the scale-up. */
  fromScale?: number
  /**
   * Framer `useScroll` offset pair: when scroll progress is 0 vs 1, expressed as
   * "<element edge> <viewport edge>". Defaults to animating from the moment the element's top
   * enters the bottom of the viewport, to when it nears the vertical center.
   */
  offset?: [string, string]
  /** Set to false to snap 1:1 to raw scroll position instead of easing fluidly behind it. */
  smooth?: boolean
}

/**
 * Ties the element's entrance directly to scroll position — scrubbed, not a one-shot
 * viewport-triggered animation — so it feels like it's physically rising up off the bottom of
 * the screen as you scroll, à la the scroll-linked reveals on sites like antigravity.google.
 */
export function ScrollRise({
  distance = 140,
  fromScale = 0.38,
  offset = ['start 100%', 'start 45%'],
  smooth = true,
  children,
  ...rest
}: ScrollRiseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
  })

  // Smooths the raw, jumpy scroll-progress value into a fluid trailing motion (like a
  // slightly-lagging spring) instead of snapping 1:1 to every scroll-wheel/trackpad tick.
  const fluidProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    mass: 0.8,
    restDelta: 0.0005,
  })
  const progress = smooth ? fluidProgress : scrollYProgress

  const y = useTransform(progress, [0, 1], [distance, 0])
  const opacity = useTransform(progress, [0, 0.2], [0, 1])
  const scale = useTransform(progress, [0, 1], [fromScale, 1])

  if (prefersReducedMotion) {
    return (
      <div ref={ref} {...(rest as Record<string, unknown>)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} {...rest}>
      {children}
    </motion.div>
  )
}
