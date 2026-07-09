'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { InitiativeCardsGrid } from '@/app/(frontend)/components/sections/InitiativeCardsGrid'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  NAVY_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'

export interface InitiativesHomeSectionProps {
  heading: string
  ctaLabel: string
  ctaHref: string
  cards: Array<{
    iconSrc: string
    title: string
    description: string
  }>
}

export function InitiativesHomeSection({
  heading,
  ctaLabel,
  ctaHref,
  cards,
}: InitiativesHomeSectionProps) {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto flex w-full max-w-[1348px] flex-col gap-8 lg:h-[492px] lg:gap-[40px]">
          <StaggerGroup
            as="div"
            className="mx-auto flex w-full max-w-[886px] shrink-0 flex-col items-center gap-6 text-center lg:gap-[30px]"
          >
            <StaggerItem
              as="h2"
              className="w-full font-normal text-[#13181D] text-[clamp(1.75rem,4vw,40px)] leading-[1.175] tracking-normal lg:text-[40px] lg:leading-[47px]"
            >
              {heading}
            </StaggerItem>
            <StaggerItem as="div">
              <Link
                href={ctaHref}
                className={cn(
                  GRADIENT_CTA_BASE_CLASSNAME,
                  'rounded-[6px] transition-transform hover:-translate-y-0.5 lg:h-[50px] lg:w-[256px]',
                )}
                style={NAVY_GRADIENT_CTA_STYLE}
              >
                {ctaLabel}
              </Link>
            </StaggerItem>
          </StaggerGroup>
          <InitiativeCardsGrid variant="home" className="min-h-0 flex-1" cards={cards} />
        </div>
      </div>
    </section>
  )
}
