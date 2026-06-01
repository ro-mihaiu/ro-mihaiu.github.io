import Link from 'next/link'

export default function Custom404() {
  return (
    <main className="min-h-screen bg-deep-black text-white flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-black/80 p-12 text-center shadow-2xl shadow-black/50 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Page not found</p>
        <h1 className="mt-6 text-7xl font-black text-white">404</h1>
        <p className="mt-6 text-gray-300 leading-8">
          The build you are looking for cannot be found. Return to the main hub to explore BlossomCraft creations.
        </p>
        <Link href="/" className="mt-10 inline-flex rounded-full bg-sakura-pink px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
