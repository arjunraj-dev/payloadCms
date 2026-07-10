'use client'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { NAVY_GRADIENT_CTA_STYLE } from '@/app/(frontend)/components/shared/gradientCta'

export interface NewsFilterCategory {
  label: string
  value: string
}

export interface NewsFilterSectionProps {
  categories: NewsFilterCategory[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  heading?: string
  embedded?: boolean
}

export function NewsFilterSection({
  categories,
  selectedCategory,
  onCategoryChange,
  heading = 'Latest updates',
  embedded = false,
}: NewsFilterSectionProps) {
  const content = (
    <div className="flex w-full max-w-[1348px] flex-col gap-10">
      <Reveal
        as="h2"
        className="w-full text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#13181D] lg:text-[40px]"
      >
        {heading}
      </Reveal>

      <div
        role="tablist"
        aria-label="Filter updates by category"
        className="flex max-w-[643px] gap-2 overflow-x-auto pb-1 -mx-1 px-1 lg:gap-2 lg:overflow-visible lg:flex-wrap"
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.value
          const isAll = category.value === 'all'

          return (
            <button
              key={category.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onCategoryChange(category.value)}
              className={cn(
                'inline-flex h-[46px] shrink-0 items-center justify-center gap-2.5 rounded-full border py-[10px] text-[16px] font-medium leading-none whitespace-nowrap transition-opacity hover:opacity-90',
                isAll ? 'min-w-[89px] px-[18px]' : 'px-6',
                isSelected
                  ? 'border-transparent text-white'
                  : 'border-[#3E3E3E] bg-white text-[#13181D]',
              )}
              style={isSelected ? NAVY_GRADIENT_CTA_STYLE : undefined}
            >
              {category.label}
            </button>
          )
        })}
      </div>
    </div>
  )

  if (embedded) {
    return content
  }

  return (
    <section className="bg-white py-8 md:py-10 lg:py-[35px]">
      <div className="container">{content}</div>
    </section>
  )
}
