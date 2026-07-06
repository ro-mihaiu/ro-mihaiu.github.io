import { motion } from 'framer-motion'
import Image from 'next/image'
import { builds } from '../data/builds'
import Link from 'next/link'
import { useState } from 'react'

// Map build slugs to categories
const buildCategories: Record<string, string> = {
  'br-cybergaming84-castle': 'Bases',
  'gorb-tubs': 'Mega Projects',
  'redstone-systems': 'Redstone',
  'mapart': 'Mega Projects',
  'mina-cathedral': 'Bases'
}

const categories = ['All', 'Bases', 'Mega Projects', 'Redstone']
const galleryItems = builds.map(build => ({
  slug: build.slug,
  title: build.title,
  short: build.short,
  category: buildCategories[build.slug] || 'Other',
  photo: build.photos[0]
}))

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)
  return (
    <section id="portfolio" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Cinematic gallery</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">A portfolio gallery built like a Minecraft showcase.</h2>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button 
              key={category} 
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? 'border-sakura-pink bg-sakura-pink/20 text-sakura-pink'
                  : 'border-white/10 bg-white/5 text-gray-200 hover:border-sakura-pink/60 hover:bg-white/10'
              }`}
              aria-pressed={activeCategory === category}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item, index) => (
            <Link key={item.slug} href={`/builds/${item.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="cursor-pointer group"
              >
                <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-black/30 shadow-xl shadow-black/30 backdrop-blur-xl hover:border-sakura-pink/50 transition-colors">
                  <div className="relative h-72 bg-[#14101b] bg-[radial-gradient(circle_at_top,_rgba(255,138,194,0.15),_transparent_40%)] overflow-hidden">
                    {item.photo && (
                      <Image
                        src={item.photo}
                        alt={item.title}
                        fill
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                      />
                    )}
                    <div className="relative h-full p-6 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-200 group-hover:bg-sakura-pink/20 group-hover:text-sakura-pink transition-colors">View Project →</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
