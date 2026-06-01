import { motion } from 'framer-motion'

const items = [
  { title: 'Owned Properties', subtitle: 'Private estates, bases, and key plots', color: 'bg-sakura-pink/10 border-sakura-pink/20' },
  { title: 'Trading Hubs', subtitle: 'Market stalls, spawn shops, and community districts', color: 'bg-lantern/10 border-lantern/20' },
  { title: 'Farms', subtitle: 'Efficient auto farms, villager systems, and storage sorters', color: 'bg-emerald/10 border-emerald/20' },
  { title: 'Villages', subtitle: 'Collaborative towns, starter villages, and seasonal builds', color: 'bg-blossom-pink/10 border-blossom-pink/20' },
  { title: 'Storage Districts', subtitle: 'Organized hubs built for smooth player flow', color: 'bg-charcoal/70 border-white/10' },
  { title: 'Seasonal Events', subtitle: 'Festive installations, Sakura festivals, and server showcases', color: 'bg-[#514b66]/10 border-[#514b66]/20' }
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
              <div className={`rounded-[2rem] border p-7 shadow-xl shadow-black/20 backdrop-blur-xl ${item.color} hover:-translate-y-1 transition-transform`}>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-300">{item.title}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.subtitle.split(',')[0]}</h3>
                <p className="mt-4 text-gray-300">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
