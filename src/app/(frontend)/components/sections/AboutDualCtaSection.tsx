import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  TEAL_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'
import { AboutDualCtaWaveBackground } from '@/app/(frontend)/components/sections/AboutDualCtaWaveBackground'

export interface AboutDualCtaBlock {
  heading: string
  description: string
  buttonLabel: string
  buttonHref: string
  /** Figma button width — 270px for first row, 280px for second */
  buttonWidth?: number
}

export interface AboutDualCtaSectionProps {
  blocks: [AboutDualCtaBlock, AboutDualCtaBlock]
}

const ctaClassName = cn(
  GRADIENT_CTA_BASE_CLASSNAME,
  'mt-[33px] h-[50px] rounded-[6px] px-[18px] py-[10px] text-[16px] font-semibold leading-none',
)

export function AboutDualCtaSection({ blocks }: AboutDualCtaSectionProps) {
  return (
    <section className="bg-white py-8 md:py-10 lg:py-[35px]">
      <div className="container">
        <StaggerGroup
          as="div"
          className="relative mx-auto w-full max-w-[1347px] overflow-hidden rounded-3xl bg-[#001529]"
        >
          <AboutDualCtaWaveBackground />

          {blocks.map((block, index) => (
            <React.Fragment key={block.heading}>
              {index > 0 && (
                <div
                  aria-hidden
                  className="relative z-10 px-6 md:px-10 lg:pl-[66px] lg:pr-[50px]"
                >
                  <div className="h-0 w-full max-w-[1231px] border-t border-[#FFFFFF26]" />
                </div>
              )}
              <StaggerItem
                as="div"
                className="relative z-10 grid grid-cols-1 items-start gap-6 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[minmax(0,467px)_minmax(0,672px)] lg:justify-between lg:gap-x-12 lg:px-[56px] lg:py-14"
              >
                <h2 className="max-w-[467px] text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-white lg:text-[40px]">
                  {block.heading}
                </h2>

                <div className="max-w-[672px] lg:pt-[19px]">
                  <p className="text-[18px] font-medium leading-[25px] tracking-normal text-white/80">
                    {block.description}
                  </p>
                  <Link
                    href={block.buttonHref}
                    className={cn(
                      ctaClassName,
                      'w-full sm:w-auto',
                      block.buttonWidth === 270 && 'lg:w-[270px]',
                      block.buttonWidth === 280 && 'lg:w-[280px]',
                    )}
                    style={TEAL_GRADIENT_CTA_STYLE}
                  >
                    {block.buttonLabel}
                  </Link>
                </div>
              </StaggerItem>
            </React.Fragment>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
