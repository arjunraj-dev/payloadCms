'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

export interface CounterProps {
  value: number
  duration?: number
  formatter?: (value: number) => string
  className?: string
}

/** Animated count-up from 0 to value, triggered once the element scrolls into view. */
export function Counter({ value, duration = 1.8, formatter, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(latest),
    })

    return () => controls.stop()
  }, [isInView, prefersReducedMotion, value, duration])

  const rounded = Math.round(displayValue)

  return (
    <span ref={ref} className={className}>
      {formatter ? formatter(rounded) : rounded.toLocaleString()}
    </span>
  )
}
