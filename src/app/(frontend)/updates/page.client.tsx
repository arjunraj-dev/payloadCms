'use client'

import { NewsGridSection, type NewsItem } from '@/app/(frontend)/components/sections/NewsGridSection'
import React from 'react'

export function UpdatesPageClient({ news }: { news: NewsItem[] }) {
  return <NewsGridSection news={news} />
}
