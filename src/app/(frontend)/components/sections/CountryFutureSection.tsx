import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import {
  NAVY_GRADIENT_CTA_STYLE,
  TEAL_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'
import { CountryFutureWaveBackground } from '@/app/(frontend)/components/sections/CountryFutureWaveBackground'

const CTA_BUTTON_CLASSNAME =
  'inline-flex h-[50px] items-center justify-center gap-[10px] rounded-[6px] border border-transparent px-[18px] py-[10px] text-center text-[16px] leading-none text-white transition-opacity hover:opacity-90'

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

const secondaryCtaClassName = cn(CTA_BUTTON_CLASSNAME, 'font-bold lg:w-[187px]')

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
      className={cn(
        embedded ? 'pb-8 md:pb-10 lg:pb-12' : 'bg-white pb-8 md:pb-10 lg:pb-12',
      )}
    >
      <div className="container">
        <div
          className={cn(
            'relative mx-auto flex w-full max-w-[1347px] flex-col justify-center overflow-hidden rounded-[24px] bg-[#0D1B2A] px-6 py-10 md:px-10 md:py-12 lg:px-[54px] lg:py-[82px]',
            hasExtraContent ? 'lg:min-h-[423px]' : 'lg:h-[393px]',
          )}
        >
          <CountryFutureWaveBackground />

          <Reveal as="div" className="relative z-10">
            {headingLines.length > 0 && (
              <h2 className="max-w-[557px] text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-white lg:text-[40px]">
                {headingLines.map((line, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </h2>
            )}
            {subtitle && (
              <p className="mt-[13px] max-w-[546px] text-[18px] font-medium leading-[26px] tracking-normal text-[#AAB5C1]">
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
                  'mt-[42px] flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-5',
                )}
              >
                {hasPrimaryCTA && (
                  <Link
                    href={primaryButtonHref!}
                    className={cn(CTA_BUTTON_CLASSNAME, 'w-full font-semibold sm:w-auto lg:w-[256px]')}
                    style={TEAL_GRADIENT_CTA_STYLE}
                  >
                    {primaryButtonLabel}
                  </Link>
                )}
                {hasSecondaryCTA && (
                  <Link
                    href={secondaryButtonHref!}
                    className={cn(secondaryCtaClassName, 'w-full sm:w-auto')}
                    style={NAVY_GRADIENT_CTA_STYLE}
                  >
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
