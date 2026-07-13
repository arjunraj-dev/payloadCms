'use client'

import React, { useCallback, useState } from 'react'
import { TYPEWRITER_SPEED } from '@/app/(frontend)/components/motion/config'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
import { TypewriterText } from '@/app/(frontend)/components/motion/TypewriterText'
import { GravityWaveBackground } from '@/app/(frontend)/components/shared/GravityWaveBackground'
import { cn } from '@/utilities/ui'

export interface StatusCard {
  status: string
  color: string
  backgroundImage: string
  title: string
  description: string
}

export interface StatusTabsSectionProps {
  statusCards: StatusCard[]
  heading?: string
  description?: string
}

const STATUS_ACCENT_COLORS: { match: RegExp; color: string }[] = [
  { match: /^live$/i, color: '#37A359' },
  { match: /in\s*progress/i, color: '#2084FF' },
  { match: /^coming$/i, color: '#E46E19' },
  { match: /^planned$/i, color: '#DFDFDF' },
]

function getStatusAccentColor(title: string): string {
  const match = STATUS_ACCENT_COLORS.find(({ match: pattern }) => pattern.test(title.trim()))
  return match?.color ?? '#2084FF'
}

export function StatusTabsSection({
  statusCards,
  heading = "What's already in motion.",
  description = "We said we'd show you rather than tell you. This page is how we keep that promise — an honest account of what's live, what we're building, and what's still being planned.",
}: StatusTabsSectionProps) {
  const [headingDone, setHeadingDone] = useState(false)
  const onHeadingDone = useCallback(() => setHeadingDone(true), [])
  const headingLines = heading
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-16 lg:py-20">
      <GravityWaveBackground
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-50"
        variant="aurora"
      />
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl px-1 text-center sm:px-0">
          <TypewriterText
            as="h1"
            lines={headingLines}
            speed={TYPEWRITER_SPEED.hero}
            onDone={onHeadingDone}
            className="text-[clamp(2rem,5vw,56.69px)] font-normal leading-[1.084] tracking-normal text-[#001529] lg:text-[56.69px] lg:leading-[61.42px]"
          />
          <p
            className={cn(
              'mt-3 text-[15px] leading-relaxed text-[#4B5563] transition-all duration-500 ease-out sm:mt-4 sm:text-base md:text-lg',
              headingDone ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
            )}
          >
            {description}
          </p>
        </div>

        <StaggerGroup
          as="div"
          className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 sm:mt-10 md:mt-12 md:grid-cols-2 md:gap-5 xl:grid-cols-4"
        >
          {statusCards.map((card) => {
            const accentColor = getStatusAccentColor(card.title)

            return (
              <StaggerItem
                as="article"
                key={card.status}
                className="relative flex min-h-[150px] flex-col items-center justify-center overflow-hidden rounded-2xl px-4 py-7 text-center text-white sm:min-h-[168px] sm:px-5 sm:py-8 md:min-h-[180px]"
                style={{ boxShadow: `0 8px 24px -4px ${card.color}66` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.backgroundImage}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 opacity-30 mix-blend-multiply"
                  style={{ backgroundColor: card.color }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex min-w-0 flex-col items-center">
                  <div
                    className="size-10 shrink-0 rounded-lg"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-lg font-bold drop-shadow-sm">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow-sm">
                    {card.description}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
