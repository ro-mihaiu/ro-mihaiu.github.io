'use client'

import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'

import Navbar from '../components/Navbar'

type CommissionPayload = {
  name: string
  discordUser: string
  yourEmail: string
  buildType: string
  budget: string
  subserver: string
  timeframe: string
  details: string
  youtubeLink: string
  schematicFileName?: string
  photoFilesCount?: number
}

const SUBSERVERS = ['cherry', 'spirit', 'lotus', 'tulip'] as const
const BUILD_TYPES = [
  'redstone system',
  'base',
  'megabase',
  'mapart',
  'other',
] as const
const BUDGET_PRESETS = ['Under 500k', '500k–1M', '1M–3M', '3M–5M', '5M+']
const TIMEFRAMES = [
  'ASAP',
  '1–3 days',
  '3–7 days',
  '1–2 weeks',
  '2–4 weeks',
  'More than a month',
]

const RECEIVER_GDRIVE_IN_GAME = 'Mihaitzuuu'
const DISCORD_HANDLE = '@ro_mihaiu'

export default function CommissionsPage() {
  useEffect(() => {
    document.title = 'Request a Build Quote — Mihaitzuuu Minecraft Builder'
  }, [])

  const [form, setForm] = useState({
    name: '',
    discordUser: '',
    yourEmail: '',
    buildType: '',
    budget: '',
    subserver: '',
    timeframe: '',
    details: '',
    youtubeLink: '',
  })

  const [schematicFile, setSchematicFile] = useState<File | null>(null)
  const [photoFiles, setPhotoFiles] = useState<File[]>([])

  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const webhookHint = useMemo(() => {
    return 'If Discord webhook / email isn’t configured on the server yet, this form may fail to send.'
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
  const isValidImage = (file: File) => {
    const lower = file.name.toLowerCase()
    return validImageExtensions.some(ext => lower.endsWith(ext))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const valid = files.filter(isValidImage)

    if (valid.length < files.length) {
      alert(
        'Some files were skipped. Only image files (.jpg, .png, .jpeg, .gif, .webp, .bmp) are allowed.'
      )
    }

    // Basic cap to avoid huge payloads
    const combined = [...photoFiles, ...valid].slice(0, 8)
    setPhotoFiles(combined)

    const previews = valid.map(f => URL.createObjectURL(f))
    setPhotoPreviews(prev => [...prev, ...previews].slice(0, 8))
  }

  useEffect(() => {
    return () => {
      // Revoke previews on unmount
      photoPreviews.forEach(u => {
        try {
          URL.revokeObjectURL(u)
        } catch {
          // ignore
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removePhoto = (index: number) => {
    setPhotoFiles(prev => prev.filter((_, i) => i !== index))
    setPhotoPreviews(prev => {
      const removed = prev[index]
      if (removed) {
        try {
          URL.revokeObjectURL(removed)
        } catch {
          // ignore
        }
      }
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleSchematicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files && e.target.files[0]) || null
    setSchematicFile(file)
  }

  const validate = () => {
    if (!form.name.trim()) return 'Your Username is required.'
    if (!form.discordUser.trim()) return 'Discord is required.'
    if (!form.yourEmail.trim()) return 'Email is required.'
    if (!form.buildType.trim()) return 'Select what you need built.'
    if (!form.budget.trim()) return 'Select a budget range.'
    if (!form.subserver.trim()) return 'Select a subserver.'
    if (!form.timeframe.trim()) return 'Select a preferred timeframe.'
    if (!form.details.trim()) return 'Project Details is required.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorText(null)
    setSubmitted(false)

    const msg = validate()
    if (msg) {
      setErrorText(msg)
      return
    }

    setIsLoading(true)

    try {
      // Upload files + form data to the server (multipart/form-data)
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('discordUser', form.discordUser)
      fd.append('yourEmail', form.yourEmail)
      fd.append('buildType', form.buildType)
      fd.append('subserver', form.subserver)
      fd.append('budget', form.budget)
      fd.append('timeframe', form.timeframe)
      fd.append('details', form.details)
      if (form.youtubeLink) fd.append('youtubeLink', form.youtubeLink)

      if (schematicFile) {
        fd.append('schematicFile', schematicFile)
      }

      for (const photo of photoFiles) {
        fd.append('photoFiles', photo)
      }

      const res = await fetch('/api/send-commission', {
        method: 'POST',
        body: fd,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const serverMessage =
          (Array.isArray(data?.errors) && data.errors.length > 0 ? data.errors.join(' | ') : null) ||
          data?.message ||
          `Request failed with ${res.status}`
        console.error('[/api/send-commission] server response:', { status: res.status, data })
        throw new Error(serverMessage)
      }

      setSubmitted(true)
      setForm({
        name: '',
        discordUser: '',
        yourEmail: '',
        buildType: '',
        budget: '',
        subserver: '',
        timeframe: '',
        details: '',
        youtubeLink: '',
      })
      setSchematicFile(null)
      setPhotoFiles([])

      setPhotoPreviews(prev => {
        prev.forEach(u => {
          try {
            URL.revokeObjectURL(u)
          } catch {
            // ignore
          }
        })
        return []
      })

      setTimeout(() => setSubmitted(false), 3500)
    } catch (err) {
      setErrorText(String(err))
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Build Commissions — Mihaitzuuu Minecraft Builder</title>
        <meta
          name="description"
          content="Request a build quote. Submit your username, Discord, email, build type, subserver, budget range, timeframe and project details."
        />
      </Head>

      <main className="min-h-screen bg-deep-black text-white px-6 py-20">
        <Navbar />

        <div className="max-w-4xl mx-auto pt-20">
          <div className="rounded-[2rem] border border-white/10 bg-black/80 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">READY TO COMMISSION</p>
            <h1 className="mt-4 text-4xl font-black text-white">Request a Build Quote</h1>
            <p className="mt-4 text-gray-300 leading-8">
              Fill out the form below to get started on your next Blossom Craft project. I build premium Minecraft projects,
              redstone systems, and server designs.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Your Username *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                  placeholder="e.g., Steve or BR_Steve"
                />
              </div>

              {/* Discord + Email */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Discord *</label>
                  <input
                    type="text"
                    name="discordUser"
                    value={form.discordUser}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                    placeholder="@username or username#1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Gmail / Email *</label>
                  <input
                    type="email"
                    name="yourEmail"
                    value={form.yourEmail}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                    placeholder="e.g., you@example.com"
                  />
                </div>
              </div>

              {/* What do you need built? + budget */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">What do you need built? *</label>
                  <select
                    name="buildType"
                    value={form.buildType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-sakura-pink/50"
                  >
                    <option value="">Select a build type</option>
                    {BUILD_TYPES.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Budget Range *</label>
                  <input
                    type="text"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                    placeholder="e.g., 500k-1M"
                  />
                  <p className="text-xs text-gray-400 mt-2">Type your budget (any format like 500k-1M).</p>
                </div>
              </div>

              {/* Subserver + Timeframe */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Select Subserver *</label>
                  <select
                    name="subserver"
                    value={form.subserver}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-sakura-pink/50"
                  >
                    <option value="">Choose a subserver</option>
                    {SUBSERVERS.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Preferred Timeframe *</label>
                  <select
                    name="timeframe"
                    value={form.timeframe}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-sakura-pink/50"
                  >
                    <option value="">Select a timeframe</option>
                    {TIMEFRAMES.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Project Details *</label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50 resize-y"
                  placeholder="Describe your project. Any references, inspiration, or specific requirements?"
                />
              </div>

              {/* Youtube + schematic */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">YouTube Reference Link (optional)</label>
                  <input
                    type="url"
                    name="youtubeLink"
                    value={form.youtubeLink}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                    placeholder="https://"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Build File / Schematic (optional)</label>
                  <input
                    type="file"
                    onChange={handleSchematicChange}
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-gray-300 focus:outline-none focus:border-sakura-pink/50 file:bg-sakura-pink file:text-black file:border-0 file:rounded-md file:px-3 file:py-1 file:text-sm file:font-semibold file:cursor-pointer"
                    accept=".litematic,.schematic,.schem,.nbt,.zip,.rar,application/octet-stream"
                  />
                  {schematicFile && (
                    <p className="text-xs text-gray-400 mt-2">Selected: {schematicFile.name}</p>
                  )}
                </div>
              </div>

              {/* Photos */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Reference Photos (optional)</label>
                <p className="text-xs text-gray-400 mb-2">
                  Upload images for inspiration or reference (.jpg, .png, .jpeg, .gif, .webp, .bmp)
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handlePhotoChange}
                  accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,image/*"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-gray-300 focus:outline-none focus:border-sakura-pink/50 file:bg-sakura-pink file:text-black file:border-0 file:rounded-md file:px-3 file:py-1 file:text-sm file:font-semibold file:cursor-pointer"
                />

                {photoPreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {photoPreviews.map((preview, index) => (
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

              {/* Error + submit */}
              {errorText && (
                <div className="rounded-lg bg-red-900/30 border border-red-500/40 px-4 py-3 text-red-200 text-sm">
                  {errorText}
                </div>
              )}

              {submitted && (
                <div className="rounded-lg bg-emerald/20 border border-emerald px-4 py-3 text-emerald">
                  ✓ Commission request sent! Mihaitzuuu will review it shortly.
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-sakura-pink px-6 py-4 text-base font-bold text-black transition hover:brightness-110 shadow-lg shadow-sakura-pink/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Commission Request'}
              </button>

              <p className="text-xs text-gray-400" aria-live="polite">
                {webhookHint}
              </p>
            </form>

            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Other Ways to Reach Me</h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80 mb-2">DISCORD</p>
                  <p className="text-white">
                    <a
                      href="https://discord.ro-mihaiu.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sakura-pink transition"
                    >
                      {DISCORD_HANDLE}
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
                      onClick={e => {
                        e.preventDefault()
                        navigator.clipboard?.writeText('/mail send Mihaitzuuu')
                      }}
                      className="inline-block text-white hover:text-sakura-pink transition-colors font-semibold"
                      aria-label="Copy /mail send Mihaitzuuu"
                    >
                      {RECEIVER_GDRIVE_IN_GAME}
                    </a>
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Click to copy <span className="text-white">'/mail send Mihaitzuuu'</span>
                  </p>
                </div>
              </div>

              <a
                href="/"
                className="mt-10 inline-flex rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                ← Return home
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

