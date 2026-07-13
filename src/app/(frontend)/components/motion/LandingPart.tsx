'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import React from 'react'

import { DURATION, EASE_OUT, REVEAL_VIEWPORT } from './config'

export interface LandingPartProps {
  delay?: number
  image?: boolean
  children: React.ReactNode
  className?: string
}

/** Scroll-triggered fade/slide (and optional scale for images) used by card grids. */
export function LandingPart({ delay = 0, image = false, children, className }: LandingPartProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const motionProps: HTMLMotionProps<'div'> = {
    initial: { opacity: 0, y: image ? 24 : 20, ...(image ? { scale: 0.96 } : {}) },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: REVEAL_VIEWPORT,
    transition: {
      duration: image ? DURATION.slow : DURATION.base,
      ease: EASE_OUT,
      delay,
    },
    className,
  }

  return <motion.div {...motionProps}>{children}</motion.div>
}
