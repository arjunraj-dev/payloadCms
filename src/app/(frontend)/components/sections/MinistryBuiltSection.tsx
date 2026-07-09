import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
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
          <StaggerGroup as="div" className="order-2 text-center lg:text-left">
            <StaggerItem
              as="h2"
              className="mx-auto max-w-[454px] text-2xl font-[400] leading-tight text-[#13181D] sm:text-3xl lg:mx-0 lg:text-[40px] lg:leading-[65px]"
            >
              {heading}
            </StaggerItem>
            {paragraphs.map((paragraph, index) => (
              <StaggerItem
                key={index}
                as="p"
                className={cn(
                  'mx-auto max-w-[537px] text-base leading-relaxed text-[#53585C] sm:text-lg lg:mx-0 lg:text-[18px] lg:leading-[25px] lg:font-medium',
                  index === 0 ? 'mt-4' : 'mt-3',
                )}
              >
                {paragraph}
              </StaggerItem>
            ))}
            <StaggerItem as="div" className="flex justify-center lg:justify-start">
              <Link
                href={buttonHref}
                className={cn(GRADIENT_CTA_BASE_CLASSNAME, 'mt-8 lg:h-[50px] lg:w-[256px]')}
                style={NAVY_GRADIENT_CTA_STYLE}
              >
                {buttonLabel}
              </Link>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
