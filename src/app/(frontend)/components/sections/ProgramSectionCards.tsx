import { cn } from '@/utilities/ui'
import type { LucideIcon } from 'lucide-react'
import type React from 'react'
import { DrawLine } from '@/app/(frontend)/components/motion/DrawLine'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
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
  /** Optional extra classes on the outer `<section>` wrapper. */
  sectionClassName?: string
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
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }

  if (cardCount === 5) {
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  }

  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
}

function getFiveCardItemClass(index: number, total: number) {
  if (total !== 5) return ''

  if (index === 3) return 'lg:col-start-1'
  if (index === 4) return 'lg:col-start-2'

  return ''
}

function ProgramIcon({ iconSrc, icon, className }: { iconSrc?: string; icon?: LucideIcon; className?: string }) {
  const Icon = icon

  return (
    <div
      className={cn(
        'flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg border border-[#DFDFDF]',
        className,
      )}
    >
      {iconSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className="h-5 w-5 object-contain"
          loading="lazy"
          decoding="async"
        />
      ) : Icon ? (
        <Icon className="size-4 text-[#13181D]" aria-hidden="true" strokeWidth={1.75} />
      ) : null}
    </div>
  )
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
  sectionClassName,
}) => {
  const isAccent = theme === 'accent'
  const isCream = cardSurface === 'cream'
  const isMuted = cardSurface === 'muted'
  const isNunito = sectionTypography === 'nunito'

  if (isNunito) {
    const dividerClassName = isAccent ? 'border-t border-[#FFFFFF33]' : 'border-t border-[#DFDFDF]'
    const cardBorderClassName = isCream ? 'border-[#DFDFDF]' : 'border-[#DFDFDF]'

    return (
      <section
        className={cn(
          'bg-white pb-8 md:pb-10 lg:pb-12',
          sectionClassName ?? 'pt-8 md:pt-10 lg:pt-12',
        )}
      >
        <div className="container">
          <ScrollRise
            className={cn(
              'relative',
              backgroundImage &&
                'overflow-hidden rounded-[24px] px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14',
            )}
          >
            {backgroundImage && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[#FF8C00]/10" aria-hidden="true" />
              </>
            )}

            <div className="relative z-10">
              <Reveal as="div" className="flex w-full max-w-[842px] flex-col gap-[15px]">
                <h2
                  className={cn(
                    'text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal lg:text-[40px]',
                    isAccent ? 'text-white' : 'text-[#13181D]',
                  )}
                >
                  {title}
                </h2>
                <p
                  className={cn(
                    'max-w-[824px] text-base font-medium leading-[25px] tracking-normal sm:text-[18px]',
                    isAccent ? 'text-white/90' : 'text-[#53585C]',
                  )}
                >
                  {description}
                </p>
              </Reveal>

              <DrawLine className={cn('mt-8 md:mt-10', dividerClassName)} delay={0.15} />

              <StaggerGroup
                as="div"
                className={cn(
                  'mx-auto mt-8 grid w-full max-w-[1351px] justify-items-center gap-5 md:mt-12 lg:gap-[20px]',
                  getGridClass(cards.length),
                )}
              >
                {cards.map((card, index) => (
                  <StaggerItem
                    as="article"
                    key={card.title}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className={cn(
                      'flex min-h-[500px] w-full max-w-[322px] flex-col rounded-[24px] border px-[26px] pt-[32px] pb-6 transition-colors duration-300',
                      cardBorderClassName,
                      isCream
                        ? 'bg-[#FDF6E3] hover:bg-[#FCF3DC]'
                        : 'bg-[#E9E9E980] hover:bg-[#E9E9E9A6]',
                      getFiveCardItemClass(index, cards.length),
                    )}
                  >
                    <ProgramIcon iconSrc={iconSrc} icon={card.icon} />

                    <div className="mt-[37px] flex items-start justify-between gap-3">
                      <h3 className="min-w-0 flex-1 pr-2 text-[24px] font-normal leading-[30px] tracking-normal text-[#13181D]">
                        {card.title}
                      </h3>
                      <span
                        className={cn(
                          'inline-flex h-[19px] shrink-0 items-center rounded-[4px] px-[6px] text-[12px] font-semibold uppercase leading-[22px] tracking-normal whitespace-nowrap',
                          labelColorClasses[card.labelColor],
                        )}
                      >
                        {card.label}
                      </span>
                    </div>

                    <p className="mt-[18px] w-full flex-1 text-[16px] font-normal leading-[24px] tracking-normal text-[#53585C]">
                      {card.description}
                    </p>

                    <DrawLine
                      className={cn('mt-6', dividerClassName)}
                      delay={0.1 + index * 0.05}
                    />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </ScrollRise>
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn(
        'bg-white pb-8 md:pb-10 lg:pb-12',
        sectionClassName ?? 'pt-8 md:pt-10 lg:pt-12',
      )}
    >
      <div className="container">
        <div
          className={cn(
            'relative overflow-hidden px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14',
            backgroundImage && 'rounded-[2rem] bg-cover bg-center bg-no-repeat',
            !backgroundImage && backgroundColor && 'rounded-[2rem]',
            !backgroundImage && backgroundColor,
          )}
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        >
          {backgroundImage && (
            <div className="pointer-events-none absolute inset-0 bg-[#FF8C00]/10" aria-hidden="true" />
          )}

          <div className="relative z-10">
            <Reveal
              as="h2"
              className={cn(
                'text-2xl font-bold sm:text-3xl lg:text-4xl',
                isAccent ? 'text-white' : 'text-[#001529]',
              )}
            >
              {title}
            </Reveal>
            <Reveal
              as="p"
              delay={0.08}
              className={cn(
                'mt-4 max-w-2xl text-base leading-relaxed sm:text-lg',
                isAccent ? 'text-white/90' : 'text-[#4B5563]',
              )}
            >
              {description}
            </Reveal>

            <StaggerGroup
              as="div"
              className={cn('mt-8 grid gap-5 md:mt-10 md:gap-6', getGridClass(cards.length))}
            >
              {cards.map((card) => {
                const Icon = card.icon

                return (
                  <StaggerItem
                    as="article"
                    key={card.title}
                    className={cn(
                      'flex h-full flex-col rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
                      isMuted
                        ? 'border-transparent bg-[#E9E9E980]'
                        : isCream
                          ? 'border-[#F0E6D2] bg-[#FDF6E3]'
                          : 'border-[#E5E7EB] bg-white',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <ProgramIcon iconSrc={iconSrc} icon={Icon} />
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
