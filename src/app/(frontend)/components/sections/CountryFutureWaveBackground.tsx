import React from 'react'

/**
 * Decorative wave for Country Future CTA cards.
 * Figma (home): 1097.1 × 393.3, right-aligned in the 1347px card (~250px from left).
 * Opacity matches vector.svg (group opacity 0.15 + screen blend).
 */
export function CountryFutureWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/isolation-mode.svg"
        alt=""
        width={1097}
        height={393}
        className="absolute top-0 right-0 h-full w-auto max-w-full object-cover object-right mix-blend-screen lg:w-[1097.1px] lg:max-w-none"
      />
    </div>
  )
}
