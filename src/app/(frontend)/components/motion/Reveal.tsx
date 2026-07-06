'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import React from 'react'

import { DURATION, EASE_OUT, REVEAL_DISTANCE, REVEAL_VIEWPORT } from './config'

type RevealVariant = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right'

const OFFSETS: Record<RevealVariant, { x?: number; y?: number }> = {
  'fade-up': { y: REVEAL_DISTANCE },
  'fade-in': {},
  'fade-left': { x: REVEAL_DISTANCE },
  'fade-right': { x: -REVEAL_DISTANCE },
}

export interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'viewport'> {
  as?: keyof typeof motion
  variant?: RevealVariant
  delay?: number
  once?: boolean
}

/** Fade/slide entrance triggered once an element scrolls into view. Skips to final state under prefers-reduced-motion. */
export function Reveal({
  as = 'div',
  variant = 'fade-up',
  delay = 0,
  once = true,
  children,
  ...rest
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[as] as React.ComponentType<HTMLMotionProps<'div'>>
  const offset = OFFSETS[variant]

  if (prefersReducedMotion) {
    const Tag = as as React.ElementType
    return <Tag {...(rest as Record<string, unknown>)}>{children}</Tag>
  }

  return (
    <MotionTag
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ ...REVEAL_VIEWPORT, once }}
      transition={{ duration: DURATION.base, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
