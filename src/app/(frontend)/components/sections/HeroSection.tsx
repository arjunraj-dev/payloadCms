'use client'

import { cn } from '@/utilities/ui'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { GravityWaveBackground } from '@/app/(frontend)/components/shared/GravityWaveBackground'
import { STAGGER_CHILDREN } from '@/app/(frontend)/components/motion/config'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
import { useCursorParallax } from '@/app/(frontend)/components/motion/useCursorParallax'

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

// Figma-exact CTA styling used by the "display" hero (homepage): gradient fill + gradient border,
// achieved via the padding-box/border-box double-background trick since `border-image` gradients
// aren't reliable on interactive elements across browsers.
const displayCtaBaseClassName =
  'inline-flex items-center justify-center gap-2.5 rounded-md px-[18px] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:h-[50px]'

const displayPrimaryCtaStyle: React.CSSProperties = {
  border: '1px solid transparent',
  backgroundImage:
    'linear-gradient(90deg, #0C3538 0%, #0F848D 35.56%, #169EA9 49.52%, #169EA9 53.78%, #0F848D 64.92%, #0C3538 100%), linear-gradient(90deg, #08747D 0%, #67B5BB 48.08%, #08747D 100%)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
}

const displaySecondaryCtaStyle: React.CSSProperties = {
  border: '1px solid transparent',
  backgroundImage:
    'linear-gradient(90deg, #0D1B2A 0%, #0D1B2A 0%, #22364D 49.52%, #22364D 53.78%, #293C51 64.92%, #0D1B2A 100%), linear-gradient(90deg, #1F344C 0%, #587799 48.08%, #1F344C 100%)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
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
            <StaggerGroup
              as="div"
              staggerChildren={STAGGER_CHILDREN}
              className="relative z-10 w-full"
            >
              <StaggerItem as="h1"
                className={cn(
                  titleVariant === 'display'
                    ? 'text-[clamp(2rem,5vw,56.69px)] font-normal leading-[1.084] tracking-normal text-[#13181D] lg:max-w-[573px] lg:text-[56.69px] lg:leading-[61.42px]'
                    : 'text-3xl font-normal leading-tight text-[#001529] sm:text-4xl lg:text-5xl',
                )}
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
                    titleVariant === 'display'
                      ? 'text-center text-[20px] font-semibold leading-none tracking-normal text-black'
                      : cn(
                          'text-base text-[#4B5563] sm:text-lg',
                          isCentered ? 'font-normal leading-relaxed' : 'font-semibold',
                        ),
                  )}
                >
                  {paragraph}
                </StaggerItem>
              ))}
              {showCTAs && (
                <StaggerItem
                  as="div"
                  className={cn(
                    'mt-8 flex flex-col font-semibold sm:flex-row sm:flex-wrap',
                    titleVariant === 'display' ? 'gap-2.5' : 'gap-4',
                    isCentered && 'items-center justify-center',
                  )}
                >
                  {primaryCTA &&
                    (titleVariant === 'display' ? (
                      <Link
                        href={primaryCTA.href}
                        className={cn(displayCtaBaseClassName, 'lg:w-[256px]')}
                        style={displayPrimaryCtaStyle}
                      >
                        {primaryCTA.label}
                      </Link>
                    ) : (
                      <Link
                        href={primaryCTA.href}
                        className={cn(
                          ctaBaseClassName,
                          'bg-gradient-to-r from-[#004B4D] to-[#008C95]',
                        )}
                      >
                        {primaryCTA.label}
                      </Link>
                    ))}
                  {secondaryCTA &&
                    (titleVariant === 'display' ? (
                      <Link
                        href={secondaryCTA.href}
                        className={cn(displayCtaBaseClassName, 'lg:w-[173px]')}
                        style={displaySecondaryCtaStyle}
                      >
                        {secondaryCTA.label}
                      </Link>
                    ) : (
                      <Link
                        href={secondaryCTA.href}
                        className={cn(ctaBaseClassName, 'bg-[#001529]')}
                      >
                        {secondaryCTA.label}
                      </Link>
                    ))}
                </StaggerItem>
              )}
            </StaggerGroup>
          </div>

          {hasImage && (
            <motion.div
              style={{ x: parallax.x, y: parallax.y }}
              className={cn(
                'relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto',
                titleVariant === 'display'
                  ? 'lg:-mt-[7px] lg:aspect-[707/566] lg:max-w-[707px] lg:min-h-0'
                  : 'lg:min-h-[420px]',
              )}
            >
              {backgroundImages.map((src, index) => (
                <motion.img
                  key={src}
                  alt=""
                  role="presentation"
                  src={src}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  decoding="async"
                  animate={{
                    opacity: index === activeImageIndex ? 1 : 0,
                    scale: index === activeImageIndex ? 1 : 1.03,
                  }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className={cn('absolute inset-0 h-full w-full object-cover', imageClassName)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
