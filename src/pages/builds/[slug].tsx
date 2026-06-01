import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { getBuildBySlug } from '../../data/builds'

export default function BuildDetail() {
  const router = useRouter()
  const { slug } = router.query

  if (!slug || Array.isArray(slug)) return null

  const build = getBuildBySlug(slug)
  if (!build) {
    return (
      <div className="min-h-screen flex items-center justify-center">Build not found</div>
    )
  }

  return (
    <>
      <Head>
        <title>{build.title} — Build details</title>
      </Head>
      <div className="relative min-h-screen bg-deep-black text-white">
        <Navbar />
        <main className="pt-28 max-w-5xl mx-auto px-6 pb-24">
          <a href="/builds" className="text-sm text-gray-400 hover:underline">← Back to builds</a>
          <h1 className="text-3xl font-black mt-4 mb-2">{build.title}</h1>
          <p className="text-gray-300 mb-4">{build.short}</p>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            {(build.photos || []).slice(0, 3).map((p, i) => (
              <div key={i} className="h-48 bg-gray-800 flex items-center justify-center overflow-hidden rounded-lg">
                <img src={p} alt={`${build.title} ${i + 1}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-black/30 p-6">
              <h3 className="font-semibold mb-2">Price</h3>
              <p className="text-gray-300">{build.price ?? 'Contact for pricing'}</p>

              <h3 className="font-semibold mt-4 mb-2">Estimated time</h3>
              <p className="text-gray-300">{build.time ?? 'Varies'}</p>

              {build.extras && (
                <>
                  <h3 className="font-semibold mt-4 mb-2">Extras</h3>
                  <ul className="text-gray-300 list-disc list-inside">
                    {build.extras.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/30 p-6">
              {build.builders && (
                <>
                  <h3 className="font-semibold mb-2">Builders</h3>
                  <ul className="text-gray-300 list-disc list-inside">
                    {build.builders.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </>
              )}

              {build.buyers && (
                <>
                  <h3 className="font-semibold mt-4 mb-2">Buyers</h3>
                  <ul className="text-gray-300">
                    {build.buyers.map((buyer, i) => (
                      <li key={i} className="mb-2">
                        <div className="font-medium">{buyer.name}</div>
                        <div className="text-sm text-gray-300">Price: {buyer.price}</div>
                        {buyer.amount !== undefined && <div className="text-sm text-gray-300">Amount: {buyer.amount}</div>}
                        {buyer.design && <div className="text-sm text-gray-300">Design: {buyer.design}</div>}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
