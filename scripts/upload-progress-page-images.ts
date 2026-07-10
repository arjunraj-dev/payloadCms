/**
 * Upload progress-page images from public/ to Payload media (S3) and link them on the progress-page global.
 *
 * Usage: pnpm upload:progress-page-images
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
dotenv.config({ path: path.join(ROOT, '.env') })

const PUBLIC_DIR = path.join(ROOT, 'public')

const IMAGE_SOURCES = [
  {
    key: 'developBahamianTalentBackground',
    sourceFile: '1574f2245995d3daaf17789ddfc3c93dd9b9cb57.jpg',
    uploadName: 'develop-bahamian-talent-background.jpg',
    alt: 'Develop Bahamian Talent section background',
    mimetype: 'image/jpeg',
  },
] as const

type ImageKey = (typeof IMAGE_SOURCES)[number]['key']

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('@payload-config')
  const payload = await getPayload({ config })

  console.log('==> Uploading progress page images...')
  const imageIds = {} as Record<ImageKey, number>

  for (const image of IMAGE_SOURCES) {
    const sourcePath = path.join(PUBLIC_DIR, image.sourceFile)
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
          mimetype: image.mimetype,
          size: data.length,
        },
      })
      console.log(`  uploaded: ${image.uploadName} (id ${doc.id}) -> ${doc.url ?? '(no url yet)'}`)
    }

    imageIds[image.key] = doc.id
  }

  console.log('==> Linking images on progress-page global...')
  const progressPage = await payload.findGlobal({ slug: 'progress-page', depth: 0 })

  await payload.updateGlobal({
    slug: 'progress-page',
    context: {
      disableRevalidate: true,
    },
    data: {
      developBahamianTalent: {
        ...progressPage.developBahamianTalent,
        backgroundImage: imageIds.developBahamianTalentBackground,
      },
    },
  })

  console.log('')
  console.log('==> Progress page images synced to CMS/S3.')
  console.log(`    developBahamianTalent.backgroundImage: ${imageIds.developBahamianTalentBackground}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
