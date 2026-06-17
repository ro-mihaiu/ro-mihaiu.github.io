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
    price: '3,000',
    time: '2 weeks',
    builders: ['Mihu', 'Aki'],
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
    photos: [
      'https://via.placeholder.com/800x600?text=Gorb+1',
      'https://via.placeholder.com/800x600?text=Gorb+2',
      'https://via.placeholder.com/800x600?text=Gorb+3'
    ],
    buyers: [
      { name: 'BuyerA', price: '150', amount: 2, design: 'classic' },
      { name: 'BuyerB', price: '200', amount: 1, design: 'deluxe' }
    ]
  },
  {
    slug: 'redstone-systems',
    title: 'Redstone Systems',
    short: 'Custom redstone automation solutions.',
    price: 'Varies per project',
    time: 'Depends on scope',
    builders: ['RedstonerOne', 'LogicLee'],
    photos: [
      'https://via.placeholder.com/800x600?text=Redstone+1',
      'https://via.placeholder.com/800x600?text=Redstone+2',
      'https://via.placeholder.com/800x600?text=Redstone+3'
    ],
    extras: ['Sorting systems', 'Smithing systems']
  },
  {
    slug: 'example-hut',
    title: 'Example Hut',
    short: 'Small starter hut, quick turnaround.',
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
