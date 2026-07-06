'use client'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { useState } from 'react'

import Head from 'next/head'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    buildType: '',
    subserver: '',
    budget: '',
    timeframe: '',
    details: '',
    youtubeLink: '',
    schematicFile: null as File | null,
    photoFiles: [] as File[]
  })
  const [submitted, setSubmitted] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSchematicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validExtensions = ['.schematic', '.litematic', '.nbt']
      const fileName = file.name.toLowerCase()
      const isValid = validExtensions.some(ext => fileName.endsWith(ext))
      if (isValid) {
        setFormData(prev => ({ ...prev, schematicFile: file }))
      } else {
        alert('Please upload a valid file (.schematic, .litematic, or .nbt)')
        e.target.value = ''
      }
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
    const validFiles = files.filter(file => {
      const fileName = file.name.toLowerCase()
      return validExtensions.some(ext => fileName.endsWith(ext))
    })

    if (validFiles.length < files.length) {
      alert('Some files were skipped. Only image files (.jpg, .png, .jpeg, .gif, .webp, .bmp) are allowed.')
    }

    setFormData(prev => ({ ...prev, photoFiles: [...prev.photoFiles, ...validFiles] }))

    const previews = validFiles.map(file => URL.createObjectURL(file))
    setPhotoPreview(prev => [...prev, ...previews])
  }

  const [isLoading, setIsLoading] = useState(false)

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photoFiles: prev.photoFiles.filter((_, i) => i !== index)
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

    if (!webhookUrl) {
      // No webhook configured, fallback to mailto
      const fileInfo = formData.schematicFile ? `\nSchematic File: ${formData.schematicFile.name}` : ''
      const photoInfo = formData.photoFiles.length > 0 ? `\nReference Photos: ${formData.photoFiles.length} file(s) attached` : ''
      const youtubeInfo = formData.youtubeLink ? `\nYouTube Reference: ${formData.youtubeLink}` : ''

      const mailtoLink = `mailto:mihaiu.dev@gmail.com?subject=Build Commission Request&body=Name: ${encodeURIComponent(formData.name)}%0ABuild Type: ${encodeURIComponent(formData.buildType)}%0ASubserver: ${encodeURIComponent(formData.subserver || 'Not specified')}%0ABudget: ${encodeURIComponent(formData.budget || 'Not specified')}%0ATimeframe: ${encodeURIComponent(formData.timeframe || 'Not specified')}%0A%0AProject Details:%0A${encodeURIComponent(formData.details)}${fileInfo}${youtubeInfo}%0A%0A----%0ANote: Please send this email with any attached files (schematics, photos) to complete your request.`
      window.location.href = mailtoLink
      setSubmitted(true)
      setIsLoading(false)
      setTimeout(() => setSubmitted(false), 3000)
      return
    }

    try {
      const embed = {
        title: `Build Commission: ${formData.buildType}`,
        color: 0xff8ac2,
        fields: [
          { name: 'Username', value: formData.name, inline: true },
          { name: 'Subserver', value: formData.subserver || 'Not specified', inline: true },
          { name: 'Budget', value: formData.budget || 'Not specified', inline: true },
          { name: 'Timeframe', value: formData.timeframe || 'Not specified', inline: true },
          { name: 'Details', value: formData.details.substring(0, 1024) },
        ],
        timestamp: new Date().toISOString(),
      }

      if (formData.youtubeLink) {
        embed.fields.push({ name: 'YouTube Reference', value: formData.youtubeLink, inline: false })
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**New commission request from \`${formData.name}\`**`,
          embeds: [embed],
        }),
      })

      if (!response.ok) {
        throw new Error(`Discord webhook returned ${response.status}`)
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          buildType: '',
          subserver: '',
          budget: '',
          timeframe: '',
          details: '',
          youtubeLink: '',
          schematicFile: null,
          photoFiles: [],
        })
        setPhotoPreview([])
      }, 3000)
    } catch (error) {
      console.error('Discord webhook failed:', error)
      // Fallback to mailto
      const fileInfo = formData.schematicFile ? `\nSchematic File: ${formData.schematicFile.name}` : ''
      const photoInfo = formData.photoFiles.length > 0 ? `\nReference Photos: ${formData.photoFiles.length} file(s) attached` : ''
      const youtubeInfo = formData.youtubeLink ? `\nYouTube Reference: ${formData.youtubeLink}` : ''

      const mailtoLink = `mailto:mihaiu.dev@gmail.com?subject=Build Commission Request&body=Name: ${encodeURIComponent(formData.name)}%0ABuild Type: ${encodeURIComponent(formData.buildType)}%0ASubserver: ${encodeURIComponent(formData.subserver || 'Not specified')}%0ABudget: ${encodeURIComponent(formData.budget || 'Not specified')}%0ATimeframe: ${encodeURIComponent(formData.timeframe || 'Not specified')}%0A%0AProject Details:%0A${encodeURIComponent(formData.details)}${fileInfo}${youtubeInfo}%0A%0A----%0ANote: Please send this email with any attached files (schematics, photos) to complete your request.`
      window.location.href = mailtoLink
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Contact & Commission — Mihaitzuuu Minecraft Builder</title>
        <meta name="description" content="Request a custom Minecraft build, farm, or redstone system. Fill out our commission form or contact us directly via Discord or email." />
        <meta name="keywords" content="Minecraft commission, build commission, custom Minecraft builds, contact builder" />
      </Head>
      <main className="min-h-screen bg-deep-black text-white px-6 py-20">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-20">
        <div className="rounded-[2rem] border border-white/10 bg-black/80 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">Ready to commission</p>
          <h1 className="mt-4 text-4xl font-black text-white">Request a Build Quote</h1>
          <p className="mt-6 text-gray-300 leading-8">
            Fill out the form below to get started on your next BlossomCraft project. I build premium Minecraft projects, redstone systems, and server designs.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-white mb-2">Your Username *</label>
              <p id="username-hint" className="text-xs text-gray-400 mb-2">Include BR_ if you are on Bedrock</p>
              <input
                id="username"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-describedby="username-hint"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                placeholder="e.g., Steve or BR_Steve"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">What do you need built? *</label>
                <select
                  name="buildType"
                  value={formData.buildType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-charcoal border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-sakura-pink/50 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ccc' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                    backgroundColor: '#121212'
                  }}
                >
                  <option value="">Select a build type</option>
                  <option value="custom-build">Custom Build / Structure</option>
                  <option value="farm">Automated Farm</option>
                  <option value="redstone">Redstone System</option>
                  <option value="mapart">Map Art</option>
                  <option value="server-design">Server Design / District</option>
                  <option value="other">Other / Unsure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Select Subserver</label>
                <select
                  name="subserver"
                  value={formData.subserver}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-charcoal border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-sakura-pink/50 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ccc' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                    backgroundColor: '#121212'
                  }}
                >
                  <option value="">Choose a subserver</option>
                  <option value="cherry">Cherry</option>
                  <option value="spirit">Spirit</option>
                  <option value="lotus">Lotus</option>
                  <option value="tulip">Tulip</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Budget Range</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                  placeholder="e.g., 500k - 1M"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Preferred Timeframe</label>
                <select
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-charcoal border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-sakura-pink/50 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ccc' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                    backgroundColor: '#121212'
                  }}
                >
                  <option value="">Select a timeframe</option>
                  <option value="asap">ASAP (1-3 days)</option>
                  <option value="1week">Within 1 week</option>
                  <option value="2weeks">Within 2 weeks</option>
                  <option value="flexible">Flexible / No rush</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Project Details *</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={5}
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                placeholder="Describe your project. Any references, inspiration, or specific requirements?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">YouTube Reference Link (optional)</label>
              <p className="text-xs text-gray-400 mb-2">Add a link to a video showing your project idea or build reference</p>
              <input
                type="url"
                name="youtubeLink"
                value={formData.youtubeLink}
                onChange={handleChange}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-sakura-pink/50"
                placeholder="e.g., https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Build File / Schematic (optional)</label>
              <p className="text-xs text-gray-400 mb-2">Upload a .schematic, .litematic, or .nbt file (Litematica mod format)</p>
              <input
                type="file"
                onChange={handleSchematicChange}
                accept=".schematic,.litematic,.nbt"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-gray-300 focus:outline-none focus:border-sakura-pink/50 file:bg-sakura-pink file:text-black file:border-0 file:rounded-md file:px-3 file:py-1 file:text-sm file:font-semibold file:cursor-pointer"
              />
              {formData.schematicFile && (
                <p className="mt-2 text-sm text-emerald">✓ {formData.schematicFile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Reference Photos (optional)</label>
              <p className="text-xs text-gray-400 mb-2">Upload images for inspiration or reference (.jpg, .png, .jpeg, .gif, .webp, .bmp)</p>
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
                    <div key={index} className="relative rounded-lg overflow-hidden border border-white/10">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover" />
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
              {isLoading ? 'Sending...' : 'Send Commission Request'}
            </button>
          </form>

          {submitted && (
            <div className="mt-6 rounded-lg bg-emerald/20 border border-emerald px-4 py-3 text-emerald">
              ✓ Commission request sent! Mihaitzuuu will review it shortly.
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Other Ways to Reach Me</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80 mb-2">Discord</p>
                <p className="text-white"><a href="https://discord.com/users/1027052856697684099" target="_blank" rel="noopener noreferrer" className="hover:text-sakura-pink transition">@ro_mihaiu</a></p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80 mb-2">Email</p>
                <p className="text-white"><a href="mailto:mihaiu.dev@gmail.com" className="hover:text-sakura-pink transition">mihaiu.dev@gmail.com</a></p>
              </div>
            </div>
          </div>

          <Link href="/" className="mt-10 inline-flex rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            ← Return home
          </Link>
        </div>
      </div>
    </main>
    </>
  )
}
