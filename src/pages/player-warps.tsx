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
        <title>Player Warps — BlossomCraft SMP</title>
        <meta name="description" content="Explore player warps on BlossomCraft SMP. Discover player builds, shops, farms, and destinations across the server." />
        <meta name="keywords" content="player warps, BlossomCraft, Minecraft server, warp destinations" />
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-deep-black text-white">
        <Navbar />
        <main className="pt-28 max-w-6xl mx-auto px-6 pb-24">
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-4">Player Warps</h1>
            <p className="text-gray-300 mb-2">Discover player-owned locations across BlossomCraft SMP. Use the warp command to visit any location instantly.</p>
            <div className="mt-4 rounded-lg bg-white/5 border border-white/10 p-4">
              <p className="text-sm text-gray-400"><span className="text-sakura-pink font-semibold">How to use:</span> Click any "Copy Warp" button to copy the warp command to your clipboard, then paste it in-game.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {warps.map((w) => (
              <div key={w.id} className="rounded-2xl border border-white/10 bg-black/40 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2">
                      <h3 className="text-xl font-semibold">{w.name}</h3>
                      <span className={statusClasses(w.status)}>
                        {statusLabel(w.status)}
                      </span>
                      <Link href={`/player-warps/${w.id}`} className="ml-0">
                        <span className="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-sakura-pink/80 to-violet-500/80 text-white">
                          Guide
                        </span>
                      </Link>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">{w.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => navigator.clipboard?.writeText(`pw ${w.id} - Mihaitzuuu`)}
                      className="rounded-full bg-sakura-pink/80 px-4 py-2 text-black font-medium text-sm self-center"
                      aria-label={`Copy warp ${w.id}`}
                    >
                      Copy Warp
                    </button>
                  </div>
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
