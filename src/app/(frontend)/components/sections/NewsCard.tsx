import Link from 'next/link'
import React from 'react'

export interface NewsCardProps {
  image: string
  date: string
  category: string
  title: string
  excerpt: string
  slug: string
}

export function NewsCard({ image, date, category, title, excerpt, slug }: NewsCardProps) {
  return (
    <Link
      href={`/updates/${slug}`}
      aria-label={`${title} — ${date}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg"
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] w-full rounded-t-xl object-cover"
      />

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-[#4B5563]">
          <time dateTime={date}>{date}</time>
          {' | '}
          <span>{category}</span>
        </p>

        <h3 className="mt-3 line-clamp-3 text-lg font-bold leading-snug text-[#001529]">{title}</h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#4B5563]">{excerpt}</p>

        <span className="mt-4 inline-flex w-fit items-center justify-center rounded-lg bg-[#001529] px-4 py-2 text-sm font-medium text-white transition-opacity group-hover:opacity-90">
          Read more →
        </span>
      </div>
    </Link>
  )
}
