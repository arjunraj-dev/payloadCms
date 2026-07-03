import { ContactInfoSection } from '@/app/(frontend)/components/sections/ContactInfoSection'
import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { FollowUsSection } from '@/app/(frontend)/components/sections/FollowUsSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { SpecificEnquiriesSection } from '@/app/(frontend)/components/sections/SpecificEnquiriesSection'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { iconMap } from '@/utilities/iconMap'
import { mediaUrl, paragraphs } from '@/utilities/cms'
import { socialIconMap } from '@/utilities/socialIcons'
import { Briefcase } from 'lucide-react'
import React from 'react'

export const metadata = {
  title: 'Contact | MIND',
  description: 'Contact the Ministry of Innovation & National Development',
}

export default async function ContactPage() {
  const page = await getCachedGlobal('contact-page', 1)()

  return (
    <main>
      <HeroSection
        title={page.hero.title}
        subtitle={page.hero.subtitle}
        align="center"
        titleVariant="display"
        secondaryCTA={
          page.hero.secondaryCTA?.label && page.hero.secondaryCTA?.href
            ? { label: page.hero.secondaryCTA.label, href: page.hero.secondaryCTA.href }
            : undefined
        }
      />

      <ContactInfoSection
        address={page.officeInfo.address}
        phone={page.officeInfo.phone}
        email={page.officeInfo.email}
        hours={paragraphs(page.officeInfo.hours)}
        image={mediaUrl(page.officeInfo.image)}
      />

      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <SpecificEnquiriesSection
              embedded
              enquiries={(page.enquiries ?? []).map((enquiry) => ({
                icon: iconMap[enquiry.icon] ?? Briefcase,
                title: enquiry.title,
                description: enquiry.description,
                email: enquiry.email,
              }))}
            />
            <FollowUsSection
              heading={page.followUs.heading}
              subtitle={page.followUs.subtitle}
              socialLinks={(page.followUs.socialLinks ?? []).map((link) => ({
                platform: link.platform,
                label: link.label,
                href: link.href,
                icon: socialIconMap[link.platform] ?? Briefcase,
              }))}
            />
          </div>
        </div>
      </section>

      <CountryFutureSection
        heading={page.closing.heading}
        subtitle={page.closing.subtitle ?? ''}
        primaryButtonLabel={page.closing.primaryButton.label}
        primaryButtonHref={page.closing.primaryButton.href}
      />
    </main>
  )
}
