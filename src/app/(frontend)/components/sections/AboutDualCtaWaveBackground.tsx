import React from 'react'

/** Static wave vector for dark navy About dual-CTA card. */
export function AboutDualCtaWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/vector.svg"
        alt=""
        className="h-full w-full object-cover object-center mix-blend-screen"
      />
    </div>
  )
}
