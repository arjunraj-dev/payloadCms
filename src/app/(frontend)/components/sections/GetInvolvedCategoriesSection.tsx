import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface GetInvolvedCategory {
  icon: LucideIcon
  image: string
  title: string
  description: string
  href: string
}

export interface GetInvolvedCategoriesSectionProps {
  categories: GetInvolvedCategory[]
}

export function GetInvolvedCategoriesSection({
  categories,
}: GetInvolvedCategoriesSectionProps) {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="text-2xl font-bold text-[#001529] sm:text-3xl lg:text-4xl">
          What we want to hear.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-12 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-[#E5E7EB] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-col p-6 sm:p-8">
                  <Icon className="size-6 text-[#001529]" aria-hidden="true" strokeWidth={1.75} />
                  <h3 className="mt-4 text-lg font-bold text-[#001529]">{category.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                    {category.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
