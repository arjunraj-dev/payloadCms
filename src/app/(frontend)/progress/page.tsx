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
  description:
    'View the progress and initiatives of the Ministry of Innovation & National Development',
}

const DEVELOP_BAHAMIAN_TALENT_BG = '/1574f2245995d3daaf17789ddfc3c93dd9b9cb57.jpg'

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
          title: card.title,
          description: card.description,
        }))}
      />

      <InitiativeGridSection
        title={progress.modernizeGovernment.title}
        description={progress.modernizeGovernment.description}
        initiatives={(progress.modernizeGovernment.cards ?? []).map((card) => ({
          label: card.label,
          labelColor: card.labelColor as InitiativeLabelColor,
          title: card.title,
          description: card.description,
        }))}
      />

      <ProgramSectionCards
        title={progress.buildFutureReadiness.title}
        description={progress.buildFutureReadiness.description}
        theme="light"
        cardSurface="muted"
        sectionTypography="nunito"
        iconSrc="/Mordernize-gov.svg"
        sectionClassName="pt-4 md:pt-6 lg:pt-8"
        cards={(progress.buildFutureReadiness.cards ?? []).map((card) => ({
          label: card.label,
          labelColor: card.labelColor as ProgramLabelColor,
          title: card.title,
          description: card.description,
        }))}
      />

      <ProgramSectionCards
        title={progress.developBahamianTalent.title}
        description={progress.developBahamianTalent.description}
        backgroundImage={
          mediaUrl(progress.developBahamianTalent.backgroundImage) || DEVELOP_BAHAMIAN_TALENT_BG
        }
        theme="accent"
        cardSurface="cream"
        sectionTypography="nunito"
        iconSrc="/Mordernize-gov.svg"
        cards={(progress.developBahamianTalent.cards ?? []).map((card) => ({
          label: card.label,
          labelColor: card.labelColor as ProgramLabelColor,
          title: card.title,
          description: card.description,
        }))}
      />

      <ProgramSectionCards
        title={progress.driveNationalDevelopment.title}
        description={progress.driveNationalDevelopment.description}
        theme="light"
        cardSurface="muted"
        sectionTypography="nunito"
        cardLayout="wide"
        iconSrc="/Mordernize-gov.svg"
        cards={(progress.driveNationalDevelopment.cards ?? []).map((card) => ({
          label: card.label,
          labelColor: card.labelColor as ProgramLabelColor,
          title: card.title,
          description: card.description,
        }))}
      />

      <CountryFutureSection
        variant="progress"
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
