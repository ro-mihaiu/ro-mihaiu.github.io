import Link from 'next/link'

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-deep-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto rounded-[2rem] border border-white/10 bg-black/80 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Legal</p>
        <h1 className="mt-4 text-4xl font-black text-white">Terms of Service</h1>
        <p className="mt-6 text-gray-300 leading-8">
          Welcome to the BlossomCraft portfolio site for Mihaitzuuu. By accessing this site, you agree to the terms and conditions below.
        </p>
        <div className="mt-10 space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white">Use of Site</h2>
            <p className="mt-3">This website is a portfolio and showcase of Minecraft builds. Content is provided for informational and promotional use only.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Intellectual Property</h2>
            <p className="mt-3">All designs, screenshots, and text on this site are owned by Mihaitzuuu or used with permission. Do not reproduce or redistribute without consent.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Disclaimer</h2>
            <p className="mt-3">This site is provided "as is" without warranties. The owner is not liable for any damages arising from use of this site.</p>
          </section>
        </div>
        <Link href="/" className="mt-10 inline-flex rounded-full bg-sakura-pink px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110">
          Return home
        </Link>
      </div>
    </main>
  )
}
