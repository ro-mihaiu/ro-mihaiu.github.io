import { motion } from 'framer-motion'

const lifeItems = [
  {
    title: 'Server events & markets',
    description: 'A creative hub for BlossomCraft community builds, seasonal festivals, and player-run shops.'
  },
  {
    title: 'Collaborative districts',
    description: 'Interactive town centers with player paths, lantern-lit plazas, and custom signage.'
  },
  {
    title: 'Community farms & systems',
    description: 'Shared infrastructure built for efficiency and polished survival gameplay.'
  }
]

export default function ServerLifeSection() {
  return (
    <section id="server-life" className="relative py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">BlossomCraft SMP life</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">Active SMP experience, community builds, and server momentum.</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {lifeItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="rounded-[2rem] border border-white/10 bg-black/40 p-8 shadow-xl shadow-black/30 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-blossom-pink/80">{item.title}</p>
                <p className="mt-4 text-gray-300 leading-7">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
