import React from 'react'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'

export interface UpdateDetailContentProps {
  image: string
  imageAlt: string
  paragraphs: string[]
}

export function UpdateDetailContent({ image, imageAlt, paragraphs }: UpdateDetailContentProps) {
  return (
    <>
      <ScrollRise className="w-full max-w-[1026px] overflow-hidden rounded-2xl lg:rounded-3xl">
        <img
          src={image}
          alt={imageAlt}
          loading="eager"
          decoding="async"
          className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[483px]"
        />
      </ScrollRise>

      <Reveal as="div" className="w-full max-w-[1029px]">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-[16px] font-normal leading-[24px] tracking-normal text-[#53585C] [&+&]:mt-4"
          >
            {paragraph}
          </p>
        ))}
      </Reveal>
    </>
  )
}
