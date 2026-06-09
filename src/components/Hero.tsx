import React from 'react'
import { motion } from 'framer-motion'
import PetalField from './PetalField'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <img src="/hero-placeholder.svg" alt="hero" className="w-full h-full object-cover opacity-80" />
        <PetalField />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight drop-shadow-lg" style={{ fontFamily: 'Minecraft, system-ui' }}>
            Mihaitzuuu's Builds
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            I build premium Minecraft projects for BlossomCraft SMP — practical, polished, player-ready.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#builds" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10">Explore Builds</a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-lantern px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110">Contact Me</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
