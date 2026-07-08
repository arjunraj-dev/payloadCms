'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import React from 'react'

import { cn } from '@/utilities/ui'
import { DURATION, EASE_OUT, REVEAL_VIEWPORT } from './config'

export interface DrawLineProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'viewport'> {
  delay?: number
}

/** A horizontal divider that "draws" itself in left-to-right once scrolled into view. */
export function DrawLine({ className, delay = 0, ...rest }: DrawLineProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className} />
  }

  return (
    <motion.div
      className={cn('origin-left', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: DURATION.slow, ease: EASE_OUT, delay }}
      {...rest}
    />
  )
}
