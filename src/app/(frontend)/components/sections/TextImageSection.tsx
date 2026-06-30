import { cn } from '@/utilities/ui'
import React from 'react'

export interface TextImageSectionProps {
  heading: string
  text: string | string[]
  image: string
  imagePosition?: 'left' | 'right'
  backgroundColor?: string
  backgroundImage?: string
}

export function TextImageSection({
  heading,
  text,
  image,
  imagePosition = 'right',
  backgroundColor = 'bg-white',
  backgroundImage,
}: TextImageSectionProps) {
  const paragraphs = Array.isArray(text) ? text : [text]
  const isImageLeft = imagePosition === 'left'

  return (
    <section className={cn('relative py-12 md:py-14 lg:py-16', backgroundColor)}>
      {backgroundImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          alt=""
          role="presentation"
          src={backgroundImage}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
        />
      )}
      <div className="container relative">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className={cn(isImageLeft ? 'order-2' : 'order-1')}>
            <h2 className="text-2xl font-bold leading-tight text-[#001529] sm:text-3xl lg:text-4xl">
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
          </div>

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
        </div>
      </div>
    </section>
  )
}
