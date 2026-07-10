import React from 'react'

/** Decorative wave for Country Future / Stay connected / Contact CTA cards. */
export function CountryFutureWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/isolation-mode.svg"
        alt=""
        className="h-full w-full object-cover object-center opacity-90"
      />
    </div>
  )
}
