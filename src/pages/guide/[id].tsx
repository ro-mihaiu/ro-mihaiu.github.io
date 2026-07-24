import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import guides, { getGuideById, Guide } from '../../data/guides'

type Props = {
  guide: Guide
}

export default function GuidePage({ guide }: Props) {
  return (
    <>
      <Head>
        <title>{`${guide.name} Guide - Mihaitzuuu`}</title>
        <meta name="description" content={`${guide.name} guide for Mihaitzuuu's BlossomCraft portfolio.`} />
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-deep-black text-white">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 pb-24 pt-28">
          <div className="mb-8 flex items-center gap-4">
            <h1 className="text-3xl font-black">{guide.name}</h1>
            <span className="rounded-full bg-gradient-to-r from-sakura-pink/80 to-violet-500/80 px-3 py-1 text-sm font-semibold text-white">
              Guide
            </span>
            <Link href="/" className="ml-auto text-gray-400 hover:text-white">
              Back
            </Link>
          </div>

          <section className="rounded-2xl border border-white/10 bg-black/40 p-6" aria-label={`${guide.name} guide content`}>
            <p className="text-gray-300">To be edited</p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: guides.map((guide) => ({ params: { id: guide.id } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const guide = getGuideById(params?.id as string)

  if (!guide) return { notFound: true }

  return { props: { guide } }
}
