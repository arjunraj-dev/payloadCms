'use client'

import { cn } from '@/utilities/ui'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GravityWaveBackground } from '@/app/(frontend)/components/shared/GravityWaveBackground'
import { DURATION, EASE_OUT, STAGGER_CHILDREN, TYPEWRITER_SPEED } from '@/app/(frontend)/components/motion/config'
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
  titleVariant?: 'default' | 'display' | 'about' | 'getInvolved' | 'updates' | 'contact'
}

/** About hero: always two lines — CMS newline, or split after "Ministry." */
function getAboutTitleLines(title: string): [string, string] {
  const lines = title
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length >= 2) {
    return [lines[0], lines[1]]
  }

  if (lines.length === 1) {
    const ministryMatch = lines[0].match(/^(.+?Ministry\.)\s*(.+)$/i)
    if (ministryMatch) {
      return [ministryMatch[1], ministryMatch[2]]
    }

    const dotIndex = lines[0].indexOf('. ')
    if (dotIndex !== -1) {
      return [lines[0].slice(0, dotIndex + 1), lines[0].slice(dotIndex + 2)]
    }
  }

  return [lines[0] ?? title, '']
}

/** Homepage display title — forced 4 lines on narrow phones (e.g. 360×740). */
const HOME_MOBILE_TITLE_LINES = [
  'Build today',
  'what The Bahamas',
  'needs to win',
  'tomorrow',
] as const

function isHomeDisplayTitle(title: string): boolean {
  const compact = title.replace(/[.\s]+/g, '').toLowerCase()
  return (
    compact.includes('buildtoday') &&
    compact.includes('bahamas') &&
    compact.includes('needstowin') &&
    compact.includes('tomorrow')
  )
}

function getDisplayTitleLines(title: string, isDesktop: boolean): string[] {
  const cmsLines = title
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (!isHomeDisplayTitle(title)) {
    return cmsLines
  }

  if (!isDesktop) {
    const withPeriod = /tomorrow\.\s*$/i.test(title.replace(/\n/g, ' ').trim())
    return [
      HOME_MOBILE_TITLE_LINES[0],
      HOME_MOBILE_TITLE_LINES[1],
      HOME_MOBILE_TITLE_LINES[2],
      withPeriod ? 'tomorrow.' : HOME_MOBILE_TITLE_LINES[3],
    ]
  }

  if (cmsLines.length >= 2) {
    return cmsLines
  }

  return ['Build today what The Bahamas', 'needs to win tomorrow']
}

