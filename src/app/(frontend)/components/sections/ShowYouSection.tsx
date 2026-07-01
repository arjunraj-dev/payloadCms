import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

export type ShowYouLabelColor = 'green' | 'blue' | 'orange'

export interface ShowYouCard {
  label: string
  labelColor: ShowYouLabelColor
  title: string
  description: string
}

export interface ShowYouSectionProps {
  cards: ShowYouCard[]
  heading?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

const labelColorClasses: Record<ShowYouLabelColor, string> = {
  green: 'bg-[#16A34A] text-white',
  blue: 'bg-[#2563EB] text-white',
  orange: 'bg-[#F97316] text-white',
}

function ShowYouChevron() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[min(40%,280px)] lg:block"
    >
      <div className="absolute right-0 top-1/2 h-[85%] w-full -translate-y-1/2">
        <svg
          className="h-full w-full text-white/[0.04]"
          viewBox="0 0 200 600"
          fill="currentColor"
          preserveAspectRatio="xMaxYMid meet"
        >
          <polygon points="0,0 200,300 0,600" />
        </svg>
      </div>
    </div>
  )
}

export function ShowYouSection({
  cards,
  heading = "We'd rather show you than tell you",
  description = 'Discover the real progress being made through ongoing programs, community investments, and practical solutions designed to improve everyday life.',
  ctaLabel = 'See all our progress →',
  ctaHref = '/progress',
}: ShowYouSectionProps) {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-[#001529] px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16">
          <ShowYouChevron />
          <div className="relative z-10">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                {heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
                {description}
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 md:mt-12">
              <div className="grid grid-cols-1 lg:grid-cols-4">
                {cards.map((card, index) => (
                  <article
                    key={card.title}
                    className={cn(
                      'flex flex-col py-8 lg:px-5 lg:py-10 xl:px-6',
                      index > 0 && 'border-t border-white/10 lg:border-t-0',
                      index > 0 && 'lg:border-l lg:border-white/10',
                    )}
                  >
                    <span className="text-2xl font-bold tabular-nums text-white/10 sm:text-3xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="mt-4 flex flex-wrap items-start gap-x-2 gap-y-1">
                      <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
                        {card.title}
                      </h3>
                      <span
                        className={cn(
                          'mt-0.5 shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide sm:text-xs',
                          labelColorClasses[card.labelColor],
                        )}
                      >
                        {card.label}
                      </span>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8 md:mt-10">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#004B4D] to-[#008C95] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
