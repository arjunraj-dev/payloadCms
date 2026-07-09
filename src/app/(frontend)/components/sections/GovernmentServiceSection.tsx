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
      className={cn('h-[94px] w-[141px] shrink-0 rounded-[24px] bg-[#F0F0F0]', className)}
    />
  )
}

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
        'mx-auto grid w-full max-w-[1087px] grid-cols-1 gap-4 sm:grid-cols-2 lg:h-[322px] lg:grid-cols-[minmax(0,1fr)_322px_minmax(0,1fr)] lg:items-stretch lg:gap-5',
        className,
      )}
    >
      <div className="flex min-h-[180px] flex-col justify-between gap-4 sm:col-span-1 lg:min-h-0 lg:gap-5">
        <GovernmentServicePlaceholder className="hidden lg:block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={familyImage}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="min-h-[140px] flex-1 rounded-[24px] object-cover lg:min-h-0"
        />
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="A person using government services online on a laptop"
        src={laptopImage}
        loading="lazy"
        decoding="async"
        className="h-full min-h-[220px] w-full rounded-[24px] object-cover sm:col-span-2 lg:col-span-1 lg:min-h-0 lg:h-[322px]"
      />

      <div className="flex min-h-[180px] flex-col justify-between gap-4 sm:col-span-1 lg:min-h-0 lg:gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={celebratingImage}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="min-h-[120px] flex-1 rounded-[24px] object-cover lg:min-h-0"
        />
        <div className="flex justify-end">
          <GovernmentServicePlaceholder className="hidden lg:block" />
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
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto w-full max-w-[1348px] rounded-[24px] border border-[#D9D9D9] px-6 py-10 md:px-10 md:py-12 lg:flex lg:h-[625px] lg:flex-col lg:px-12 lg:py-[62px]">
          <StaggerGroup
            as="div"
            className="mx-auto flex w-full max-w-[665px] flex-col items-center text-center"
          >
            <StaggerItem
              as="h2"
              className="w-full font-normal text-[#13181D] text-[clamp(1.75rem,4vw,40px)] leading-[1.175] tracking-normal lg:text-[40px] lg:leading-[47px]"
            >
              {heading}
            </StaggerItem>
            <StaggerItem
              as="p"
              className="mt-[15px] w-full max-w-[642px] text-base font-medium leading-relaxed text-[#53585C] sm:text-lg lg:text-[18px] lg:leading-[25px]"
            >
              {description}
            </StaggerItem>
            <StaggerItem as="div" className="mt-[33px]">
              <Link
                href={ctaHref}
                className={cn(
                  GRADIENT_CTA_BASE_CLASSNAME,
                  'rounded-[6px] font-bold leading-none transition-transform hover:-translate-y-0.5 lg:h-[50px] lg:w-[214px]',
                )}
                style={NAVY_GRADIENT_CTA_STYLE}
              >
                {ctaLabel}
              </Link>
            </StaggerItem>
          </StaggerGroup>

          <StaggerGroup as="div" className="mt-10 lg:mt-[33px] lg:flex-1">
            <StaggerItem as="div">
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
