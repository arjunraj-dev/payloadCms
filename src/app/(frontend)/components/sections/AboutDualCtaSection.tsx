import Link from 'next/link'
import React from 'react'

export interface AboutDualCtaBlock {
  heading: string
  description: string
  buttonLabel: string
  buttonHref: string
}

export interface AboutDualCtaSectionProps {
  blocks: [AboutDualCtaBlock, AboutDualCtaBlock]
}

export function AboutDualCtaSection({ blocks }: AboutDualCtaSectionProps) {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="overflow-hidden rounded-3xl bg-[#001529]">
          {blocks.map((block, index) => (
            <div
              key={block.heading}
              className="grid grid-cols-1 items-start gap-6 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-14"
              style={index === 0 ? { borderBottom: '1px solid rgba(255,255,255,0.1)' } : undefined}
            >
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                {block.heading}
              </h2>
              <div>
                <p className="text-base leading-relaxed text-white/60 sm:text-lg">
                  {block.description}
                </p>
                <Link
                  href={block.buttonHref}
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#004B4D] to-[#008C95] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  {block.buttonLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
