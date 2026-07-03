'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

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
    <>
      <h2 className="text-2xl font-bold text-[#001529] sm:text-3xl">{heading}</h2>

      <div
        role="tablist"
        aria-label="Filter updates by category"
        className="mt-6 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 md:gap-3 lg:overflow-visible lg:flex-wrap"
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.value

          return (
            <button
              key={category.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onCategoryChange(category.value)}
              className={cn(
                'shrink-0 rounded-full border px-6 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200',
                isSelected
                  ? 'border-transparent bg-[#001529] text-white'
                  : 'border-[#E5E7EB] bg-white text-[#001529] hover:border-[#001529]/30',
              )}
            >
              {category.label}
            </button>
          )
        })}
      </div>
    </>
  )

  if (embedded) {
    return <div>{content}</div>
  }

  return (
    <section className="bg-white pb-8 pt-12 md:pb-10 md:pt-16">
      <div className="container">{content}</div>
    </section>
  )
}
