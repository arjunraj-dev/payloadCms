import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { InitiativeGridSection } from '@/app/(frontend)/components/sections/InitiativeGridSection'
import ProgramSectionCards from '@/app/(frontend)/components/sections/ProgramSectionCards'
import type { ProgramLabelColor } from '@/app/(frontend)/components/sections/ProgramSectionCards'
import { StatusTabsSection } from '@/app/(frontend)/components/sections/StatusTabsSection'
import type { InitiativeLabelColor } from '@/app/(frontend)/components/sections/InitiativeGridSection'
import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { iconMap } from '@/utilities/iconMap'
import { mediaUrl } from '@/utilities/cms'
import { Briefcase } from 'lucide-react'

import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Progress | MIND',
  description: 'View the progress and initiatives of the Ministry of Innovation & National Development',
}

export default async function ProgressPage() {
  const progress = await getCachedGlobalSafe('progress-page', 1)()

  if (!progress?.status) {
    notFound()
  }

  const toCard = (card: {
    icon: string
    label: string
    labelColor: string
    title: string
    description: string
  }) => ({
    icon: iconMap[card.icon] ?? Briefcase,
    label: card.label,
    labelColor: card.labelColor as InitiativeLabelColor & ProgramLabelColor,
    title: card.title,
    description: card.description,
  })

  return (
    <main>
      <StatusTabsSection
        heading={progress.status.heading}
        description={progress.status.description}
        statusCards={(progress.status.cards ?? []).map((card) => ({
          status: card.title,
          color: card.color,
          backgroundImage: mediaUrl(card.image),
          icon: iconMap[card.icon] ?? Briefcase,
          title: card.title,
          description: card.description,
        }))}
      />

      <InitiativeGridSection
        title={progress.modernizeGovernment.title}
        description={progress.modernizeGovernment.description}
        initiatives={(progress.modernizeGovernment.cards ?? []).map(toCard)}
      />

      <ProgramSectionCards
        title={progress.buildFutureReadiness.title}
        description={progress.buildFutureReadiness.description}
        backgroundColor="bg-[#F8F9FA]"
        theme="light"
        cards={(progress.buildFutureReadiness.cards ?? []).map(toCard)}
      />

      <ProgramSectionCards
        title={progress.developBahamianTalent.title}
        description={progress.developBahamianTalent.description}
        backgroundImage={mediaUrl(progress.developBahamianTalent.backgroundImage)}
        theme="accent"
        cardSurface="cream"
        cards={(progress.developBahamianTalent.cards ?? []).map(toCard)}
      />

      <ProgramSectionCards
        title={progress.driveNationalDevelopment.title}
        description={progress.driveNationalDevelopment.description}
        backgroundColor="bg-[#F8F9FA]"
        theme="light"
        cards={(progress.driveNationalDevelopment.cards ?? []).map(toCard)}
      />

      <CountryFutureSection
        heading={progress.countryFuture.heading}
        subtitle={progress.countryFuture.subtitle}
        pillarsHeading={progress.countryFuture.pillarsHeading ?? undefined}
        pillarsDescription={progress.countryFuture.pillarsDescription ?? undefined}
        footerText={progress.countryFuture.footerText ?? undefined}
        primaryButtonLabel={progress.countryFuture.primaryButton.label}
        primaryButtonHref={progress.countryFuture.primaryButton.href}
      />
    </main>
  )
}
