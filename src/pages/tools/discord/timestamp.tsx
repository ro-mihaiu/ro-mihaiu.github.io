'use client'

import Head from 'next/head'
import { useState } from 'react'

import Navbar from '../../../components/Navbar'

/* ------------------------------------------------------------------ */
/* 1. DISCORD TIMESTAMP STYLES                                         */
/*   Discord supports placing <t:unix:style> inside a message to show  */
/*   a time that adapts to each viewer's timezone.                     */
/* ------------------------------------------------------------------ */
const TIMESTAMP_STYLES = [
  { id: 't', label: 'Short Time', example: '3:30 PM', suffix: 't' },
  { id: 'T', label: 'Long Time', example: '3:30:32 PM', suffix: 'T' },
  { id: 'd', label: 'Short Date', example: '06/27/2021', suffix: 'd' },
  { id: 'D', label: 'Long Date', example: 'June 27, 2021', suffix: 'D' },
  { id: 'f', label: 'Short Date/Time', example: 'June 27, 2021 3:30 PM', suffix: 'f' },
  { id: 'F', label: 'Long Date/Time', example: 'Sunday, June 27, 2021 3:30 PM', suffix: 'F' },
  { id: 'R', label: 'Relative Time', example: '2 months ago', suffix: 'R' },
] as const

type TimestampStyle = (typeof TIMESTAMP_STYLES)[number]['id']

/* ------------------------------------------------------------------ */
/* 2. PAGE COMPONENT                                                   */
/* ------------------------------------------------------------------ */
export default function DiscordTimestampPage() {
  const [dateInput, setDateInput] = useState('')
  const [style, setStyle] = useState<TimestampStyle>('f')
  const [copied, setCopied] = useState(false)

  // Parse the user's chosen local date/time into a Unix timestamp (seconds)
  const unixSeconds = (() => {
    if (!dateInput) return null
    const parsed = new Date(dateInput)
    if (Number.isNaN(parsed.getTime())) return null
    return Math.floor(parsed.getTime() / 1000)
  })()

  // Build the Discord timestamp code, e.g. <t:1624809600:f>
  const output = unixSeconds !== null ? `<t:${unixSeconds}:${style}>` : ''

  /** Copy the timestamp code to the clipboard. */
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

  return (
    <>
      <Head>
        <title>Discord Timestamp Generator — Mihaitzuuu</title>
        <meta
          name="description"
          content="Generate Discord timestamps that automatically adjust to each viewer's timezone. Pick a date and style, then copy the <t:unix:style> code."
        />
      </Head>

      <main className="min-h-screen bg-deep-black text-white px-6 py-20">
        <Navbar />

        <div className="mx-auto max-w-4xl pt-20">
          <div className="rounded-[2rem] border border-white/10 bg-black/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-10">
            {/* Header */}
            <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">
              Discord Tools · Timestamp Generator
            </p>
            <h1 className="mt-4 text-3xl font-black text-white md:text-4xl">
              Discord Timestamp Generator
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-gray-300">
              Create a timestamp that automatically shows the correct time for
              every viewer, no matter their timezone. Pick a date and style, copy
              the code, and paste it into Discord.
            </p>

            <div className="mt-10 space-y-6">
              {/* Date/time picker */}
              <div>
                <label htmlFor="ts-datetime" className="mb-2 block text-sm font-semibold text-white">
                  Date &amp; time
                </label>
                <input
                  id="ts-datetime"
                  type="datetime-local"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-sakura-pink/50 focus:outline-none"
                />
              </div>

              {/* Style selector */}
              <div>
                <p className="mb-2 text-sm font-semibold text-white">Style</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {TIMESTAMP_STYLES.map((s) => {
                    const active = style === s.id
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStyle(s.id)}
                        aria-pressed={active}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                          active
                            ? 'border-sakura-pink bg-sakura-pink/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div>
<p className={`text-sm font-semibold ${active ? 'text-sakura-pink' : 'text-white'}`}>
                            <span className="mr-1 font-mono">{'<t:unix:' + s.suffix + '>'}</span>
                            {s.label}
                          </p>
                          <p className="text-xs text-gray-400">e.g. {s.example}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Output */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="ts-output" className="text-sm font-semibold text-white">
                    Output
                  </label>
                  <button
                    type="button"
                    onClick={copyOutput}
                    disabled={!output}
                    className="rounded-lg bg-sakura-pink px-4 py-1.5 text-xs font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                  </button>
                </div>
                <pre
                  id="ts-output"
                  className="min-h-[3.5rem] overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm leading-7 text-sakura-pink"
                >
                  {output || 'Select a date and time to generate the timestamp...'}
                </pre>
                {unixSeconds !== null && (
                  <p className="mt-2 text-xs text-gray-400">
                    Unix timestamp: <span className="font-mono text-white">{unixSeconds}</span>
                  </p>
                )}
              </div>
            </div>

            {/* How it works */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-300">
                <li>Pick a date &amp; time and choose a display style.</li>
                <li>Copy the generated <code className="rounded bg-white/10 px-1.5 py-0.5 text-sakura-pink">{'<t:unix:style>'}</code> code.</li>
                <li>Paste it into any Discord message or chat field.</li>
              </ol>
              <p className="mt-4 text-xs text-gray-400">
                Tip: relative time (<code className="text-sakura-pink">R</code>) updates automatically
                and is great for announcements.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
