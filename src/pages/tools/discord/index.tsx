'use client'

import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'

/* Tools that are ready to use */
const AVAILABLE_TOOLS = [
  {
    title: 'ANSI Text Converter',
    description:
      'Turn plain text into colorful, styled Discord messages using ANSI escape codes inside code blocks.',
    href: '/tools/discord/text',
    emoji: '🎨',
  },
]

/* Placeholders for future Discord tools */
const UPCOMING_TOOLS = [
  {
    title: 'Message Timestamp Generator',
    description:
      'Create Discord timestamps that automatically adjust to each viewer’s timezone.',
  },
  {
    title: 'Role Color Converter',
    description: 'Convert hex colors into Discord role colors and preview them.',
  },
]

export default function DiscordToolsPage() {
  return (
    <>
      <Head>
        <title>Discord Tools — Mihaitzuuu</title>
        <meta
          name="description"
          content="A growing collection of free Discord tools by Mihaitzuuu. Start with the ANSI Text Converter to make colorful Discord messages."
        />
      </Head>

      <main className="min-h-screen bg-deep-black text-white px-6 py-20">
        <Navbar />

        <div className="mx-auto max-w-5xl pt-20">
          <div className="rounded-[2rem] border border-white/10 bg-black/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-12">
            {/* Header */}
            <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">
              Tools · Discord
            </p>
            <h1 className="mt-4 text-3xl font-black text-white md:text-4xl">
              Discord Tools
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-gray-300">
              A growing collection of free, client-side tools to make your
              Discord experience better. Pick a tool below to get started.
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

            {/* Upcoming tools */}
            <h2 className="mt-12 text-xl font-bold text-white">Coming soon</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {UPCOMING_TOOLS.map((tool) => (
                <div
                  key={tool.title}
                  className="flex flex-col gap-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6"
                >
                  <h3 className="text-lg font-bold text-gray-300">{tool.title}</h3>
                  <p className="text-sm leading-6 text-gray-400">{tool.description}</p>
                  <span className="mt-auto text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Coming soon
                  </span>
                </div>
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

