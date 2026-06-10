export type Warp = {
  id: string
  name: string
  status: string
  desc: string
  guide?: string
}

export const warps: Warp[] = [
  { id: 'mihu-farm', name: 'mihu-farm', status: 'active', desc: 'Mega farm for crops and resources - maintained regularly.', guide: 'This farm provides wheat, carrots and potatoes. Use the chests and restock when necessary. Avoid trampling crops.' },
  { id: 'mihu-rentals', name: 'mihu-rentals', status: 'active', desc: 'Item rentals, mostly tools and blocks - follow posted rules.', guide: 'Rentals are managed through signs. Respect expiry times and return rented items in good condition.' },
  { id: 'mihu-shop', name: 'mihu-shop', status: 'upcoming', desc: 'Community shop + Blossom Items - opening soon with trades.', guide: 'Shop will support currency and item trades. Check announcement boards for opening date.' },
  { id: 'mihu-casino', name: 'mihu-casino', status: 'upcoming', desc: 'Mini-games, events, giveaways - fair play required.', guide: 'Casino hosts events and minigames. Play fair and follow event rules; no real-money gambling.' }
]

export function getWarpById(id: string) {
  return warps.find((w) => w.id === id)
}

export default warps
