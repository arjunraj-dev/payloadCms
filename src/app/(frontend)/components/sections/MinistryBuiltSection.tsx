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
    <section className="bg-white py-10 md:py-14 lg:py-16">
      <div className="container">
        <div className="mx-auto grid w-full max-w-[1348px] grid-cols-1 items-center gap-8 xl:grid-cols-2 xl:gap-16">
          <ScrollRise
            distance={80}
            fromScale={0.92}
            offset={['start 95%', 'start 55%']}
            className="order-1 min-w-0 w-full overflow-hidden rounded-2xl xl:max-w-[700px] xl:rounded-3xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={heading}
              src={image}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] h-auto w-full object-cover object-center xl:aspect-[700/594]"
            />
          </ScrollRise>

          <StaggerGroup
            as="div"
            className="order-2 flex min-w-0 w-full flex-col text-left sm:text-center xl:text-left"
          >
            <StaggerItem
              as="h2"
              className="w-full max-w-none text-[clamp(1.5rem,4vw,40px)] font-normal leading-[1.2] tracking-normal break-words text-[#13181D] xl:max-w-[454px] xl:text-[40px] xl:leading-[65px] sm:mx-auto xl:mx-0"
            >
              {heading}
            </StaggerItem>
            {paragraphs.map((paragraph, index) => (
              <StaggerItem
                key={index}
                as="p"
                className={cn(
                  'w-full max-w-none text-[15px] leading-[1.55] tracking-normal break-words text-[#53585C] sm:mx-auto sm:text-base md:text-lg xl:mx-0 xl:max-w-[537px] xl:text-[18px] xl:leading-[25px] xl:font-medium',
                  index === 0 ? 'mt-3 sm:mt-4' : 'mt-3',
                )}
              >
                {paragraph}
              </StaggerItem>
            ))}
            <StaggerItem
              as="div"
              className="mt-6 flex justify-start sm:mt-8 sm:justify-center xl:justify-start"
            >
              <Link
                href={buttonHref}
                className={cn(
                  GRADIENT_CTA_BASE_CLASSNAME,
                  'w-full max-w-[256px] xl:h-[50px] xl:w-[256px]',
                )}
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
