'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { GravityWaveBackground } from '@/app/(frontend)/components/shared/GravityWaveBackground'

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
  imageClassName?: string
  align?: 'left' | 'center'
  /** Figma display heading — Nunito Sans 56.69px / 61.42px line-height */
  titleVariant?: 'default' | 'display'
}

const ctaBaseClassName =
  'inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90'

export function HeroSection({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundImageInterval = 5000,
  showPattern = true,
  imageClassName,
  align = 'left',
  titleVariant = 'default',
}: HeroSectionProps) {
  const subtitleParagraphs = (Array.isArray(subtitle) ? subtitle : [subtitle]).filter(Boolean)
  const showCTAs = primaryCTA || secondaryCTA
  const isCentered = align === 'center'
  const hasImage = backgroundImage != null && backgroundImage !== ''
  const backgroundImages = useMemo(() => {
    if (!hasImage) return []
    return Array.isArray(backgroundImage) ? backgroundImage : [backgroundImage]
  }, [backgroundImage, hasImage])
  const [activeImageIndex, setActiveImageIndex] = useState(0)

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
        <GravityWaveBackground className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
      )}
      <div
        className={cn(
          'container relative z-10',
          hasImage ? 'py-10 md:py-14 lg:py-16' : 'py-12 md:py-16 lg:py-20',
        )}
      >
        <div
          className={cn(
            'grid grid-cols-1 items-center gap-1',
            hasImage && 'lg:grid-cols-2 lg:gap-1',
            !hasImage && isCentered && 'justify-items-center',
          )}
        >
          <div
            className={cn(
              'relative flex h-full w-full items-center',
              !hasImage && isCentered && 'mx-auto max-w-3xl justify-center',
              !hasImage && !isCentered && 'max-w-3xl',
              isCentered && 'text-center',
            )}
          >
            {showPattern && hasImage && (
              <GravityWaveBackground className="pointer-events-none absolute inset-0 z-0 h-full w-full" />
            )}
            <div className="relative z-10">
              <h1
                className={cn(
                  'text-[#001529]',
                  titleVariant === 'display'
                    ? 'text-[clamp(2rem,5vw,56.69px)] font-normal leading-[1.084] tracking-normal lg:text-[56.69px] lg:leading-[61.42px]'
                    : 'text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl',
                )}
              >
                {title}
              </h1>
              {subtitleParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={cn(
                    index === 0 ? 'mt-4' : 'mt-3',
                    titleVariant === 'display'
                      ? 'text-[20px] font-semibold leading-none tracking-normal text-[#4B5563]'
                      : cn(
                          'text-base text-[#4B5563] sm:text-lg',
                          isCentered ? 'font-normal leading-relaxed' : 'font-semibold',
                        ),
                  )}
                >
                  {paragraph}
                </p>
              ))}
              {showCTAs && (
                <div
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
                    <Link href={secondaryCTA.href} className={cn(ctaBaseClassName, 'bg-[#001529]')}>
                      {secondaryCTA.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {hasImage && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto lg:min-h-[420px]">
              {backgroundImages.map((src, index) => (
                <img
                  key={src}
                  alt=""
                  role="presentation"
                  src={src}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  decoding="async"
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-1000 motion-safe:ease-in-out',
                    index === activeImageIndex ? 'opacity-100' : 'opacity-0',
                    imageClassName,
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
