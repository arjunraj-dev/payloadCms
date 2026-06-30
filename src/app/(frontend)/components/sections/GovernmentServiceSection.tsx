import Link from 'next/link'
import React from 'react'

export interface GovernmentServiceSectionProps {
  ctaHref?: string
  image?: string
}

export function GovernmentServiceSection({
  ctaHref = '/mygateway',
  image = '/images/services/group-9.png',
}: GovernmentServiceSectionProps) {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-tight text-[#001529] sm:text-3xl lg:text-4xl">
            Looking for a government service?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">
            Ready for anything. From passport renewals to business licenses, find it all on
            MyGateway.
          </p>
          <Link
            href={ctaHref}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#001529] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Go to MyGateway →
          </Link>
        </div>

        <div className="mx-auto mt-10 max-w-4xl md:mt-12">
          <img
            src={image}
            alt="People using government services — family, online applications, and celebration"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  )
}
