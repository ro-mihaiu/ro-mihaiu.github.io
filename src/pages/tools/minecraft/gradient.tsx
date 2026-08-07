'use client'

import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'

import Navbar from '../../../components/Navbar'

/* ------------------------------------------------------------------ */
/* 1. CONFIG                                                           */
/*   The RGBirdflop API generates Minecraft gradient text. It returns  */
/*   standard Minecraft legacy color codes like  &xRRGGBB.             */
/*                                                                      */
/*   Because the Birdflop API does NOT send CORS headers, browsers     */
/*   cannot call it directly. We proxy the request through our own     */
/*   server-side route at /api/rgb to avoid the "Failed to fetch"      */
/*   CORS error.                                                        */
/* ------------------------------------------------------------------ */
const API_URL = '/api/rgb'

// Preset gradient palettes the user can quickly pick from
const PRESETS: { name: string; colors: string[] }[] = [
  { name: 'Sakura', colors: ['#ff8ac2', '#ffc7de', '#ffb86b'] },
  { name: 'Ocean', colors: ['#3b6ee6', '#3fdcdd', '#59d98e'] },
  { name: 'Sunset', colors: ['#ff5e62', '#ff9966', '#ffd86b'] },
  { name: 'Berry', colors: ['#e45cd0', '#3b6ee6'] },
  { name: 'Mint', colors: ['#59d98e', '#e5e510'] },
  { name: 'Gold', colors: ['#ffb86b', '#f5f543'] },
]

// Minecraft format codes (single-letter legacy codes wrapped in format)
const FORMAT_OPTIONS = ['bold', 'italic', 'underline', 'strikethrough'] as const
type FormatKey = (typeof FORMAT_OPTIONS)[number]

