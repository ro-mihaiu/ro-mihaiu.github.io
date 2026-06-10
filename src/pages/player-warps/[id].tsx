import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import warps, { getWarpById } from '../../data/warps'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  warp: {
    id: string
    name: string
    status: string
    desc: string
    guide?: string
    items?: { name: string; icon?: string }[]
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
                  <div className="prose prose-invert max-w-none prose-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{warp.guide}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">No guide available yet.</p>
                )}
              </div>
            </div>
            {warp.items && warp.items.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white">Items</h3>
                <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {warp.items.map((it) => (
                    <div key={it.name} className="flex flex-col items-center text-center text-sm text-gray-300">
                      {it.icon ? (
                        // If user adds an icon URL, it will be displayed here
                        // Use full URLs like https://blossom.atn.gg/path/to/icon.png
                        <img src={it.icon} alt={it.name} className="w-10 h-10 rounded-md object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-sakura-pink/70 to-violet-600 flex items-center justify-center text-white font-semibold text-xs">
                          {it.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </div>
                      )}
                      <span className="mt-1">{it.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">To add real icons, edit [src/data/warps.ts](src/data/warps.ts#L1-L200) and set each item&apos;s <span className="font-mono">icon</span> to a full URL (for example: <span className="font-mono">https://blossom.atn.gg/icons/enchant.png</span>).</p>
              </div>
            )}
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
