'use client'

import { useInView, useReducedMotion } from 'framer-motion'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'
import { TYPEWRITER_SPEED } from './config'

export interface TypewriterTextProps {
  /** Rendered as separate lines joined by <br />. */
  lines: string[]
  /** Milliseconds per character. */
  speed?: number
  /** Delay (ms) before typing begins. */
  startDelay?: number
  /** Typing only begins once this is true; nothing is typed while false. */
  start?: boolean
  /**
   * If true, typing also waits until the element has scrolled into view (in addition to
   * `start`). Use this for below-the-fold copy so it doesn't type out before it's visible.
   */
  startOnView?: boolean
  /** `useInView` margin, only used when `startOnView` is true. */
  viewMargin?: string
  onDone?: () => void
  className?: string
  cursorClassName?: string
  as?: 'h1' | 'h2' | 'p' | 'span' | 'div'
}

/**
 * Types out `lines` character-by-character with a blinking caret, then calls `onDone`.
 * Falls back to rendering the full text instantly when the user prefers reduced motion.
 * The full text is always present for assistive tech via a visually-hidden node, since the
 * animated text is marked `aria-hidden`.
 */
export function TypewriterText({
  lines,
  speed = TYPEWRITER_SPEED.hero,
  startDelay = 0,
  start = true,
  startOnView = false,
  viewMargin = '-80px',
  onDone,
  className,
  cursorClassName,
  as = 'span',
}: TypewriterTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const fullText = useMemo(() => lines.join('\n'), [lines])
  const [typedLength, setTypedLength] = useState(0)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const hasFinishedRef = useRef(false)
  const containerRef = useRef<HTMLElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(containerRef as any, { once: true, margin: viewMargin as any })
  const shouldStart = start && (!startOnView || isInView)

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedLength(fullText.length)
      if (!hasFinishedRef.current) {
        hasFinishedRef.current = true
        onDoneRef.current?.()
      }
      return
    }

    if (!shouldStart) {
      setTypedLength(0)
      return
    }

    hasFinishedRef.current = false
    setTypedLength(0)
    let rafId = 0
    let cancelled = false
    const startTime = performance.now() + startDelay

    const tick = (now: number) => {
      if (cancelled) return
      const elapsed = now - startTime
      if (elapsed < 0) {
        rafId = requestAnimationFrame(tick)
        return
      }
      const totalDuration = Math.max(fullText.length * speed, speed)
      const rawProgress = Math.min(1, elapsed / totalDuration)
      // Ease-out so typing starts gently and settles smoothly at the end.
      const easedProgress = 1 - Math.pow(1 - rawProgress, 2.8)
      const nextLength = Math.min(fullText.length, Math.round(fullText.length * easedProgress))
      setTypedLength(nextLength)
      if (nextLength >= fullText.length) {
        if (!hasFinishedRef.current) {
          hasFinishedRef.current = true
          onDoneRef.current?.()
        }
        return
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [fullText, speed, startDelay, shouldStart, prefersReducedMotion])

  const isTyping = shouldStart && !prefersReducedMotion && typedLength < fullText.length
  const typedLines = fullText.slice(0, typedLength).split('\n')
  const Tag = as as React.ElementType

  return (
    <Tag ref={containerRef} className={className}>
      <span aria-hidden="true">
        {typedLines.map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
        {isTyping && (
          <span
            className={cn(
              '-mb-1 ml-0.5 inline-block h-[0.9em] w-[2px] animate-pulse bg-current align-middle opacity-80 [animation-duration:1.35s] [animation-timing-function:ease-in-out]',
              cursorClassName,
            )}
          />
        )}
      </span>
      <span className="sr-only">{fullText}</span>
    </Tag>
  )
}
