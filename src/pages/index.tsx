import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import OwnershipSection from '../components/OwnershipSection'
import ServerLifeSection from '../components/ServerLifeSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import SakuraEffect from '../components/SakuraEffect'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mihaitzuuu's Builds — Premium Minecraft Builder for BlossomCraft SMP</title>
        <meta name="description" content="Professional Minecraft builder specializing in premium builds, automated farms, redstone systems, and server design for BlossomCraft SMP. Fast, polished, player-ready projects." />
        <meta name="keywords" content="Minecraft builder, Minecraft builds, BlossomCraft, SMP server, redstone, farms, Minecraft commissions" />
        <meta name="og:title" content="Mihaitzuuu's Builds — BlossomCraft SMP" />
        <meta name="og:description" content="Premium Minecraft projects and builds for BlossomCraft SMP" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mihaitzuuu',
              url: 'https://mihaitzuuu.com',
              sameAs: [
                'https://discord.com/users/1027052856697684099'
              ],
              jobTitle: 'Minecraft Builder',
              description: 'Professional Minecraft builder specializing in premium builds, automated farms, redstone systems, and server design for BlossomCraft SMP',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                email: 'mihaiu.dev@gmail.com'
              }
            })
          }}
        />
      </Head>
      <div className="relative min-h-screen overflow-hidden bg-deep-black text-white">
        <SakuraEffect />
        <div className="relative z-10">
          <Navbar />
          <main className="pt-24">
            <Hero />
            <AboutSection />
            <OwnershipSection />
            <ServerLifeSection />
            <ContactSection />
            <Footer />
          </main>
        </div>
      </div>
    </>
  )
}
