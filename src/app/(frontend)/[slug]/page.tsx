import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { DrawThreadsSection } from '@/app/(frontend)/components/sections/DrawThreadsSection'
import { GovernmentServiceSection } from '@/app/(frontend)/components/sections/GovernmentServiceSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { InitiativeCardsGrid } from '@/app/(frontend)/components/sections/InitiativeCardsGrid'
import { MinistryBuiltSection } from '@/app/(frontend)/components/sections/MinistryBuiltSection'
import { MinisterProfileSection } from '@/app/(frontend)/components/sections/MinisterProfileSection'
import { ShowYouSection } from '@/app/(frontend)/components/sections/ShowYouSection'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { Briefcase, Target, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const initiativeCards = [
  {
    icon: Briefcase,
    title: 'Modernize Government',
    description: 'Our goal is to make it easier to work with the government.',
  },
  {
    icon: Target,
    title: 'Build Future-Resilience',
    description: "We're making sure that the Bahamas is ready for the challenges of tomorrow.",
  },
  {
    icon: Users,
    title: 'Develop Bahamian Talent',
    description: "We're helping Bahamians get the skills they need to succeed.",
  },
  {
    icon: TrendingUp,
    title: 'Drive National Development',
    description: "We're working to build a stronger and more prosperous Bahamas for all.",
  },
] as const

const drawThreadsTags = [
  { label: 'BNSI', href: '/departments/bnsi' },
  { label: 'Bahamas National Statistical Institute', href: '/departments/bnsi' },
  {
    label: 'Department of Information and Communications Technology',
    href: '/departments/dict',
  },
  { label: 'Digital Transformation Unit', href: '/departments/dtu' },
]

const showYouCards = [
  {
    label: 'LIVE',
    labelColor: 'green' as const,
    title: 'MyGateway',
    description:
      "More than 135,000 Bahamians already use it to access 168 government services online — and we're actively making it better.",
  },
  {
    label: 'COMING',
    labelColor: 'orange' as const,
    title: 'National Artificial Intelligence Committee',
    description:
      'The body that will govern how AI operates in The Bahamas — being established to make sure this technology works in the interest of Bahamians.',
  },
  {
    label: 'COMING',
    labelColor: 'orange' as const,
    title: 'Bahamas AI Skills Initiative',
    description:
      'AI training and literacy for every Bahamian — online and in person, on every island, at every level',
  },
  {
    label: 'IN PROGRESS',
    labelColor: 'blue' as const,
    title: 'Renewing Vision 2040',
    description:
      "The Bahamas' national development plan is being renewed and brought current — with the machinery to actually deliver it.",
  },
]

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className={decodedSlug === 'home' ? undefined : 'pt-16 pb-24'}>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {decodedSlug === 'home' ? (
        <HeroSection
          title="Building today what The Bahamas needs to win tomorrow."
          subtitle="And we're already moving."
          primaryCTA={{ label: "See what's already moving →", href: '/progress' }}
          secondaryCTA={{ label: 'Get involved →', href: '/get-involved' }}
          backgroundImage={[
            '/images/hero-section-images/bahamas-future.png',
            '/images/hero-section-images/my-gateway.png',
            '/images/hero-section-images/smart-gov.png',
            '/images/hero-section-images/ai-training.png',
            '/images/hero-section-images/renewing-vision.png',
            '/images/hero-section-images/responsible-ai.png',
          ]}
        />
      ) : (
        <RenderHero {...hero} />
      )}
      {decodedSlug === 'home' && <ShowYouSection cards={showYouCards} />}
      {decodedSlug === 'home' && (
        <MinistryBuiltSection
          heading="A Ministry built to deliver"
          description={[
            'Our task is to help The Bahamas prepare for the future and its challenges, and to seize its incredible opportunities.',
            'For the first time, we have the leadership, the blueprint, and the mandate to ensure that we are not just reacting to change, but leading it. We are making sure that every Bahamian — wherever they live — can reach opportunity.',
          ]}
          image="/images/ministry-robotic-hand.jpg"
          buttonLabel="More about the Ministry →"
          buttonHref="/about"
        />
      )}
      {decodedSlug === 'home' && (
        <MinisterProfileSection
          label="The Minister"
          bio="MIND has a clear mandate. We are giving Bahamians back their time by making government simpler and faster. We are making sure every Bahamian — wherever they live — can reach opportunity. And we are preparing our people for the jobs and industries that are emerging. That's the work. And we've already started."
          name="Hon. Sebastian J. Bastian"
          title="Minister of Economic Affairs"
          image="/images/minister-portrait.jpg"
        />
      )}
      {decodedSlug === 'home' && (
        <section className="bg-white py-12 md:py-16 lg:py-20">
          <div className="container mb-10 text-center md:mb-12">
            <h2 className="mx-auto max-w-3xl text-2xl font-bold leading-tight text-[#001529] sm:text-3xl lg:text-4xl">
              Everything we do points toward one thing — more opportunity for every Bahamian.
            </h2>
            <Link
              href="/progress"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#001529] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              See how we&apos;re doing it →
            </Link>
          </div>
          <InitiativeCardsGrid cards={[...initiativeCards]} />
        </section>
      )}
      {decodedSlug === 'home' && <GovernmentServiceSection />}
      {decodedSlug === 'home' && <DrawThreadsSection tags={drawThreadsTags} />}
      {decodedSlug === 'home' && (
        <CountryFutureSection
          heading={"This is our country's future.\nHelp shape it."}
          subtitle="The Bahamas' development relies on its people. Join us as we work to create a more prosperous, sustainable and inclusive future for all Bahamians. Your voice matters, your skills matter — help us shape our country's future."
          primaryButtonLabel="Get involved →"
          primaryButtonHref="/get-involved"
        />
      )}
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
