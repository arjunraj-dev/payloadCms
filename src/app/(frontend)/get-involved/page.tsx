import { FollowTheWorkSection } from '@/app/(frontend)/components/sections/FollowTheWorkSection'
import { GetInvolvedCategoriesSection } from '@/app/(frontend)/components/sections/GetInvolvedCategoriesSection'
import { GetInvolvedFormSection } from '@/app/(frontend)/components/sections/GetInvolvedFormSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { TextImageSection } from '@/app/(frontend)/components/sections/TextImageSection'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { iconMap } from '@/utilities/iconMap'
import { mediaUrl, paragraphs } from '@/utilities/cms'
import { socialIconMap } from '@/utilities/socialIcons'
import { Briefcase } from 'lucide-react'

export const metadata = {
  title: 'Get Involved | MIND',
  description: 'Get involved with the Ministry of Innovation & National Development initiatives',
}

export default async function GetInvolvedPage() {
  const page = await getCachedGlobal('get-involved-page', 1)()

  return (
    <main>
      <HeroSection
        title={page.hero.title}
        subtitle={paragraphs(page.hero.subtitle)}
        showPattern={true}
        align="center"
      />

      <GetInvolvedCategoriesSection
        heading={page.categoriesSection.heading}
        categories={(page.categoriesSection.categories ?? []).map((category) => ({
          icon: iconMap[category.icon] ?? Briefcase,
          image: mediaUrl(category.image),
          title: category.title,
          description: category.description,
          href: category.href,
        }))}
      />

      <GetInvolvedFormSection
        formTitle={page.form.formTitle}
        illustrationImage={mediaUrl(page.form.illustrationImage)}
      />

      <TextImageSection
        heading={page.reachOut.heading}
        text={paragraphs(page.reachOut.text)}
        image={mediaUrl(page.reachOut.image)}
        imagePosition={page.reachOut.imagePosition ?? 'right'}
      />

      <FollowTheWorkSection
        heading={page.followTheWork.heading}
        description={page.followTheWork.description}
        backgroundImage={mediaUrl(page.followTheWork.backgroundImage)}
        socialLinks={(page.followTheWork.socialLinks ?? []).map((link) => ({
          platform: link.platform,
          label: link.label,
          href: link.href,
          icon: socialIconMap[link.platform] ?? Briefcase,
        }))}
      />
    </main>
  )
}
