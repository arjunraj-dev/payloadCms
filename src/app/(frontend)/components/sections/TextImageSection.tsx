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
    <StaggerGroup as="div" className="flex h-full flex-col">
      <StaggerItem
        as="h2"
        className="max-w-[527px] text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#13181D] lg:text-[40px]"
      >
        {heading}
      </StaggerItem>
      {paragraphs.map((paragraph, index) => (
        <StaggerItem
          as="p"
          key={index}
          className={cn(
            'max-w-[571px] text-[18px] font-medium leading-[25px] tracking-normal text-[#53585C]',
            index === 0 ? 'mt-[26px]' : 'mt-[25px]',
          )}
        >
          {paragraph}
        </StaggerItem>
      ))}
      {hasButton && (
        <StaggerItem as="div" className="mt-[33px]">
          <Link
            href={buttonHref!}
            className={cn(GRADIENT_CTA_BASE_CLASSNAME, 'h-[50px] w-[227px] rounded-[6px]')}
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
    <StaggerGroup as="div">
      <StaggerItem
        as="h2"
        className={cn(
          'tracking-normal text-[#001529]',
          isAbout
            ? 'text-[clamp(1.75rem,4vw,40px)] font-normal leading-[65px] lg:text-[40px]'
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
              ? 'text-[18px] font-medium leading-[25px] tracking-normal text-[#4B5563]'
              : 'text-base leading-relaxed text-[#4B5563] sm:text-lg',
            index === 0 ? (isAbout ? 'mt-6' : 'mt-4') : isAbout ? 'mt-[25px]' : 'mt-3',
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
              'mx-auto flex w-full max-w-[1347px] flex-col gap-8 lg:h-[594px] lg:flex-row lg:items-center lg:gap-[76px]',
              isImageLeft && 'lg:flex-row-reverse',
            )}
          >
            <div className="flex w-full max-w-[571px] shrink-0 flex-col justify-center lg:h-[403px]">
              {getInvolvedTextContent}
            </div>
            <SectionImage
              heading={heading}
              image={image!}
              className="h-[280px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[360px] lg:h-[594px] lg:w-[700px] lg:rounded-3xl"
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
                'flex flex-col lg:flex-row lg:items-stretch',
                !isImageLeft && 'lg:flex-row-reverse',
              )}
            >
              <div className="relative flex lg:w-1/2 lg:shrink-0">
                <SectionImage
                  heading={heading}
                  image={image!}
                  className={cn(
                    'min-h-[280px] w-full',
                    isAboutContained
                      ? 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-0'
                      : 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-0',
                  )}
                />
              </div>
              <div
                className={cn(
                  'flex flex-col justify-center bg-[#E9E9E980] lg:w-1/2 lg:self-stretch',
                  isAboutContained ? 'p-6 md:p-10 lg:px-12 lg:py-16' : 'p-6 md:p-10 lg:p-12',
                )}
              >
                {textContent}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className={cn(isImageLeft ? 'order-2' : 'order-1')}>{textContent}</div>

            {hasForegroundImage && (
              <div className={cn(isImageLeft ? 'order-1' : 'order-2')}>
                <SectionImage
                  heading={heading}
                  image={image!}
                  className="aspect-[4/3] rounded-2xl lg:aspect-auto lg:min-h-[320px] lg:rounded-3xl"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
