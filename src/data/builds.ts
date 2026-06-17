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
    price: '200,000',
    time: '2 weeks',
    builders: ['Mihaitzuuu', 'Luna2121654'],
    photos: [
      'https://via.placeholder.com/800x600?text=Castle+1',
      'https://via.placeholder.com/800x600?text=Castle+2',
      'https://via.placeholder.com/800x600?text=Castle+3'
    ]
  },
  {
    slug: 'gorb-tubs',
    title: 'GORB Tubs',
    short: 'Modular tub designs available in multiple variants.',
    time: '5 hours',
    builders: ['Mihaitzuuu'],
    photos: [
      'https://via.placeholder.com/800x600?text=Gorb+1',
      'https://via.placeholder.com/800x600?text=Gorb+2',
      'https://via.placeholder.com/800x600?text=Gorb+3'
    ],
    buyers: [
      { name: 'EthanDeDurian', price: '800,000', amount: 4, design: '5h40m' },
      { name: 'lil_wind_spirit', price: '200,000', amount: 1, design: '5h40m' },
      { name: 'Numinouspie', price: '300,000', amount: 1, design: '5h40m' }
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
      'https://via.placeholder.com/800x600?text=Redstone+1',
      'https://via.placeholder.com/800x600?text=Redstone+2',
      'https://via.placeholder.com/800x600?text=Redstone+3'
    ],
    extras: ['Sorting systems', 'Smelter systems', 'Redstone doors', 'Shulker Loader/Unloader', 'Autocrafting systems']
  },
  {
    slug: 'mina-cathedral',
    title: "Mina_03's Cathedral",
    short: 'Big gothic cathedral with detailed exterior.',
    price: '250',
    time: '1 day',
    builders: ['SoloBuilder'],
    photos: [
      'https://via.placeholder.com/800x600?text=Hut+1',
      'https://via.placeholder.com/800x600?text=Hut+2',
      'https://via.placeholder.com/800x600?text=Hut+3'
    ]
  }
]

export function getBuildBySlug(slug: string) {
  return builds.find((b) => b.slug === slug)
}
