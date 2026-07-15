import { ContactInfoSection } from '@/app/(frontend)/components/sections/ContactInfoSection'
import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { FollowUsSection } from '@/app/(frontend)/components/sections/FollowUsSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { SpecificEnquiriesSection } from '@/app/(frontend)/components/sections/SpecificEnquiriesSection'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { iconMap } from '@/utilities/iconMap'
import { mediaUrl, paragraphs } from '@/utilities/cms'
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
        subtitle={page.hero.subtitle
          .split(/\n+/)
          .map((line) => line.trim())
          .filter(Boolean)}
        align="center"
        showPattern
        titleVariant="contact"
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

      <section className="bg-white py-8 md:py-10 lg:py-[35px]">
        <div className="container">
          <div className="mx-auto grid w-full max-w-[1348px] grid-cols-1 items-stretch gap-10 xl:grid-cols-2 xl:gap-16">
            <div className="min-w-0 w-full overflow-hidden">
              <SpecificEnquiriesSection
                embedded
                enquiries={(page.enquiries ?? []).map((enquiry) => ({
                  icon: iconMap[enquiry.icon] ?? Briefcase,
                  title: enquiry.title,
                  description: enquiry.description,
                  email: enquiry.email,
                }))}
              />
            </div>
            <div className="flex min-w-0 w-full justify-center overflow-hidden xl:h-full xl:items-center xl:self-stretch">
              <FollowUsSection
                heading={page.followUs.heading}
                subtitle={page.followUs.subtitle}
                socialLinks={(page.followUs.socialLinks ?? []).map((link) => ({
                  platform: link.platform,
                  label: link.label,
                  href: link.href,
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      <CountryFutureSection
        variant="contact"
        heading={page.closing.heading}
        primaryButtonLabel={page.closing.primaryButton.label}
        primaryButtonHref={page.closing.primaryButton.href}
      />
    </main>
  )
}
