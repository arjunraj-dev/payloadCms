import type { NewsItem } from '@/app/(frontend)/components/sections/NewsGridSection'
import type { UpdateDetailSocialLink } from '@/app/(frontend)/components/sections/UpdateDetailHeader'

export interface UpdateDetail extends NewsItem {
  imageAlt: string
  paragraphs: string[]
}

export const DEFAULT_SOCIAL_LINKS: UpdateDetailSocialLink[] = [
  { platform: 'facebook', href: 'https://facebook.com' },
  { platform: 'instagram', href: 'https://instagram.com' },
  { platform: 'linkedin', href: 'https://linkedin.com' },
  { platform: 'x', href: 'https://x.com' },
]

export const UPDATES: UpdateDetail[] = [
  {
    id: '1',
    slug: 'national-ai-literacy-initiative',
    image: '/images/national.png',
    imageAlt: 'Group of Bahamians collaborating around a laptop during an AI literacy session',
    date: '21 June 2026',
    category: 'Announcement',
    categoryValue: 'announcements',
    title: 'National AI Literacy Initiative:',
    excerpt:
      'What it is and how to get involved The Ministry has confirmed the National AI Literacy Initiative — a program...',
    paragraphs: [
      'The National AI Literacy Initiative is a forward-looking national programme designed to ensure that every Bahamian has the opportunity to understand, explore, and confidently use Artificial Intelligence (AI). As AI continues to transform industries, education, healthcare, business, and everyday life, the initiative aims to equip individuals with the knowledge and practical skills needed to thrive in an increasingly digital world. By making AI education accessible to everyone, The Bahamas is taking an important step toward building a future-ready workforce and an informed society.',
      'The programme is being developed to provide free and accessible AI learning opportunities both online and through in-person training sessions across every island of The Bahamas. Whether you are a student, educator, entrepreneur, government employee, professional, retiree, or someone simply curious about AI, the initiative is designed to meet learners at every level of experience. Training will cover AI fundamentals, responsible and ethical AI use, practical applications, digital skills, and real-world examples that help participants understand how AI can enhance work, learning, and everyday decision-making.',
      'A key goal of the National AI Literacy Initiative is to ensure that no community is left behind as technology continues to evolve. By expanding access beyond major population centres, the programme seeks to provide equal learning opportunities for residents throughout the Family Islands as well as New Providence and Grand Bahama. Through partnerships with educational institutions, community organisations, government agencies, and industry experts, the initiative will create inclusive learning environments where people of all ages can develop valuable digital competencies.',
      'Beyond building individual skills, the initiative is expected to strengthen innovation, entrepreneurship, and economic growth across the country. As more Bahamians gain confidence in using AI technologies, businesses can become more competitive, public services can become more efficient, and new opportunities for creativity and employment can emerge. Encouraging responsible AI adoption will also help ensure that technological progress is aligned with national values, transparency, privacy, and the public interest.',
      'The programme is currently being developed, and additional information will be shared as plans continue to take shape. Updates regarding registration, course schedules, training locations, learning resources, and participation opportunities will be published as they become available. We encourage everyone to stay connected through our official communication channels to receive the latest announcements and be among the first to learn how you can participate in the National AI Literacy Initiative and become part of The Bahamas\' digital future.',
    ],
  },
  {
    id: '2',
    slug: 'minister-bastian-addresses-house',
    image: '/images/update2.jpg',
    imageAlt: 'Minister Sebastian Bastian addressing the House of Assembly',
    date: '14 June 2026',
    category: 'Event',
    categoryValue: 'events',
    title: 'Minister Bastian addresses the House',
    excerpt:
      'Budget contribution highlights Minister of Innovation and National Development Hon. Sebastian Bastian delivered...',
    paragraphs: [
      'Minister of Innovation and National Development Hon. Sebastian Bastian addressed the House of Assembly during the 2026/2027 budget debate, outlining the Ministry\'s priorities for digital transformation, innovation, and national development across The Bahamas.',
      'In his contribution, Minister Bastian highlighted progress on government digital services, workforce development, and programmes designed to make public systems more accessible and efficient for Bahamians on every island.',
      'The Minister emphasised that innovation is not only about technology, but about improving everyday experiences for citizens, supporting entrepreneurs, and building the capacity needed for long-term economic growth.',
      'He also referenced ongoing work across departments and partner agencies to expand digital access, strengthen data governance, and deliver services that reduce friction for families, businesses, and communities.',
      'Further updates on legislative priorities, programme funding, and implementation timelines will be published as the budget process continues and new initiatives move forward.',
    ],
  },
  {
    id: '3',
    slug: 'mygateway-reaches-135000',
    image: '/images/update3.png',
    imageAlt: 'MyGateway digital services platform promotional graphic',
    date: '5 June 2026',
    category: 'Statements',
    categoryValue: 'statements',
    title: 'MyGateway reaches 135,000 registered',
    excerpt:
      "The Government's digital services platform now serves more than 135,000 registered Bahamians across 168 services...",
    paragraphs: [
      'The Government\'s digital services platform, MyGateway, has reached a new milestone with more than 135,000 registered Bahamians now using the system to access public services online.',
      'The platform currently supports 168 services across multiple ministries and agencies, helping citizens complete applications, renewals, and transactions without needing to visit a physical office for every step of the process.',
      'This growth reflects continued investment in digital infrastructure, user experience improvements, and outreach designed to make government services easier to find and use from anywhere in the country.',
      'Officials noted that expanded adoption supports faster service delivery, reduces administrative burden, and creates a stronger foundation for additional digital offerings in the months ahead.',
      'Bahamians who have not yet registered are encouraged to create a MyGateway account and explore the services available to them. Updates on new features, service rollouts, and platform enhancements will be shared through official Ministry channels.',
    ],
  },
]

export function getUpdateBySlug(slug: string): UpdateDetail | undefined {
  return UPDATES.find((update) => update.slug === slug)
}
