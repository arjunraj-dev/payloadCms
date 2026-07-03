import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { UpdatesPageClient } from './page.client'

export const metadata = {
  title: 'Updates | MIND',
  description:
    'Latest updates, announcements, and news from the Ministry of Innovation & National Development',
}

export default function UpdatesPage() {
  return (
    <main>
      <HeroSection
        title="Latest from the Ministry"
        subtitle="We publish updates as the work moves. Announcements, events, statements, and progress — when it happens, not when it's polished."
        align="center"
        titleVariant="display"
      />

      <div className="bg-[#F8F9FA]">
        <UpdatesPageClient />

        <CountryFutureSection
          embedded
          heading="Stay connected."
          subtitle="We publish updates here as the work moves. For the full picture of what we're building — and where things stand"
          primaryButtonLabel="Get involved →"
          primaryButtonHref="/get-involved"
        />
      </div>
    </main>
  )
}
