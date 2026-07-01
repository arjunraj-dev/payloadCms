import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { InitiativeGridSection } from '@/app/(frontend)/components/sections/InitiativeGridSection'
import ProgramSectionCards from '@/app/(frontend)/components/sections/ProgramSectionCards'
import { StatusTabsSection } from '@/app/(frontend)/components/sections/StatusTabsSection'
import {
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  Cpu,
  Folder,
  GraduationCap,
  Lightbulb,
  Monitor,
  RefreshCw,
  Target,
} from 'lucide-react'

export const metadata = {
  title: 'Progress | MIND',
  description: 'View the progress and initiatives of the Ministry of Innovation & National Development',
}

export default function ProgressPage() {
  const statusCards = [
    {
      status: 'live',
      color: '#16A34A',
      backgroundImage: '/images/Live.jpg',
      icon: Monitor,
      title: 'Live',
      description: 'Bahamians can use it today.',
    },
    {
      status: 'in-progress',
      color: '#3B82F6',
      backgroundImage: '/images/In-progress.jpg',
      icon: RefreshCw,
      title: 'In Progress',
      description: 'Work underway, almost ready.',
    },
    {
      status: 'coming',
      color: '#A17D4D',
      backgroundImage: '/images/coming.jpg',
      icon: Calendar,
      title: 'Coming',
      description: 'Confirmed, being prepared.',
    },
    {
      status: 'planned',
      color: '#1F2937',
      backgroundImage: '/images/planned.jpg',
      icon: Lightbulb,
      title: 'Planned',
      description: 'On the roadmap.',
    },
  ]

  const modernizeInitiatives = [
    {
      icon: Folder,
      label: 'LIVE',
      labelColor: 'green' as const,
      title: 'MyGateway',
      description:
        'The Government’s unified digital services platform — one place to access government services online, from anywhere. MyGateway already hosts 168 government services and has more than 135,000 registered users, with around 4,000 transactions processed every month. And we’re not stopping there — a modernization programme is actively underway to make the platform easier to use, interoperable and more secure. Link: mygateway.gov.bs',
    },
    {
      icon: Folder,
      label: 'IN PROGRESS',
      labelColor: 'blue' as const,
      title: 'Microsoft 365 Rollout',
      description:
        'Modernizing how government works on the inside. Rolling out Microsoft 365 — including Teams, SharePoint, Copilot AI and OneDrive — across the public service to improve collaboration, reduce paperwork, and give public servants the tools they need to do their jobs well. A more productive public service means better service for Bahamians.',
    },
    {
      icon: Folder,
      label: 'COMING',
      labelColor: 'orange' as const,
      title: 'Digital Policy Framework',
      description:
        'Applying for a police certificate is one of the most common interactions Bahamians have with government. We’re making it digital — so you can apply online, track your application, and receive your certificate without visiting a station. The pilot is ready; rollout is being prepared.',
    },
    {
      icon: Folder,
      label: 'COMING',
      labelColor: 'orange' as const,
      title: 'National Digital ID',
      description:
        'Proving who you are to your own government shouldn’t mean carrying a stack of documents from one office to the next. A national digital ID changes that — one trusted, secure credential to access services, sign documents, and receive what you’re owed. Built carefully, with privacy and security at its core.',
    },
    {
      icon: Folder,
      label: 'PLANNED',
      labelColor: 'planned' as const,
      title: 'Smart Government Portal',
      description:
        'A suite of AI-powered tools built for the public service — designed to help public officers work smarter, draft faster, and spend less time on administrative tasks and more time serving Bahamians. Includes tools for briefings, correspondence, research, and meeting management.',
    },
  ]

  const buildFutureCards = [
    {
      icon: Cpu,
      label: 'COMING',
      labelColor: 'orange' as const,
      title: 'National Artificial Intelligence Commission',
      description:
        'The body that will guide how The Bahamas adopts and governs artificial intelligence. The Committee brings together government, industry, and expertise to develop the national AI strategy, establish governance standards, and ensure AI works in the interest of Bahamians. Establishment is being prepared.',
    },
    {
      icon: GraduationCap,
      label: 'PLANNED',
      labelColor: 'planned' as const,
      title: 'Bahamas AI Skills Initiative',
      description:
        'A national programme to give every Bahamian access to AI literacy and AI training. The goal is practical: equip Bahamians with the knowledge to use AI tools confidently, compete in an AI-powered economy, and participate in the industries being built around them.',
    },
    {
      icon: BookOpen,
      label: 'PLANNED',
      labelColor: 'planned' as const,
      title: 'Bahamas Future Skills Academy',
      description:
        'A national platform — online and in-person — offering training in the skills the future demands: artificial intelligence, data analytics, cybersecurity, software development, and more. Designed to reach Bahamians on every island, at every stage of their career.',
    },
  ]

  const developTalentCards = [
    {
      icon: Lightbulb,
      label: 'IN PROGRESS',
      labelColor: 'blue' as const,
      title: 'National AI Literacy Initiative',
      description:
        'A foundational understanding of artificial intelligence — what it is, how it works, and how to use it responsibly — made available to Bahamians at every level, from first steps to advanced mastery. Training will be offered both online and in person, across the public service and the country as a whole.',
    },
    {
      icon: GraduationCap,
      label: 'PLANNED',
      labelColor: 'planned' as const,
      title: 'Bahamas AI Skills Initiative',
      description:
        'A national programme to give every Bahamian access to AI literacy and AI training. The goal is practical: equip Bahamians with the knowledge to use AI tools confidently, compete in an AI-shaped economy, and participate in the industries being built around them.',
    },
    {
      icon: BookOpen,
      label: 'PLANNED',
      labelColor: 'planned' as const,
      title: 'Bahamas Future Skills Academy',
      description:
        'A national platform — online and in-person — offering training in the skills the future demands: artificial intelligence, data analytics, cybersecurity, software development, and more. Designed to reach Bahamians on every island, at every stage of their career.'
    },
  ]

  const driveNationalCards = [
    {
      icon: Target,
      label: 'IN PROGRESS',
      labelColor: 'green' as const,
      title: 'Renewing Vision 2040',
      description:
        'Vision 2040 set the course for The Bahamas. This Ministry is built to renew that vision and help deliver it. A review of the national development plan is underway — engaging ministries, agencies, and stakeholders — with an updated framework targeted for the end of this year. [NEEDS SPECIFICS — confirm end-2026 target date before publishing]'
    },
    {
      icon: Building2,
      label: 'COMING',
      labelColor: 'orange' as const,
      title: 'National Planning and Development Institute',
      description:
        'Our national development plan has struggled to survive changes in political leadership — starting over each cycle rather than building on what came before. This Institute is designed to change that: an independent statutory body, accountable to Parliament, with dedicated staff to steward the national plan, measure progress, and hold delivery to account — beyond the reach of any political cycle. [NEEDS SPECIFICS — confirm Cabinet/legislative timeline before badge reads "Coming" publicly]'
    },
    {
      icon: BarChart3,
      label: 'PLANNED',
      labelColor: 'planned' as const,
      title: 'National Delivery Dashboard',
      description:
        'A public, live dashboard tracking the Government’s progress against national priorities — so every Bahamian can see what has been committed to and where things stand. This is the accountability infrastructure the country has needed: not just a plan, but a visible, honest record of delivery.'
    },
  ]

  return (
    <main>
      <StatusTabsSection statusCards={statusCards} />

      <InitiativeGridSection
        title="Modernize Government"
        description="Building government that's faster, smarter and more responsive to citizens and businesses."
        initiatives={modernizeInitiatives}
      />

      <ProgramSectionCards
        title="Build Future Readiness"
        description="Preparing the country for what’s ahead — starting with the foundations that make sure new technology serves Bahamians safely and responsibly. This is early-stage work, and we’d rather show one real, confirmed step than promise several that aren’t yet."
        backgroundColor="bg-[#F8F9FA]"
        theme="light"
        cards={buildFutureCards}
      />

      <ProgramSectionCards
        title="Develop Bahamian Talent"
        description="Equipping Bahamians with the skills for tomorrow — because a nation that doesn't invest in its talent is a nation that doesn't have a future."
        backgroundImage="/images/develop.jpg"
        theme="accent"
        cardSurface="cream"
        cards={developTalentCards}
      />

      <ProgramSectionCards
        title="Drive National Development"
        description="Turning national priorities into measurable outcomes. Building the living plan, the institutions, and the accountability systems that make sure work actually gets done — and that progress can be tracked and verified."
        backgroundColor="bg-[#F8F9FA]"
        theme="light"
        cards={driveNationalCards}
      />

      <CountryFutureSection
        heading="This page moves when we do."
        subtitle="As each program, initiative, and policy moves from 'Planned' to 'Live', this page moves with it. This is the direction we share to show what we're working on, and how it's going."
        pillarsHeading="Three pillars. One purpose."
        pillarsDescription="Modernizing government, preparing people for the future, and delivering on national priorities — all of it points in the same direction: more opportunity for more Bahamians. Wherever you live. Whatever you're building. However you got here."
        footerText="If you want to be part of the work — not just watch it — we want to hear from you."
        primaryButtonLabel="Get involved →"
        primaryButtonHref="/get-involved"
      />
    </main>
  )
}
