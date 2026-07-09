/**
 * Upload government-service mosaic images to Payload media (S3) and link them on the homepage global.
 *
 * Usage: pnpm upload:government-service-images
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
dotenv.config({ path: path.join(ROOT, '.env') })

const SOURCE_DIR = path.join(ROOT, 'public/govermant-service')

const IMAGE_SOURCES = [
  {
    key: 'family',
    sourceFile: '39a9165c48e18d3272f1bf8fca93a48d5c38bba5.png',
    uploadName: 'government-service-family.png',
    alt: 'Family smiling outdoors',
  },
  {
    key: 'laptop',
    sourceFile: '38a45de76275c4f1afdaa13b5c28eb300c3f9ebe.png',
    uploadName: 'government-service-laptop.png',
    alt: 'Person using government services on a laptop',
  },
  {
    key: 'celebrating',
    sourceFile: '0e3b072b9794f7bbcb2e51da77d0c3a9838f48bf.png',
    uploadName: 'government-service-celebrating.png',
    alt: 'Person celebrating a successful government service',
  },
] as const

type ImageKey = (typeof IMAGE_SOURCES)[number]['key']

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('@payload-config')
  const payload = await getPayload({ config })

  console.log('==> Uploading government service mosaic images...')
  const imageIds = {} as Record<ImageKey, number>

  for (const image of IMAGE_SOURCES) {
    const sourcePath = path.join(SOURCE_DIR, image.sourceFile)
    if (!fs.existsSync(sourcePath)) {
      console.error(`ERROR: missing source file ${sourcePath}`)
      process.exit(1)
    }

    const existing = await payload.find({
      collection: 'media',
      where: {
        or: [{ filename: { equals: image.uploadName } }, { alt: { equals: image.alt } }],
      },
      limit: 1,
      depth: 0,
    })

    let doc = existing.docs[0]
    if (doc) {
      console.log(`  reuse: ${image.uploadName} (id ${doc.id})`)
    } else {
      const data = fs.readFileSync(sourcePath)
      doc = await payload.create({
        collection: 'media',
        data: { alt: image.alt },
        file: {
          name: image.uploadName,
          data,
          mimetype: 'image/png',
          size: data.length,
        },
      })
      console.log(`  uploaded: ${image.uploadName} (id ${doc.id}) -> ${doc.url ?? '(no url yet)'}`)
    }

    imageIds[image.key] = doc.id
  }

  console.log('==> Linking images on homepage global...')
  const homepage = await payload.findGlobal({ slug: 'homepage', depth: 0 })

  await payload.updateGlobal({
    slug: 'homepage',
    context: {
      disableRevalidate: true,
    },
    data: {
      governmentService: {
        ...homepage.governmentService,
        images: {
          family: imageIds.family,
          laptop: imageIds.laptop,
          celebrating: imageIds.celebrating,
        },
      },
    },
  })

  console.log('')
  console.log('==> Government service images synced to CMS/S3.')
  console.log(`    family: ${imageIds.family}`)
  console.log(`    laptop: ${imageIds.laptop}`)
  console.log(`    celebrating: ${imageIds.celebrating}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
