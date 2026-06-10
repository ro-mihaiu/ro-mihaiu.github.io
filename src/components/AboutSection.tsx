import { motion } from 'framer-motion'

const stats = [
  { label: 'Hours Played', value: '2.2K+' },
  { label: 'Builds Completed', value: '73' },
  { label: 'Farms Designed', value: '32' },
  { label: 'Worlds Transformed', value: '4' }
]

const highlights = [
  'Fast builder - usually under a week, depends on size',
  'Buyer-based offers, with some exceptions',
  "I don't refuse build offers very often",
  'I can build in any style, but prefer practical, polished designs',
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,138,194,0.08),_transparent_35%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">About Me</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">Professional Minecraft builder, architect, and SMP creator.</h2>
          <p className="mt-4 text-gray-300 leading-8">
            I build premium builds or farms with practical automation and player-ready design.
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
              >
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-neon-pink/10 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.25em] text-blossom-pink/80">{stat.label}</p>
                  <p className="mt-4 text-4xl font-bold text-white">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/40 p-8 shadow-lg shadow-black/40 backdrop-blur-xl h-full flex flex-col">
            <h3 className="text-2xl font-semibold text-white">Why should YOU choose me?</h3>
            <ul className="mt-6 space-y-4 text-gray-300 flex-1">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  )
}
