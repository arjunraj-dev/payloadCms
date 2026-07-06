import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'

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
}: TextImageSectionProps) {
  const paragraphs = Array.isArray(text) ? text : [text]
  const isImageLeft = imagePosition === 'left'
  const hasForegroundImage = Boolean(image)
  const hasBackgroundImage = Boolean(backgroundImage)
  const hasButton = Boolean(buttonLabel && buttonHref)

  const textContent = (
    <Reveal as="div">
      <h2 className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[40px]">
        {heading}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={cn(
            'text-base leading-relaxed text-[#4B5563] sm:text-lg',
            index === 0 ? 'mt-4' : 'mt-3',
          )}
        >
          {paragraph}
        </p>
      ))}
      {hasButton && (
        <Link
          href={buttonHref!}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#001529] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {buttonLabel}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </Reveal>
  )

  return (
    <section className={cn('relative py-12 md:py-14 lg:py-16', backgroundColor)}>
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
          <div className="overflow-hidden rounded-3xl">
            <div
              className={cn(
                'flex flex-col lg:flex-row lg:items-stretch',
                !isImageLeft && 'lg:flex-row-reverse',
              )}
            >
              <div className="relative lg:w-1/2 lg:shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={heading}
                  src={image}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-full"
                />
              </div>
              <div className="flex flex-col justify-center bg-[#E9E9E980] p-6 md:p-10 lg:w-1/2 lg:p-12">
                {textContent}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className={cn(isImageLeft ? 'order-2' : 'order-1')}>{textContent}</div>

            {hasForegroundImage && (
              <div
                className={cn(
                  'overflow-hidden rounded-2xl lg:rounded-3xl',
                  isImageLeft ? 'order-1' : 'order-2',
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={heading}
                  src={image}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-[320px]"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
