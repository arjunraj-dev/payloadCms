import { AboutDualCtaSection } from '@/app/(frontend)/components/sections/AboutDualCtaSection'
import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { DepartmentCardsSection } from '@/app/(frontend)/components/sections/DepartmentCardsSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { InitiativeCardsGrid } from '@/app/(frontend)/components/sections/InitiativeCardsGrid'
import { MinisterProfileSection } from '@/app/(frontend)/components/sections/MinisterProfileSection'
import { PolicyAreasSection } from '@/app/(frontend)/components/sections/PolicyAreasSection'
import { TextImageSection } from '@/app/(frontend)/components/sections/TextImageSection'
import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { mediaUrl, paragraphs } from '@/utilities/cms'
import { getDepartmentCardIconSrc, getPillarCardIconSrc } from '@/utilities/pillarCardIcons'

import { notFound } from 'next/navigation'

export const metadata = {
  title: 'About | MIND',
  description: 'Learn about the Ministry of Innovation & National Development',
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
        showPattern
        patternImage="/images/Isolation_Mode.png"
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
        />
      ))}

      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          <h2 className="text-center text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[40px]">
            {about.mission.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base text-[#4B5563] sm:text-lg">
            {about.mission.description}
          </p>
          <div className="mt-10 md:mt-12">
            <InitiativeCardsGrid
              variant="home"
              cards={(about.mission.cards ?? []).map((card) => ({
                iconSrc: getPillarCardIconSrc(card.title),
                title: card.title,
                description: card.description,
              }))}
            />
          </div>
        </div>
      </section>

      <AboutDualCtaSection
        blocks={[
          {
            heading: about.dualCta.first.heading,
            description: about.dualCta.first.description,
            buttonLabel: about.dualCta.first.button.label,
            buttonHref: about.dualCta.first.button.href,
          },
          {
            heading: about.dualCta.second.heading,
            description: about.dualCta.second.description,
            buttonLabel: about.dualCta.second.button.label,
            buttonHref: about.dualCta.second.button.href,
          },
        ]}
      />

      <PolicyAreasSection
        heading={about.policyAreas.heading}
        ctaLabel={about.policyAreas.cta.label}
        ctaHref={about.policyAreas.cta.href}
        policies={(about.policyAreas.policies ?? []).map((policy, index) => ({
          label: policy.label,
          href: policy.href,
          status:
            policy.status ?? (index < 5 ? ('active' as const) : ('comingSoon' as const)),
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
          backgroundColor={index % 2 === 1 ? 'bg-[#F8F9FA]' : undefined}
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
