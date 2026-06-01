import React from 'react'

const links = [
  'Home', 'Builds', 'Projects', 'Player Warps', 'About', 'Contact'
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex flex-wrap justify-center gap-6 items-center">
          {links.map((l) => (
            <a
              key={l}
              href={l === 'Player Warps' ? '/player-warps' : `#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative px-1 py-2 text-sm text-gray-200 hover:text-white"
            >
              <span className="hover:underline decoration-sakura-pink decoration-2">{l}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
