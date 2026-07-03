import { FollowTheWorkSection } from '@/app/(frontend)/components/sections/FollowTheWorkSection'
import { GetInvolvedCategoriesSection } from '@/app/(frontend)/components/sections/GetInvolvedCategoriesSection'
import { GetInvolvedFormSection } from '@/app/(frontend)/components/sections/GetInvolvedFormSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { TextImageSection } from '@/app/(frontend)/components/sections/TextImageSection'
import { Briefcase, Facebook, Handshake, Instagram, Linkedin, Twitter, Users } from 'lucide-react'

export const metadata = {
  title: 'Get Involved | MIND',
  description: 'Get involved with the Ministry of Innovation & National Development initiatives',
}

export default function GetInvolvedPage() {
  const categories = [
    {
      icon: Users,
      image: '/images/citizens.jpg',
      title: 'Citizens',
      description:
        "Your experience dealing with government doesn't have to be as hard as it should be. What's improved? What you'd most like to see change.",
      href: '#send-message',
    },
    {
      icon: Briefcase,
      image: '/images/busines.png',
      title: 'Businesses and entrepreneurs',
      description:
        "What's standing between you and growth? What government could do differently to make The Bahamas easier to build in.",
      href: '#send-message',
    },
    {
      icon: Handshake,
      image: '/images/partners.png',
      title: 'Partners and organisations',
      description:
        "Ideas, expertise, or capacity you'd like to bring to the work. We are actively looking for partnerships that help deliver on our mandate.",
      href: '#send-message',
    },
  ]

  const socialLinks = [
    {
      platform: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com',
    },
    {
      platform: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
    },
    {
      platform: 'x',
      label: 'X / Twitter',
      icon: Twitter,
      href: 'https://x.com',
    },
  ]

  return (
    <main>
      <HeroSection
        title="This is your Ministry too."
        subtitle={[
          "The Bahamas we are building is not something that happens to you — it's something we build together.",
          'The people who live and work here, who run businesses, who are raising families, who are just starting out — you are who this work is for, and your experience of it matters.',
        ]}
        showPattern={true}
        align="center"
      />

      <GetInvolvedCategoriesSection categories={categories} />

      <GetInvolvedFormSection />

      <TextImageSection
        heading="What happens when you reach out."
        text={[
          'Every message we receive is read by someone on the Ministry. We cannot promise a personal response to every submission — but we can promise that what you share informs how we work and what we prioritize.',
          'When specific programmes, consultations, or opportunities open up, we will announce them on our Updates page. If you want to be first to know, check back there or follow us on social media.',
        ]}
        image="/images/reachOut.png"
        imagePosition="right"
      />

      <FollowTheWorkSection
        heading="Follow the work"
        description="We share updates, announcements, and progress as it happens."
        backgroundImage="/images/follow-the-work.png"
        socialLinks={socialLinks}
      />
    </main>
  )
}
