export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-[2rem] border border-white/10 bg-black/40 p-10 shadow-xl shadow-black/30 backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Let’s collaborate</p>
              <h2 className="mt-4 text-4xl font-black text-white">Ready to build your next BlossomCraft legacy?</h2>
              <p className="mt-4 text-gray-300 leading-8">
                Contact Mihaitzuuu for cinematic build commissions, Redstone automation, community projects, and server design.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-black/50 p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blossom-pink/80">Discord</p>
                <p className="mt-2 text-white"><a href="https://discord.com/users/1027052856697684099" target="_blank" rel="noopener noreferrer">@ro_mihaiu</a></p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blossom-pink/80">Email</p>
                <p className="mt-2 text-white"><a href="mailto:mihaiu.dev@gmail.com" target="_blank" rel="noopener noreferrer">mihaiu.dev@gmail.com</a></p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blossom-pink/80">Server</p>
                <p className="mt-2 text-white">play.blossomcraft.org</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
