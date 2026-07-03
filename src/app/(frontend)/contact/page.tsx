import { ContactInfoSection } from '@/app/(frontend)/components/sections/ContactInfoSection'
import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { FollowUsSection } from '@/app/(frontend)/components/sections/FollowUsSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { SpecificEnquiriesSection } from '@/app/(frontend)/components/sections/SpecificEnquiriesSection'
import { Facebook, Handshake, Instagram, Linkedin, Megaphone, Twitter } from 'lucide-react'
import React from 'react'

export const metadata = {
  title: 'Contact | MIND',
  description: 'Contact the Ministry of Innovation & National Development',
}

const ENQUIRIES = [
  {
    icon: Megaphone,
    title: 'Media & press',
    description: 'For media enquiries, interview requests, and press information.',
    email: 'info@mediamindbahamas.com',
  },
  {
    icon: Handshake,
    title: 'Partnerships & business',
    description: 'For organisations and businesses interested in working with the Ministry.',
    email: 'info@businessmindbahamas.com',
  },
] as const

const SOCIAL_LINKS = [
  { platform: 'facebook', icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { platform: 'instagram', icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { platform: 'x', icon: Twitter, label: 'X', href: 'https://x.com' },
] as const

export default function ContactPage() {
  return (
    <main>
      <HeroSection
        title="Contact the Ministry."
        subtitle="Find us below — or if you want to share ideas, feedback, or get involved in our work, head to Get Involved."
        align="center"
        titleVariant="display"
        secondaryCTA={{ label: 'Get Involved →', href: '/get-involved' }}
      />

      <ContactInfoSection
        address="Goodman's Bay Corporate Center, Nassau, New Providence, The Bahamas"
        phone="242-604-7300"
        email="info@mindbahamas.com"
        hours={['Monday — Friday, 9:00 AM – 5:00 PM', 'Excluding public holidays']}
        image="/images/ourOffice-flag.png"
      />

      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <SpecificEnquiriesSection embedded enquiries={[...ENQUIRIES]} />
            <FollowUsSection socialLinks={[...SOCIAL_LINKS]} />
          </div>
        </div>
      </section>

      <CountryFutureSection
        heading="Looking to share feedback, ideas, or get involved in our work? That's a different conversation — and we'd love to have it."
        subtitle=""
        primaryButtonLabel="Get involved →"
        primaryButtonHref="/get-involved"
      />
    </main>
  )
}
