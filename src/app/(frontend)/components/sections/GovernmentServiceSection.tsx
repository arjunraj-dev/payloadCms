import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'

export interface GovernmentServiceSectionProps {
  heading?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  image?: string
}

export function GovernmentServiceSection({
  heading = 'Looking for a government service?',
  description = 'Ready for anything. From passport renewals to business licenses, find it all on MyGateway.',
  ctaLabel = 'Go to MyGateway →',
  ctaHref = '/mygateway',
  image = '/images/services/group-9.png',
}: GovernmentServiceSectionProps) {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <Reveal as="div" className="mx-auto max-w-2xl text-center">
          <h2 className="text-center text-[clamp(1.75rem,4vw,40px)] font-normal leading-[1.175] tracking-normal text-[#001529] lg:text-[40px] lg:leading-[47px]">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">{description}</p>
          <Link
            href={ctaHref}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-[linear-gradient(90deg,rgba(13,27,42,1)_0%,rgba(13,27,42,1)_20%,rgba(34,54,77,1)_40%,rgba(34,54,77,1)_60%,rgba(41,60,81,1)_80%,rgba(13,27,42,1)_100%)] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {ctaLabel}
          </Link>
        </Reveal>

        <Reveal as="div" delay={0.1} className="mx-auto mt-10 max-w-4xl md:mt-12">
          <img
            src={image}
            alt="People using government services — family, online applications, and celebration"
            className="h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  )
}
