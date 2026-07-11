import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  NAVY_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'

export interface GovernmentServiceSectionProps {
  heading?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  familyImage: string
  laptopImage: string
  celebratingImage: string
}

function GovernmentServicePlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'h-[94px] w-[141px] shrink-0 rounded-[24px] bg-[#F0F0F0]',
        className,
      )}
    />
  )
}

/**
 * Responsive collage:
 * - Mobile: laptop full-width on top, family + celebrating side-by-side below
 * - Tablet: scaled 3-col Figma layout with gray accents
 * - Desktop (xl): exact Figma sizes (263 | 481 | 263, 40px gaps)
 */
function GovernmentServiceCollage({
  familyImage,
  laptopImage,
  celebratingImage,
  className,
}: {
  familyImage: string
  laptopImage: string
  celebratingImage: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'mx-auto grid w-full max-w-[1087px] grid-cols-2 gap-3',
        'md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.55fr)_minmax(0,0.85fr)] md:items-stretch md:gap-4',
        'xl:grid-cols-[263px_481px_263px] xl:items-start xl:justify-center xl:gap-10',
        className,
      )}
    >
      {/* Left — family (bottom); gray tile on tablet+ */}
      <div className="order-2 flex min-w-0 flex-col justify-end gap-3 md:order-1 md:h-full md:justify-between md:gap-4 xl:h-[322px] xl:w-[263px] xl:gap-0">
        <div className="hidden justify-end md:flex">
          <GovernmentServicePlaceholder className="h-14 w-[88px] md:rounded-2xl xl:h-[94px] xl:w-[141px] xl:rounded-[24px]" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={familyImage}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="aspect-[4/3] w-full rounded-[20px] object-cover sm:aspect-[263/176] sm:rounded-[24px] md:aspect-[263/176] md:min-h-0 md:flex-1 xl:h-[176px] xl:w-[263px] xl:flex-none xl:aspect-auto"
        />
      </div>

      {/* Center — laptop (featured on mobile) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="A person using government services online on a laptop"
        src={laptopImage}
        loading="lazy"
        decoding="async"
        className="order-1 col-span-2 aspect-[16/10] w-full rounded-[20px] object-cover sm:rounded-[24px] md:order-2 md:col-span-1 md:aspect-[481/322] md:h-full md:min-h-0 xl:h-[322px] xl:w-[481px] xl:aspect-auto"
      />

      {/* Right — celebrating (top); gray tile on tablet+ */}
      <div className="order-3 flex min-w-0 flex-col justify-start gap-3 md:h-full md:justify-between md:gap-4 xl:h-[322px] xl:w-[263px] xl:gap-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={celebratingImage}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="aspect-[4/3] w-full rounded-[20px] object-cover sm:aspect-[263/176] sm:rounded-[24px] md:aspect-[263/176] md:min-h-0 md:flex-1 xl:h-[176px] xl:w-[263px] xl:flex-none xl:aspect-auto"
        />
        <div className="hidden justify-start md:flex">
          <GovernmentServicePlaceholder className="h-14 w-[88px] md:rounded-2xl xl:h-[94px] xl:w-[141px] xl:rounded-[24px]" />
        </div>
      </div>
    </div>
  )
}

export function GovernmentServiceSection({
  heading = 'Looking for a government service?',
  description = 'Ready for anything. From passport renewals to business licenses, find it all on MyGateway.',
  ctaLabel = 'Go to MyGateway →',
  ctaHref = '/mygateway',
  familyImage,
  laptopImage,
  celebratingImage,
}: GovernmentServiceSectionProps) {
  return (
    <section className="bg-white py-10 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto flex w-full max-w-[1348px] flex-col overflow-hidden rounded-[24px] border border-[#D9D9D9] px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 xl:h-[625px] xl:px-[130px] xl:pb-[38px] xl:pt-[37px]">
          <StaggerGroup
            as="div"
            className="mx-auto flex w-full max-w-[665px] shrink-0 flex-col items-center text-center"
          >
            <StaggerItem
              as="h2"
              className="w-full font-normal text-[#13181D] text-[clamp(1.75rem,4vw,40px)] leading-[1.175] tracking-normal lg:text-[40px] lg:leading-[47px]"
            >
              {heading}
            </StaggerItem>
            <StaggerItem
              as="p"
              className="mt-3 w-full max-w-[642px] text-[15px] font-medium leading-relaxed text-[#53585C] sm:mt-[15px] sm:text-base md:text-lg lg:text-[18px] lg:leading-[25px]"
            >
              {description}
            </StaggerItem>
            <StaggerItem as="div" className="mt-6 w-full sm:mt-[33px] sm:w-auto">
              <Link
                href={ctaHref}
                className={cn(
                  GRADIENT_CTA_BASE_CLASSNAME,
                  'w-full max-w-[214px] rounded-[6px] font-bold leading-none transition-transform hover:-translate-y-0.5 sm:w-[214px] lg:h-[50px]',
                )}
                style={NAVY_GRADIENT_CTA_STYLE}
              >
                {ctaLabel}
              </Link>
            </StaggerItem>
          </StaggerGroup>

          <StaggerGroup as="div" className="mt-8 min-w-0 sm:mt-10 xl:mt-[33px]">
            <StaggerItem as="div" className="min-w-0 w-full">
              <GovernmentServiceCollage
                familyImage={familyImage}
                laptopImage={laptopImage}
                celebratingImage={celebratingImage}
              />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
