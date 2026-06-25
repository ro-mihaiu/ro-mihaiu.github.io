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
    id: 'dungeon',
    name: 'dungeon',
    status: 'active',
    desc: 'Dungeon with traps, puzzles, and loot - for adventurers.',
    guide: '',
    rules: [
      {
        text: "Any tool you took from the Player Warp, must be returned. Don't log off with the items.",
        note: "Unless you have serious reasons for keeping it."
      },
      {
        text: "Being a discord member of this server is not a must.",
        note: "But it is recommended, in order to keep track of who is trusted."
      },
      {
        text: "Any suggestions are welcome.",
        note: "For redstone mechanics / items, make them on discord."
      },
      {
        text: "Any donations are welcome; you will be placed on a wall of fame."
      },
      {
        text: "You will need at least Shogun rank to be verified.",
        note: "Mostly because I don't want this dungeon to be griefed."
      },
      {
        text: "When renting/borrowing an item you must put your head in the barrel.",
        note: "Do /hdb search (user) to get yourself your head."
      },
      {
        text: "Renting the gear is 20,000$ per run, you may not get a refund.",
        note: "The payment should be done before the run."
      },
      {
        text: "Losing my item(s) in dungeon because of dropping/rearranging them, will result in a pw ban + item & 10% of the item value.",
        note: "Don't move the items in your inventory, once you entered the dungeon."
      },
      {
        text: "Copying my builds/property in any way will get you reported to BlossomCraft staff.",
        note: "Discord server's template / rules are included."
      }
    ]
  },
  {
    id: 'mihu-farm',
    name: 'mihu-farm',
    status: 'active',
    desc: 'Mega farm for crops and resources - maintained regularly.',
    guide: '',
    items: [
      { name: 'Enchanted Decree', icon: '/assets/items/enchanted-decree.png' },
      { name: 'Trials of Olympus', icon: '/assets/items/trials-of-olympus.png' },
      { name: 'Mistweave', icon: '/assets/items/mistweave.gif' },
      { name: 'Deidara Shovel', icon: '/assets/items/deidara-shovel.png' },
      { name: 'Void Shovel', icon: '/assets/items/void-shovel.png' },
      { name: 'Whisperwood', icon: '/assets/items/whisperwood.gif' },
      { name: 'Atlas Axe', icon: '/assets/items/atlas-axe.png' },
      { name: 'Kodama', icon: '/assets/items/kodama.png' },
      { name: 'Mystical Sickle', icon: '/assets/items/mystical-sickle.png' },
      { name: 'Demeters Touch', icon: '/assets/items/demeters-touch.png' },
      { name: 'Sylvan Staff', icon: '/assets/items/sylvan-staff.png' },
      { name: 'Shulkers', icon: '/assets/items/shulkers.png' }
    ],
    rules: [
      {
        text: "Any tool you took from the Player Warp must be returned. Don't log off with the items.",
        note: "Unless you have serious reasons for keeping it"
      },
      {
        text: "In case you don't need the goods, they can be donated on the 9th floor at pw mihu-farm.",
        note: "Goods, such as carrots/potatos/wheat/seeds/etc"
      },
      {
        text: "Being a discord member of this server is a must, in order to keep track of who is trusted",
        note: "Anyone from this server can promote it to their friends, and may get a reward"
      },
      {
        text: "Don't break anything except the crops and after that replant them always",
        note: "Make sure to use a hoe/item that auto-replants, since it will make your work easier (I have put a Demeters Touch in the basement)"
      },
      {
        text: "Any suggestions are welcome",
        note: "For auto-farms / manual farms / design, make them on discord."
      },
      {
        text: "Any donations are welcome; you will be placed on a wall of fame"
      },
      {
        text: "You will need at least Guardian rank to be verified",
        note: "Mostly because I don't want this farm to be griefed"
      },
      {
        text: "When renting/borrowing an item you must put your head in the barrel",
        note: "Do /hdb search (user) to get yourself your head"
      },
      {
        text: "Copying my builds/property in any way will get you reported to BlossomCraft staff",
        note: "Discord server's template / rules are included"
      }
    ]
  },
  {
    id: 'workers-guild',
    name: 'workers-guild',
    status: 'upcoming',
    desc: 'A guild for workers to collaborate and share resources.',
    guide: '',
    rules: [
      {
        text: "Be nice and respectful to other members.",
        note: "This is a community for collaboration, not competition."
      },
      {
        text: "No NSFW content.",
        note: "Keep in mind that there may be underage people."
      },
      {
        text: "Don't break any BlossomCraft rules.",
        note: "Follow the server's code of conduct and guidelines."
      },
      {
        text: "No stealing from client's base(s).",
        note: "This is a guild for workers, not thieves."
      },
      {
        text: "If unsure of the price ask me or any other guild member for help.",
        note: "We can help you with pricing and negotiations."
      },
      {
        text: "Any suggestions are welcome.",
        note: "For guild activities / design, make them on discord."
      },
      {
        text: "If you lend an item from other guild members make sure to return it before logging off.",
        note: "This helps maintain trust and cooperation within the guild."
      },
      {
        text: "Have fun and be creative."
      }
    ]
  },
  { id: 'mihu-rentals', 
    name: 'mihu-rentals', 
    status: 'active', 
    desc: 'Item rentals, mostly tools and blocks - follow posted rules.', 
    guide: '',
    rules: [
      {
        text: "Any tool you took from the Player Warp must be returned. Don't log off with the items.",
        note: "Unless you have serious reasons for keeping it"
      },
      {
        text: "Being a discord member of this server is a must, in order to keep track of who is trusted.",
        note: "Anyone from this server can promote it to their friends, and may get a reward"
      },
      { text: "Any suggestions are welcome.",
        note: "For items / design, Make them on discord."
      },
      {
        text: "Any donations are welcome; you will be placed on a wall of fame."
      },
      {
        text: "You will need at least Samurai rank to be verified",
        note: "Mostly because I don't want this farm to be griefed"
      },
      {
        text: "When renting/borrowing an item you must put your head in the barrel",
        note: "Do /hdb search (user) to get yourself your head"
      },
      {
        text: "Don't take more than 1 infinite block at a time.",
        note: "You may 'bypass' this rule only if you are on the wall of fame from pw mihu-farm from floor 9, but the limit will be 3 blocks maximum."
      },
      {
        text: "The use of infinite blocks are for personal interests, for a small fee of 10,000 / month, which can be bought directly from pw mihu-rentals as a buy-item transaction.",
        note: "Added the fee, cause you can sell the blocks obtained from infinites further."
      },
      {
        text: "Getting access to pw mihu-rentals is very restricted, since it uses rare items.",
        note: "Therefore, you must be Samurai+ and be a friend of mine."
      },
      {
        text: "Cancelling an active subscription is allowed.",
        note: "But it will be refunded, 333 for each day you didnt use, let me know on discord."
      },
      {
        text: "If you are part of Workers Guild, you will get free access.",
        note: "This is because you are already helping the server(s), and I will be able to trust you more."
      },
      {
        text: "Copying my builds/property in any way will get your reported to BlossomCraft staff.",
        note: "Discord server's template / rules are included"
      }
    ] 
  },
  { 
    id: 'mihu-shop', 
    name: 'mihu-shop', 
    status: 'upcoming', 
    desc: 'Community shop + Blossom Items - opening soon with trades.', 
    guide: 'To be created - announced' 
  },
  { 
    id: 'mihu-casino', 
    name: 'mihu-casino', 
    status: 'upcoming', 
    desc: 'Mini-games, events, giveaways - fair play required.', 
    guide: 'To be created - announced' },
  { 
    id: 'mihu-money', 
    name: 'mihu-money', 
    status: 'active', 
    desc: 'Money island for earning and managing currency.', 
    guide: 'To be created - announced' }
]

export function getWarpById(id: string) {
  return warps.find((w) => w.id === id)
}

export default warps
