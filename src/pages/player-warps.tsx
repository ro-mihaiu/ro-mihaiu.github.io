import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const warps = [
  { id: 'mihu-farm', name: 'mihu-farm', status: 'active', desc: 'Mega farm for crops and resources - maintained regularly.' },
  { id: 'mihu-rentals', name: 'mihu-rentals', status: 'active', desc: 'Item rentals, mostly tools and blocks - follow posted rules.' },
  { id: 'mihu-shop', name: 'mihu-shop', status: 'upcoming', desc: 'Community shop + Blossom Items - opening soon with trades.' },
  { id: 'mihu-casino', name: 'mihu-casino', status: 'upcoming', desc: 'Mini-games, events, giveaways - fair play required.' }
]

function statusClasses(status: string) {
  const s = (status || '').toLowerCase()
  if (s.includes('active')) return 'bg-emerald-400 text-black'
  if (s.includes('locked')) return 'bg-red-400 text-black'
  if (s.includes('upcoming') || s.includes('launch')) return 'bg-yellow-300 text-black'
  return 'bg-gray-500 text-white'
}

export default function PlayerWarps() {
  return (
    <>
      <Head>
        <title>Player Warps — Mihaitzuuu Builds</title>
        <meta name="description" content="Player Warps for BlossomCraft SMP" />
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-deep-black text-white">
        <Navbar />
        <main className="pt-28 max-w-6xl mx-auto px-6 pb-24">
          <h1 className="text-3xl font-black mb-6">Player Warps</h1>
          <p className="text-gray-300 mb-8">Quick list of player warps. Click to copy warp name.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {warps.map((w) => (
              <div key={w.id} className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-xl font-semibold">{w.name}</h3>
                      <span className={`ml-3 px-2 py-1 rounded-md text-sm font-medium ${statusClasses(w.status)}`}>
                        {w.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">{w.desc}</p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard?.writeText(`/pw ${w.name}`)}
                    className="ml-4 rounded-full bg-sakura-pink/80 px-4 py-2 text-black font-medium"
                  >
                    Copy Warp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
