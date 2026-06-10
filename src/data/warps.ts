export type Warp = {
  id: string
  name: string
  status: string
  desc: string
  guide?: string
  items?: { name: string; icon?: string }[]
  rules?: { text: string; note?: string }[]
}

export const warps: Warp[] = [
  {
    id: 'mihu-farm',
    name: 'mihu-farm',
    status: 'active',
    desc: 'Mega farm for crops and resources - maintained regularly.',
    guide: '',
    items: [
      { name: 'Enchanted Decree', icon: '/assets/items/enchanted-decree.png' },
      { name: 'Trials of Olympus', icon: '/assets/items/trials-of-olympus.png' },
      { name: 'Mistweave', icon: '/assets/items/mistweave.png' },
      { name: 'Deidara Shovel', icon: '/assets/items/deidara-shovel.png' },
      { name: 'Void Shovel', icon: '/assets/items/void-shovel.png' },
      { name: 'Whisperwood', icon: '/assets/items/whisperwood.png' },
      { name: 'Atlas Axe', icon: '/assets/items/atlas-axe.png' },
      { name: 'Kodama', icon: '/assets/items/kodama.png' },
      { name: 'Mystical Sickle', icon: '/assets/items/mystical-sickle.png' },
      { name: 'Demeters Touch', icon: '/assets/items/demeters-touch.png' },
      { name: 'Sylvan Staff', icon: '/assets/items/sylvan-staff.png' },
      { name: 'Shulkers', icon: '/assets/items/placeholder.png' }
    ],
    rules: [
      {
        text: "Any tool you took from the Player Warp must be returned",
        note: "Unless you have serious reasons for keeping it"
      },
      {
        text: "Any donations are welcome; you will be placed on a wall of fame",
        note: "You will need at least Ranger rank to be verified"
      },
      {
        text: "Don't break anything except the crops and always replant them",
        note: "Make sure to use a hoe/item that auto-replants; Demeters Touch is available in the basement."
      }
    ]
  },
  { id: 'mihu-rentals', name: 'mihu-rentals', status: 'active', desc: 'Item rentals, mostly tools and blocks - follow posted rules.', guide: 'Rentals are managed through signs. Respect expiry times and return rented items in good condition.' },
  { id: 'mihu-shop', name: 'mihu-shop', status: 'upcoming', desc: 'Community shop + Blossom Items - opening soon with trades.', guide: 'Shop will support currency and item trades. Check announcement boards for opening date.' },
  { id: 'mihu-casino', name: 'mihu-casino', status: 'upcoming', desc: 'Mini-games, events, giveaways - fair play required.', guide: 'Casino hosts events and minigames. Play fair and follow event rules; no real-money gambling.' }
]

export function getWarpById(id: string) {
  return warps.find((w) => w.id === id)
}

export default warps
