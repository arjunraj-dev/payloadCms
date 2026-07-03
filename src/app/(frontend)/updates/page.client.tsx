'use client'

import { NewsGridSection } from '@/app/(frontend)/components/sections/NewsGridSection'
import { UPDATES } from '@/app/(frontend)/updates/data'
import React from 'react'

export function UpdatesPageClient() {
  return <NewsGridSection news={UPDATES} />
}
