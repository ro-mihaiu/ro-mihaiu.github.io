'use client'

import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'

import Navbar from '../components/Navbar'

const RECEIVER_EMAIL = 'mihaiu.builds@gmail.com'

type FormData = {
  discordUser: string
  inGameUser: string
  yourEmail: string
  title: string
  details: string
  photoFiles: File[]
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    discordUser: '',
    inGameUser: '',
    yourEmail: '',
    title: '',
    details: '',
    photoFiles: [],
  })
  const [photoPreview, setPhotoPreview] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
    const validFiles = files.filter(file => {
      const fileName = file.name.toLowerCase()
      return validExtensions.some(ext => fileName.endsWith(ext))
    })

    if (validFiles.length < files.length) {
      alert(
        'Some files were skipped. Only image files (.jpg, .png, .jpeg, .gif, .webp, .bmp) are allowed.'
      )
    }

    setFormData(prev => ({ ...prev, photoFiles: [...prev.photoFiles, ...validFiles] }))

    const previews = validFiles.map(file => URL.createObjectURL(file))
    setPhotoPreview(prev => [...prev, ...previews])
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photoFiles: prev.photoFiles.filter((_, i) => i !== index),
    }))

    setPhotoPreview(prev => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL

    // Fallback: mailto when webhook isn't configured
    if (!webhookUrl) {
      const photoInfo =
        formData.photoFiles.length > 0
          ? `\nReference Photos: ${formData.photoFiles.length} file(s) attached`
          : ''

      const mailtoLink = `mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent(
        formData.title || 'Report'
      )}&body=${encodeURIComponent(
        [
          `Discord: ${formData.discordUser}`,
          `In-game: ${formData.inGameUser}`,
          `Email: ${formData.yourEmail}`,
          '',
          `Details:`,
          formData.details,
          photoInfo,
          '',
          '---',
          'Note: Please include any attached photos with your email to complete your report.',
        ].join('\n')
      )}`

      window.location.href = mailtoLink
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      setIsLoading(false)
      return
    }

    try {
      const embed: Record<string, unknown> = {
        title: formData.title || 'Report / Question',
        color: 0xff8ac2,
        fields: [
          { name: 'Discord', value: formData.discordUser || 'Not provided', inline: true },
          { name: 'In-game User', value: formData.inGameUser || 'Not provided', inline: true },
          { name: 'Email', value: formData.yourEmail || 'Not provided', inline: true },
          { name: 'Details', value: formData.details.substring(0, 1024) || '—' },
        ],
        timestamp: new Date().toISOString(),
      }

      let response: Response

      if (formData.photoFiles.length > 0) {
        const formPayload = new FormData()

        const attachments: { id: number; filename: string }[] = []
        formData.photoFiles.forEach((photo, i) => {
          formPayload.append(`files[${i}]`, photo)
          attachments.push({ id: i, filename: photo.name })
        })

        const payload: Record<string, unknown> = {
          content: `**New report from \`${formData.inGameUser || formData.discordUser || 'unknown'}\`**`,
          embeds: [embed],
          attachments,
        }

        ;(embed as Record<string, unknown>).image = {
          url: `attachment://${attachments[0].filename}`,
        }

        formPayload.append('payload_json', JSON.stringify(payload))

        response = await fetch(webhookUrl, {
          method: 'POST',
          body: formPayload,
        })
      } else {
        response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `**New report from \`${formData.inGameUser || formData.discordUser || 'unknown'}\`**`,
            embeds: [embed],
          }),
        })
      }

      if (!response.ok) {
        const errText = await response.text().catch(() => 'unknown')
        throw new Error(`Discord webhook returned ${response.status}: ${errText}`)
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          discordUser: '',
          inGameUser: '',
          yourEmail: '',
          title: '',
          details: '',
          photoFiles: [],
        })
        setPhotoPreview([])
      }, 3000)
    } catch (error) {
      console.error('Discord webhook failed:', error)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Questions / Reports — Mihaitzuuu Minecraft Builder</title>
        <meta
          name="description"
          content="Send a report or question. Discord + in-game username + email + title + details + photos/proof."
        />
        <meta
          name="keywords"
          content="Minecraft report, suggestions, bugs, questions, contact builder"
        />
      </Head>

      <main className="min-h-screen bg-deep-black text-white px-6 py-20">
        <Navbar />
        <div className="max-w-4xl mx-auto pt-20">
          <div className="rounded-[2rem] border border-white/10 bg-black/80 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Questions or Reports</p>
            <h1 className="mt-4 text-4xl font-black text-white">Send a Report / Question</h1>
            <p className="mt-6 text-gray-300 leading-8">
              Report something made on this website/BlossomCraft server by me (Mihaitzuuu). If the issue relates to BlossomCraft itself, it should be handled by BlossomCraft staff. Just tell me what went wrong and share evidence if you have it.


            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Discord *
                  </label>
                  <input
                    type="text"
                    name="discordUser"
                    value={formData.discordUser}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                    placeholder="e.g., @username or username#1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    In-game User *
                  </label>
                  <input
                    type="text"
                    name="inGameUser"
                    value={formData.inGameUser}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                    placeholder="e.g., Steve or BR_Steve"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email *</label>
                <input
                  type="email"
                  name="yourEmail"
                  value={formData.yourEmail}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                  placeholder="e.g., you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Title *</label>
                <textarea
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50 resize-y"
                  placeholder="Short summary (e.g., Bug in any of my pws, suggestion about builds or requesting help with something I made)."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">More Details *</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                  placeholder="What happened? When? Where? What should be changed/fixed? Include any relevant context."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Photos / Proof (optional)</label>
                <p className="text-xs text-gray-400 mb-2">Upload reference screenshots or evidence (.jpg, .png, .jpeg, .gif, .webp, .bmp)</p>
                <input
                  type="file"
                  multiple
                  onChange={handlePhotoChange}
                  accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,image/*"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-gray-300 focus:outline-none focus:border-sakura-pink/50 file:bg-sakura-pink file:text-black file:border-0 file:rounded-md file:px-3 file:py-1 file:text-sm file:font-semibold file:cursor-pointer"
                />

                {photoPreview.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {photoPreview.map((preview, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden border border-white/10"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-sakura-pink px-6 py-4 text-base font-bold text-black transition hover:brightness-110 shadow-lg shadow-sakura-pink/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Report'}
              </button>
            </form>

            {submitted && (
              <div className="mt-6 rounded-lg bg-emerald/20 border border-emerald px-4 py-3 text-emerald">
                ✓ Report sent! Mihaitzuuu will review it shortly (Discord/webhook used if available).
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Other Ways to Reach Me</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80 mb-2">Discord</p>
                  <p className="text-white">
                    <a
                      href="https://discord.ro-mihaiu.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sakura-pink transition"
                    >
                      @ro_mihaiu
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80 mb-2">
                    In Game (BlossomCraft - Spirit)
                  </p>
                  <p className="text-white mt-1">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        navigator.clipboard?.writeText('/mail send Mihaitzuuu')
                      }}
                      className="inline-block text-white hover:text-sakura-pink transition-colors font-semibold"
                      aria-label="Copy /mail send Mihaitzuuu"
                    >
                      Mihaitzuuu
                    </a>
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Click to copy <span className="text-white">'/mail send Mihaitzuuu'</span>
                  </p>
                </div>
              </div>

              <Link
                href="/"
                className="mt-10 inline-flex rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                ← Return home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

