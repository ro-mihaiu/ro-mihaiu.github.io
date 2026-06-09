import { motion } from 'framer-motion'

const categories = [
  {
    title: 'Starter Houses',
    description: 'Cozy survival cottages with lantern-lit gardens and compact fantasy interiors.',
    accent: 'Warm & whimsical'
  },
  {
    title: 'Mega Bases',
    description: 'Kingdom-scale castles, towers, bridges and grand halls with dramatic scale.',
    accent: 'Epic architecture'
  },
  {
    title: 'Shops & Spawns',
    description: 'Marketplace districts and welcoming spawn areas built for community traffic.',
    accent: 'Economy-ready designs'
  },
  {
    title: 'Farms & Automation',
    description: 'Beautiful, efficient farms and redstone systems designed for survival use.',
    accent: 'Technical elegance'
  },
  {
    title: 'Landscaping & Terraforming',
    description: 'Sakura gardens, rivers, floating islands and organic terrain blending.',
    accent: 'Nature-inspired fantasy'
  }
]

export default function BuildCategories() {
  return (
    <section id="builds" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Featured categories</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">Premium build categories for BlossomCraft SMP</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="group rounded-[2rem] border border-white/10 bg-black/40 p-8 shadow-xl shadow-black/30 backdrop-blur-xl hover:-translate-y-1 hover:border-sakura-pink/50 hover:bg-black/60 transition-transform">
                <div className="mb-6 flex h-44 items-end overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0d0b13] via-[#1b1526] to-[#160f18] p-6 h-full flex flex-col">
                  <div className="text-white">
                    <p className="text-sm uppercase tracking-[0.3em] text-blossom-pink/80">{category.accent}</p>
                    <h3 className="mt-3 text-2xl font-semibold">{category.title}</h3>
                  </div>
                </div>
                <p className="text-gray-300">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
