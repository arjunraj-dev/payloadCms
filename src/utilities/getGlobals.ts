import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 0): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal<T>(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })

/**
 * Same as getCachedGlobal but returns null when the database is unavailable
 * or the global cannot be loaded (e.g. schema not pushed yet).
 */
export const getCachedGlobalSafe = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(
    async (): Promise<DataFromGlobalSlug<T> | null> => {
      try {
        return await getGlobal<T>(slug, depth)
      } catch (error) {
        console.error(`Failed to load global "${slug}":`, error)
        return null
      }
    },
    [slug, 'safe', String(depth)],
    {
      tags: [`global_${slug}`],
    },
  )
