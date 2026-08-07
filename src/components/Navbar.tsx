import React, { useState } from 'react'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Builds', href: '/builds' },
  { label: 'Player Warps', href: '/player-warps' },
  { label: 'Commission', href: '/commissions' },
  { label: 'About', href: '/#about' },
]

const tools = [
  { label: 'Discord', href: '/tools/discord' },
  { label: 'Minecraft', href: '/tools/minecraft' },
]

export default function Navbar() {
  const [openTools, setOpenTools] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30" role="banner">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav
          className="flex flex-wrap justify-center gap-6 items-center"
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-1 py-2 text-sm text-gray-200 hover:text-white"
            >
              <span className="hover:underline decoration-sakura-pink decoration-2">{link.label}</span>
            </a>
          ))}

          {/* Tools dropdown -> Discord / Minecraft */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenTools((v) => !v)}
              aria-haspopup="true"
              aria-expanded={openTools}
              className="relative px-1 py-2 text-sm text-gray-200 hover:text-white inline-flex items-center gap-1"
            >
              <span className="hover:underline decoration-sakura-pink decoration-2">Tools</span>
              <svg
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {openTools && (
              <div className="absolute left-0 mt-2 w-56 rounded-2xl border border-white/10 bg-black/90 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
                {tools.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setOpenTools(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white"
                  >
                    {tool.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Other top-level links */}
          <a
            href="https://bot.ro-mihaiu.xyz/commands"
            className="relative px-1 py-2 text-sm text-gray-200 hover:text-white"
          >
            <span className="hover:underline decoration-sakura-pink decoration-2">Bot</span>
          </a>
          <a
            href="/contact"
            className="relative px-1 py-2 text-sm text-gray-200 hover:text-white"
          >
            <span className="hover:underline decoration-sakura-pink decoration-2">Contact</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
