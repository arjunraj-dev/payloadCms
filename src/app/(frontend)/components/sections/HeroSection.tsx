'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

export interface HeroCTA {
  label: string
  href: string
}

export interface HeroSectionProps {
  title: string
  subtitle: string | string[]
  primaryCTA?: HeroCTA
  secondaryCTA?: HeroCTA
  /** A single image, or a collection to rotate through as a crossfade slideshow. */
  backgroundImage: string | string[]
  /** Time each image stays on screen before crossfading to the next, in ms. */
  backgroundImageInterval?: number
  patternImage?: string
  showPattern?: boolean
  imageClassName?: string
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
  patternImage = '/images/Isolation_Mode.png',
  showPattern = true,
  imageClassName,
}: HeroSectionProps) {
  const subtitleParagraphs = Array.isArray(subtitle) ? subtitle : [subtitle]
  const showCTAs = primaryCTA || secondaryCTA
  const backgroundImages = useMemo(
    () => (Array.isArray(backgroundImage) ? backgroundImage : [backgroundImage]),
    [backgroundImage],
  )
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
      <div className="container relative z-10 py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-1 lg:grid-cols-2 lg:gap-1">
          {/* Left column - Text content */}
          <div className="relative flex items-center w-full h-full">
            {/* Pattern image limited to the text side */}
            {showPattern && (
              <img
                src={patternImage}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover "
              />
            )}
            <div className="relative z-10">
              <h1 className="text-3xl font-bold leading-tight text-[#001529] sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              {subtitleParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={cn(
                    'text-base text-[#4B5563] sm:text-lg',
                    index === 0 ? 'mt-4' : 'mt-3',
                  )}
                >
                  {paragraph}
                </p>
              ))}
              {showCTAs && (
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
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

          {/* Right column - Image */}
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
        </div>
      </div>
    </section>
  )
}
