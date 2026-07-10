'use client'

import React from 'react'
import { InitiativeCardsGrid } from '@/app/(frontend)/components/sections/InitiativeCardsGrid'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

export interface AboutMissionSectionProps {
  heading: string
  description: string
  cards: Array<{
    iconSrc: string
    title: string
    description: string
  }>
}

export function AboutMissionSection({ heading, description, cards }: AboutMissionSectionProps) {
  return (
    <section className="bg-white py-8 md:py-10 lg:py-[35px]">
      <div className="container">
        <StaggerGroup as="div" className="flex flex-col">
          <StaggerItem
            as="h2"
            className="text-left text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[40px]"
          >
            {heading}
          </StaggerItem>
          <StaggerItem
            as="p"
            className="mt-4 max-w-3xl text-left text-[16px] font-medium leading-[25px] tracking-normal text-[#4B5563] sm:text-[18px]"
          >
            {description}
          </StaggerItem>
        </StaggerGroup>
        <div className="mt-10 md:mt-12">
          <InitiativeCardsGrid variant="home" cards={cards} />
        </div>
      </div>
    </section>
  )
}
