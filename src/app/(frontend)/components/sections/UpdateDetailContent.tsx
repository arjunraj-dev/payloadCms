import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'

export interface UpdateDetailContentProps {
  image: string
  imageAlt: string
  paragraphs: string[]
}

export function UpdateDetailContent({ image, imageAlt, paragraphs }: UpdateDetailContentProps) {
  return (
    <Reveal as="article" className="mt-8 md:mt-10">
      <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
        <img
          src={image}
          alt={imageAlt}
          loading="eager"
          decoding="async"
          className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
        />
      </div>

      <div className="mt-8 md:mt-10">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-base font-normal leading-6 text-[#374151] [&+&]:mt-4"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Reveal>
  )
}
