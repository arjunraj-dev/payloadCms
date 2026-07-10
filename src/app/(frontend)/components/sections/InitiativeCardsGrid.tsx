import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React from 'react'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

export interface InitiativeCard {
  icon?: LucideIcon
  iconSrc?: string
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
    <StaggerGroup
      as="div"
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-2',
        isHome ? 'xl:grid-cols-4 xl:gap-5' : 'lg:grid-cols-4',
        className,
      )}
    >
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <StaggerItem
            as="article"
            key={card.title}
            whileHover={isHome ? { y: -4 } : undefined}
            transition={isHome ? { type: 'spring', stiffness: 300, damping: 22 } : undefined}
            className={cn(
              isHome &&
                'rounded-[24px] border border-[#DFDFDF] bg-[#E9E9E980] px-[19px] py-8 transition-colors duration-300 hover:border-[#CFCFCF]',
              !isHome && 'rounded-2xl p-6 sm:p-8',
              isMuted && !isHome && 'bg-[#F3F4F6]',
              !isHome &&
                !isMuted &&
                'border border-[#E5E7EB] bg-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg',
            )}
          >
            {card.iconSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.iconSrc}
                alt=""
                aria-hidden="true"
                className={cn(isHome ? 'h-[30px] w-[30px]' : 'h-6 w-auto')}
                loading="lazy"
                decoding="async"
              />
            ) : Icon ? (
              <Icon
                className={cn(isHome ? 'size-[30px]' : 'size-6', 'text-[#001529]')}
                aria-hidden="true"
              />
            ) : null}
            <h3
              className={cn(
                isHome
                  ? 'mt-[41px] text-[24px] font-normal leading-[30px] tracking-normal text-[#13181D]'
                  : 'mt-4 text-lg font-bold text-[#001529]',
              )}
            >
              {card.title}
            </h3>
            <p
              className={cn(
                isHome
                  ? 'mt-[22px] text-[16px] font-normal leading-[24px] tracking-normal text-[#53585C]'
                  : 'mt-2 text-sm leading-relaxed text-[#4B5563]',
              )}
            >
              {card.description}
            </p>
          </StaggerItem>
        )
      })}
    </StaggerGroup>
  )
}
