'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import React from 'react'

import { DURATION, EASE_OUT, REVEAL_DISTANCE, REVEAL_VIEWPORT, STAGGER_CHILDREN } from './config'

export interface StaggerGroupProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'viewport'> {
  as?: keyof typeof motion
  staggerChildren?: number
  once?: boolean
}

/** Wraps a card grid/list container; children should be <StaggerItem>. */
export function StaggerGroup({
  as = 'div',
  staggerChildren = STAGGER_CHILDREN,
  once = true,
  children,
  ...rest
}: StaggerGroupProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[as] as React.ComponentType<HTMLMotionProps<'div'>>

  if (prefersReducedMotion) {
    const Tag = as as React.ElementType
    return <Tag {...(rest as Record<string, unknown>)}>{children}</Tag>
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ ...REVEAL_VIEWPORT, once }}
      variants={{ visible: { transition: { staggerChildren } } }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial'> {
  as?: keyof typeof motion
  /** When true, items also scale up slightly as they enter. */
  withScale?: boolean
}

export function StaggerItem({ as = 'div', withScale = false, children, ...rest }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[as] as React.ComponentType<HTMLMotionProps<'div'>>

  if (prefersReducedMotion) {
    const Tag = as as React.ElementType
    return <Tag {...(rest as Record<string, unknown>)}>{children}</Tag>
  }

  return (
    <MotionTag
      variants={{
        hidden: {
          opacity: 0,
          y: REVEAL_DISTANCE,
          ...(withScale ? { scale: 0.96 } : {}),
        },
        visible: {
          opacity: 1,
          y: 0,
          ...(withScale ? { scale: 1 } : {}),
          transition: { duration: DURATION.base, ease: EASE_OUT },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
