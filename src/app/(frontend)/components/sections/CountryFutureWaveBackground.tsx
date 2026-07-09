'use client'

import { GravityWaveBackground } from '@/app/(frontend)/components/shared/GravityWaveBackground'

// Silver-to-white stops for particles on the dark #0D1B2A card.
const COUNTRY_FUTURE_WAVE_PALETTE: [number, number, number][] = [
  [140, 148, 158], // cool silver
  [175, 182, 190], // soft silver
  [210, 215, 220], // light silver
  [245, 247, 250], // near white
  [210, 215, 220],
  [175, 182, 190],
  [140, 148, 158],
]

export function CountryFutureWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
      <GravityWaveBackground
        className="h-full w-full"
        variant="aurora"
        palette={COUNTRY_FUTURE_WAVE_PALETTE}
        anchorXRatio={0.5}
        anchorYRatio={0.5}
        followSpeed={0.004}
        followDamping={0.96}
      />
    </div>
  )
}
