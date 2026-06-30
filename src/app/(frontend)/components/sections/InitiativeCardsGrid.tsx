import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React from 'react'

export interface InitiativeCard {
  icon: LucideIcon
  title: string
  description: string
}

export interface InitiativeCardsGridProps {
  cards: InitiativeCard[]
  variant?: 'default' | 'muted'
}

export function InitiativeCardsGrid({ cards, variant = 'default' }: InitiativeCardsGridProps) {
  const isMuted = variant === 'muted'

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <article
            key={card.title}
            className={cn(
              'rounded-2xl p-6 sm:p-8',
              isMuted
                ? 'bg-[#F3F4F6]'
                : 'border border-[#E5E7EB] bg-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg',
            )}
          >
            <Icon className="size-6 text-[#001529]" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold text-[#001529]">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{card.description}</p>
          </article>
        )
      })}
    </div>
  )
}
