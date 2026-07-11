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
      className="pointer-events-none absolute right-0 top-6 z-0 hidden lg:block md:top-8 lg:top-10"
    >
      <svg
        width={83}
        height={167}
        viewBox="0 0 83 167"
        fill="currentColor"
        className="text-white/[0.06]"
      >
        <polygon points="83,0 0,83.5 83,167" />
      </svg>
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
    <section className="bg-white pt-2 pb-10 md:pt-3 md:pb-16 lg:pt-4 lg:pb-20">
      <div className="container">
        <ScrollRise className="relative overflow-hidden rounded-3xl bg-[#001529] px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-14 lg:px-12 lg:py-16">
          <ShowYouChevron />
          <div className="relative z-10">
            <Reveal as="div" className="text-center lg:text-left">
              <h2 className="mx-auto max-w-[665px] text-[clamp(1.75rem,4vw,40px)] font-normal leading-[1.25] tracking-normal text-white lg:mx-0 lg:text-[40px] lg:leading-[65px]">
                {heading}
              </h2>
              <p className="mx-auto mt-3 max-w-[753px] text-[15px] leading-relaxed text-[#AAB5C1] sm:mt-4 sm:text-base md:text-lg lg:mx-0 lg:text-[18px] lg:leading-[28px]">
                {description}
              </p>
            </Reveal>

            <DrawLine className="mt-8 border-t border-[#1E2F40] sm:mt-10 md:mt-12" delay={0.15} />

            <StaggerGroup
              as="div"
              className="grid grid-cols-1 gap-0 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch"
            >
              {cards.map((card, index) => (
                <StaggerItem
                  as="article"
                  key={card.title}
                  className={cn(
                    'group relative z-0 flex min-w-0 flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-out',
                    'hover:z-10 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(0,255,255,0.45)]',
                    'motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none',
                    index > 0 && 'border-t border-[#1E2F40] md:border-t-0',
                    index % 2 === 1 && 'md:border-l md:border-[#1E2F40]',
                    index >= 2 && 'md:border-t md:border-[#1E2F40] xl:border-t-0',
                    index > 0 && 'xl:border-l xl:border-[#1E2F40]',
                  )}
                >
                  {/* Holographic shine — Prismic / CodePen holographic-card ::before */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-1/2 -left-1/2 z-[1] h-[200%] w-[200%] origin-center -rotate-45 bg-[linear-gradient(0deg,transparent,transparent_30%,rgba(0,255,255,0.28))] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-full group-hover:opacity-100 motion-reduce:hidden"
                  />

                  <div className="relative z-[2] flex min-w-0 flex-1 flex-col px-1 pt-6 pb-0 sm:px-2 sm:pt-8 md:px-4 xl:px-5 xl:pt-10">
                    <span
                      aria-hidden="true"
                      className="text-sm font-normal tabular-nums tracking-wide text-white/25 transition-colors duration-300 group-hover:text-cyan-200/70"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="mt-4 flex flex-wrap items-start gap-x-2.5 gap-y-2">
                      <h3 className="min-w-0 flex-1 basis-[min(100%,12rem)] text-[20px] font-normal leading-[1.3] tracking-normal text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-[22px] xl:text-[24px] xl:leading-[30px]">
                        {card.title}
                      </h3>
                      <span
                        className={cn(
                          'inline-flex h-[19px] shrink-0 items-center rounded-[4px] px-[6px] text-[10px] font-semibold uppercase tracking-wide',
                          labelColorClasses[card.labelColor],
                        )}
                      >
                        {card.label}
                      </span>
                    </div>

                    <p className="mt-4 flex-1 pb-6 text-[15px] font-normal leading-[24px] tracking-normal text-[#AAB5C1] sm:text-[16px]">
                      {card.description}
                    </p>
                  </div>

                  <DrawLine
                    className="relative z-[2] border-t border-[#1E2F40]"
                    delay={0.1 + index * 0.05}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal as="div" className="mt-8 flex justify-center md:mt-10 lg:justify-start">
              <Link
                href={ctaHref}
                className={cn(
                  GRADIENT_CTA_BASE_CLASSNAME,
                  'w-full max-w-[206px] transition-transform hover:-translate-y-0.5 lg:h-[50px] lg:w-[206px]',
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
