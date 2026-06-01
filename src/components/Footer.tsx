import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/70 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">BlossomCraft Portfolio</p>
            <h2 className="mt-4 text-3xl font-black text-white">Big ideas. Beautiful builds. BlossomCraft.</h2>
            <p className="mt-4 max-w-xl text-gray-300 leading-7">
              A cinematic portfolio page for Mihaitzuuu, built to show server projects, community life, and premium Minecraft architecture.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-blossom-pink/80">Quick links</h3>
              <ul className="mt-5 space-y-3 text-gray-300">
                <li><Link href="/tos" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
                <li><a href="https://blossomcraft.org" target="_blank" rel="noopener noreferrer" className="hover:text-white">BlossomCraft SMP</a></li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-blossom-pink/80">Connect</h3>
              <ul className="mt-5 space-y-3 text-gray-300">
                <li><a href="https://github.com/ro-mihaiu" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a></li>
                <li><a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="hover:text-white">Discord</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
