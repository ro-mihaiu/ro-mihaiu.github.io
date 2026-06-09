import { motion } from 'framer-motion'

const warps = [
  { slug: 'mihu-farm', title: 'pw mihu-farm', desc: 'I manage the farm — harvesting and restocking as needed.' },
  { slug: 'mihu-rentals', title: 'pw mihu-rentals', desc: 'I handle rentals and player plots — follow posted rules.' },
  { slug: 'mihu-shop', title: 'pw mihu-shop', desc: 'I run the shop — trade using signs or shop menus.' },
  { slug: 'mihu-casino', title: 'pw mihu-casino', desc: 'I host mini-games and events — play fair and enjoy.' }
]

export default function OwnershipSection() {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(255,138,194,0.12),_transparent_40%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Empire dashboard</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">Owned properties, occupations, and flagship projects</h2>
        </div>

        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            <div className="rounded-[2rem] border p-6 shadow-xl shadow-black/20 backdrop-blur-xl bg-black/40 border-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-300">Owned player warps</p>
              <div className="mt-6">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {warps.map((w) => (
                    <div key={w.slug} className="group rounded-xl border border-white/10 bg-black/30 p-4 hover:shadow-lg transition-all duration-200 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 block image-rendering-pixelated">
                            {w.slug === 'mihu-farm' && (
                              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="block" style={{ imageRendering: 'pixelated' }}>
                                <rect width="32" height="32" fill="#0b3" />
                                <rect x="6" y="20" width="20" height="6" fill="#6b3" />
                                <rect x="10" y="8" width="12" height="8" fill="#3a2" />
                              </svg>
                            )}
                            {w.slug === 'mihu-rentals' && (
                              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
                                <rect width="32" height="32" fill="#2b1" />
                                <rect x="4" y="12" width="24" height="12" fill="#442" />
                                <rect x="8" y="8" width="16" height="4" fill="#886" />
                              </svg>
                            )}
                            {w.slug === 'mihu-shop' && (
                              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
                                <rect width="32" height="32" fill="#2a1a2a" />
                                <rect x="6" y="8" width="20" height="6" fill="#c77" />
                                <rect x="8" y="16" width="16" height="10" fill="#a55" />
                              </svg>
                            )}
                            {w.slug === 'mihu-casino' && (
                              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
                                <rect width="32" height="32" fill="#111" />
                                <rect x="6" y="6" width="20" height="20" fill="#b08f2f" />
                                <circle cx="16" cy="16" r="4" fill="#ffd" />
                              </svg>
                            )}
                          </span>
                          <p className="text-sm uppercase tracking-[0.18em] text-gray-300">{w.title}</p>
                        </div>
                        <a href={`/player-warps/${w.slug}`} className="ml-4 text-sakura-pink/90 underline">view</a>
                      </div>
                      <div className="mt-3 text-gray-300 max-h-0 overflow-hidden group-hover:max-h-[4.5rem] transition-[max-height] duration-350 ease-out">
                        <p className="text-sm leading-5 max-w-full line-clamp-3 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
