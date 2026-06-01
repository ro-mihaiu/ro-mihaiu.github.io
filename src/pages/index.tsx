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
        <title>MIHAITZUUU BUILDS — BlossomCraft SMP</title>
        <meta name="description" content="Professional Minecraft builds crafted for BlossomCraft SMP" />
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
