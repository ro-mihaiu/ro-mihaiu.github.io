'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import ContactPage from './contact'

// Temporary: /commissions reuses the existing commission form until a dedicated form is created.
export default function CommissionsPage() {
  // Keep the route distinct for SEO / navigation.
  useEffect(() => {
    document.title = 'Build Commissions — Mihaitzuuu Minecraft Builder'
  }, [])

  return (
    <div>
      <ContactPage />
      <div style={{ display: 'none' }}>
        <Link href="/contact">Contact</Link>
      </div>

      {/* Note: Footer + “Let’s collaborate” sections are handled globally by shared components/pages. */}

    </div>
  )
}

