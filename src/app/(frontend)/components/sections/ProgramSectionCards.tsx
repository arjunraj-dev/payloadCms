import { cn } from '@/utilities/ui'
import type { LucideIcon } from 'lucide-react'
import type React from 'react'

export type ProgramLabelColor = 'green' | 'blue' | 'orange' | 'dark' | 'planned'
export type ProgramSectionTheme = 'light' | 'accent'
export type ProgramCardSurface = 'white' | 'cream'

export interface ProgramCard {
  icon: LucideIcon
  label: string
  labelColor: ProgramLabelColor
  title: string
  description: string
}

export interface ProgramSectionCardsProps {
  title: string
  description: string
  backgroundColor?: string
  backgroundImage?: string
  theme?: ProgramSectionTheme
  cardSurface?: ProgramCardSurface
  cards: ProgramCard[]
}

const labelColorClasses: Record<ProgramLabelColor, string> = {
  green: 'bg-[#16A34A] text-white',
  blue: 'bg-[#3B82F6] text-white',
  orange: 'bg-[#F97316] text-white',
  dark: 'bg-[#1F2937] text-white',
  planned: 'bg-[#DFDFDF] text-black',
}

function getGridClass(cardCount: number) {
  if (cardCount === 4) {
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  if (cardCount === 5) {
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
}

const ProgramSectionCards: React.FC<ProgramSectionCardsProps> = ({
  title,
  description,
  backgroundColor = 'bg-[#F8F9FA]',
  backgroundImage,
  theme = 'light',
  cardSurface = 'white',
  cards,
}) => {
  const isAccent = theme === 'accent'
  const isCream = cardSurface === 'cream'

  return (
    <section className="bg-white py-8 md:py-10 lg:py-12">
      <div className="container">
        <div
          className={cn(
            'relative overflow-hidden rounded-[2rem] px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14',
            !backgroundImage && backgroundColor,
            backgroundImage && 'bg-cover bg-center bg-no-repeat',
          )}
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        >
          {backgroundImage && (
            <div className="pointer-events-none absolute inset-0 bg-[#FF8C00]/10" aria-hidden="true" />
          )}

          <div className="relative z-10">
            <h2
              className={cn(
                'text-2xl font-bold sm:text-3xl lg:text-4xl',
                isAccent ? 'text-white' : 'text-[#001529]',
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                'mt-4 max-w-2xl text-base leading-relaxed sm:text-lg',
                isAccent ? 'text-white/90' : 'text-[#4B5563]',
              )}
            >
              {description}
            </p>

            <div
              className={cn(
                'mt-8 grid gap-5 md:mt-10 md:gap-6',
                getGridClass(cards.length),
              )}
            >
              {cards.map((card) => {
                const Icon = card.icon

                return (
                  <article
                    key={card.title}
                    className={cn(
                      'flex h-full flex-col rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
                      isCream
                        ? 'border-[#F0E6D2] bg-[#FDF6E3]'
                        : 'border-[#E5E7EB] bg-white',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={cn(
                          'flex size-9 shrink-0 items-center justify-center rounded-lg border',
                          isCream
                            ? 'border-[#E8DFC8] bg-white/60'
                            : 'border-[#E5E7EB] bg-[#F8F9FA]',
                        )}
                      >
                        <Icon
                          className="size-4 text-[#001529]"
                          aria-hidden="true"
                          strokeWidth={1.75}
                        />
                      </div>
                      <span
                        className={cn(
                          'shrink-0 rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide',
                          labelColorClasses[card.labelColor],
                        )}
                      >
                        {card.label}
                      </span>
                    </div>
                    <h3 className="mt-5 text-base font-bold leading-snug text-[#001529] sm:text-lg">
                      {card.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B5563]">
                      {card.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramSectionCards
