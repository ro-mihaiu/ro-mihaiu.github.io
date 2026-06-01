import Link from 'next/link'

export default function CookiesPolicy() {
  return (
    <main className="min-h-screen bg-deep-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto rounded-[2rem] border border-white/10 bg-black/80 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Legal</p>
        <h1 className="mt-4 text-4xl font-black text-white">Cookie Policy</h1>
        <p className="mt-6 text-gray-300 leading-8">
          This portfolio site uses cookies and browser storage to improve navigation and preserve settings such as theme or sound preferences.
        </p>
        <div className="mt-10 space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white">What cookies are used?</h2>
            <p className="mt-3">Essential cookies may be used to keep the site functional. Optional cookies may be used for performance and preference storage.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Your control</h2>
            <p className="mt-3">You may disable optional cookies in your browser settings. Essential site functionality will remain available without optional cookies.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Third-party services</h2>
            <p className="mt-3">If third-party embeds or analytics are added later, they will be disclosed and managed separately.</p>
          </section>
        </div>
        <Link href="/" className="mt-10 inline-flex rounded-full bg-sakura-pink px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110">
          Return home
        </Link>
      </div>
    </main>
  )
}
