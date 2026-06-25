export type Buyer = {
  name: string
  price: string
  amount?: number
  design?: string
}

export type Build = {
  slug: string
  title: string
  short: string
  price?: string
  time?: string
  builders?: string[]
  buyers?: Buyer[]
  photos: string[]
  notes?: string
  extras?: string[]
}

export const builds: Build[] = [
  {
    slug: 'br-cybergaming84-castle',
    title: "BR_CYBERGAMING84's Castle",
    short: 'A grand castle build with battlements and interior rooms.',
    price: '200,000$',
    time: '2 weeks',
    builders: ['Mihaitzuuu', 'Luna2121654'],
    photos: [
      '/assets/builds/br-cybergaming84-castle/br-cybergaming84-castle-1.png',
      '/assets/builds/br-cybergaming84-castle/br-cybergaming84-castle-2.png',
      '/assets/builds/br-cybergaming84-castle/br-cybergaming84-castle-3.png'
    ]
  },
  {
    slug: 'gorb-tubs',
    title: 'GORB Tubs',
    short: 'Modular tub designs available in multiple variants.',
    time: '~4 hours',
    builders: ['Mihaitzuuu'],
    photos: [
      '/assets/builds/gorb-tubs/gorb-tubs-1.png',
      '/assets/builds/gorb-tubs/gorb-tubs-2.png',
      '/assets/builds/gorb-tubs/gorb-tubs-3.png'
    ],
    extras: ['5h40m - 3*6 Chunks - 200,000$', '12h - 6*6 chunks - 450,000$'],
    buyers: [
      { name: 'EthanDeDurian', price: '800,000$', amount: 4, design: '5h40m' },
      { name: 'lil_wind_spirit', price: '200,000$', amount: 1, design: '5h40m' },
      { name: 'Numinouspie', price: '300,000$', amount: 1, design: '5h40m' },
      { name: 'LittleFilo', price: '200,000$', amount: 1, design: '5h40m' }
    ]
  },
  {
    slug: 'redstone-systems',
    title: 'Redstone Systems',
    short: 'Custom redstone automation solutions.',
    price: 'Varies per project',
    time: '< 2 hours',
    builders: ['Mihaitzuuu'],
    photos: [
      '/assets/builds/redstone-systems/redstone-systems-1.png',
      '/assets/builds/redstone-systems/redstone-systems-2.png',
      '/assets/builds/redstone-systems/redstone-systems-3.png'
    ],
    extras: ['Sorting systems', 'Smelter systems', 'Redstone doors', 'Shulker Loader/Unloader', 'Autocrafting systems']
  },
  {
    slug: 'mapart',
    title: 'Mapart',
    short: 'Custom map art builds for decoration, collections, and server projects.',
    builders: ['Mihaitzuuu'],
    photos: [
      '/assets/builds/mapart/mapart-1.png',
      '/assets/builds/mapart/mapart-2.png',
      '/assets/builds/mapart/mapart-3.png'
    ]
  },
  {
    slug: 'mina-cathedral',
    title: "Mina_03's Cathedral",
    short: 'Big gothic cathedral with detailed exterior.',
    price: '1,000,000$',
    time: '1 day',
    builders: ['Mihaitzuuu', 'Luna2121654'],
    photos: [
      '/assets/builds/mina-cathedral/mina-cathedral-1.png',
      '/assets/builds/mina-cathedral/mina-cathedral-2.png',
      '/assets/builds/mina-cathedral/mina-cathedral-3.png'
    ]
  }
]

export function getBuildBySlug(slug: string) {
  return builds.find((b) => b.slug === slug)
}
