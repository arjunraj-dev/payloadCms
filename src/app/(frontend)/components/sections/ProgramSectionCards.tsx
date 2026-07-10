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

export type ProgramCardLayout = 'standard' | 'wide'

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
  /** `wide` — 3 large cards (Drive National Development). `standard` — compact 4-up grid. */
  cardLayout?: ProgramCardLayout
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

function ProgramIcon({
  iconSrc,
  icon,
  className,
}: {
  iconSrc?: string
  icon?: LucideIcon
  className?: string
}) {
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
  return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
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
  cardLayout = 'standard',
  sectionClassName,
}) => {
  const isAccent = theme === 'accent'
  const isCream = cardSurface === 'cream'
  const isMuted = cardSurface === 'muted'
  const isNunito = sectionTypography === 'nunito'
  const hasPanel = Boolean(backgroundImage || backgroundColor)
  /** Figma Progress “Build Future Readiness” / light nunito sections */
  const isFigmaLight = isNunito && !isAccent && !hasPanel

  if (isNunito) {
    const isPhotoSection = isAccent && Boolean(backgroundImage)
    const isWideSection = cardLayout === 'wide'
    const dividerClassName = isPhotoSection
      ? 'border-t border-white/25'
      : isAccent
        ? 'border-t border-[#FFFFFF33]'
        : 'border-t border-[#DFDFDF]'
    const cardBorderClassName = 'border-[#DFDFDF]'

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
              'relative mx-auto w-full',
              isWideSection && 'flex max-w-[1351px] flex-col gap-[23px] lg:min-h-[591px]',
              isPhotoSection &&
                'max-w-[1348px] overflow-hidden rounded-[24px] px-6 py-10 md:px-10 md:py-12 lg:min-h-[669px] lg:px-[73px] lg:pt-[60px] lg:pb-12',
              !isWideSection &&
                backgroundImage &&
                !isPhotoSection &&
                'overflow-hidden rounded-[24px] px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14',
            )}
          >
            {backgroundImage && (
              <>
                <div
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute bg-cover bg-center bg-no-repeat',
                    isPhotoSection
                      ? 'top-[-5px] left-1/2 h-[943px] w-[1415px] max-w-none -translate-x-1/2'
                      : 'inset-0',
                  )}
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                {!isPhotoSection && (
                  <div
                    className="pointer-events-none absolute inset-0 bg-[#FF8C00]/10"
                    aria-hidden="true"
                  />
                )}
              </>
            )}

            <div className="relative z-10">
              <Reveal
                as="div"
                className={cn(
                  'flex w-full flex-col gap-[15px]',
                  isPhotoSection
                    ? 'max-w-[895px]'
                    : isWideSection
                      ? 'max-w-[842px]'
                      : 'max-w-[842px]',
                )}
              >
                <h2
                  className={cn(
                    'text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal lg:text-[40px]',
                    isPhotoSection || isAccent ? 'text-white' : 'text-[#13181D]',
                  )}
                >
                  {title}
                </h2>
                <p
                  className={cn(
                    'text-base font-medium leading-[25px] tracking-normal sm:text-[18px]',
                    isPhotoSection
                      ? 'max-w-[895px] text-white'
                      : isAccent
                        ? 'max-w-[824px] text-white/90'
                        : isWideSection
                          ? 'max-w-[930px] text-[#53585C]'
                          : 'max-w-[824px] text-[#53585C]',
                  )}
                >
                  {description}
                </p>
              </Reveal>

              {!isPhotoSection && !isWideSection && (
                <DrawLine className={cn('mt-8 md:mt-10', dividerClassName)} delay={0.15} />
              )}

              <StaggerGroup
                as="div"
                className={cn(
                  'mx-auto grid w-full justify-items-center gap-5 lg:gap-[20px]',
                  isPhotoSection &&
                    'mt-6 max-w-[1204px] grid-cols-1 sm:grid-cols-2 lg:mt-[23px] lg:grid-cols-3',
                  isWideSection && 'max-w-[1351px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                  !isPhotoSection &&
                    !isWideSection &&
                    cn('mt-8 max-w-[1351px] md:mt-12', getGridClass(cards.length)),
                )}
              >
                {cards.map((card, index) => (
                  <StaggerItem
                    as="article"
                    key={card.title}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className={cn(
                      'flex w-full flex-col rounded-[24px] border pb-6 transition-colors duration-300',
                      cardBorderClassName,
                      isPhotoSection &&
                        'min-h-[377px] max-w-[388px] bg-[#E9E9E9CC] px-[19px] pt-[32px] hover:bg-[#E9E9E9E6]',
                      isWideSection &&
                        'min-h-[436px] max-w-[437px] bg-[#E9E9E980] px-[26px] pt-[32px] hover:bg-[#E9E9E9A6]',
                      !isPhotoSection &&
                        !isWideSection &&
                        cn(
                          'min-h-[500px] max-w-[322px] px-[26px] pt-[32px]',
                          isCream
                            ? 'bg-[#FDF6E3] hover:bg-[#FCF3DC]'
                            : 'bg-[#E9E9E980] hover:bg-[#E9E9E9A6]',
                          getFiveCardItemClass(index, cards.length),
                        ),
                    )}
                  >
                    {isPhotoSection || isWideSection ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={iconSrc}
                        alt=""
                        aria-hidden="true"
                        className={cn(
                          'shrink-0 object-contain',
                          isWideSection ? 'h-[20px] w-[31px]' : 'h-[20px] w-[23px]',
                        )}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <ProgramIcon iconSrc={iconSrc} icon={card.icon} />
                    )}

                    {isWideSection ? (
                      <>
                        <h3 className="mt-[37px] text-[24px] font-normal leading-[30px] tracking-normal text-[#13181D]">
                          {card.title}
                        </h3>
                        <p className="mt-[18px] max-w-[390px] flex-1 text-[16px] font-normal leading-[24px] tracking-normal text-[#53585C]">
                          {card.description}
                        </p>
                      </>
                    ) : (
                      <>
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

                        <p
                          className={cn(
                            'mt-[18px] w-full flex-1 text-[16px] font-normal leading-[24px] tracking-normal text-[#53585C]',
                            isPhotoSection && 'max-w-[341px]',
                          )}
                        >
                          {card.description}
                        </p>
                      </>
                    )}

                    {!isPhotoSection && !isWideSection && (
                      <DrawLine
                        className={cn('mt-6', dividerClassName)}
                        delay={0.1 + index * 0.05}
                      />
                    )}
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
            <div
              className="pointer-events-none absolute inset-0 bg-[#FF8C00]/10"
              aria-hidden="true"
            />
          )}

          <div className="relative z-10">
            <div
              className={cn(
                isFigmaLight ? 'flex w-full max-w-[842px] flex-col gap-3 sm:gap-[15px]' : undefined,
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
                      <ProgramIcon iconSrc={iconSrc} icon={Icon} />
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
