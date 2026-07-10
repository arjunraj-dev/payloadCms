import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  NAVY_GRADIENT_CTA_STYLE,
  TEAL_CARD_BORDER_STYLE,
  TEAL_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'
import { CountryFutureWaveBackground } from '@/app/(frontend)/components/sections/CountryFutureWaveBackground'

const CTA_BUTTON_CLASSNAME =
  'inline-flex h-[50px] items-center justify-center gap-[10px] rounded-[6px] border border-transparent px-[18px] py-[10px] text-center text-[16px] font-semibold leading-none text-white transition-opacity hover:opacity-90'

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
  /** `updates` — compact card with teal border. `progress` — full pillars/footer layout. */
  variant?: 'default' | 'updates' | 'progress' | 'contact'
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
  variant = 'default',
}: CountryFutureSectionProps) {
  const isUpdates = variant === 'updates'
  const isProgress = variant === 'progress'
  const isContact = variant === 'contact'
  const headingLines = (heading ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  const hasPrimaryCTA = Boolean(primaryButtonLabel && primaryButtonHref)
  const hasSecondaryCTA = Boolean(secondaryButtonLabel && secondaryButtonHref)
  const hasExtraContent = Boolean(pillarsHeading || pillarsDescription || footerText)
  const showSubtitle = Boolean(subtitle) && !isContact
  /** Progress “This page moves when we do” — pillars + 171px teal CTA */
  const isProgressLayout = !isUpdates && !isContact && hasExtraContent

  return (
    <section
      className={cn(
        embedded
          ? 'pb-8 md:pb-10 lg:pb-12'
          : cn(
              'bg-white',
              isUpdates ? 'py-8 md:py-10 lg:py-[35px]' : 'pb-8 md:pb-10 lg:pb-12',
              isUpdates || isContact ? 'py-8 md:py-10 lg:py-[35px]' : 'pb-8 md:pb-10 lg:pb-12',
            ),
      )}
    >
      <div className="container">
        <div
          className={cn(
            'relative mx-auto flex w-full max-w-[1347px] flex-col overflow-hidden rounded-[24px]',
            isUpdates && 'justify-center px-6 py-10 lg:h-[423px] lg:px-[54px] lg:py-0',
            isProgress &&
              'justify-center bg-[#0D1B2A] px-6 py-10 md:px-10 md:py-12 lg:h-[540px] lg:px-[54px] lg:pt-[76px] lg:pb-12',
            !isUpdates &&
              !isProgress &&
              cn(
                'justify-center bg-[#0D1B2A] px-6 py-10 md:px-10 md:py-12 lg:px-[54px] lg:py-[82px]',
                hasExtraContent ? 'lg:min-h-[423px]' : 'lg:h-[393px]',
              ),
            isUpdates
              ? 'justify-center px-5 py-10 sm:px-6 lg:h-[423px] lg:px-[54px] lg:py-0'
              : isContact
                ? 'justify-center bg-[#0D1B2A] px-5 py-10 sm:px-6 md:py-12 lg:h-[540px] lg:px-[54px] lg:py-0'
                : cn(
                    'justify-center bg-[#0D1B2A] px-5 py-10 sm:px-6 md:px-10 md:py-12 lg:px-[54px] lg:py-[82px]',
                    hasExtraContent ? 'lg:min-h-[423px]' : 'lg:min-h-[393px]',
                  ),
          )}
          style={isUpdates ? TEAL_CARD_BORDER_STYLE : undefined}
        >
          <CountryFutureWaveBackground />

          <Reveal
            as="div"
            className={cn(
              'relative z-10',
              isProgress
                ? 'w-full max-w-[871px]'
                : cn('max-w-[557px]', !isUpdates && 'mx-auto text-center lg:mx-0 lg:text-left'),
              'relative z-10 w-full',
              isContact ? 'max-w-[672px]' : isProgressLayout ? 'max-w-[871px]' : 'max-w-[557px]',
            )}
          >
            {headingLines.length > 0 && (
              <h2
                className={cn(
                  'font-normal tracking-normal text-white text-[clamp(1.75rem,4vw,40px)] lg:text-[40px]',
                  isProgress
                    ? 'max-w-[661px] leading-[47px]'
                    : 'mx-auto max-w-[557px] leading-[47px] lg:mx-0',
                  'font-normal tracking-normal text-white lg:text-[40px]',
                  'font-normal tracking-normal text-white',
                  isContact
                    ? 'max-w-full text-[clamp(1.5rem,5vw,40px)] leading-[1.2] sm:leading-[48px] lg:max-w-[672px] lg:text-[40px]'
                    : isProgressLayout
                      ? 'max-w-[557px] text-[clamp(1.75rem,4vw,40px)] leading-[1.2] lg:text-[40px] lg:leading-[47px]'
                      : 'max-w-[557px] text-[clamp(1.75rem,4vw,40px)] leading-[1.2] sm:leading-[47px] lg:text-[40px]',
                )}
              >
                {headingLines.map((line, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <>
                        <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>
                      </>
                    )}
                    {line}
                  </React.Fragment>
                ))}
              </h2>
            )}
            {showSubtitle && (
              <p
                className={cn(
                  'font-medium tracking-normal text-[#AAB5C1]',
                  isProgress
                    ? 'mt-[13px] max-w-[871px] text-[18px] leading-[26px]'
                    : cn(
                        'text-[18px] leading-[26px]',
                        isUpdates
                          ? 'mt-4 max-w-[550px]'
                          : 'mx-auto mt-[13px] max-w-[546px] lg:mx-0',
                      ),
                  'font-medium tracking-normal text-[#AAB5C1]',
                  isUpdates
                    ? 'mt-3 max-w-[550px] text-[16px] leading-[26px] sm:mt-4 sm:text-[18px]'
                    : isProgressLayout
                      ? 'mt-3 max-w-[871px] text-[16px] leading-[26px] sm:mt-[13px] sm:text-[18px]'
                      : 'mt-3 max-w-[546px] text-[16px] leading-[26px] sm:mt-[13px] sm:text-[18px]',
                )}
              >
                {subtitle}
              </p>
            )}

            {pillarsHeading && (
              <h3
                className={cn(
                  'text-white',
                  isProgress
                    ? 'mt-[39px] max-w-[291px] text-[24px] font-normal leading-[29px] tracking-normal'
                    : 'mt-8 text-xl font-bold sm:text-2xl',
                )}
              >
                {pillarsHeading}
              </h3>
              <h3 className="mt-6 text-[22px] font-normal leading-[29px] tracking-normal text-white sm:mt-8 sm:text-[24px]">
                {pillarsHeading}
              </h3>
            )}

            {pillarsDescription && (
              <p
                className={cn(
                  'text-[#AAB5C1]',
                  isProgress
                    ? 'mt-[15px] max-w-[818px] text-[18px] font-medium leading-[26px] tracking-normal'
                    : 'mt-4 text-base leading-relaxed sm:text-lg',
                )}
              >
              <p
                className={cn(
                  'mt-3 text-[16px] font-medium leading-[26px] tracking-normal text-[#AAB5C1] sm:mt-4 sm:text-[18px]',
                  isProgressLayout && 'max-w-[818px]',
                )}
              >
                {pillarsDescription}
              </p>
            )}

            {footerText && (
              <p
                className={cn(
                  'font-medium text-[#AAB5C1]',
                  isProgress
                    ? 'mt-[15px] max-w-[672px] text-center text-[18px] leading-[26px] tracking-normal'
                    : 'mt-6 text-base leading-relaxed sm:text-lg',
                )}
              >
              <p
                className={cn(
                  'mt-4 text-[16px] font-medium leading-[26px] tracking-normal text-[#AAB5C1] sm:mt-6 sm:text-[18px]',
                  isProgressLayout && 'max-w-[672px] text-center',
                )}
              >
                {footerText}
              </p>
            )}

            {(hasPrimaryCTA || hasSecondaryCTA) && (
              <div
                className={cn(
                  'flex flex-col gap-4 sm:flex-row sm:flex-wrap',
                  isProgress
                    ? 'mt-[23px] items-center justify-center lg:items-start lg:justify-start'
                    : cn(
                        isUpdates ? 'mt-[33px]' : 'mt-[42px] sm:gap-5',
                        !isUpdates && 'items-center justify-center lg:items-start lg:justify-start',
                      ),
                  isContact ? 'mt-8 sm:mt-10' : isUpdates ? 'mt-[33px]' : 'mt-[42px] sm:gap-5',
                  isContact
                    ? 'mt-8 sm:mt-10'
                    : isUpdates || isProgressLayout
                      ? 'mt-6 sm:mt-[33px]'
                      : 'mt-[42px] sm:gap-5',
                )}
              >
                {hasPrimaryCTA && (
                  <Link
                    href={primaryButtonHref!}
                    className={cn(
                      isUpdates || isProgress ? GRADIENT_CTA_BASE_CLASSNAME : CTA_BUTTON_CLASSNAME,
                      isUpdates || isContact || isProgressLayout
                        ? GRADIENT_CTA_BASE_CLASSNAME
                        : CTA_BUTTON_CLASSNAME,
                      'font-semibold',
                      isProgress || isUpdates
                        ? 'h-[50px] w-[171px] rounded-[6px]'
                        : 'w-full sm:w-auto lg:w-[256px]',
                      isUpdates || isContact || isProgressLayout
                        ? 'h-[50px] w-full max-w-[171px] gap-[10px] rounded-[6px] px-[18px] py-[10px] sm:w-[171px]'
                        : 'w-full max-w-full sm:w-auto sm:max-w-[256px] lg:w-[256px]',
                    )}
                    style={TEAL_GRADIENT_CTA_STYLE}
                  >
                    {primaryButtonLabel}
                  </Link>
                )}
                {hasSecondaryCTA && (
                  <Link
                    href={secondaryButtonHref!}
                    className={cn(
                      secondaryCtaClassName,
                      'w-full max-w-full sm:w-auto sm:max-w-[187px]',
                    )}
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
