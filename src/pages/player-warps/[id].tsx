import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import warps, { getWarpById } from '../../data/warps'

type Props = {
  warp: {
    id: string
    name: string
    status: string
    desc: string
    guide?: string
  }
}

export default function WarpPage({ warp }: Props) {
  if (!warp) return <div />

  return (
    <>
      <Head>
        <title>{warp.name} — Player Warp</title>
        <meta name="description" content={warp.desc} />
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-deep-black text-white">
        <Navbar />
        <main className="pt-28 max-w-4xl mx-auto px-6 pb-24">
          <div className="mb-8 flex items-center gap-4">
            <h1 className="text-3xl font-black">{warp.name}</h1>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-sakura-pink/80 to-violet-500/80 text-white">Guide</span>
            <Link href="/player-warps" className="ml-auto text-gray-400 hover:text-white">Back</Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <p className="text-gray-300 mb-4">{warp.desc}</p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white">Guide</h3>
              <div className="mt-2 rounded-md bg-black/30 p-4 text-gray-300">
                {warp.guide ? (
                  <p className="leading-6">{warp.guide}</p>
                ) : (
                  <p className="text-sm">No guide available yet.</p>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = warps.map((w) => ({ params: { id: w.id } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const warp = getWarpById(id) || null
  if (!warp) return { notFound: true }
  return { props: { warp } }
}
