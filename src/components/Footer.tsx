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
              I showcase server projects, community builds, and premium Minecraft work.
            </p>
          </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
                <h3 className="text-sm uppercase tracking-[0.3em] text-blossom-pink/80">Quick links</h3>
                <ul className="mt-5 space-y-3 text-gray-300">
                  <li>
                    <a href="https://bot.ro-mihaiu.xyz/commands" target="_blank" rel="noopener noreferrer" className="hover:text-white">Bot Commands</a>
                  </li>
                  <li>
                    <Link href="/tos" className="hover:text-white">Terms of Service</Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
                  </li>
                  <li>
                    <a href="https://blossomcraft.org" target="_blank" rel="noopener noreferrer" className="hover:text-white">BlossomCraft SMP</a>
                  </li>
                  <li>
                    <a href="https://ro-mihaiu.xyz/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white">Questions / Reports</a>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
                <h3 className="text-sm uppercase tracking-[0.3em] text-blossom-pink/80">Connect</h3>
                <ul className="mt-5 space-y-3 text-gray-300">
                  <li>
                    <a href="https://github.com/ro-mihaiu" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
                  </li>
                  <li>
                    <a href="https://discord.com/users/1027052856697684099" target="_blank" rel="noopener noreferrer" className="hover:text-white">Discord</a>
                  </li>
                  <li>
                    <span className="block text-white/90">In Game - <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        navigator.clipboard?.writeText('/mail send Mihaitzuuu')
                      }}
                      className="font-semibold text-white hover:text-sakura-pink transition-colors"
                      aria-label="Copy /mail send Mihaitzuuu"
                    >
                      Mihaitzuuu
                    </a>
                    </span>
                    <span className="block text-xs text-gray-400">Click to copy '/mail send Mihaitzuuu'</span>
                  </li>
                </ul>
              </div>
            </div>
        </div>

      </div>
    </footer>
  )
}
