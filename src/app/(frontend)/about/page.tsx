import { AboutDualCtaSection } from '@/app/(frontend)/components/sections/AboutDualCtaSection'
import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { DepartmentCardsSection } from '@/app/(frontend)/components/sections/DepartmentCardsSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { InitiativeCardsGrid } from '@/app/(frontend)/components/sections/InitiativeCardsGrid'
import { MinisterProfileSection } from '@/app/(frontend)/components/sections/MinisterProfileSection'
import { PolicyAreasSection } from '@/app/(frontend)/components/sections/PolicyAreasSection'
import { TextImageSection } from '@/app/(frontend)/components/sections/TextImageSection'
import {
  BarChart3,
  Building2,
  Globe,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'

export const metadata = {
  title: 'About | MIND',
  description: 'Learn about the Ministry of Innovation & National Development',
}

export default function AboutPage() {
  const initiativeCards = [
    {
      icon: BarChart3,
      title: 'Modernize Government',
      description:
        'Making government faster, simpler, and more efficient — so it works for you, not against you.',
    },
    {
      icon: Target,
      title: 'Build Future Readiness',
      description:
        'A country prepared for future opportunities and emergencies. An economy fit for the jobs and industries that are emerging.',
    },
    {
      icon: Users,
      title: 'Drive Economic Empowerment',
      description:
        'Opening pathways to opportunity so every Bahamian can participate in and benefit from national growth.',
    },
    {
      icon: TrendingUp,
      title: 'Direct Citizen-Centric Development',
      description:
        'Putting citizens at the heart of policy design, service delivery, and the decisions that shape everyday life.',
    },
  ]

  const policies = [
    { label: 'Public Wellness', href: '/policies/public-wellness' },
    { label: 'Digital Economy', href: '/policies/digital-economy' },
    { label: 'Digital Infrastructure', href: '/policies/digital-infrastructure' },
    { label: 'Cybersecurity', href: '/policies/cybersecurity' },
    { label: 'Data Privacy & Protection', href: '/policies/data-privacy' },
    { label: 'E-Government', href: '/policies/egovernment' },
    { label: 'Digital Literacy & Skills', href: '/policies/digital-literacy' },
    { label: 'Fintech & Blockchain', href: '/policies/fintech-blockchain' },
    { label: 'Innovation & Entrepreneurship', href: '/policies/innovation' },
    { label: 'National Geospatial Data', href: '/policies/geospatial-data' },
    { label: 'Environmental Sustainability', href: '/policies/environmental-sustainability' },
    { label: 'Urban Planning', href: '/policies/urban-planning' },
    { label: 'Disaster Management', href: '/policies/disaster-management' },
  ]

  const departments = [
    {
      icon: Building2,
      title: 'Department of Information & Communications Technology (DICT)',
      description:
        'Leading government digital transformation, technology infrastructure, and the systems that power modern public service delivery across The Bahamas.',
      linkLabel: 'Visit website →',
      href: '/departments/dict',
    },
    {
      icon: Smartphone,
      title: 'MyGateway',
      description:
        'The national digital platform giving Bahamians access to 150+ government services in one place — reducing time, cost, and complexity.',
      linkLabel: 'Explore MyGateway →',
      href: '/mygateway',
    },
    {
      icon: BarChart3,
      title: 'Bahamas National Statistical Institute (BNSI)',
      description:
        'The official provider of national statistics, delivering the evidence and data that underpin sound policy and accountable government.',
      linkLabel: 'View statistics →',
      href: '/departments/bnsi',
    },
    {
      icon: Shield,
      title: 'Electronic Communications Policy & Regulation',
      description:
        'Shaping the regulatory framework for electronic communications, digital connectivity, and the infrastructure that keeps The Bahamas connected.',
      linkLabel: 'Learn more →',
      href: '/departments/electronic-communications',
    },
  ]

  return (
    <main>
      <HeroSection
        title="A new Ministry. A clear mandate."
        subtitle={[
          'The Ministry of Innovation and National Development is here to serve Bahamians — with a mandate to modernize government, build future readiness, and deliver measurable progress.',
          'We have the opportunity to help lead The Bahamas prepare for the future, solve national challenges, and put citizens at the centre of everything we do.',
        ]}
        backgroundImage="/images/about.png"
        showPattern={false}
        imageClassName="object-right"
      />

      <TextImageSection
        heading="What we're here to do."
        text={[
          "MIND is the Government's strategy, innovation, and implementation arm.",
          'We work across the public service to make government simpler and faster — designing and delivering citizen-centric digital services and programmes.',
          'We coordinate national development p riorities, build human capital, and establish the innovation ecosystems The Bahamas needs to compete.',
          'Our work connects policy, technology, and delivery — turning national ambition into practical outcomes for every Bahamian.',
        ]}
        image="/images/ministry-robotic-hand.jpg"
        imagePosition="left"
      />

      <TextImageSection
        heading="Why this matters for your life."
        text={[
          'Every Bahamian deserves access to world-class government services. Better digital services mean less time spent navigating government and more time for the things that matter.',
          'Innovation in government means better outcomes for healthcare, education, and the economy — and a public service that responds to real needs.',
          'When government works better, communities are stronger, businesses can grow, and every citizen has a fairer chance to participate in national progress.',
        ]}
        image="/images/why-matters.jpg"
        imagePosition="right"
      />

      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          <h2 className="text-2xl font-bold text-[#001529] sm:text-3xl lg:text-4xl">
            Everything we do points in one direction.
          </h2>
          <p className="mt-4 max-w-3xl text-base text-[#4B5563] sm:text-lg">
            Central to our mission is the transformation of The Bahamas, where citizens are at the
            heart of everything we do.
          </p>
          <div className="mt-10 md:mt-12">
            <InitiativeCardsGrid cards={initiativeCards} variant="muted" />
          </div>
        </div>
      </section>

      <AboutDualCtaSection
        blocks={[
          {
            heading: "We'd rather show you than tell you",
            description:
              'Discover the real progress being made through ongoing programmes, community investments, and practical solutions designed to improve everyday life.',
            buttonLabel: 'See our projects →',
            buttonHref: '/progress',
          },
          {
            heading: 'Building on what The Bahamas already set out to become.',
            description:
              'MIND was established to execute the strategic priorities of the government — driving digital transformation, building human capital, and implementing evidence-based policy.',
            buttonLabel: 'See our progress →',
            buttonHref: '/progress',
          },
        ]}
      />

      <PolicyAreasSection policies={policies} />

      <DepartmentCardsSection departments={departments} />

      <MinisterProfileSection
        variant="profile"
        label="The Minister"
        name="Hon. Sebastian J. Bastian"
        title="Minister of Innovation and National Development"
        bio={[
          'Hon. Sebastian J. Bastian leads the Ministry of Innovation and National Development with a focus on modernizing government, expanding digital access, and preparing Bahamians for the opportunities ahead.',
          'His work centres on making public services faster and simpler, strengthening national development planning, and ensuring innovation serves citizens across every island.',
          'Under his leadership, MIND is driving programmes that connect policy, technology, and delivery — turning national ambition into practical outcomes for every Bahamian.',
        ]}
        image="/images/minister-portrait.jpg"
      />

      <MinisterProfileSection
        variant="profile"
        label="The Minister of State"
        name="Hon. Wayde Alexander Watson"
        title="Minister of State for Innovation and National Development"
        bio={[
          'Hon. Wayde Alexander Watson supports the Ministry’s mandate to deliver citizen-centred innovation, strengthen digital infrastructure, and advance national development priorities.',
          'He works across government and community partners to ensure programmes are practical, inclusive, and aligned with the needs of Bahamians in every constituency.',
          'His portfolio includes supporting the rollout of digital services, fostering innovation ecosystems, and helping connect national strategy to local impact.',
        ]}
        image="/images/minister-wayne.jpg"
        backgroundColor="bg-[#F8F9FA]"
      />

      <CountryFutureSection
        heading="This is your Ministry too."
        subtitle="The best ideas won't come from government alone. Whether you're a citizen, a business, a community organization, or an international partner, we want to hear from you."
        primaryButtonLabel="See our latest news →"
        primaryButtonHref="/updates"
        secondaryButtonLabel="Contact us"
        secondaryButtonHref="/contact"
      />
    </main>
  )
}
