import { cn } from '@/utilities/ui'
import type { LucideIcon } from 'lucide-react'
import type React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

export type ProgramLabelColor = 'green' | 'blue' | 'orange' | 'dark' | 'planned'
export type ProgramSectionTheme = 'light' | 'accent'
export type ProgramCardSurface = 'white' | 'cream' | 'muted'
export type ProgramSectionTypography = 'default' | 'nunito'

export interface ProgramCard {
  icon?: LucideIcon
  label: string
  labelColor: ProgramLabelColor
  title: string
  description: string
}

export interface ProgramSectionCardsProps {
  title: string
  description: string
  backgroundColor?: string | false
  backgroundImage?: string
  theme?: ProgramSectionTheme
  cardSurface?: ProgramCardSurface
  sectionTypography?: ProgramSectionTypography
  iconSrc?: string
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
    return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
  }

  if (cardCount === 5) {
    return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
  }

  return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
}

const ProgramSectionCards: React.FC<ProgramSectionCardsProps> = ({
  title,
  description,
  backgroundColor,
  backgroundImage,
  theme = 'light',
  cardSurface = 'white',
  sectionTypography = 'default',
  iconSrc,
  cards,
}) => {
  const isAccent = theme === 'accent'
  const isCream = cardSurface === 'cream'
  const isMuted = cardSurface === 'muted'
  const isNunito = sectionTypography === 'nunito'
  const hasPanel = Boolean(backgroundImage || backgroundColor)
  /** Figma Progress “Build Future Readiness” / light nunito sections */
  const isFigmaLight = isNunito && !isAccent && !hasPanel

  return (
    <section
      className={cn(
        'bg-white',
        isFigmaLight ? 'py-8 md:py-10 lg:py-[35px]' : 'py-8 md:py-10 lg:py-12',
      )}
    >
      <div className="container">
        <div
          className={cn(
            'relative',
            hasPanel &&
              'overflow-hidden rounded-[24px] px-5 py-8 sm:rounded-[2rem] sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14',
            backgroundImage && 'bg-cover bg-center bg-no-repeat',
            !backgroundImage && backgroundColor,
            isFigmaLight && 'mx-auto w-full max-w-[1351px]',
          )}
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        >
          {backgroundImage && (
            <div className="pointer-events-none absolute inset-0 bg-[#FF8C00]/10" aria-hidden="true" />
          )}

          <div className="relative z-10">
            <div
              className={cn(
                isFigmaLight
                  ? 'flex w-full max-w-[842px] flex-col gap-3 sm:gap-[15px]'
                  : undefined,
              )}
            >
              <Reveal
                as="h2"
                className={cn(
                  isNunito
                    ? isFigmaLight
                      ? 'w-full max-w-[842px] text-[clamp(1.75rem,4vw,40px)] font-normal leading-[1.2] tracking-normal text-[#13181D] lg:text-[40px] lg:leading-[47px]'
                      : 'text-[clamp(1.75rem,4vw,40px)] font-normal leading-[1.2] tracking-normal lg:text-[40px] lg:leading-[47px]'
                    : 'text-2xl font-bold sm:text-3xl lg:text-4xl',
                  !isFigmaLight && (isAccent ? 'text-white' : 'text-[#001529]'),
                )}
              >
                {title}
              </Reveal>
              <Reveal
                as="p"
                delay={0.08}
                className={cn(
                  isNunito
                    ? isFigmaLight
                      ? 'w-full max-w-[824px] text-[16px] font-medium leading-[25px] tracking-normal text-[#53585C] sm:text-[18px]'
                      : 'mt-3 max-w-2xl text-[16px] font-medium leading-[25px] tracking-normal sm:mt-4 sm:text-[18px]'
                    : 'mt-4 max-w-2xl text-base leading-relaxed sm:text-lg',
                  !isFigmaLight && (isAccent ? 'text-white/90' : 'text-[#4B5563]'),
                )}
              >
                {description}
              </Reveal>
            </div>

            <StaggerGroup
              as="div"
              className={cn(
                'grid',
                isFigmaLight
                  ? 'mt-8 w-full max-w-[1351px] gap-5 sm:mt-10 lg:mt-[48px] lg:gap-[20px]'
                  : 'mt-8 gap-5 md:mt-10 md:gap-6',
                getGridClass(cards.length),
              )}
            >
              {cards.map((card) => {
                const Icon = card.icon

                return (
                  <StaggerItem
                    as="article"
                    key={card.title}
                    className={cn(
                      'flex h-full min-w-0 flex-col rounded-2xl border p-5 transition-all duration-200 sm:p-6',
                      isFigmaLight
                        ? 'min-h-0 shadow-none hover:opacity-95 lg:min-h-[446px] lg:rounded-[24px]'
                        : 'shadow-sm hover:-translate-y-0.5 hover:shadow-lg',
                      isMuted
                        ? 'border-transparent bg-[#E9E9E980]'
                        : isCream
                          ? 'border-[#F0E6D2] bg-[#FDF6E3]'
                          : 'border-[#E5E7EB] bg-white',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {iconSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={iconSrc}
                          alt=""
                          aria-hidden="true"
                          className="h-6 w-auto shrink-0"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : Icon ? (
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
                      ) : null}
                      <span
                        className={cn(
                          'max-w-[50%] rounded px-2.5 py-1 text-center text-[10px] font-semibold uppercase leading-tight tracking-wide',
                          labelColorClasses[card.labelColor],
                        )}
                      >
                        {card.label}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        'mt-4 sm:mt-5',
                        isNunito
                          ? isFigmaLight
                            ? 'text-[22px] font-normal leading-[30px] tracking-normal text-[#13181D] sm:text-[24px]'
                            : 'text-[22px] font-normal leading-[30px] tracking-normal text-[#001529] sm:text-[24px]'
                          : 'text-base font-bold leading-snug text-[#001529] sm:text-lg',
                      )}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={cn(
                        'mt-3 flex-1 text-[14px] leading-relaxed sm:text-sm',
                        isFigmaLight ? 'text-[#53585C]' : 'text-[#4B5563]',
                      )}
                    >
                      {card.description}
                    </p>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramSectionCards
