import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { builds } from '../data/builds'

export default function BuildsPage() {
  return (
    <>
      <Head>
        <title>Builds — Mihaitzuuu Builds</title>
      </Head>
      <div className="relative min-h-screen bg-deep-black text-white">
        <Navbar />
        <main className="pt-28 max-w-6xl mx-auto px-6 pb-24">
          <h1 className="text-3xl font-black mb-6">Builds</h1>
          <p className="text-gray-300 mb-8">Browse our builds. Click "See more" for details.</p>

          <div className="grid gap-6 sm:grid-cols-2">
            {builds.map((b) => (
              <article key={b.slug} className="rounded-2xl overflow-hidden border border-white/5 bg-black/30">
                <Link href={`/builds/${b.slug}`}>
                  <a className="block">
                    <div className="h-48 bg-gray-800 flex items-center justify-center text-gray-400">
                      <img src={b.photos[0]} alt={b.title} className="object-cover w-full h-48" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{b.title}</h3>
                      <p className="text-sm text-gray-300">{b.short}</p>
                    </div>
                  </a>
                </Link>
                <div className="p-4 border-t border-white/5 flex justify-end">
                  <Link href={`/builds/${b.slug}`}>
                    <a className="rounded-md px-3 py-2 bg-sakura-pink/80 text-black font-medium">See more</a>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
