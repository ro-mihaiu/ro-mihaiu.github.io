import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { builds } from '../data/builds'
import { useState, useMemo } from 'react'

// Build categories mapping
const buildCategories: Record<string, string> = {
  'br-cybergaming84-castle': 'Bases',
  'gorb-tubs': 'Mega Projects',
  'redstone-systems': 'Redstone',
  'mapart': 'Mega Projects',
  'mina-cathedral': 'Bases'
}

export default function BuildsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')

  const categories = ['All', 'Bases', 'Mega Projects', 'Redstone']

  const filteredAndSortedBuilds = useMemo(() => {
    let filtered = builds.map(b => ({
      ...b,
      category: buildCategories[b.slug] || 'Other'
    }))

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.short.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(b => b.category === selectedCategory)
    }

    // Sort
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => b.slug.localeCompare(a.slug))
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy])
  return (
    <>
      <Head>
        <title>Builds Portfolio — Mihaitzuuu Minecraft Builder</title>
        <meta name="description" content="Browse premium Minecraft builds including custom structures, automated farms, redstone systems, map art, and server designs. Available for commission." />
        <meta name="keywords" content="Minecraft builds, custom builds, farms, redstone systems, Minecraft portfolio, build commissions" />
      </Head>
      <div className="relative min-h-screen bg-deep-black text-white">
        <Navbar />
        <main className="pt-28 max-w-6xl mx-auto px-6 pb-24">
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-4">Builds Portfolio</h1>
            <p className="text-gray-300 mb-6">Browse premium Minecraft builds, farms, and redstone systems.</p>

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search builds by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search builds"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50 transition"
              />
            </div>

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      aria-pressed={selectedCategory === cat}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        selectedCategory === cat
                          ? 'bg-sakura-pink text-black'
                          : 'bg-white/5 border border-white/10 text-gray-200 hover:border-sakura-pink/50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="sort" className="block text-sm font-semibold text-white mb-2">Sort By</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-lg bg-charcoal border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-sakura-pink/50 cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ccc' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                    backgroundColor: '#121212'
                  }}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-400 mb-4">
              Showing {filteredAndSortedBuilds.length} {filteredAndSortedBuilds.length === 1 ? 'build' : 'builds'}
            </p>
          </div>

          {/* Builds Grid */}
          {filteredAndSortedBuilds.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {filteredAndSortedBuilds.map((b) => (
                <article key={b.slug} className="rounded-2xl overflow-hidden border border-white/5 bg-black/30 hover:border-sakura-pink/30 transition-colors">
                  <Link href={`/builds/${b.slug}`} className="block">
                    <div className="relative h-48 bg-gray-800 flex items-center justify-center text-gray-400">
                      <Image
                        src={b.photos[0]}
                        alt={b.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                      <p className="text-sm text-gray-300 mb-2">{b.short}</p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                          {buildCategories[b.slug] || 'Other'}
                        </span>
                        {b.price && (
                          <span className="text-xs bg-sakura-pink/20 text-sakura-pink px-2 py-1 rounded">
                            {b.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="p-4 border-t border-white/5 flex justify-end">
                    <Link href={`/builds/${b.slug}`} className="rounded-md px-3 py-2 bg-sakura-pink/80 text-black font-medium hover:bg-sakura-pink transition">
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No builds found matching your search. Try adjusting your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
                className="mt-4 rounded-lg bg-sakura-pink/20 border border-sakura-pink/30 px-4 py-2 text-sm text-sakura-pink hover:bg-sakura-pink/30 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}
