import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { warps } from '../data/warps'

function statusClasses(status: string) {
  const s = (status || '').toLowerCase()
  // dark pill with colored border and text to match design
  if (s.includes('active')) return 'ml-3 px-3 py-1 rounded-full text-sm font-semibold bg-black/60 border border-emerald-500/30 text-emerald-300'
  if (s.includes('locked')) return 'ml-3 px-3 py-1 rounded-full text-sm font-semibold bg-black/60 border border-red-500/30 text-red-300'
  if (s.includes('upcoming') || s.includes('launch')) return 'ml-3 px-3 py-1 rounded-full text-sm font-semibold bg-black/60 border border-yellow-400/30 text-yellow-300'
  return 'ml-3 px-3 py-1 rounded-full text-sm font-semibold bg-black/60 border border-white/10 text-gray-300'
}

function statusLabel(status: string) {
  const s = (status || '').toLowerCase()
  if (s.includes('active')) return 'Active'
  if (s.includes('locked')) return 'Locked'
  if (s.includes('upcoming') || s.includes('launch')) return 'Upcoming'
  return status
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
                      <span className={statusClasses(w.status)}>
                        {statusLabel(w.status)}
                      </span>
                      <Link href={`/player-warps/${w.id}`} className="ml-2">
                        <span className="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-sakura-pink/80 to-violet-500/80 text-white">
                          Guide
                        </span>
                      </Link>
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
