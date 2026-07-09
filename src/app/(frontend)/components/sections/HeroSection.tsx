'use client'

import { cn } from '@/utilities/ui'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GravityWaveBackground } from '@/app/(frontend)/components/shared/GravityWaveBackground'
import { DURATION, EASE_OUT, STAGGER_CHILDREN } from '@/app/(frontend)/components/motion/config'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
import { TypewriterText } from '@/app/(frontend)/components/motion/TypewriterText'
import { useCursorParallax } from '@/app/(frontend)/components/motion/useCursorParallax'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  NAVY_GRADIENT_CTA_STYLE,
  TEAL_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'

export interface HeroCTA {
  label: string
  href: string
}

export interface HeroSectionProps {
  title: string
  subtitle: string | string[]
  primaryCTA?: HeroCTA
  secondaryCTA?: HeroCTA
  /** A single image, or a collection to rotate through as a crossfade slideshow. Omit for text-only heroes. */
  backgroundImage?: string | string[]
  /** Time each image stays on screen before crossfading to the next, in ms. */
  backgroundImageInterval?: number
  showPattern?: boolean
  /** RGB triplet used for the background pattern's particle color, e.g. "12,27,58". Only used when `patternVariant="solid"`. */
  patternColor?: string
  /** "aurora" (default) is the flowing brand-colored gradient effect. "solid" uses a single flat `patternColor`. */
  patternVariant?: 'solid' | 'aurora'
  /** How quickly the background pattern chases the pointer. Lower = slower, more delayed reaction. */
  patternFollowSpeed?: number
  /** Damping applied to the pattern's follow velocity each frame (0-1). Higher = more glide/inertia. */
  patternFollowDamping?: number
  imageClassName?: string
  align?: 'left' | 'center'
  /** Figma display heading — Nunito Sans 56.69px / 61.42px line-height */
  titleVariant?: 'default' | 'display'
}

// `GravityWaveBackground`'s canvas sizes itself off its parent element's box, so pinning it to
// the Figma-exact 876x602 box (rather than filling the whole hero) requires a positioned wrapper
// for the canvas to measure against, instead of sizing the canvas element directly.
function HeroPattern({
  titleVariant,
  patternColor,
  patternVariant,
  patternFollowSpeed,
  patternFollowDamping,
}: {
  titleVariant: 'default' | 'display'
  patternColor?: string
  patternVariant?: 'solid' | 'aurora'
  patternFollowSpeed: number
  patternFollowDamping: number
}) {
  if (titleVariant === 'display') {
    return (
      <div className="pointer-events-none absolute top-[11px] left-[-84px] z-0 h-[602px] w-[876px] opacity-50">
        <GravityWaveBackground
          className="h-full w-full"
          particleColor={patternColor}
          variant={patternVariant}
          followSpeed={patternFollowSpeed}
          followDamping={patternFollowDamping}
        />
      </div>
    )
  }

  return (
    <GravityWaveBackground
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      particleColor={patternColor}
      variant={patternVariant}
      followSpeed={patternFollowSpeed}
      followDamping={patternFollowDamping}
    />
  )
}

const ctaBaseClassName =
  'inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90'

// Figma-exact CTA styling used by the "display" hero (homepage). See gradientCta.ts.
const displayCtaBaseClassName = cn(GRADIENT_CTA_BASE_CLASSNAME, 'lg:h-[50px]')
const displayPrimaryCtaStyle = TEAL_GRADIENT_CTA_STYLE
const displaySecondaryCtaStyle = NAVY_GRADIENT_CTA_STYLE

/**
 * The "display" hero (homepage): types the title out, then each subtitle paragraph in turn,
 * then reveals the CTAs — instead of the scroll-triggered fade-up used by the default hero.
 */
