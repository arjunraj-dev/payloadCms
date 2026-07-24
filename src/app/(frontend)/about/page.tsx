import { AboutDualCtaSection } from '@/app/(frontend)/components/sections/AboutDualCtaSection'
import { AboutMissionSection } from '@/app/(frontend)/components/sections/AboutMissionSection'
import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { DepartmentCardsSection } from '@/app/(frontend)/components/sections/DepartmentCardsSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { MinisterProfileSection } from '@/app/(frontend)/components/sections/MinisterProfileSection'
import { PolicyAreasSection } from '@/app/(frontend)/components/sections/PolicyAreasSection'
import { TextImageSection } from '@/app/(frontend)/components/sections/TextImageSection'
import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { generateGlobalMeta } from '@/utilities/generateMeta'
import { mediaUrl, paragraphs } from '@/utilities/cms'
import { getDepartmentCardIconSrc, getPillarCardIconSrc } from '@/utilities/pillarCardIcons'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getCachedGlobalSafe('about-page', 0)()

  return generateGlobalMeta({
    meta: about?.meta,
    fallbackTitle: 'About | MIND',
    fallbackDescription: 'Learn about the Ministry of Innovation & National Development',
  })
}

export default async function AboutPage() {
  const about = await getCachedGlobalSafe('about-page', 1)()

  if (!about?.hero) {
    notFound()
  }

  return (
    <main>
      <HeroSection
        title={about.hero.title}
        subtitle={paragraphs(about.hero.subtitle)}
        backgroundImage={mediaUrl(about.hero.image)}
        showPattern={false}
        titleVariant="about"
        imageClassName="object-right"
      />

      {(about.textImageSections ?? []).map((section, index) => (
        <TextImageSection
          key={section.id ?? index}
          heading={section.heading}
          text={paragraphs(section.text)}
          image={mediaUrl(section.image)}
          imagePosition={section.imagePosition ?? (index === 0 ? 'left' : 'right')}
          contained={index === 0}
          variant="about"
        />
      ))}

      <AboutMissionSection
        heading={about.mission.heading}
        description={about.mission.description}
        cards={(about.mission.cards ?? []).map((card) => ({
          iconSrc: getPillarCardIconSrc(card.title) ?? '',
          title: card.title,
          description: card.description,
        }))}
      />

      <AboutDualCtaSection
        blocks={[
          {
            heading: about.dualCta.first.heading,
            description: about.dualCta.first.description,
            buttonLabel: about.dualCta.first.button.label,
            buttonHref: about.dualCta.first.button.href,
            buttonWidth: 270,
          },
          {
            heading: about.dualCta.second.heading,
            description: about.dualCta.second.description,
            buttonLabel: about.dualCta.second.button.label,
            buttonHref: about.dualCta.second.button.href,
            buttonWidth: 280,
          },
        ]}
      />

      <PolicyAreasSection
        heading={about.policyAreas.heading}
        policies={(about.policyAreas.policies ?? []).map((policy, index) => ({
          label: policy.label,
          href: policy.href,
          status: policy.status ?? (index < 5 ? ('active' as const) : ('comingSoon' as const)),
        }))}
      />

      <DepartmentCardsSection
        heading={about.departments.heading}
        description={about.departments.description}
        departments={(about.departments.items ?? []).map((item, index) => ({
          iconSrc: getDepartmentCardIconSrc(index),
          title: item.title,
          description: item.description,
          linkLabel: item.linkLabel,
          href: item.href,
        }))}
      />

      {(about.ministerProfiles ?? []).map((profile, index) => (
        <MinisterProfileSection
          key={profile.id ?? index}
          variant="profile"
          label={profile.label}
          name={profile.name}
          title={profile.title}
          bio={paragraphs(profile.bio)}
          image={mediaUrl(profile.image)}
        />
      ))}

      <CountryFutureSection
        heading={about.countryFuture.heading}
        subtitle={about.countryFuture.subtitle}
        primaryButtonLabel={about.countryFuture.primaryButton.label}
        primaryButtonHref={about.countryFuture.primaryButton.href}
        secondaryButtonLabel={about.countryFuture.secondaryButton?.label ?? undefined}
        secondaryButtonHref={about.countryFuture.secondaryButton?.href ?? undefined}
      />
    </main>
  )
}
