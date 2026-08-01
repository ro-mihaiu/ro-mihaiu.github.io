import React from 'react'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Builds', href: '/builds' },
  { label: 'Player Warps', href: '/player-warps' },
  { label: 'Commission', href: '/commissions' },
  { label: 'About', href: '/#about' },
  { label: 'Bot', href: 'https://bot.ro-mihaiu.xyz/commands' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30" role="banner">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex flex-wrap justify-center gap-6 items-center" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-1 py-2 text-sm text-gray-200 hover:text-white"
            >
              <span className="hover:underline decoration-sakura-pink decoration-2">{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
