import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

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
            <Reveal as="div" className="max-w-3xl">
              <h2 className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[1.625] tracking-normal text-white lg:text-[40px] lg:leading-[65px]">
                {heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
                {description}
              </p>
            </Reveal>

            <div className="mt-10 border-t border-white/10 md:mt-12">
              <StaggerGroup as="div" className="grid grid-cols-1 lg:grid-cols-4 lg:items-stretch">
                {cards.map((card, index) => (
                  <StaggerItem
                    as="article"
                    key={card.title}
                    className={cn(
                      'flex flex-col py-8 lg:px-5 lg:py-10 xl:px-6',
                      index > 0 && 'border-t border-white/10 lg:border-t-0',
                      index > 0 && 'lg:border-l lg:border-white/10',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="text-sm font-normal tabular-nums tracking-wide text-white/25"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="mt-4 flex items-start justify-between gap-3">
                      <h3 className="min-w-0 flex-1 text-base font-bold leading-snug text-white sm:text-lg">
                        {card.title}
                      </h3>
                      <span
                        className={cn(
                          'mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap sm:text-[11px]',
                          labelColorClasses[card.labelColor],
                        )}
                      >
                        {card.label}
                      </span>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">
                      {card.description}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <Reveal as="div" className="mt-8 md:mt-10">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#004B4D] to-[#008C95] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                {ctaLabel}
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