export default function MinecraftGradientPage() {
  const [text, setText] = useState('BlossomCraft')
  const [colors, setColors] = useState<string[]>(['#ff8ac2', '#59d98e'])
  const [colorLength, setColorLength] = useState(1)
  const [gradientType, setGradientType] = useState('rgb')
  const [formats, setFormats] = useState<FormatKey[]>([])
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  /** Build the colors array in the [{hex, pos}] form the API expects. */
  const buildColors = useCallback(() => {
    const count = colors.length
    if (count === 0) return []
    return colors.map((hex, i) => ({
      hex: hex.startsWith('#') ? hex : `#${hex}`,
      pos: Math.round((i / (count - 1)) * 100),
    }))
  }, [colors])

/** Build the Minecraft format-code string for the selected formats.
      e.g. bold + italic => "&l&o" */
  const buildFormatCodes = useCallback(() => {
    const map: Record<FormatKey, string> = {
      bold: '&l',
      italic: '&o',
      underline: '&n',
      strikethrough: '&m',
    }
    return formats.map((f) => map[f]).join('')
  }, [formats])

  /**
   * The Birdflop API (with the default &#RRGGBB color format) does NOT
   * emit format codes — it only outputs per-character colors. To make
   * bold/italic/underline/strikethrough actually work in Minecraft, we
   * inject the chosen format codes right after every color code, so each
   * character is both colored AND formatted.
   */
  const injectFormatting = (raw: string): string => {
    const codes = buildFormatCodes()
    if (!codes) return raw
    // Insert the format codes after each &#RRGGBB / &xRRGGBB color code
    return raw.replace(/(&(?:#|x)(?:[0-9a-fA-F]{6}))/g, `$1${codes}`)
  }

  /** Fetch the gradient from the RGBirdflop API. */
  const generate = useCallback(async () => {
    if (!text.trim()) {
      setOutput('')
      return
    }
    if (colors.length === 0) {
      setError('Pick at least one color.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          colors: buildColors(),
          colorLength: Math.max(1, Number(colorLength) || 1),
          gradientType,
          trimSpaces: true,
          silent: true,
        }),
      })
      if (!res.ok) {
        throw new Error(`API error ${res.status}`)
      }
      const data = await res.json()
      setOutput(injectFormatting(data.output || ''))
    } catch (err) {
      setError(String(err instanceof Error ? err.message : err))
      setOutput('')
    } finally {
      setLoading(false)
    }
  }, [text, colors, colorLength, gradientType, buildColors, injectFormatting])

  // Regenerate whenever inputs change
  useEffect(() => {
    generate()
  }, [generate])

  const toggleFormat = (f: FormatKey) => {
    setFormats((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))
  }

  const updateColor = (index: number, value: string) => {
    setColors((prev) => prev.map((c, i) => (i === index ? value : c)))
  }

  const addColor = () => {
    if (colors.length >= 5) return
    setColors((prev) => [...prev, '#ffffff'])
  }

  const removeColor = (index: number) => {
    if (colors.length <= 1) return
    setColors((prev) => prev.filter((_, i) => i !== index))
  }

  /** Copy the raw output (with real "&" codes) to the clipboard. */
  const copyOutput = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = output
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  /* Parse the &xRRGGBB / &#RRGGBB codes into per-character spans for a
     live preview. The API prefixes EVERY character with its own color
     code, so we assign each character the color that directly precedes it
     to reproduce the full gradient. */
  const previewSpans = (() => {
    const re = /&(?:#|x)([0-9a-fA-F]{6})/g
    const spans: { char: string; color: string }[] = []
    let lastIndex = 0
    let currentColor = '#ffffff'
    let match: RegExpExecArray | null

    // Push characters from [lastIndex, end) with the currently-active color
    const pushChars = (end: number) => {
      for (let i = lastIndex; i < end && i < output.length; i++) {
        spans.push({ char: output[i], color: currentColor })
      }
    }

    while ((match = re.exec(output)) !== null) {
      pushChars(match.index) // characters before this color code
      currentColor = `#${match[1]}` // switch to the new color
      lastIndex = match.index + match[0].length // skip past the color code
    }
    pushChars(output.length) // any characters after the last color code
    return spans
  })()

  const inputClasses =
    'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-sakura-pink/50 focus:outline-none'

  return (
    <>
      <Head>
        <title>Minecraft Gradient Generator — Mihaitzuuu</title>
        <meta
          name="description"
          content="Generate colorful Minecraft gradient text with the RGBirdflop API. Pick colors and styles, then copy the Minecraft formatting codes."
        />
      </Head>

      <main className="min-h-screen bg-deep-black text-white px-6 py-20">
        <Navbar />

        <div className="mx-auto max-w-5xl pt-20">
          <div className="rounded-[2rem] border border-white/10 bg-black/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-12">
            {/* Header */}
            <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">
              Tools · Minecraft · Gradient Generator
            </p>
            <h1 className="mt-4 text-3xl font-black text-white md:text-4xl">
              Minecraft Gradient Generator
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-gray-300">
              Create colorful gradient text for Minecraft. Pick colors and styles,
              then copy the formatting codes into any text field in Minecraft.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {/* Left: controls */}
              <section className="flex flex-col gap-6">
                {/* Text input */}
                <div>
                  <label htmlFor="grad-text" className="mb-2 block text-sm font-semibold text-white">
                    Text
                  </label>
                  <input
                    id="grad-text"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type some text..."
                    className={inputClasses}
                  />
                </div>

                {/* Colors */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Gradient colors</p>
                    <button
                      type="button"
                      onClick={addColor}
                      disabled={colors.length >= 5}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {colors.map((c, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <input
                          type="color"
                          value={c}
                          onChange={(e) => updateColor(i, e.target.value)}
                          className="h-11 w-14 cursor-pointer rounded-lg border border-white/10 bg-white/5"
                        />
                        <input
                          type="text"
                          value={c}
                          onChange={(e) => updateColor(i, e.target.value)}
                          className={inputClasses}
                        />
                        <button
                          type="button"
                          onClick={() => removeColor(i)}
                          disabled={colors.length <= 1}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Remove color ${i + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Presets */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-white">Presets</p>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => setColors([...p.colors])}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
                      >
                        <span className="flex -space-x-1">
                          {p.colors.slice(0, 3).map((c, i) => (
                            <span
                              key={i}
                              className="inline-block h-3.5 w-3.5 rounded-full border border-white/20"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </span>
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color length + gradient type */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="grad-len" className="mb-2 block text-sm font-semibold text-white">
                      Color length (per char step)
                    </label>
                    <input
                      id="grad-len"
                      type="number"
                      min={1}
                      value={colorLength}
                      onChange={(e) => setColorLength(Number(e.target.value))}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="grad-type" className="mb-2 block text-sm font-semibold text-white">
                      Gradient type
                    </label>
                    <select
                      id="grad-type"
                      value={gradientType}
                      onChange={(e) => setGradientType(e.target.value)}
                      className={inputClasses}
                    >
                      <option value="rgb">RGB</option>
                      <option value="hsv-rainbow">HSV Rainbow</option>
                    </select>
                  </div>
                </div>

                {/* Formats */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-white">Formatting</p>
                  <div className="flex flex-wrap gap-2">
                    {FORMAT_OPTIONS.map((f) => {
                      const active = formats.includes(f)
                      return (
                        <button
                          key={f}
                          type="button"
                          onClick={() => toggleFormat(f)}
                          aria-pressed={active}
                          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                            active
                              ? 'border-sakura-pink bg-sakura-pink text-black'
                              : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {f}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </section>

              {/* Right: preview + output */}
              <section className="flex flex-col gap-6">
                {/* Live preview */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-white">Live preview (approx.)</p>
                  <div className="overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-[#23272a] p-4 text-lg leading-9">
{previewSpans.length > 0 ? (
                      previewSpans.map((s, i) => (
                        <span
                          key={i}
                          style={{
                            color: s.color,
                            fontWeight: formats.includes('bold') ? 700 : undefined,
                            fontStyle: formats.includes('italic') ? 'italic' : undefined,
                            textDecoration: [
                              formats.includes('underline') ? 'underline' : null,
                              formats.includes('strikethrough') ? 'line-through' : null,
                            ]
                              .filter(Boolean)
                              .join(' ') || undefined,
                          }}
                        >
                          {s.char}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">Preview will appear here...</span>
                    )}
                  </div>
                </div>

                {/* Output */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="grad-output" className="text-sm font-semibold text-white">
                      Output (Minecraft codes)
                    </label>
                    <button
                      type="button"
                      onClick={copyOutput}
                      disabled={!output || loading}
                      className="rounded-lg bg-sakura-pink px-4 py-1.5 text-xs font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                    </button>
                  </div>
                  <pre
                    id="grad-output"
                    className="min-h-[6rem] overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm leading-7 text-sakura-pink"
                  >
                    {loading ? 'Generating...' : output || 'Generated output will appear here...'}
                  </pre>
                  <p className="mt-2 text-xs text-gray-400">
                    <span className="font-semibold text-white">&amp;</span> codes are Minecraft&apos;s
                    legacy color codes (e.g. <span className="font-mono text-white">&amp;#ff8ac2</span>).
                  </p>
                </div>

                {error && (
                  <div className="rounded-lg bg-red-900/30 border border-red-500/40 px-4 py-3 text-red-200 text-sm">
                    {error}
                  </div>
                )}
              </section>
            </div>

            {/* How it works */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-300">
                <li>Type your text and pick gradient colors (2 to 5 stops).</li>
                <li>Adjust the step length, gradient type, and formatting if you like.</li>
                <li>Copy the generated Minecraft formatting codes.</li>
                <li>
                  Paste them into a command, sign, book, or any text that accepts{' '}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-sakura-pink">&amp;</code>{' '}
                  codes.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
