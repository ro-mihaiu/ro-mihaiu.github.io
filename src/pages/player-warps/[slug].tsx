import { useRouter } from 'next/router'
import Link from 'next/link'

const guides: Record<string, { title: string; lines: string[] }> = {
  'mihu-farm': {
    title: 'mihu-farm',
    lines: ['Use the warp to access the farm.', 'Do not break or place blocks.', 'Take only what is allowed by signs.']
  },
  'mihu-rentals': {
    title: 'mihu-rentals',
    lines: ['Rentals are player-run plots.', 'Follow the rental rules on each plot.', 'Report issues to me on Discord.']
  },
  'mihu-shop': {
    title: 'mihu-shop',
    lines: ['Shop is for buying and selling.', 'Use signs or shop menu to trade.', 'No stealing or grief.']
  },
  'mihu-casino': {
    title: 'mihu-casino',
    lines: ['Casino games are for fun.', 'Play fair and follow game rules.', 'Do not exploit or abuse mechanics.']
  }
}

export default function WarpGuide() {
  const router = useRouter()
  const { slug } = router.query

  if (!slug || Array.isArray(slug)) return null

  const key = slug as string
  const guide = guides[key]

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-black">Warp not found</h1>
        <p className="mt-4 text-gray-300">The requested warp does not exist.</p>
        <p className="mt-6"><Link href="/player-warps" className="text-sakura-pink/90 underline">Back to warps</Link></p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Owned player warps</p>
      <h1 className="mt-4 text-4xl font-black text-white">{guide.title}</h1>
      <div className="mt-6 rounded-lg border border-white/10 bg-black/40 p-6">
        <h3 className="text-lg font-semibold text-white">Rules / Guide</h3>
        <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
          {guide.lines.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
        <p className="mt-6 text-gray-300">To get access, DM me on Discord:</p>
        <p className="mt-2"><a href="https://discord.com/users/1027052856697684099" target="_blank" rel="noopener noreferrer" className="text-sakura-pink/90 underline">DM to get access</a></p>
      </div>
      <p className="mt-6"><Link href="/player-warps" className="text-sakura-pink/90 underline">Back to warps</Link></p>
    </div>
  )
}
