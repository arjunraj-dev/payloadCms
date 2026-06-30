import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

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
    <section className="bg-white py-12 md:py-14 lg:py-16">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Image on LEFT */}
          <div className="order-1 overflow-hidden rounded-2xl lg:rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={heading}
              src={image}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-[400px]"
            />
          </div>

          {/* Text on RIGHT */}
          <div className="order-2">
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
            <Link
              href={buttonHref}
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#001529] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}