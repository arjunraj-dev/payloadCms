import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'

export interface ProgramCTA {
  label: string
  href: string
}

export interface ProgramCardProps {
  label: string
  title: string
  description: string
  image: string
  primaryCTA: ProgramCTA
  secondaryCTA: ProgramCTA
  imagePosition?: 'left' | 'right'
}

const ctaBaseClassName =
  'inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90'

function getLabelStyles(label: string) {
  switch (label.toUpperCase().trim()) {
    case 'LIVE':
      return 'bg-[#16A34A] text-white'
    case 'PLANNED':
      return 'bg-[#E5E7EB] text-[#001529]'
    case 'COMING':
      return 'bg-[#F97316] text-white'
    case 'IN PROGRESS':
      return 'bg-[#2563EB] text-white'
    default:
      return 'bg-[#E5E7EB] text-[#001529]'
  }
}

export function ProgramCard({
  label,
  title,
  description,
  image,
  primaryCTA,
  secondaryCTA,
  imagePosition = 'left',
}: ProgramCardProps) {
  const isImageRight = imagePosition === 'right'

  return (
    <section className="bg-white py-12 md:py-14 lg:py-16">
      <div className="container">
        <Reveal as="div" className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div
            className={cn(
              'group relative overflow-hidden rounded-3xl bg-[#E8ECEF] p-6 sm:p-8',
              isImageRight ? 'order-2 lg:order-2' : 'order-1',
            )}
          >
            <span
              className={cn(
                'inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
                getLabelStyles(label),
              )}
            >
              {label}
            </span>
            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                role="presentation"
                src={image}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div className={cn(isImageRight ? 'order-1 lg:order-1' : 'order-2')}>
            <h2 className="text-2xl font-bold leading-tight text-[#001529] sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={primaryCTA.href}
                className={cn(
                  ctaBaseClassName,
                  'bg-gradient-to-r from-[#004B4D] to-[#008C95]',
                )}
              >
                {primaryCTA.label}
              </Link>
              <Link href={secondaryCTA.href} className={cn(ctaBaseClassName, 'bg-[#001529]')}>
                {secondaryCTA.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
