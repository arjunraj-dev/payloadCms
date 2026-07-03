import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mediaUrl } from '@/utilities/cms'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { UpdatesPageClient } from './page.client'

export const metadata = {
  title: 'Updates | MIND',
  description:
    'Latest updates, announcements, and news from the Ministry of Innovation & National Development',
}

export default async function UpdatesPage() {
  const updatesPage = await getCachedGlobal('updates-page', 0)()

  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'updates',
    sort: '-date',
    limit: 100,
    overrideAccess: false,
  })

  const news = docs.map((doc) => ({
    id: String(doc.id),
    slug: doc.slug ?? '',
    image: mediaUrl(doc.image),
    date: new Date(doc.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    category:
      { announcements: 'Announcement', events: 'Event', statements: 'Statement', media: 'Media' }[
        doc.category
      ] ?? doc.category,
    categoryValue: doc.category,
    title: doc.title,
    excerpt: doc.excerpt,
  }))

  return (
    <main>
      <HeroSection
        title={updatesPage.hero.title}
        subtitle={updatesPage.hero.subtitle}
        align="center"
        titleVariant="display"
      />

      <div className="bg-[#F8F9FA]">
        <UpdatesPageClient news={news} />

        <CountryFutureSection
          embedded
          heading={updatesPage.closing.heading}
          subtitle={updatesPage.closing.subtitle}
          primaryButtonLabel={updatesPage.closing.primaryButton.label}
          primaryButtonHref={updatesPage.closing.primaryButton.href}
        />
      </div>
    </main>
  )
}
