'use client'

import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'

/* Tools that are ready to use */
const AVAILABLE_TOOLS = [
  {
    title: 'Gradient Generator',
    description:
      'Create colorful gradient text for Minecraft using the RGBirdflop generator. Pick colors and styles, then copy the formatting codes.',
    href: '/tools/minecraft/gradient',
    emoji: '🌈',
  },
]

export default function MinecraftToolsPage() {
  return (
    <>
      <Head>
        <title>Minecraft Tools — Mihaitzuuu</title>
        <meta
          name="description"
          content="Free Minecraft tools by Mihaitzuuu. Start with the Gradient Generator to create colorful gradient text for Minecraft."
        />
      </Head>

      <main className="min-h-screen bg-deep-black text-white px-6 py-20">
        <Navbar />

        <div className="mx-auto max-w-5xl pt-20">
          <div className="rounded-[2rem] border border-white/10 bg-black/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-12">
            {/* Header */}
            <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">
              Tools · Minecraft
            </p>
            <h1 className="mt-4 text-3xl font-black text-white md:text-4xl">
              Minecraft Tools
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-gray-300">
              Handy tools for Minecraft builders and players. All free and
              client-side.
            </p>

            {/* Available tools */}
            <h2 className="mt-12 text-xl font-bold text-white">Available</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {AVAILABLE_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-sakura-pink/50 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">
                      {tool.emoji}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-sakura-pink">
                      {tool.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-gray-300">{tool.description}</p>
                  <span className="mt-auto text-sm font-semibold text-sakura-pink">
                    Open tool →
                  </span>
                </Link>
              ))}
            </div>

            {/* Back home */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <Link
                href="/"
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                ← Return home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
