import { motion } from 'framer-motion'

const categories = ['Bases', 'Farms', 'Shops', 'Landscapes', 'Redstone', 'Mega Projects']
const galleryItems = [
  { title: 'Sakura Market District', category: 'Shops' },
  { title: 'Lantern-Lit Castle', category: 'Mega Projects' },
  { title: 'Riverfront Cottage', category: 'Landscapes' },
  { title: 'Villager Sorting Hub', category: 'Redstone' },
  { title: 'Floating Island Garden', category: 'Landscapes' },
  { title: 'Cinematic Farm Hub', category: 'Farms' }
]

export default function GallerySection() {
  return (
    <section id="portfolio" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Cinematic gallery</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">A portfolio gallery built like a Minecraft showcase.</h2>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button key={category} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:border-sakura-pink/60 hover:bg-white/10">
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="group rounded-[2rem] overflow-hidden border border-white/10 bg-black/30 shadow-xl shadow-black/30 backdrop-blur-xl">
                <div className="h-72 bg-[#14101b] bg-[radial-gradient(circle_at_top,_rgba(255,138,194,0.15),_transparent_40%)] p-6">
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.3em] text-blossom-pink/80">{item.category}</p>
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-200">View</div>
                </div>
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
