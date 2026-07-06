import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'

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
            <Reveal as="div">
              <h2 className="text-2xl font-[400] leading-tight text-[#001529] sm:text-3xl lg:text-4xl">
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
            </Reveal>
            <Reveal as="div">
              <Link
                href={buttonHref}
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-[linear-gradient(90deg,rgba(13,27,42,1)_0%,rgba(13,27,42,1)_20%,rgba(34,54,77,1)_40%,rgba(34,54,77,1)_60%,rgba(41,60,81,1)_80%,rgba(13,27,42,1)_100%)] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                {buttonLabel}
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
