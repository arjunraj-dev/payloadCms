'use client'

import React, { useEffect, useRef } from 'react'

export interface GravityWaveBackgroundProps {
  className?: string
  /** RGB triplet used for the particle color, e.g. "12,27,58" */
  particleColor?: string
}

/**
 * Animated particle wave background (ported from a canvas-based prototype).
 * Renders a grid of particles distorted into a rolling wave surface that
 * gently follows the pointer. Purely decorative, so it's hidden from
 * assistive tech and skipped entirely for users who prefer reduced motion.
 */
export function GravityWaveBackground({
  className,
  particleColor = '12,27,58',
}: GravityWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return

    const context = canvas.getContext('2d')
    if (!context) return
    const ctx = context

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const meshWidth = 2000
    const meshHeight = 640
    const gridCols = 72
    const gridRows = 48
    const waveAmplitude = 132
    const followSpeed = 0.012
    const followDamping = 0.91

    let width = 0
    let height = 0
    let time = 0
    let rafId = 0

    type Particle = { u: number; v: number; phase: number }
    type DrawPoint = { x: number; y: number; radius: number; alpha: number; depth: number }

    const particles: Particle[] = []
    const drawBuffer: DrawPoint[] = []

    const group = { x: 0, y: 0, vx: 0, vy: 0, anchorX: 0, anchorY: 0 }
    const mouse = { x: -1, y: -1 }

    function initParticles() {
      particles.length = 0
      group.anchorX = width * 0.36
      group.anchorY = height * 0.5
      group.x = group.anchorX
      group.y = group.anchorY
      group.vx = 0
      group.vy = 0

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          particles.push({
            u: col / (gridCols - 1),
            v: row / (gridRows - 1),
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    function resize() {
      if (!canvas || !container) return
      width = container.clientWidth
      height = container.clientHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      initParticles()
    }

    function sampleSurface(u: number, v: number, t: number, phase: number) {
      const waveA = Math.sin(u * Math.PI * 3.4 + t * 0.38) * Math.cos(v * Math.PI * 2.6 - t * 0.28)
      const waveB = Math.sin(u * 5.8 + v * 4.2 + t * 0.52 + phase * 0.15) * 0.62
      const waveC = Math.cos(u * Math.PI * 2.2 - v * Math.PI * 3.8 + t * 0.22) * 0.45
      const ripple = Math.sin(u * 11 - t * 0.95 + v * 5 + phase) * 0.18

      const h = (waveA + waveB + waveC + ripple) * waveAmplitude

      const dx =
        Math.cos(u * Math.PI * 3.4 + t * 0.38) *
        Math.PI *
        3.4 *
        Math.cos(v * Math.PI * 2.6 - t * 0.28) *
        waveAmplitude

      const dy =
        -Math.sin(u * Math.PI * 3.4 + t * 0.38) *
        Math.sin(v * Math.PI * 2.6 - t * 0.28) *
        Math.PI *
        2.6 *
        waveAmplitude

      const slope = Math.min(1, Math.hypot(dx, dy) / (waveAmplitude * 4.5))

      return { height: h, slope }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height)
      drawBuffer.length = 0

      for (const p of particles) {
        const gx = (p.u - 0.5) * meshWidth
        const gy = (p.v - 0.5) * meshHeight

        const surface = sampleSurface(p.u, p.v, time, p.phase)
        const h = surface.height
        const slope = surface.slope

        const perspX = gx + h * 0.12 * Math.sin(p.v * Math.PI)
        const perspY = gy + h * 0.78
        const microRipple = Math.sin(p.u * 14 - time * 1.1 + p.phase) * 1.2

        const x = group.x + perspX + microRipple
        const y = group.y + perspY

        const edgeFade = Math.sin(p.u * Math.PI) * Math.sin(p.v * Math.PI) * (0.55 + slope * 0.45)
        const crest = (h / waveAmplitude + 1) * 0.5
        const radius = 1.2 + crest * 0.58 + slope * 0.32
        const alpha = (0.065 + crest * 0.085 + slope * 0.06) * edgeFade

        drawBuffer.push({ x, y, radius, alpha, depth: h })
      }

      drawBuffer.sort((a, b) => a.depth - b.depth)

      for (const d of drawBuffer) {
        if (d.alpha < 0.01) continue
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor},${d.alpha})`
        ctx.fill()
      }
    }

    function animate() {
      rafId = requestAnimationFrame(animate)

      const mouseActive = mouse.x >= 0 && mouse.y >= 0
      const targetX = mouseActive ? mouse.x : group.anchorX
      const targetY = mouseActive ? mouse.y : group.anchorY
      const stiffness = mouseActive ? followSpeed : followSpeed * 0.55

      group.vx += (targetX - group.x) * stiffness
      group.vy += (targetY - group.y) * stiffness
      group.vx *= followDamping
      group.vy *= followDamping
      group.x += group.vx
      group.y += group.vy

      drawFrame()
      time += 0.016
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        mouse.x = -1
        mouse.y = -1
        return
      }
      mouse.x = x
      mouse.y = y
    }

    function handlePointerLeave() {
      mouse.x = -1
      mouse.y = -1
    }

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(container)
    resize()

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)

    if (!prefersReducedMotion) {
      animate()
    } else {
      drawFrame()
    }

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [particleColor])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
