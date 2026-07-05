import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

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

const ctaBaseClassName =
  'inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90'

const vortexDots: Array<{ cx: number; cy: number; r: number; opacity: number }> = [
  { cx: 320, cy: 180, r: 3, opacity: 0.9 },
  { cx: 300, cy: 160, r: 2.5, opacity: 0.85 },
  { cx: 340, cy: 200, r: 2, opacity: 0.8 },
  { cx: 280, cy: 200, r: 2.5, opacity: 0.75 },
  { cx: 360, cy: 170, r: 2, opacity: 0.7 },
  { cx: 310, cy: 220, r: 3, opacity: 0.85 },
  { cx: 350, cy: 230, r: 2, opacity: 0.65 },
  { cx: 270, cy: 170, r: 2, opacity: 0.6 },
  { cx: 380, cy: 200, r: 2.5, opacity: 0.55 },
  { cx: 290, cy: 140, r: 2, opacity: 0.7 },
  { cx: 330, cy: 130, r: 1.5, opacity: 0.5 },
  { cx: 370, cy: 150, r: 2, opacity: 0.6 },
  { cx: 260, cy: 220, r: 2, opacity: 0.55 },
  { cx: 400, cy: 180, r: 2.5, opacity: 0.5 },
  { cx: 340, cy: 260, r: 2, opacity: 0.45 },
  { cx: 300, cy: 250, r: 1.5, opacity: 0.4 },
  { cx: 250, cy: 150, r: 1.5, opacity: 0.45 },
  { cx: 390, cy: 230, r: 2, opacity: 0.4 },
  { cx: 360, cy: 120, r: 1.5, opacity: 0.35 },
  { cx: 420, cy: 210, r: 2, opacity: 0.35 },
  { cx: 275, cy: 270, r: 1.5, opacity: 0.3 },
  { cx: 410, cy: 150, r: 1.5, opacity: 0.3 },
  { cx: 230, cy: 190, r: 1.5, opacity: 0.25 },
  { cx: 380, cy: 270, r: 2, opacity: 0.25 },
  { cx: 440, cy: 190, r: 1.5, opacity: 0.2 },
  { cx: 320, cy: 100, r: 1.5, opacity: 0.3 },
  { cx: 350, cy: 290, r: 1.5, opacity: 0.2 },
  { cx: 200, cy: 210, r: 1, opacity: 0.15 },
  { cx: 450, cy: 230, r: 1.5, opacity: 0.15 },
  { cx: 310, cy: 80, r: 1, opacity: 0.2 },
]

function CountryFuturePattern() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -right-8 bottom-0 top-0 w-1/2 opacity-40 md:w-[45%] md:opacity-60 lg:-right-4 lg:w-[40%]"
      viewBox="0 0 500 360"
      fill="none"
      preserveAspectRatio="xMaxYMid slice"
    >
      {vortexDots.map((dot, index) => (
        <circle
          key={index}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="#008C95"
          opacity={dot.opacity}
        />
      ))}
      {vortexDots.map((dot, index) => (
        <circle
          key={`accent-${index}`}
          cx={dot.cx - 15}
          cy={dot.cy + 10}
          r={dot.r * 0.6}
          fill="#00B4BE"
          opacity={dot.opacity * 0.5}
        />
      ))}
    </svg>
  )
}

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

  return (
    <section
      className={cn(
        embedded ? 'pb-12 md:pb-16 lg:pb-20' : 'bg-[#F8F9FA] pb-12 md:pb-16 lg:pb-20',
      )}
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-[#001529] px-8 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <CountryFuturePattern />

          <div className="relative z-10 max-w-xl lg:max-w-2xl">
            {headingLines.length > 0 && (
              <h2 className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[1.175] tracking-normal text-white lg:text-[40px] lg:leading-[47px]">
                {headingLines.map((line, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-[18px] font-medium leading-[26px] tracking-normal text-white/80">
                {subtitle}
              </p>
            )}

            {pillarsHeading && (
              <h3 className="mt-8 text-xl font-bold text-white sm:text-2xl">{pillarsHeading}</h3>
            )}
            {pillarsDescription && (
              <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                {pillarsDescription}
              </p>
            )}
            {footerText && (
              <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">{footerText}</p>
            )}

            {(hasPrimaryCTA || hasSecondaryCTA) && (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {hasPrimaryCTA && (
                  <Link
                    href={primaryButtonHref!}
                    className={cn(
                      ctaBaseClassName,
                      'bg-gradient-to-r from-[#004B4D] to-[#008C95]',
                    )}
                  >
                    {primaryButtonLabel}
                  </Link>
                )}
                {hasSecondaryCTA && (
                <Link
                  href={secondaryButtonHref!}
                  className={cn(
                    ctaBaseClassName,
                    'border border-white/30 hover:bg-white/10',
                  )}
                >
                  {secondaryButtonLabel}
                </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
