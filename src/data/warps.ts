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
    guide: `## Rules
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
    ],
- Any tool you took from the Player Warp, must be returned. Don't log off with the items.
> Unless you have serious reasons for keeping it
- In case you don't need the goods, they can be donated on the 9th floor at pw mihu-farm.
> Goods, such as carrots/potatos/wheat/seeds/etc
- Being a discord member of my server is a *must*, in order to keep track of who is trusted
> Anyone from this server can promote it to their friends, and may get a reward
- Don't break anything except the crops and after that **replant them always**
> Make sure to use a hoe/item that auto-replants, since it will make your work easier (I have put a Demeters Touch in the basement)
- Any suggestions are welcome
> For auto-farms / manual farms / design, Make them at ⁠plans-suggestions(https://discord.com/channels/1263915963464548483/1493313863364644966)
- Any donations are welcome, you will be placed on a wall of fame
- You will need at least **Ranger** rank to be verified
> Mostly because I don't want this farm to be griefed
- When renting/borrowing an item you must put your head in the barrel
> Do /hdb search (user) to get yourself your head
- Copying my builds/property in any way will get your reported to BlossomCraft staff
> Discord server's template / rules are included

The rules can be updated anytime, it is up to you to check and read them

## Items
- Enchanted Decree
> For woodcutting quests
- Tryals of Olympus
> For any type of quests
- Mistweave
> For breaking leaves faster
- Deidara Shovel
> For getting clay instead of soul sand/soil [RW]
- Void Shovel
> For stocking dirt, so your inventory is clear
- Whisperwood
> For getting the logs you want & chop down trees faster
- Atlas Axe
> For chopping down trees/mushrooms faster
- Kodama
> For bonemealing crops/trees faster
- Mystical Sickle
> For tilling dirt faster
- Demeters Touch
> For replanting easier [pls have a clear inv, before using]
- Sylvan Staff
> For placing tree saplings faster
- Shulkers
> Don't take them all, only if u wanna donate crops to F9

## Layout
F0 - Entry / SpawnPoint
F1 - Wheat
F2 - Carrots
F3 - Potatos
F4 - Beetroots
F5 - Wheat + Potatos
F6 - Carrots
F7 - Nether Wart
F8 - Automatic Farms
F9 - Lunge (Future SpawnPoint)
F10 - Spruce Trees
F11 - Mob Farms
'F' as of floor`,
  },
  { id: 'mihu-rentals', name: 'mihu-rentals', status: 'active', desc: 'Item rentals, mostly tools and blocks - follow posted rules.', guide: 'Rentals are managed through signs. Respect expiry times and return rented items in good condition.' },
  { id: 'mihu-shop', name: 'mihu-shop', status: 'upcoming', desc: 'Community shop + Blossom Items - opening soon with trades.', guide: 'Shop will support currency and item trades. Check announcement boards for opening date.' },
  { id: 'mihu-casino', name: 'mihu-casino', status: 'upcoming', desc: 'Mini-games, events, giveaways - fair play required.', guide: 'Casino hosts events and minigames. Play fair and follow event rules; no real-money gambling.' }
]

export function getWarpById(id: string) {
  return warps.find((w) => w.id === id)
}

export default warps
