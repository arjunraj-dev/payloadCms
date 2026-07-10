'use client'

import { GravityWaveBackground } from '@/app/(frontend)/components/shared/GravityWaveBackground'

// Bright cyan glow on the dark #0D1B2A card — matches #00F0FF with halo.
const COUNTRY_FUTURE_WAVE_PALETTE: [number, number, number][] = [
  [0, 200, 220],
  [0, 240, 255], // #00F0FF
  [120, 248, 255],
  [0, 240, 255],
  [0, 200, 220],
  [0, 240, 255],
  [0, 200, 220],
]

export function CountryFutureWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <GravityWaveBackground
        className="h-full w-full"
        variant="aurora"
        palette={COUNTRY_FUTURE_WAVE_PALETTE}
        glow
        glowColor="0,240,255"
        anchorXRatio={0.5}
        anchorYRatio={0.5}
        followSpeed={0.004}
        followDamping={0.96}
      />
    </div>
  )
}
