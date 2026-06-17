import { motion } from 'framer-motion'

const warps = [
  { slug: 'mihu-farm', title: 'pw mihu-farm', desc: 'I manage the farm - harvesting and restocking as needed.', icon: '/assets/items/pw-mihu-farm.png' },
  { slug: 'mihu-rentals', title: 'pw mihu-rentals', desc: 'I handle rentals and player plots - follow posted rules.', icon: '/assets/items/pw-mihu-rentals.png' },
  { slug: 'mihu-shop', title: 'pw mihu-shop', desc: 'I run the shop - trade using signs or shop menus.', icon: '/assets/items/pw-mihu-shop.png' },
  { slug: 'mihu-casino', title: 'pw mihu-casino', desc: 'I host mini-games and events - play fair and enjoy.', icon: '/assets/items/pw-mihu-casino.png' },
  { slug: 'mihu-money', title: 'pw mihu-money', desc: 'Money island setup and guide coming soon.', icon: '/assets/items/pw-mihu-money.png' }
]

export default function OwnershipSection() {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(255,138,194,0.12),_transparent_40%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Dashboard</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">Owned player warps</h2>
        </div>

        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mt-6">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {warps.map((w) => (
                  <div key={w.slug} className="group rounded-xl border border-white/10 bg-black/30 p-4 transition transform-gpu duration-300 ease-out hover:shadow-2xl hover:scale-105 hover:ring-2 hover:ring-sakura-pink/20 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 block image-rendering-pixelated">
                          <img src={w.icon} alt="" className="block h-8 w-8 object-cover" style={{ imageRendering: 'pixelated' }} />
                        </span>
                        <p className="text-sm uppercase tracking-[0.18em] text-gray-300">{w.title}</p>
                      </div>
                    </div>
                    <div className="mt-3 text-gray-300 max-h-0 overflow-hidden group-hover:max-h-[4.5rem] transition-[max-height] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]">
                      <p className="text-sm leading-5 max-w-full line-clamp-3 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-250 ease-out">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
