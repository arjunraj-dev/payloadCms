import type { LucideIcon } from 'lucide-react'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

export interface IconCard {
  icon: LucideIcon
  title: string
  description: string
}

export interface IconCardsSectionProps {
  title: string
  subtitle: string
  cards: IconCard[]
}

export function IconCardsSection({ title, subtitle, cards }: IconCardsSectionProps) {
  return (
    <section className="bg-[#F8F9FA] py-12 md:py-16 lg:py-20">
      <div className="container">
        <Reveal as="div" className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <h2 className="text-2xl font-bold leading-tight text-[#001529] sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">{subtitle}</p>
        </Reveal>

        <StaggerGroup as="div" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <StaggerItem as="article" key={card.title} className="rounded-2xl bg-white p-6 sm:p-8">
                <Icon className="size-6 text-[#001529]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-[#001529]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{card.description}</p>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
