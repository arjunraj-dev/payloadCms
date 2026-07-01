import type { LucideIcon } from 'lucide-react'
import React from 'react'

export interface StatusCard {
  status: string
  color: string
  backgroundImage: string
  icon: LucideIcon
  title: string
  description: string
}

export interface StatusTabsSectionProps {
  statusCards: StatusCard[]
}

export function StatusTabsSection({ statusCards }: StatusTabsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
      <img
        src="/images/Isolation_Mode.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[min(100%,900px)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      />
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-[#001529] sm:text-3xl lg:text-4xl">
            What&apos;s already in motion.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">
            We said we&apos;d show you rather than tell you. This page is how we keep that promise
            — an honest account of what&apos;s live, what we&apos;re building, and what&apos;s
            still being planned.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {statusCards.map((card) => {
            const Icon = card.icon

            return (
              <article
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
                  <div className="flex size-10 items-center justify-center rounded-lg border border-white/20 bg-white/15 backdrop-blur-[2px]">
                    <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold drop-shadow-sm">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow-sm">
                    {card.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
