import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  TEAL_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'

export interface DrawThreadsTag {
  label: string
  href: string
}

export interface DrawThreadsSectionProps {
  tags: DrawThreadsTag[]
  heading?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export function DrawThreadsSection({
  tags,
  heading = 'One Ministry, drawing the threads together',
  description = 'Coming together to find solutions that help prepare the Bahamas for the future — across data, digital services, and the economy. These are the areas where MIND will focus on for The Bahamas. This is where we will focus our impact on.',
  ctaLabel = "See everything we're working on →",
  ctaHref = '/initiatives',
}: DrawThreadsSectionProps) {
  const midpoint = Math.ceil(tags.length / 2)
  const firstRow = tags.slice(0, midpoint)
  const secondRow = tags.slice(midpoint)

  const tagClassName =
    'inline-flex min-h-[52px] items-center justify-center rounded-[12px] bg-[#0D1B2A] px-3 py-2 text-center text-[14px] font-semibold leading-[22px] tracking-normal text-white shadow-[0px_0px_10px_0px_#00000014] transition-opacity hover:opacity-90 sm:min-h-[70px] sm:px-4 sm:py-2.5 sm:text-[16px] sm:leading-[26px]'

  return (
    <section className="bg-white pt-2 pb-10 md:pt-3 md:pb-16 lg:pt-4 lg:pb-20">
      <div className="container">
        <div className="flex w-full flex-col items-center justify-center rounded-[24px] bg-[#F9F9F9] px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:min-h-[545px] lg:px-12 lg:py-14">
          <div className="mx-auto flex w-full max-w-[875px] flex-col items-center text-center">
            <h2 className="mx-auto w-full max-w-[824px] font-normal text-[#13181D] text-[clamp(1.75rem,4vw,40px)] leading-[1.175] tracking-normal lg:text-[40px] lg:leading-[47px]">
              {heading}
            </h2>
            <p className="mx-auto mt-3 w-full max-w-[875px] text-[15px] font-medium leading-relaxed text-[#53585C] sm:mt-[15px] sm:text-base md:text-lg lg:text-[18px] lg:leading-[26px]">
              {description}
            </p>

            <div className="mx-auto mt-6 flex w-full max-w-[826px] flex-col items-center justify-center gap-2 sm:mt-[33px]">
              <div className="flex w-full flex-wrap items-center justify-center gap-2">
                {firstRow.map((tag) => (
                  <Link key={tag.label} href={tag.href} className={tagClassName}>
                    {tag.label}
                  </Link>
                ))}
              </div>
              {secondRow.length > 0 && (
                <div className="flex w-full flex-wrap items-center justify-center gap-2">
                  {secondRow.map((tag) => (
                    <Link key={tag.label} href={tag.href} className={tagClassName}>
                      {tag.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={ctaHref}
              className={cn(
                GRADIENT_CTA_BASE_CLASSNAME,
                'mt-8 w-full max-w-[299px] rounded-[6px] font-semibold leading-none sm:mt-10 lg:mt-[40px] lg:h-[50px] lg:w-[299px]',
              )}
              style={TEAL_GRADIENT_CTA_STYLE}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
