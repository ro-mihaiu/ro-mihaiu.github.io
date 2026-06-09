import { motion } from 'framer-motion'

const items = [
  {
    title: 'Owned player warps',
    subtitle: 'pw mihu-farm, pw mihu-rentals, pw mihu-shop, pw mihu-casino',
    color: 'bg-sakura-pink/10 border-sakura-pink/20'
  }
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className={`rounded-[2rem] border p-7 shadow-xl shadow-black/20 backdrop-blur-xl ${item.color} hover:-translate-y-1 transition-transform h-full flex flex-col`}>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-300">{item.title}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Owned player warps</h3>
                <div className="mt-4 text-gray-300 space-y-2 flex-1">
                  <p>pw mihu-farm — <a className="text-sakura-pink/90 underline" href="/player-warps/mihu-farm">view</a></p>
                  <p>pw mihu-rentals — <a className="text-sakura-pink/90 underline" href="/player-warps/mihu-rentals">view</a></p>
                  <p>pw mihu-shop — <a className="text-sakura-pink/90 underline" href="/player-warps/mihu-shop">view</a></p>
                  <p>pw mihu-casino — <a className="text-sakura-pink/90 underline" href="/player-warps/mihu-casino">view</a></p>
                </div>
                <div className="mt-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
