import Link from 'next/link'
import React from 'react'

export interface DrawThreadsTag {
  label: string
  href: string
}

export interface DrawThreadsSectionProps {
  tags: DrawThreadsTag[]
  heading?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export function DrawThreadsSection({
  tags,
  heading = 'One Ministry, drawing the threads together',
  description = 'Coming together to find solutions that help prepare the Bahamas for the future — across data, digital services, and the economy. These are the areas where MIND will focus on for The Bahamas. This is where we will focus our impact on.',
  ctaLabel = "See everything we're working on →",
  ctaHref = '/initiatives',
}: DrawThreadsSectionProps) {
  const midpoint = Math.ceil(tags.length / 2)
  const firstRow = tags.slice(0, midpoint)
  const secondRow = tags.slice(midpoint)

  return (
    <section className="bg-[#F8F9FA] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-center text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[40px]">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-col items-center gap-3 md:mt-10 md:gap-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {firstRow.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="inline-flex items-center justify-center rounded-xl bg-[#001529] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:py-3"
              >
                {tag.label}
              </Link>
            ))}
          </div>
          {secondRow.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {secondRow.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="inline-flex items-center justify-center rounded-xl bg-[#001529] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:py-3"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center md:mt-12">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#004B4D] to-[#008C95] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
