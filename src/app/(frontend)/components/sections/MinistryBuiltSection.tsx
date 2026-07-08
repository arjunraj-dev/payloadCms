'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
import { TypewriterText } from '@/app/(frontend)/components/motion/TypewriterText'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  NAVY_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'

export interface MinistryBuiltSectionProps {
  heading: string
  description: string | string[]
  image: string
  buttonLabel: string
  buttonHref?: string
}

export function MinistryBuiltSection({
  heading,
  description,
  image,
  buttonLabel,
  buttonHref = '/about',
}: MinistryBuiltSectionProps) {
  const paragraphs = Array.isArray(description) ? description : [description]
  const totalSegments = 1 + paragraphs.length
  const [doneCount, setDoneCount] = useState(0)
  const advance = useCallback(() => setDoneCount((count) => count + 1), [])
  const ctaReady = doneCount >= totalSegments

  return (
    <section className="bg-white py-12 md:py-14 lg:py-16">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Image on LEFT */}
          <ScrollRise
            distance={80}
            fromScale={0.85}
            offset={['start 95%', 'start 55%']}
            className="order-1 overflow-hidden rounded-2xl lg:aspect-[700/594] lg:max-w-[700px] lg:rounded-3xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={heading}
              src={image}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-0"
            />
          </ScrollRise>

          {/* Text on RIGHT */}
          <div className="order-2">
            <TypewriterText
              as="h2"
              lines={[heading]}
              startOnView
              speed={26}
              onDone={advance}
              className="max-w-[454px] text-2xl font-[400] leading-tight text-[#13181D] sm:text-3xl lg:text-[40px] lg:leading-[65px]"
            />
            {paragraphs.map((paragraph, index) => (
              <TypewriterText
                key={index}
                as="p"
                lines={[paragraph]}
                start={doneCount >= index + 1}
                speed={10}
                onDone={advance}
                className={cn(
                  'max-w-[537px] text-base leading-relaxed text-[#53585C] sm:text-lg lg:text-[18px] lg:leading-[25px] lg:font-medium',
                  index === 0 ? 'mt-4' : 'mt-3',
                )}
              />
            ))}
            <Link
              href={buttonHref}
              className={cn(
                GRADIENT_CTA_BASE_CLASSNAME,
                'mt-8 transition-all duration-500 ease-out lg:h-[50px] lg:w-[256px]',
                ctaReady ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
              )}
              style={NAVY_GRADIENT_CTA_STYLE}
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
