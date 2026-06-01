import { motion } from 'framer-motion'

const stats = [
  { label: 'Hours Played', value: '1.2K+' },
  { label: 'Builds Completed', value: '68' },
  { label: 'Farms Designed', value: '24' },
  { label: 'Worlds Transformed', value: '12' }
]

const highlights = [
  'Elite SMP architect with BlossomCraft experience',
  'Massive fantasy castles, cozy starter homes, and market districts',
  'Automated farms, redstone systems, and optimized builds',
  'Cinematic landscaping with sakura gardens, rivers, and floating islands'
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,138,194,0.08),_transparent_35%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">About Mihaitzuuu</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">Professional Minecraft builder, architect, and SMP creator.</h2>
          <p className="mt-4 text-gray-300 leading-8">
            Mihaitzuuu crafts premium BlossomCraft SMP environments with cinematic detail, functional automation, and rich community-ready spaces. From lantern-lit starter cottages to kingdom-scale castles, every project blends cozy medieval ambience with luxury fantasy design.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-neon-pink/10 backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-blossom-pink/80">{stat.label}</p>
                <p className="mt-4 text-4xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/40 p-8 shadow-lg shadow-black/40 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold text-white">Why BlossomCraft chooses Mihaitzuuu</h3>
            <ul className="mt-6 space-y-4 text-gray-300">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