function DisplayHeroCopy({
  titleLines,
  subtitleParagraphs,
  showCTAs,
  isCentered,
  primaryCTA,
  secondaryCTA,
}: {
  titleLines: string[]
  subtitleParagraphs: string[]
  showCTAs: boolean
  isCentered: boolean
  primaryCTA?: HeroCTA
  secondaryCTA?: HeroCTA
}) {
  const totalSegments = 1 + subtitleParagraphs.length
  const [doneCount, setDoneCount] = useState(0)
  const advance = useCallback(() => setDoneCount((count) => count + 1), [])
  const ctasReady = doneCount >= totalSegments

  return (
    <div className="relative z-10 w-full text-center lg:text-left">
      <TypewriterText
        as="h1"
        lines={titleLines}
        speed={30}
        onDone={advance}
        className="mx-auto text-[clamp(2rem,5vw,56.69px)] font-normal leading-[1.084] tracking-normal text-[#13181D] lg:mx-0 lg:max-w-[573px] lg:text-[56.69px] lg:leading-[61.42px]"
      />
      {subtitleParagraphs.map((paragraph, index) => (
        <TypewriterText
          key={index}
          as="p"
          lines={[paragraph]}
          start={doneCount >= index + 1}
          speed={18}
          onDone={advance}
          className={cn(
            index === 0 ? 'mt-4' : 'mt-3',
            'text-center text-[20px] font-semibold leading-none tracking-normal text-black lg:text-start',
          )}
        />
      ))}
      {showCTAs && (
        <div
          className={cn(
            'mt-8 flex flex-col gap-2.5 font-semibold transition-all duration-500 ease-out sm:flex-row sm:flex-wrap',
            'items-center justify-center lg:items-start lg:justify-start',
            isCentered && 'lg:items-center lg:justify-center',
            ctasReady ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
          )}
        >
          {primaryCTA && (
            <Link
              href={primaryCTA.href}
              className={cn(displayCtaBaseClassName, 'lg:w-[256px]')}
              style={displayPrimaryCtaStyle}
            >
              {primaryCTA.label}
            </Link>
          )}
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className={cn(displayCtaBaseClassName, 'lg:w-[173px]')}
              style={displaySecondaryCtaStyle}
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export function HeroSection({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundImageInterval = 5000,
  showPattern = true,
  patternColor,
  patternVariant,
  patternFollowSpeed = 0.005,
  patternFollowDamping = 0.95,
  imageClassName,
  align = 'left',
  titleVariant = 'default',
}: HeroSectionProps) {
  const titleLines = title
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  const subtitleParagraphs = (Array.isArray(subtitle) ? subtitle : [subtitle]).filter(Boolean)
  const showCTAs = primaryCTA || secondaryCTA
  const isCentered = align === 'center'
  const hasImage = backgroundImage != null && backgroundImage !== ''
  const backgroundImages = useMemo(() => {
    if (!hasImage) return []
    return Array.isArray(backgroundImage) ? backgroundImage : [backgroundImage]
  }, [backgroundImage, hasImage])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)
  const parallax = useCursorParallax(gridRef, { range: 8 })

  useEffect(() => {
    setActiveImageIndex(0)
    if (backgroundImages.length <= 1) return

    const id = setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % backgroundImages.length)
    }, backgroundImageInterval)

    return () => clearInterval(id)
  }, [backgroundImages, backgroundImageInterval])

  return (
    <section className="relative overflow-hidden bg-white">
      {showPattern && !hasImage && (
        <HeroPattern
          titleVariant={titleVariant}
          patternColor={patternColor}
          patternVariant={patternVariant}
          patternFollowSpeed={patternFollowSpeed}
          patternFollowDamping={patternFollowDamping}
        />
      )}
      <div
        className={cn(
          'container relative z-10',
          hasImage ? 'py-10 md:py-14 lg:py-16' : 'py-12 md:py-16 lg:py-20',
        )}
      >
        <div
          ref={gridRef}
          onPointerMove={hasImage ? parallax.onPointerMove : undefined}
          onPointerLeave={hasImage ? parallax.onPointerLeave : undefined}
          className={cn(
            'grid grid-cols-1 gap-1',
            hasImage ? 'items-stretch lg:grid-cols-2 lg:gap-1' : 'items-center',
            !hasImage && isCentered && 'justify-items-center',
          )}
        >
          <div
            className={cn(
              'relative flex h-full w-full',
              hasImage
                ? 'items-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12'
                : 'items-center',
              !hasImage && isCentered && 'mx-auto max-w-3xl justify-center',
              !hasImage && !isCentered && 'max-w-3xl',
              isCentered && 'text-center',
            )}
          >
            {showPattern && hasImage && (
              <HeroPattern
                titleVariant={titleVariant}
                patternColor={patternColor}
                patternVariant={patternVariant}
                patternFollowSpeed={patternFollowSpeed}
                patternFollowDamping={patternFollowDamping}
              />
            )}
            {titleVariant === 'display' ? (
              <DisplayHeroCopy
                titleLines={titleLines}
                subtitleParagraphs={subtitleParagraphs}
                showCTAs={Boolean(showCTAs)}
                isCentered={isCentered}
                primaryCTA={primaryCTA}
                secondaryCTA={secondaryCTA}
              />
            ) : (
              <StaggerGroup
                as="div"
                staggerChildren={STAGGER_CHILDREN}
                className="relative z-10 w-full"
              >
                <StaggerItem
                  as="h1"
                  className="text-3xl font-normal leading-tight text-[#001529] sm:text-4xl lg:text-5xl"
                >
                  {titleLines.map((line, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </StaggerItem>
                {subtitleParagraphs.map((paragraph, index) => (
                  <StaggerItem
                    as="p"
                    key={index}
                    className={cn(
                      index === 0 ? 'mt-4' : 'mt-3',
                      'text-base text-[#4B5563] sm:text-lg',
                      isCentered ? 'font-normal leading-relaxed' : 'font-semibold',
                    )}
                  >
                    {paragraph}
                  </StaggerItem>
                ))}
                {showCTAs && (
                  <StaggerItem
                    as="div"
                    className={cn(
                      'mt-8 flex flex-col gap-4 font-semibold sm:flex-row sm:flex-wrap',
                      isCentered && 'items-center justify-center',
                    )}
                  >
                    {primaryCTA && (
                      <Link
                        href={primaryCTA.href}
                        className={cn(
                          ctaBaseClassName,
                          'bg-gradient-to-r from-[#004B4D] to-[#008C95]',
                        )}
                      >
                        {primaryCTA.label}
                      </Link>
                    )}
                    {secondaryCTA && (
                      <Link
                        href={secondaryCTA.href}
                        className={cn(ctaBaseClassName, 'bg-[#001529]')}
                      >
                        {secondaryCTA.label}
                      </Link>
                    )}
                  </StaggerItem>
                )}
              </StaggerGroup>
            )}
          </div>

          {hasImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: DURATION.slow,
                ease: EASE_OUT,
                delay: titleVariant === 'display' ? 0.2 : 0,
              }}
              className={cn(
                'relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto',
                titleVariant === 'display'
                  ? 'lg:-mt-[7px] lg:aspect-[707/566] lg:max-w-[707px] lg:min-h-0'
                  : 'lg:min-h-[420px]',
              )}
            >
              <motion.div style={{ x: parallax.x, y: parallax.y }} className="relative h-full w-full">
                {backgroundImages.map((src, index) => (
                  <motion.img
                    key={src}
                    alt=""
                    role="presentation"
                    src={src}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    decoding="async"
                    initial={false}
                    animate={{
                      opacity: index === activeImageIndex ? 1 : 0,
                      scale: index === activeImageIndex ? 1 : 1.03,
                    }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className={cn('absolute inset-0 h-full w-full object-cover', imageClassName)}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
