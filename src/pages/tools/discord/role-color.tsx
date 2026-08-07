'use client'

import Head from 'next/head'
import { useState } from 'react'

import Navbar from '../../../components/Navbar'

/* ------------------------------------------------------------------ */
/* 1. COLOR HELPERS                                                    */
/* ------------------------------------------------------------------ */

/** Convert a 3- or 6-digit hex string (with optional #) into RGB. */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null
  const int = parseInt(h, 16)
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 }
}

/** Convert an RGB object into the Discord integer color value. */
function rgbToDecimal({ r, g, b }: { r: number; g: number; b: number }): number {
  return (r << 16) | (g << 8) | b
}

/* ------------------------------------------------------------------ */
/* 2. PAGE COMPONENT                                                   */
/* ------------------------------------------------------------------ */
export default function DiscordRoleColorPage() {
  const [hex, setHex] = useState('#ff8ac2')
  const [copied, setCopied] = useState(false)

  const rgb = hexToRgb(hex)
  const decimal = rgb ? rgbToDecimal(rgb) : null

  // Discord embeds expect the number without the "0x" prefix but the API
  // accepts a value; the number is what you pass to /role color or a bot.
  const decimalString = decimal !== null ? String(decimal) : ''

  /** Copy the decimal color value to the clipboard. */
  const copyDecimal = async () => {
    if (decimalString === '') return
    try {
      await navigator.clipboard.writeText(decimalString)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = decimalString
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

  return (
    <>
      <Head>
        <title>Discord Role Color Converter — Mihaitzuuu</title>
        <meta
          name="description"
          content="Convert a hex color into the decimal integer Discord uses for role colors, plus a live preview."
        />
      </Head>

      <main className="min-h-screen bg-deep-black text-white px-6 py-20">
        <Navbar />

        <div className="mx-auto max-w-4xl pt-20">
          <div className="rounded-[2rem] border border-white/10 bg-black/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-10">
            {/* Header */}
            <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">
              Discord Tools · Role Color Converter
            </p>
            <h1 className="mt-4 text-3xl font-black text-white md:text-4xl">
              Discord Role Color Converter
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-gray-300">
              Discord stores role colors as a decimal integer. Enter any hex
              color below to get the number to use in the{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-sakura-pink">/role color</code>{' '}
              command or your bot.
            </p>

            <div className="mt-10 space-y-6">
              {/* Color input */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="rc-hex" className="mb-2 block text-sm font-semibold text-white">
                    Hex color
                  </label>
                  <input
                    id="rc-hex"
                    type="text"
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                    placeholder="#ff8ac2"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-white placeholder-gray-500 focus:border-sakura-pink/50 focus:outline-none"
                  />
                  {hex.length > 0 && /^[0-9a-fA-F]{6}$/.test(hex.replace('#', '')) === false && (
                    <p className="mt-2 text-xs text-red-400">
                      Please enter a valid hex color, e.g. #ff8ac2.
                    </p>
                  )}
                </div>

                {/* Live swatch */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-white">Preview</p>
                  <div
                    className="flex h-[3rem] items-center justify-center rounded-lg border border-white/10 font-mono text-sm"
                    style={{
                      backgroundColor: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '#000',
                      color: rgb && rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 140 ? '#000' : '#fff',
                    }}
                  >
                    {rgb ? `#${(rgb.r.toString(16).padStart(2, '0') + rgb.g.toString(16).padStart(2, '0') + rgb.b.toString(16).padStart(2, '0')).toUpperCase()}` : 'Invalid'}
                  </div>
                </div>
              </div>

              {/* Output */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="rc-output" className="text-sm font-semibold text-white">
                    Decimal value (for Discord)
                  </label>
                  <button
                    type="button"
                    onClick={copyDecimal}
                    disabled={decimalString === ''}
                    className="rounded-lg bg-sakura-pink px-4 py-1.5 text-xs font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                  </button>
                </div>
                <pre
                  id="rc-output"
                  className="min-h-[3.5rem] overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm leading-7 text-sakura-pink"
                >
                  {decimalString || 'Wait a valid hex color to see the decimal value...'}
                </pre>
                {decimal !== null && (
                  <p className="mt-2 text-xs text-gray-400">
                    RGB:{' '}
                    <span className="font-mono text-white">
                      {rgb?.r}, {rgb?.g}, {rgb?.b}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* How it works */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-300">
                <li>Enter a hex color (e.g. #ff8ac2).</li>
                <li>
                  Copy the decimal integer that Discord uses for role colors.
                </li>
                <li>
                  Use it with the{' '}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-sakura-pink">/role color</code>{' '}
                  command, embed{' '}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-sakura-pink">color</code>{' '}
                  field, or your bot&apos;s color option.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
