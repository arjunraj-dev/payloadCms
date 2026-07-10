'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  NAVY_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'

export interface TextImageSectionProps {
  heading: string
  text: string | string[]
  image?: string
  imagePosition?: 'left' | 'right'
  backgroundColor?: string
  backgroundImage?: string
  buttonLabel?: string
  buttonHref?: string
  /** Single-card layout: image flush with text panel, muted bg on text only (About) */
  contained?: boolean
  /** Figma About page typography — 40px/65px heading, 18px/25px medium body */
  variant?: 'default' | 'about' | 'getInvolved'
}

const imageRiseProps = {
  distance: 80,
  fromScale: 0.85,
  offset: ['start 95%', 'start 55%'] as [string, string],
}

function SectionImage({
  heading,
  image,
  className,
}: {
  heading: string
  image: string
  className?: string
}) {
  return (
    <ScrollRise {...imageRiseProps} className={cn('h-full w-full overflow-hidden', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={heading}
        src={image}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </ScrollRise>
  )
}

export function TextImageSection({
  heading,
  text,
  image,
  imagePosition = 'right',
  backgroundColor = 'bg-white',
  backgroundImage,
  buttonLabel,
  buttonHref,
  contained = false,
  variant = 'default',
}: TextImageSectionProps) {
  const paragraphs = Array.isArray(text) ? text : [text]
  const isImageLeft = imagePosition === 'left'
  const isAbout = variant === 'about'
  const isGetInvolved = variant === 'getInvolved'
  const isAboutContained = isAbout && contained
  const hasForegroundImage = Boolean(image)
  const hasBackgroundImage = Boolean(backgroundImage)
  const hasButton = Boolean(buttonLabel && buttonHref)

  const getInvolvedTextContent = (
    <StaggerGroup as="div" className="flex h-full min-w-0 w-full flex-col">
      <StaggerItem
        as="h2"
        className="w-full text-[clamp(1.625rem,5.5vw,40px)] font-normal leading-[1.2] tracking-normal text-[#13181D] xl:max-w-[527px] xl:text-[40px] xl:leading-[47px]"
      >
        {heading}
      </StaggerItem>
      {paragraphs.map((paragraph, index) => (
        <StaggerItem
          as="p"
          key={index}
          className={cn(
            'w-full text-[15px] font-medium leading-[1.55] tracking-normal text-[#53585C] sm:text-[16px] sm:leading-[25px] md:text-[18px] xl:max-w-[571px]',
            index === 0 ? 'mt-3 sm:mt-5 xl:mt-[26px]' : 'mt-3 sm:mt-4 xl:mt-[25px]',
          )}
        >
          {paragraph}
        </StaggerItem>
      ))}
      {hasButton && (
        <StaggerItem as="div" className="mt-5 sm:mt-6 xl:mt-[33px]">
          <Link
            href={buttonHref!}
            className={cn(
              GRADIENT_CTA_BASE_CLASSNAME,
              'h-[50px] w-full rounded-[6px] sm:w-[227px]',
            )}
            style={NAVY_GRADIENT_CTA_STYLE}
          >
            {buttonLabel}
          </Link>
        </StaggerItem>
      )}
    </StaggerGroup>
  )

  const textContent = isGetInvolved ? (
    getInvolvedTextContent
  ) : (
    <StaggerGroup as="div" className={cn(isAbout && 'w-full min-w-0')}>
      <StaggerItem
        as="h2"
        className={cn(
          'tracking-normal text-[#001529]',
          isAbout
            ? 'w-full text-[clamp(1.625rem,5.5vw,40px)] font-normal leading-[1.2] lg:text-[40px] lg:leading-[47px]'
            : 'text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] lg:text-[40px]',
        )}
      >
        {heading}
      </StaggerItem>
      {paragraphs.map((paragraph, index) => (
        <StaggerItem
          as="p"
          key={index}
          className={cn(
            isAbout
              ? 'w-full text-[15px] font-medium leading-[1.55] tracking-normal text-[#4B5563] sm:text-[16px] sm:leading-[25px] md:text-[18px]'
              : 'text-base leading-relaxed text-[#4B5563] sm:text-lg',
            index === 0
              ? isAbout
                ? 'mt-3 sm:mt-4'
                : 'mt-4'
              : isAbout
                ? 'mt-3 sm:mt-4 md:mt-[25px]'
                : 'mt-3',
          )}
        >
          {paragraph}
        </StaggerItem>
      ))}
      {hasButton && (
        <StaggerItem as="div">
          <Link
            href={buttonHref!}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#001529] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {buttonLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </StaggerItem>
      )}
    </StaggerGroup>
  )

  if (isGetInvolved && hasForegroundImage) {
    return (
      <section className="relative bg-white py-8 md:py-10 lg:py-[35px]">
        <div className="container relative">
          <div
            className={cn(
              'mx-auto flex w-full max-w-[1347px] flex-col gap-8 xl:h-[594px] xl:flex-row xl:items-center xl:gap-[76px]',
              isImageLeft && 'xl:flex-row-reverse',
            )}
          >
            <div className="flex min-w-0 w-full flex-col justify-center xl:h-[403px] xl:max-w-[571px]">
              {getInvolvedTextContent}
            </div>
            <SectionImage
              heading={heading}
              image={image!}
              className="h-[280px] w-full min-w-0 overflow-hidden rounded-2xl sm:h-[360px] xl:h-[594px] xl:w-[700px] xl:max-w-[700px] xl:shrink-0 xl:rounded-3xl"
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn(
        'relative',
        isAbout
          ? 'py-8 md:py-10 lg:py-[35px]'
          : isAboutContained
            ? 'py-8 md:py-10 lg:py-12'
            : 'py-12 md:py-14 lg:py-16',
        backgroundColor,
      )}
    >
      {hasBackgroundImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          alt=""
          role="presentation"
          src={backgroundImage}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
        />
      )}
      <div className="container relative">
        {contained && hasForegroundImage ? (
          <div
            className={cn(
              'overflow-hidden rounded-3xl',
              isAboutContained && 'lg:max-w-[1347px]',
            )}
          >
            <div
              className={cn(
                'flex flex-col xl:flex-row xl:items-stretch',
                !isImageLeft && 'xl:flex-row-reverse',
              )}
            >
              <div className="relative flex min-w-0 xl:w-1/2">
                <SectionImage
                  heading={heading}
                  image={image!}
                  className={cn(
                    'min-h-[240px] w-full sm:min-h-[280px]',
                    isAboutContained
                      ? 'aspect-[4/3] xl:aspect-auto xl:h-full xl:min-h-0'
                      : 'aspect-[4/3] xl:aspect-auto xl:h-full xl:min-h-0',
                  )}
                />
              </div>
              <div
                className={cn(
                  'flex min-w-0 flex-col justify-center bg-[#E9E9E980] xl:w-1/2 xl:self-stretch',
                  isAboutContained
                    ? 'px-5 py-7 sm:p-6 md:p-10 xl:px-12 xl:py-16'
                    : 'p-5 sm:p-6 md:p-10 xl:p-12',
                )}
              >
                {textContent}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'grid grid-cols-1 items-center',
              isAbout
                ? 'mx-auto w-full max-w-[1347px] gap-6 sm:gap-8 xl:grid-cols-2 xl:gap-12'
                : 'gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16',
            )}
          >
            <div
              className={cn(
                'min-w-0 w-full',
                isImageLeft
                  ? 'order-2'
                  : isAbout
                    ? 'order-2 xl:order-1'
                    : 'order-1',
              )}
            >
              {textContent}
            </div>

            {hasForegroundImage && (
              <div
                className={cn(
                  'min-w-0 w-full',
                  isImageLeft
                    ? 'order-1'
                    : isAbout
                      ? 'order-1 xl:order-2'
                      : 'order-2',
                )}
              >
                <SectionImage
                  heading={heading}
                  image={image!}
                  className={cn(
                    'w-full overflow-hidden rounded-2xl',
                    isAbout
                      ? 'aspect-[4/3] sm:aspect-[16/10] xl:aspect-auto xl:min-h-[320px] xl:rounded-3xl'
                      : 'aspect-[4/3] lg:aspect-auto lg:min-h-[320px] lg:rounded-3xl',
                  )}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
