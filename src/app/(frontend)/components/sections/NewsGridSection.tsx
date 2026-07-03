'use client'

import { NewsCard } from '@/app/(frontend)/components/sections/NewsCard'
import {
  NewsFilterSection,
  type NewsFilterCategory,
} from '@/app/(frontend)/components/sections/NewsFilterSection'
import React, { useMemo, useState } from 'react'

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
    <section className="pb-12 pt-12 md:pb-16 md:pt-16">
      <div className="container">
        <NewsFilterSection
          embedded
          categories={FILTER_CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          heading={heading}
        />

        {filteredNews.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map(({ id, categoryValue: _categoryValue, ...cardProps }) => (
              <div key={id} className="h-full">
                <NewsCard {...cardProps} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-[#4B5563]">No updates found in this category.</p>
        )}
      </div>
    </section>
  )
}
