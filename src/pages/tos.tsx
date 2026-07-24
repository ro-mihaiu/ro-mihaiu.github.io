import Link from 'next/link'

import Head from 'next/head'

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service — Mihaitzuuu Builds</title>
        <meta name="description" content="Terms of Service for Mihaitzuuu's Builds portfolio and commission services on BlossomCraft SMP." />
      </Head>
      <main className="min-h-screen bg-deep-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto rounded-[2rem] border border-white/10 bg-black/80 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Legal</p>
        <h1 className="mt-4 text-4xl font-black text-white">Terms of Service</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: July 24, 2026</p>
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
            <h2 className="text-2xl font-semibold text-white">Commission Data and Privacy</h2>
            <div className="mt-3 space-y-3 leading-8">
              <p>
                When you submit a commission request, Mihaitzuuu may collect your in-game username, Discord username, email address, project details, reference links, and any files or images you choose to upload.
              </p>
              <p>
                This information is used only to review your request, communicate with you, prepare and carry out the build agreement, deliver the project, and provide related support.
              </p>
              <p>
                Commission information and uploaded files are kept for 30 days, or for the duration of the project where a build contract specifies a longer period. The applicable retention period will be stated in the build contract for that commission. Information is deleted or anonymised when it is no longer needed, unless it must be retained for a legal, accounting, or dispute-related reason.
              </p>
              <p>
                Where a strict deadline requires additional help, the minimum information needed for the work may be shared with members of Mihaitzuuu&apos;s builder group so they can help assess, plan, or complete the commission. Those members may use the information only for that commission and deadline; it is not shared for unrelated purposes or sold to third parties.
              </p>
              <p>
                You may request access to, correction of, or deletion of your commission information by contacting <a className="text-sakura-pink hover:underline" href="https://discord.ro-mihaiu.xyz">ro_mihaiu</a> on Discord. Deletion requests may affect Mihaitzuuu&apos;s ability to continue an active commission.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white">Commission Contracts</h2>
            <p className="mt-3 leading-8">
              Commission requests may be submitted through this website. A commission is only confirmed once its scope, price, delivery timeline, responsibilities, and applicable data-retention period have been agreed in an in-game build contract between you and Mihaitzuuu, so both parties can confirm the agreement at the same time. If a contract conflicts with these general terms for that specific commission, the contract takes priority.
            </p>
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
    </>
  )
}
