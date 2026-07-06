import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PetalField from './PetalField'

export default function Hero() {
  return (
    <section className="relative min-h-[105vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <Image src="/hero-placeholder.svg" alt="hero background" fill className="w-full h-full object-cover opacity-80" priority />
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
            <a href="/contact" className="inline-flex items-center justify-center rounded-full bg-sakura-pink px-8 py-4 text-base font-bold text-black transition hover:brightness-110 shadow-lg shadow-sakura-pink/30">Request a Build Quote</a>
            <a href="/#builds" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10">Explore Builds</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
