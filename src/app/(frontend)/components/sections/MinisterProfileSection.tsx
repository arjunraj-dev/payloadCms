import { cn } from '@/utilities/ui'
import React from 'react'

export interface MinisterProfileSectionProps {
  label: string
  name: string
  title: string
  bio: string | string[]
  image: string
  variant?: 'quote' | 'profile'
  /** Figma banner layout — 1132×440 with 90px gap */
  layout?: 'default' | 'banner'
  backgroundColor?: string
}

export function MinisterProfileSection({
  label,
  name,
  title,
  bio,
  image,
  variant = 'quote',
  layout = 'default',
  backgroundColor = 'bg-white',
}: MinisterProfileSectionProps) {
  const bioParagraphs = Array.isArray(bio) ? bio : [bio]
  const isBanner = layout === 'banner'

  if (isBanner) {
    return (
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto flex w-full max-w-[1132px] flex-col lg:h-[440px] lg:flex-row lg:items-stretch lg:gap-[90px]">
            <div className="h-[280px] w-full shrink-0 overflow-hidden rounded-3xl bg-[#B8C5CE] sm:h-[340px] lg:h-[440px] lg:w-[352px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={name}
                src={image}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center px-6 py-8 sm:px-0 lg:py-0">
              <p className="text-lg leading-relaxed text-[#13181D] sm:text-xl lg:text-[1.375rem] lg:leading-[1.65]">
                {bioParagraphs[0]}
              </p>
              <p className="mt-6 text-base font-bold text-[#001529] sm:text-lg">{name}</p>
              <p className="mt-1 text-sm text-[#4B5563] sm:text-base">{title}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('py-12 md:py-16 lg:py-20', backgroundColor)}>
      <div className="container">
        <div
          className={cn(
            'grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] lg:gap-16',
            variant === 'profile' ? 'lg:items-center' : 'items-start',
          )}
        >
          <div className="order-1 overflow-hidden rounded-3xl bg-[#E8ECEF]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={name}
              src={image}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>

          <div className="order-2">
            {variant === 'quote' ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">{label}</p>
                <p className="mt-4 text-xl leading-relaxed text-[#001529] sm:text-2xl">
                  {bioParagraphs[0]}
                </p>
                <p className="mt-6 text-lg font-bold text-[#001529]">{name}</p>
                <p className="mt-1 text-base text-[#4B5563]">{title}</p>
              </>
            ) : (
              <>
                <p className="text-[clamp(1.25rem,3vw,28px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[28px]">
                  {label}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,4vw,40px)] font-normal leading-[22px] tracking-normal text-[#001529] lg:text-[40px]">
                  {name}
                </h3>
                <p className="mt-2 text-[16px] font-medium leading-[24px] tracking-normal text-[#4B5563]">
                  {title}
                </p>
                {bioParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      'text-base leading-relaxed text-[#4B5563] sm:text-lg',
                      index === 0 ? 'mt-6' : 'mt-3',
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
