import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  TEAL_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'
import { CountryFutureWaveBackground } from '@/app/(frontend)/components/sections/CountryFutureWaveBackground'

export interface CountryFutureSectionProps {
  heading?: string
  subtitle?: string
  pillarsHeading?: string
  pillarsDescription?: string
  footerText?: string
  primaryButtonLabel?: string
  primaryButtonHref?: string
  secondaryButtonLabel?: string
  secondaryButtonHref?: string
  embedded?: boolean
}

const secondaryCtaClassName =
  'inline-flex items-center justify-center rounded-[6px] border border-white/30 px-[18px] py-2.5 text-center text-[16px] font-semibold leading-none text-white transition-colors hover:bg-white/10'

export function CountryFutureSection({
  heading,
  subtitle,
  pillarsHeading,
  pillarsDescription,
  footerText,
  primaryButtonLabel,
  primaryButtonHref,
  secondaryButtonLabel,
  secondaryButtonHref,
  embedded = false,
}: CountryFutureSectionProps) {
  const headingLines = (heading ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  const hasPrimaryCTA = Boolean(primaryButtonLabel && primaryButtonHref)
  const hasSecondaryCTA = Boolean(secondaryButtonLabel && secondaryButtonHref)
  const hasExtraContent = Boolean(pillarsHeading || pillarsDescription || footerText)

  return (
    <section
      className={cn(embedded ? 'pb-12 md:pb-16 lg:pb-20' : 'bg-white pb-12 md:pb-16 lg:pb-20')}
    >
      <div className="container">
        <div
          className={cn(
            'relative mx-auto w-full max-w-[1347px] overflow-hidden rounded-[24px] bg-[#0D1B2A] px-6 py-10 md:px-10 md:py-12 lg:px-[54px] lg:py-[82px]',
            hasExtraContent ? 'lg:min-h-[423px]' : 'lg:h-[423px]',
          )}
        >
          <CountryFutureWaveBackground />

          <Reveal as="div" className="relative z-10 max-w-[767px]">
            {headingLines.length > 0 && (
              <h2 className="max-w-[557px] font-normal text-white text-[clamp(1.75rem,4vw,40px)] leading-[1.175] tracking-normal lg:text-[40px] lg:leading-[47px]">
                {headingLines.map((line, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 max-w-[767px] text-base font-medium leading-relaxed text-[#AAB5C1] sm:text-lg lg:mt-[16px] lg:text-[18px] lg:leading-[26px]">
                {subtitle}
              </p>
            )}

            {pillarsHeading && (
              <h3 className="mt-8 text-xl font-bold text-white sm:text-2xl">{pillarsHeading}</h3>
            )}
            {pillarsDescription && (
              <p className="mt-4 text-base leading-relaxed text-[#AAB5C1] sm:text-lg">
                {pillarsDescription}
              </p>
            )}
            {footerText && (
              <p className="mt-6 text-base leading-relaxed text-[#AAB5C1] sm:text-lg">
                {footerText}
              </p>
            )}

            {(hasPrimaryCTA || hasSecondaryCTA) && (
              <div
                className={cn(
                  'mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap',
                  !hasExtraContent && 'lg:mt-[33px]',
                )}
              >
                {hasPrimaryCTA && (
                  <Link
                    href={primaryButtonHref!}
                    className={cn(
                      GRADIENT_CTA_BASE_CLASSNAME,
                      'rounded-[6px] font-semibold leading-none lg:h-[50px] lg:w-[171px]',
                    )}
                    style={TEAL_GRADIENT_CTA_STYLE}
                  >
                    {primaryButtonLabel}
                  </Link>
                )}
                {hasSecondaryCTA && (
                  <Link href={secondaryButtonHref!} className={secondaryCtaClassName}>
                    {secondaryButtonLabel}
                  </Link>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
