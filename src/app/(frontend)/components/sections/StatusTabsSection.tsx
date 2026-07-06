import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

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
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
      <img
        src="/images/Isolation_Mode.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[min(100%,900px)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      />
      <div className="container relative z-10">
        <Reveal as="div" className="mx-auto max-w-3xl text-center">
          <h1 className="text-[clamp(2rem,5vw,56.69px)] font-normal leading-[1.084] tracking-normal text-[#001529] lg:text-[56.69px] lg:leading-[61.42px]">
            {heading}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">{description}</p>
        </Reveal>

        <StaggerGroup as="div" className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {statusCards.map((card) => {
            const accentColor = getStatusAccentColor(card.title)

            return (
              <StaggerItem
                as="article"
                key={card.status}
                className="relative flex min-h-[168px] flex-col items-center justify-center overflow-hidden rounded-2xl px-5 py-8 text-center text-white sm:min-h-[180px]"
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

                <div className="relative z-10 flex flex-col items-center">
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
