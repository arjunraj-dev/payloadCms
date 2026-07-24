import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { generateGlobalMeta } from '@/utilities/generateMeta'
import type { Metadata } from 'next'
import PageTemplate from './[slug]/page'

export default PageTemplate

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getCachedGlobalSafe('homepage', 0)()

  return generateGlobalMeta({
    meta: homepage?.meta,
    fallbackTitle: 'Ministry of Innovation & National Development | The Bahamas',
    fallbackDescription:
      "The Bahamas's Ministry for preparing the nation for the future, solving national challenges, and delivering measurable progress. See what's already moving.",
  })
}
