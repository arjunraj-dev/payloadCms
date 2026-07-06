const PILLAR_CARD_ICONS: { match: RegExp; src: string }[] = [
  { match: /modernize/i, src: '/Mordernize-gov.svg' },
  { match: /future\s*readiness|build\s*future/i, src: '/build-future.svg' },
  { match: /bahamian\s*talent|develop\s*bahamian/i, src: '/develop-behamian.svg' },
  { match: /national\s*development|drive\s*national/i, src: '/drive-national.svg' },
]

const DEPARTMENT_CARD_ICONS = [
  '/Mordernize-gov.svg',
  '/build-future.svg',
  '/develop-behamian.svg',
  '/drive-national.svg',
] as const

export function getDepartmentCardIconSrc(index: number): string {
  return DEPARTMENT_CARD_ICONS[index] ?? DEPARTMENT_CARD_ICONS[0]
}

export function getPillarCardIconSrc(title: string): string | undefined {
  const match = PILLAR_CARD_ICONS.find(({ match: pattern }) => pattern.test(title))
  return match?.src
}
