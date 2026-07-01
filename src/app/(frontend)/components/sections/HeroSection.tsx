'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

export interface HeroCTA {
  label: string
  href: string
}

export interface HeroSectionProps {
  title: string
  subtitle: string | string[]
  primaryCTA?: HeroCTA
  secondaryCTA?: HeroCTA
  backgroundImage: string
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
  patternImage = '/images/Isolation_Mode.png',
  showPattern = true,
  imageClassName,
}: HeroSectionProps) {
  const subtitleParagraphs = Array.isArray(subtitle) ? subtitle : [subtitle]
  const showCTAs = primaryCTA || secondaryCTA

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
            <img
              alt=""
              role="presentation"
              src={backgroundImage}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={cn('h-full w-full object-cover', imageClassName)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
