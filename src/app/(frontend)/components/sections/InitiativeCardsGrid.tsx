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
  variant?: 'default' | 'muted' | 'home'
  className?: string
}

export function InitiativeCardsGrid({
  cards,
  variant = 'default',
  className,
}: InitiativeCardsGridProps) {
  const isHome = variant === 'home'
  const isMuted = variant === 'muted'

  return (
    <div className={cn('grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4', className)}>
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <article
            key={card.title}
            className={cn(
              'rounded-2xl p-6 sm:p-8',
              isHome && 'bg-[#E9E9E980]',
              isMuted && 'bg-[#F3F4F6]',
              !isHome &&
                !isMuted &&
                'border border-[#E5E7EB] bg-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg',
            )}
          >
            <Icon className="size-6 text-[#001529]" aria-hidden="true" />
            <h3
              className={cn(
                'mt-4 text-[#001529]',
                isHome
                  ? 'text-[24px] font-normal leading-[22px] tracking-normal'
                  : 'text-lg font-bold',
              )}
            >
              {card.title}
            </h3>
            <p
              className={cn(
                'mt-2 text-[#4B5563]',
                isHome
                  ? 'text-[16px] font-normal leading-[24px] tracking-normal'
                  : 'text-sm leading-relaxed',
              )}
            >
              {card.description}
            </p>
          </article>
        )
      })}
    </div>
  )
}
