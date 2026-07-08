'use client'

import { useReducedMotion } from 'framer-motion'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

export interface TypewriterTextProps {
  /** Rendered as separate lines joined by <br />. */
  lines: string[]
  /** Milliseconds per character. */
  speed?: number
  /** Delay (ms) before typing begins. */
  startDelay?: number
  /** Typing only begins once this is true; nothing is typed while false. */
  start?: boolean
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
  speed = 26,
  startDelay = 0,
  start = true,
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

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedLength(fullText.length)
      if (!hasFinishedRef.current) {
        hasFinishedRef.current = true
        onDoneRef.current?.()
      }
      return
    }

    if (!start) {
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
      const nextLength = Math.min(fullText.length, Math.floor(elapsed / speed) + 1)
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
  }, [fullText, speed, startDelay, start, prefersReducedMotion])

  const isTyping = start && !prefersReducedMotion && typedLength < fullText.length
  const typedLines = fullText.slice(0, typedLength).split('\n')
  const Tag = as as React.ElementType

  return (
    <Tag className={className}>
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
              '-mb-1 ml-0.5 inline-block h-[0.9em] w-[2px] animate-pulse bg-current align-middle',
              cursorClassName,
            )}
          />
        )}
      </span>
      <span className="sr-only">{fullText}</span>
    </Tag>
  )
}
