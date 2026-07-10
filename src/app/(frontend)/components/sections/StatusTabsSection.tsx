'use client'

import { motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'
import { GravityWaveBackground } from '@/app/(frontend)/components/shared/GravityWaveBackground'
import { DURATION, EASE_OUT } from '@/app/(frontend)/components/motion/config'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
<<<<<<< HEAD
import { TypewriterText } from '@/app/(frontend)/components/motion/TypewriterText'
=======
import { GravityWaveBackground } from '@/app/(frontend)/components/shared/GravityWaveBackground'
>>>>>>> 45017314098b2ebca17bcc53b3152e4e2762fd43

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
  const headingLines = heading
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  const [descriptionReady, setDescriptionReady] = useState(false)
  const onHeadingDone = useCallback(() => setDescriptionReady(true), [])

  return (
<<<<<<< HEAD
    <section className="relative overflow-hidden bg-white pb-12 md:pb-16 lg:pb-20">
      <div className="container relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[111px] left-1/2 z-0 h-[min(602px,70vh)] w-[min(876px,100%)] -translate-x-1/2 opacity-50"
        >
          <GravityWaveBackground
            className="h-full w-full"
            followSpeed={0.005}
            followDamping={0.95}
          />
        </div>

        <div className="relative z-10 pt-24 md:pt-28 lg:pt-[118px]">
          <div className="mx-auto flex w-full max-w-[863px] flex-col items-center text-center">
            <TypewriterText
              as="h1"
              lines={headingLines.length > 0 ? headingLines : [heading]}
              speed={28}
              startOnView
              onDone={onHeadingDone}
              className="mx-auto w-full max-w-[701px] text-[clamp(2rem,5vw,56.69px)] font-normal leading-[1.084] tracking-normal text-[#13181D] lg:text-[56.69px] lg:leading-[61.42px]"
            />

            <motion.p
              initial={false}
              animate={descriptionReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: DURATION.base, ease: EASE_OUT }}
              className="mx-auto mt-[25px] w-full max-w-[863px] text-base font-medium leading-[25px] text-[#53585C] sm:text-[18px]"
            >
              {description}
            </motion.p>
          </div>

          <StaggerGroup
            as="div"
            className="mx-auto mt-10 grid w-full max-w-[1106px] grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-[95px] lg:grid-cols-4 lg:gap-[34px]"
          >
            {statusCards.map((card) => {
              const accentColor = getStatusAccentColor(card.title)

              return (
                <StaggerItem
                  as="article"
                  key={card.status}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="relative flex h-[172px] w-full max-w-[251px] flex-col overflow-hidden rounded-2xl text-center text-white"
                  style={{ boxShadow: `0 8px 24px -4px ${card.color}66` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.backgroundImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-100"
                  />
=======
    <section className="relative overflow-hidden bg-white py-10 md:py-16 lg:py-20">
      <GravityWaveBackground
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-50"
        variant="aurora"
      />
      <div className="container relative z-10">
        <Reveal as="div" className="mx-auto max-w-3xl px-1 text-center sm:px-0">
          <h1 className="text-[clamp(2rem,5vw,56.69px)] font-normal leading-[1.084] tracking-normal text-[#001529] lg:text-[56.69px] lg:leading-[61.42px]">
            {heading}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563] sm:mt-4 sm:text-base md:text-lg">
            {description}
          </p>
        </Reveal>

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
>>>>>>> 45017314098b2ebca17bcc53b3152e4e2762fd43
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-multiply"
                    style={{ backgroundColor: card.color }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-full w-full flex-col items-center px-[26px] pt-[33px]">
                    <div
                      className="flex w-full max-w-[199px] flex-col items-center rounded-[8px]"
                      aria-hidden="true"
                    >
                      <div
                        className="size-10 shrink-0 rounded-[8px]"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>
                    <h3 className="mt-4 text-[24px] font-normal leading-[22px] tracking-normal text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 w-full max-w-[199px] text-[16px] font-normal leading-[24px] tracking-normal text-white">
                      {card.description}
                    </p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