function useIsMinWidth(minWidthPx: number): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${minWidthPx}px)`)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [minWidthPx])

  return matches
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
  titleVariant: 'default' | 'display' | 'about' | 'getInvolved' | 'updates' | 'contact'
  patternColor?: string
  patternVariant?: 'solid' | 'aurora'
  patternFollowSpeed: number
  patternFollowDamping: number
}) {
  if (titleVariant === 'display' || titleVariant === 'about') {
    return (
      <div className="pointer-events-none absolute top-[11px] left-[-40px] z-0 h-[320px] w-[480px] opacity-40 sm:left-[-60px] sm:h-[420px] sm:w-[620px] sm:opacity-50 lg:left-[-84px] lg:h-[602px] lg:w-[876px]">
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
 * Centered page hero (Get Involved / Updates / Contact) — Figma: 56.69px/61.42px title,
 * 18px/25px medium description (max 863px, #53585C). Contact optionally includes a navy CTA.
 * Title types out first; subtitle and CTA fade in after.
 */
function CenteredPageHeroCopy({
  title,
  subtitleParagraphs,
  cta,
  headingMaxWidthClassName = 'max-w-[701px]',
}: {
  title: string
  subtitleParagraphs: string[]
  cta?: HeroCTA
  headingMaxWidthClassName?: string
}) {
  const titleLines = title
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  const [titleDone, setTitleDone] = useState(false)
  const onTitleDone = useCallback(() => setTitleDone(true), [])

  return (
    <div className="relative z-10 w-full">
      <TypewriterText
        as="h1"
        lines={titleLines}
        speed={TYPEWRITER_SPEED.hero}
        onDone={onTitleDone}
        className={cn(
          'mx-auto text-center text-[clamp(2rem,5vw,56.69px)] font-normal leading-[1.084] tracking-normal text-[#13181D] lg:text-[56.69px] lg:leading-[61.42px]',
          headingMaxWidthClassName,
        )}
      />
      {subtitleParagraphs.length > 0 && (
        <p
          className={cn(
            'mx-auto mt-4 max-w-full text-center text-[16px] font-medium leading-[25px] tracking-normal text-[#53585C] transition-all duration-500 ease-out sm:mt-[25px] sm:text-[18px] lg:max-w-[863px]',
            titleDone ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          )}
        >
          {subtitleParagraphs.map((paragraph, index) => (
            <React.Fragment key={index}>
              {index > 0 && <br />}
              {paragraph}
            </React.Fragment>
          ))}
        </p>
      )}
      {cta && (
        <div
          className={cn(
            'mt-8 flex justify-center transition-all duration-500 ease-out sm:mt-[43px]',
            titleDone
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-3 opacity-0',
          )}
        >
          <Link
            href={cta.href}
            className={cn(
              GRADIENT_CTA_BASE_CLASSNAME,
              'h-[50px] w-full max-w-[173px] rounded-[6px] sm:w-[173px]',
            )}
            style={NAVY_GRADIENT_CTA_STYLE}
          >
            {cta.label}
          </Link>
        </div>
      )}
    </div>
  )
}

const isCenteredPageHero = (variant: HeroSectionProps['titleVariant']) =>
  variant === 'getInvolved' || variant === 'updates' || variant === 'contact'

/**
 * About page hero — Figma: 56.69px/61.42px title (2 lines, max 450px),
 * 18px/25px medium description (max 655px). Title types out first; body fades in after.
 */
function AboutHeroCopy({
  title,
  subtitleParagraphs,
}: {
  title: string
  subtitleParagraphs: string[]
}) {
  const [lineOne, lineTwo] = getAboutTitleLines(title)
  const titleLines = [lineOne, lineTwo].filter(Boolean)
  const [titleDone, setTitleDone] = useState(false)
  const onTitleDone = useCallback(() => setTitleDone(true), [])

  return (
    <div className="relative z-10 w-full">
      <TypewriterText
        as="h1"
        lines={titleLines}
        speed={TYPEWRITER_SPEED.hero}
        onDone={onTitleDone}
        className="max-w-full text-[clamp(2rem,5vw,56.69px)] font-normal leading-[1.084] tracking-normal text-[#13181D] sm:max-w-[450px] lg:text-[56.69px] lg:leading-[61.42px]"
      />
      {subtitleParagraphs.map((paragraph, index) => (
        <p
          key={index}
          className={cn(
            index === 0 ? 'mt-4 sm:mt-[22px]' : 'mt-4 sm:mt-[25px]',
            'max-w-full text-[16px] font-medium leading-[25px] tracking-normal text-[#4B5563] transition-all duration-500 ease-out sm:max-w-[655px] sm:text-[18px]',
            titleDone ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          )}
          style={{ transitionDelay: titleDone ? `${index * 80}ms` : '0ms' }}
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}

/**
 * The "display" hero (homepage): types the title out, then each subtitle paragraph in turn,
 * then reveals the CTAs — instead of the scroll-triggered fade-up used by the default hero.
 */
function DisplayHeroCopy({
  titleLines,
  title,
  subtitleParagraphs,
  showCTAs,
  isCentered,
  primaryCTA,
  secondaryCTA,
}: {
  titleLines: string[]
  title: string
  subtitleParagraphs: string[]
  showCTAs: boolean
  isCentered: boolean
  primaryCTA?: HeroCTA
  secondaryCTA?: HeroCTA
}) {
  const isDesktop = useIsMinWidth(1280)
  const displayTitleLines = useMemo(
    () => getDisplayTitleLines(title, isDesktop),
    [title, isDesktop],
  )
  const resolvedTitleLines = displayTitleLines.length > 0 ? displayTitleLines : titleLines
  const totalSegments = 1 + subtitleParagraphs.length
  const [doneCount, setDoneCount] = useState(0)
  const advance = useCallback(() => setDoneCount((count) => count + 1), [])
  const ctasReady = doneCount >= totalSegments

  return (
    <div className="relative z-10 w-full text-center xl:text-left">
      <TypewriterText
        key={resolvedTitleLines.join('\n')}
        as="h1"
        lines={resolvedTitleLines}
        speed={TYPEWRITER_SPEED.displayTitle}
        onDone={advance}
        className="mx-auto max-w-[20ch] text-[clamp(1.75rem,8.2vw,56.69px)] font-normal leading-[1.084] tracking-normal text-[#13181D] sm:max-w-none xl:mx-0 xl:max-w-[573px] xl:text-[56.69px] xl:leading-[61.42px]"
      />
      {subtitleParagraphs.map((paragraph, index) => (
        <TypewriterText
          key={index}
          as="p"
          lines={[paragraph]}
          start={doneCount >= index + 1}
          speed={TYPEWRITER_SPEED.displaySubtitle}
          onDone={advance}
          className={cn(
            index === 0 ? 'mt-4' : 'mt-3',
            'text-center text-[16px] font-semibold leading-snug tracking-normal text-black sm:text-[18px] md:text-[20px] md:leading-none xl:text-start',
          )}
        />
      ))}
      {showCTAs && (
        <div
          className={cn(
            'mt-8 flex flex-col gap-2.5 font-semibold transition-all duration-500 ease-out sm:flex-row sm:flex-wrap',
            'items-center justify-center xl:items-start xl:justify-start',
            isCentered && 'xl:items-center xl:justify-center',
            ctasReady ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
          )}
        >
          {primaryCTA && (
            <Link
              href={primaryCTA.href}
              className={cn(
                displayCtaBaseClassName,
                'w-full max-w-[256px] sm:w-[256px] lg:w-[256px]',
              )}
              style={displayPrimaryCtaStyle}
            >
              {primaryCTA.label}
            </Link>
          )}
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className={cn(
                displayCtaBaseClassName,
                'w-full max-w-[173px] sm:w-[173px] lg:w-[173px]',
              )}
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
    <section
      className={cn(
        'relative overflow-hidden bg-white',
        titleVariant === 'getInvolved' ||
          titleVariant === 'updates' ||
          titleVariant === 'contact'
          ? 'lg:min-h-[507px]'
          : undefined,
      )}
    >
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
          hasImage
            ? titleVariant === 'about'
              ? 'py-8 md:py-10 lg:py-[35px]'
              : 'py-10 md:py-14 lg:py-16'
            : isCenteredPageHero(titleVariant)
              ? titleVariant === 'updates'
                ? 'px-4 py-10 sm:px-0 md:py-12 lg:px-0 lg:pt-[136px] lg:pb-[234px]'
                : titleVariant === 'contact'
                  ? 'px-4 py-12 sm:px-0 md:py-16 lg:px-0 lg:pt-[136px] lg:pb-[123px]'
                  : 'px-4 py-10 sm:px-0 md:py-12 lg:px-0 lg:pt-[136px] lg:pb-[209px]'
              : 'py-12 md:py-16 lg:py-20',
        )}
      >
        <div
          ref={gridRef}
          onPointerMove={hasImage ? parallax.onPointerMove : undefined}
          onPointerLeave={hasImage ? parallax.onPointerLeave : undefined}
          className={cn(
            'grid grid-cols-1 gap-6',
            hasImage
              ? titleVariant === 'display'
                ? 'items-center xl:grid-cols-2 xl:items-stretch xl:gap-8'
                : 'items-stretch lg:grid-cols-2 lg:gap-1'
              : 'items-center',
            !hasImage && isCentered && 'justify-items-center',
          )}
        >
          <div
            className={cn(
              'relative flex h-full w-full',
              hasImage
                ? cn(
                    'items-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12',
                    titleVariant === 'display' && 'justify-center xl:justify-start',
                  )
                : 'items-center',
              !hasImage &&
                isCentered &&
                (isCenteredPageHero(titleVariant)
                  ? 'mx-auto max-w-[863px] justify-center'
                  : 'mx-auto max-w-3xl justify-center'),
              !hasImage && !isCentered && 'max-w-3xl',
              isCentered && 'text-center',
            )}
          >
            {(showPattern || titleVariant === 'about') && hasImage && (
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
                title={title}
                titleLines={titleLines}
                subtitleParagraphs={subtitleParagraphs}
                showCTAs={Boolean(showCTAs)}
                isCentered={isCentered}
                primaryCTA={primaryCTA}
                secondaryCTA={secondaryCTA}
              />
            ) : titleVariant === 'about' ? (
              <AboutHeroCopy title={title} subtitleParagraphs={subtitleParagraphs} />
            ) : isCenteredPageHero(titleVariant) ? (
              <CenteredPageHeroCopy
                title={title}
                subtitleParagraphs={subtitleParagraphs}
                cta={
                  titleVariant === 'contact'
                    ? secondaryCTA ?? primaryCTA
                    : undefined
                }
                headingMaxWidthClassName={
                  titleVariant === 'contact'
                    ? 'max-w-full lg:max-w-[523px]'
                    : titleVariant === 'getInvolved' || titleVariant === 'updates'
                      ? 'max-w-full lg:max-w-[701px]'
                      : 'max-w-[701px]'
                }
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
                'relative w-full min-w-0 overflow-hidden rounded-3xl',
                titleVariant === 'display'
                  ? 'aspect-[707/566] xl:-mt-[7px] xl:max-w-[707px]'
                  : 'aspect-[4/3] lg:aspect-auto lg:min-h-[420px]',
              )}
            >
              <motion.div
                style={{ x: parallax.x, y: parallax.y }}
                className="relative h-full w-full scale-[1.04]"
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
                    initial={false}
                    animate={{
                      opacity: index === activeImageIndex ? 1 : 0,
                      scale: index === activeImageIndex ? 1 : 1.03,
                    }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover object-center',
                      imageClassName,
                    )}
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
