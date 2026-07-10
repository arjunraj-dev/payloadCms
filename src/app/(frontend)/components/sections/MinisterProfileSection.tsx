import { cn } from '@/utilities/ui'
import React from 'react'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

export interface MinisterProfileSectionProps {
  label: string
  name: string
  title: string
  bio: string | string[]
  image: string
  variant?: 'quote' | 'profile'
  /** Figma banner layout — 1132×440 with 90px gap */
  layout?: 'default' | 'banner'
  backgroundColor?: string
}

export function MinisterProfileSection({
  label,
  name,
  title,
  bio,
  image,
  variant = 'quote',
  layout = 'default',
  backgroundColor = 'bg-white',
}: MinisterProfileSectionProps) {
  const bioParagraphs = Array.isArray(bio) ? bio : [bio]
  const isBanner = layout === 'banner'

  if (isBanner) {
    return (
      <section className="bg-white py-8 md:py-10 lg:py-[35px]">
        <div className="container">
          <div className="mx-auto flex w-full max-w-[1132px] flex-col gap-8 xl:flex-row xl:items-stretch xl:gap-[90px]">
            <ScrollRise
              distance={70}
              fromScale={0.94}
              offset={['start 95%', 'start 55%']}
              className="w-full min-w-0 overflow-hidden rounded-3xl bg-[#B8C5CE] xl:w-[443px] xl:max-w-[443px] xl:shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={name}
                src={image}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] h-auto w-full object-cover object-[center_15%] sm:aspect-[443/440] sm:object-top xl:aspect-auto xl:h-[440px]"
              />
            </ScrollRise>

            <StaggerGroup
              as="div"
              className="flex min-w-0 w-full flex-1 flex-col justify-center gap-5 py-2 text-left sm:gap-6 sm:text-center xl:max-w-[599px] xl:gap-[31px] xl:py-0 xl:text-left"
            >
              <StaggerItem
                as="p"
                className="w-full text-lg leading-relaxed break-words text-[#13181D] sm:mx-auto sm:text-xl xl:mx-0 xl:text-[32px] xl:leading-[38px] xl:font-normal"
              >
                {bioParagraphs[0]}
              </StaggerItem>
              <StaggerItem
                as="div"
                className="flex w-full flex-col gap-1 sm:mx-auto sm:items-center xl:mx-0 xl:max-w-[420px] xl:items-start xl:gap-[7px]"
              >
                <p className="text-base font-bold text-[#13181D] sm:text-lg xl:text-[20px] xl:leading-[22px]">
                  {name}
                </p>
                <p className="text-sm text-[#53585C] sm:text-base xl:text-[16px] xl:leading-[22px] xl:font-normal">
                  {title}
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn(
        variant === 'profile' ? 'py-8 md:py-10 lg:py-[35px]' : 'py-12 md:py-16 lg:py-20',
        backgroundColor,
      )}
    >
      <div className="container">
        {variant === 'profile' ? (
          <div className="mx-auto flex w-full max-w-[1348px] flex-col gap-8 xl:flex-row xl:items-center xl:gap-[72px]">
            <ScrollRise
              distance={70}
              fromScale={0.88}
              offset={['start 95%', 'start 55%']}
              className="aspect-[700/594] w-full min-w-0 overflow-hidden rounded-3xl bg-[#E8ECEF] xl:h-[594px] xl:w-[700px] xl:max-w-[700px] xl:shrink-0 xl:aspect-auto"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={name}
                src={image}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </ScrollRise>

            <StaggerGroup as="div" className="flex min-w-0 w-full flex-col xl:max-w-[576px]">
              <StaggerItem
                as="p"
                className="text-[22px] font-normal leading-[1.3] tracking-normal text-[#13181D] sm:text-[28px] sm:leading-[47px]"
              >
                {label}
              </StaggerItem>
              <StaggerItem
                as="h3"
                className="mt-5 text-[clamp(1.75rem,4vw,40px)] font-normal leading-[1.15] tracking-normal text-[#001529] sm:mt-[30px] lg:text-[40px] lg:leading-[47px]"
              >
                {name}
              </StaggerItem>
              <StaggerItem
                as="p"
                className="mt-3 text-[15px] font-medium leading-[24px] tracking-normal text-[#53585C] sm:mt-[18px] sm:text-[16px]"
              >
                {title}
              </StaggerItem>
              {bioParagraphs.map((paragraph, index) => (
                <StaggerItem
                  key={index}
                  as="p"
                  className={cn(
                    'text-[16px] font-medium leading-[28px] tracking-normal text-[#13181D] sm:text-[18px]',
                    index === 0 ? 'mt-5 sm:mt-[26px]' : 'mt-4',
                  )}
                >
                  {paragraph}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        ) : (
        <div
          className={cn(
            'grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] lg:gap-16',
            'items-start',
          )}
        >
          <ScrollRise
            distance={70}
            fromScale={0.88}
            offset={['start 95%', 'start 55%']}
            className="order-1 overflow-hidden rounded-3xl bg-[#E8ECEF]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={name}
              src={image}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </ScrollRise>

          <StaggerGroup as="div" className="order-2">
            <>
              <StaggerItem as="p" className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                {label}
              </StaggerItem>
              <StaggerItem as="p" className="mt-4 text-xl leading-relaxed text-[#001529] sm:text-2xl">
                {bioParagraphs[0]}
              </StaggerItem>
              <StaggerItem as="p" className="mt-6 text-lg font-bold text-[#001529]">
                {name}
              </StaggerItem>
              <StaggerItem as="p" className="mt-1 text-base text-[#4B5563]">
                {title}
              </StaggerItem>
            </>
          </StaggerGroup>
        </div>
        )}
      </div>
    </section>
  )
}
