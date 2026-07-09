'use client'

import { GravityWaveBackground } from '@/app/(frontend)/components/shared/GravityWaveBackground'

// Silver-to-white stops for particles on the dark navy card.
const DUAL_CTA_WAVE_PALETTE: [number, number, number][] = [
  [140, 148, 158],
  [175, 182, 190],
  [210, 215, 220],
  [245, 247, 250],
  [210, 215, 220],
  [175, 182, 190],
  [140, 148, 158],
]

export function AboutDualCtaWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
      <GravityWaveBackground
        className="h-full w-full"
        variant="aurora"
        palette={DUAL_CTA_WAVE_PALETTE}
        anchorXRatio={0.5}
        anchorYRatio={0.5}
        followSpeed={0.004}
        followDamping={0.96}
      />
    </div>
  )
}
