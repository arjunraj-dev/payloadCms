'use client'

import { NewsCard } from '@/app/(frontend)/components/sections/NewsCard'
import {
  NewsFilterSection,
  type NewsFilterCategory,
} from '@/app/(frontend)/components/sections/NewsFilterSection'
import React, { useMemo, useState } from 'react'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

export interface NewsItem {
  id: string
  image: string
  date: string
  category: string
  categoryValue?: string
  title: string
  excerpt: string
  slug: string
}

export interface NewsGridSectionProps {
  news: NewsItem[]
  onCategorySelect?: (category: string) => void
  heading?: string
}

const FILTER_CATEGORIES: NewsFilterCategory[] = [
  { label: 'All', value: 'all' },
  { label: 'Announcements', value: 'announcements' },
  { label: 'Events', value: 'events' },
  { label: 'Statements', value: 'statements' },
  { label: 'Media', value: 'media' },
]

export function NewsGridSection({ news, onCategorySelect, heading }: NewsGridSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') {
      return news
    }

    return news.filter(
      (item) => (item.categoryValue ?? item.category.toLowerCase()) === selectedCategory,
    )
  }, [news, selectedCategory])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    onCategorySelect?.(category)
  }

  return (
    <section className="bg-white py-8 md:py-10 lg:py-[35px]">
      <div className="container">
        <div className="mx-auto flex w-full max-w-[1348px] flex-col gap-6 sm:gap-8 lg:gap-[30px]">
          <NewsFilterSection
            embedded
            categories={FILTER_CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            heading={heading}
          />

          {filteredNews.length > 0 ? (
            <StaggerGroup
              as="div"
              className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3 xl:gap-10"
            >
              {filteredNews.map(({ id, categoryValue: _categoryValue, ...cardProps }) => (
                <StaggerItem as="div" key={id} className="flex h-full min-w-0 w-full">
                  <NewsCard {...cardProps} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <p className="text-center text-[#53585C]">No updates found in this category.</p>
          )}
        </div>
      </div>
    </section>
  )
}
