'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useId, useRef, useState } from 'react'

export interface FluidLevelGaugeProps {
  /** Fill level, 0-100. */
  value: number
  /** Diameter in px. */
  size?: number
  /** Outer ring thickness in px. */
  strokeWidth?: number
  fillColor?: string
  fillColorLight?: string
  trackColor?: string
  /** Fill animation duration in ms. */
  duration?: number
  label?: string
  showValue?: boolean
  className?: string
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

// One wave period (100 local units) built from mirrored quadratic curves,
// extended down to y=300 so it fully covers the circle once translated to y=0.
const WAVE_PATH = 'M-100,4 Q-75,8 -50,4 T0,4 T100,4 T200,4 T300,4 T400,4 V300 H-100 Z'
const VIEWBOX_SIZE = 200

export function FluidLevelGauge({
  value,
  size = 160,
  strokeWidth = 6,
  fillColor = '#008C95',
  fillColorLight = '#5FC7CC',
  trackColor = '#E5E7EB',
  duration = 1800,
  label,
  showValue = true,
  className,
}: FluidLevelGaugeProps) {
  const target = Math.min(100, Math.max(0, value))
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimatedRef = useRef(false)
  const [displayValue, setDisplayValue] = useState(0)
  const gradientId = useId()
  const clipId = useId()

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(target)
      return
    }

    const runFill = () => {
      if (hasAnimatedRef.current) return
      hasAnimatedRef.current = true
      const start = performance.now()

      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration)
        setDisplayValue(target * easeOutCubic(progress))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) runFill()
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration])

  const radius = VIEWBOX_SIZE / 2 - strokeWidth
  const center = VIEWBOX_SIZE / 2
  const fillY = VIEWBOX_SIZE - (displayValue / 100) * VIEWBOX_SIZE

  return (
    <div
      ref={containerRef}
      data-slot="fluid-level-gauge"
      className={cn('inline-flex flex-col items-center gap-3', className)}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} width={size} height={size} className="block">
          <defs>
            <clipPath id={clipId}>
              <circle cx={center} cy={center} r={radius} />
            </clipPath>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fillColorLight} />
              <stop offset="100%" stopColor={fillColor} />
            </linearGradient>
          </defs>

          <circle cx={center} cy={center} r={radius} fill={trackColor} />

          <g clipPath={`url(#${clipId})`}>
            <g style={{ transform: `translateY(${fillY}px)` }}>
              <path
                d={WAVE_PATH}
                fill={`url(#${gradientId})`}
                opacity={0.5}
                className="animate-fluid-wave-back"
              />
              <path d={WAVE_PATH} fill={`url(#${gradientId})`} className="animate-fluid-wave-front" />
            </g>
          </g>

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={fillColor}
            strokeWidth={strokeWidth}
            opacity={0.35}
          />
        </svg>

        {showValue && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="font-bold text-[#001529]"
              style={{ fontSize: size * 0.2 }}
            >
              {Math.round(displayValue)}%
            </span>
          </div>
        )}
      </div>

      {label && <span className="text-sm text-[#4B5563]">{label}</span>}
    </div>
  )
}
