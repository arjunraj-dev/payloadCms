import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { DrawLine } from '@/app/(frontend)/components/motion/DrawLine'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  TEAL_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'

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
    <section className="bg-white pt-2 pb-12 md:pt-3 md:pb-16 lg:pt-4 lg:pb-20">
      <div className="container">
        <ScrollRise className="relative overflow-hidden rounded-3xl bg-[#001529] px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16">
          <ShowYouChevron />
          <div className="relative z-10">
            <Reveal as="div">
              <h2 className="max-w-[665px] text-[clamp(1.75rem,4vw,40px)] font-normal leading-[1.625] tracking-normal text-white lg:text-[40px] lg:leading-[65px]">
                {heading}
              </h2>
              <p className="mt-4 max-w-[753px] text-base leading-relaxed text-[#AAB5C1] sm:text-lg lg:text-[18px] lg:leading-[28px]">
                {description}
              </p>
            </Reveal>

            <DrawLine className="mt-10 border-t border-[#1E2F40] md:mt-12" delay={0.15} />

            <StaggerGroup as="div" className="grid grid-cols-1 lg:grid-cols-4 lg:items-stretch">
              {cards.map((card, index) => (
                <StaggerItem
                  as="article"
                  key={card.title}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className={cn(
                    'flex flex-col rounded-2xl py-8 transition-colors duration-300 hover:bg-white/[0.03] lg:px-5 lg:py-10 xl:px-6',
                    index > 0 && 'border-t border-[#1E2F40] lg:border-t-0',
                    index > 0 && 'lg:border-l lg:border-[#1E2F40]',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="text-sm font-normal tabular-nums tracking-wide text-white/25"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-4 flex items-start gap-2.5">
                    <h3 className="min-w-0 flex-1 text-[24px] font-normal leading-[30px] tracking-normal text-white">
                      {card.title}
                    </h3>
                    <span
                      className={cn(
                        'inline-flex h-[19px] shrink-0 items-center rounded-[4px] px-[6px] text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap',
                        labelColorClasses[card.labelColor],
                      )}
                    >
                      {card.label}
                    </span>
                  </div>
                  <p className="mt-4 flex-1 text-[16px] font-normal leading-[24px] tracking-normal text-[#AAB5C1]">
                    {card.description}
                  </p>
                  <DrawLine className="mt-6 border-t border-[#1E2F40]" delay={0.1 + index * 0.05} />
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal as="div" className="mt-8 md:mt-10">
              <Link
                href={ctaHref}
                className={cn(
                  GRADIENT_CTA_BASE_CLASSNAME,
                  'transition-transform hover:-translate-y-0.5 lg:h-[50px] lg:w-[206px]',
                )}
                style={TEAL_GRADIENT_CTA_STYLE}
              >
                {ctaLabel}
              </Link>
            </Reveal>
          </div>
        </ScrollRise>
      </div>
    </section>
  )
}
