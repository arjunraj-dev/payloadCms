'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import React, { type PointerEvent } from 'react'

const MAX_TILT_DEG = 3
const LIFT_PX = 4

export interface TiltCardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
  > {
  children: React.ReactNode
}

/** Restrained pointer-based tilt + lift for card hover. Degrades to a plain div under prefers-reduced-motion. */
export function TiltCard({ children, className, ...rest }: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [MAX_TILT_DEG, -MAX_TILT_DEG]), {
    stiffness: 300,
    damping: 25,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-MAX_TILT_DEG, MAX_TILT_DEG]), {
    stiffness: 300,
    damping: 25,
  })

  if (prefersReducedMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left) / bounds.width - 0.5)
    y.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const handlePointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -LIFT_PX }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
