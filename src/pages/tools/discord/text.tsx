'use client'

import Head from 'next/head'
import { useState } from 'react'

import Navbar from '../../../components/Navbar'

/* ------------------------------------------------------------------ */
/* 1. COLOR / STYLE DATA                                               */
/*   Discord renders ANSI colors inside ```ansi code blocks.           */
/*   - Foreground (text) codes: 30-37 basic, 90-97 bright              */
/*   - Background codes:        40-47 basic, 100-107 bright            */
/*   - Styles: 1 = bold, 2 = dim, 4 = underline, 0 = reset            */
/* ------------------------------------------------------------------ */

const TEXT_COLORS = [
  { label: 'None (default)', value: '' },
  { label: 'Black (30)', value: '30' },
  { label: 'Red (31)', value: '31' },
  { label: 'Green (32)', value: '32' },
  { label: 'Yellow (33)', value: '33' },
  { label: 'Blue (34)', value: '34' },
  { label: 'Magenta (35)', value: '35' },
  { label: 'Cyan (36)', value: '36' },
  { label: 'White (37)', value: '37' },
  { label: 'Bright Black / Gray (90)', value: '90' },
  { label: 'Bright Red (91)', value: '91' },
  { label: 'Bright Green (92)', value: '92' },
  { label: 'Bright Yellow (93)', value: '93' },
  { label: 'Bright Blue (94)', value: '94' },
  { label: 'Bright Magenta (95)', value: '95' },
  { label: 'Bright Cyan (96)', value: '96' },
  { label: 'Bright White (97)', value: '97' },
]

const BACKGROUND_COLORS = [
  { label: 'None (default)', value: '' },
  { label: 'Black (40)', value: '40' },
  { label: 'Red (41)', value: '41' },
  { label: 'Green (42)', value: '42' },
  { label: 'Yellow (43)', value: '43' },
  { label: 'Blue (44)', value: '44' },
  { label: 'Magenta (45)', value: '45' },
  { label: 'Cyan (46)', value: '46' },
  { label: 'White (47)', value: '47' },
  { label: 'Bright Black / Gray (100)', value: '100' },
  { label: 'Bright Red (101)', value: '101' },
  { label: 'Bright Green (102)', value: '102' },
  { label: 'Bright Yellow (103)', value: '103' },
  { label: 'Bright Blue (104)', value: '104' },
  { label: 'Bright Magenta (105)', value: '105' },
  { label: 'Bright Cyan (106)', value: '106' },
  { label: 'Bright White (107)', value: '107' },
]

// How the styles can be applied to the text
const MODES = [
  { id: 'global', label: 'Whole text' },
  { id: 'line', label: 'Per line' },
  { id: 'word', label: 'Per word' },
] as const

type ApplyMode = 'global' | 'line' | 'word'

type StyleOptions = {
  fg: string
  bg: string
  bold: boolean
  underline: boolean
  dim: boolean
}

// Discord's actual ANSI palette (dark theme) — used by the live preview
const ANSI_PALETTE: Record<string, string> = {
  '30': '#000000',
  '31': '#cd3131',
  '32': '#0dbc79',
  '33': '#e5e510',
  '34': '#3b6ee6',
  '35': '#e45cd0',
  '36': '#3fdcdd',
  '37': '#eeeeee',
  '40': '#000000',
  '41': '#cd3131',
  '42': '#0dbc79',
  '43': '#e5e510',
  '44': '#3b6ee6',
  '45': '#e45cd0',
  '46': '#3fdcdd',
  '47': '#eeeeee',
  '90': '#818386',
  '91': '#f14c4c',
  '92': '#23d18b',
  '93': '#f5f543',
  '94': '#3b8eea',
  '95': '#d670d6',
  '96': '#41f1f1',
  '97': '#ffffff',
  '100': '#818386',
  '101': '#f14c4c',
  '102': '#23d18b',
  '103': '#f5f543',
  '104': '#3b8eea',
  '105': '#d670d6',
  '106': '#41f1f1',
  '107': '#ffffff',
}

const SAMPLE_TEXT =
  'Welcome to the Discord ANSI converter!\n' +
  'Pick a color + style, then hit "Insert sample" to see it in action.\n' +
  'Copy the result and paste it inside a code block in Discord.'

/* ------------------------------------------------------------------ */
/* 2. CORE CONVERSION LOGIC (all client-side)                          */
/* ------------------------------------------------------------------ */

/**
 * Build the ANSI "Select Graphic Rendition" opening code from the chosen
 * style options. Example: bold + bright red => "\u001b[1;91m".
 */
function buildSgr(opts: StyleOptions): string {
  const codes: number[] = []
  if (opts.bold) codes.push(1)
  if (opts.dim) codes.push(2)
  if (opts.underline) codes.push(4)
  if (opts.fg) codes.push(Number(opts.fg))
  if (opts.bg) codes.push(Number(opts.bg))
  if (codes.length === 0) return ''
  return `\u001b[${codes.join(';')}m`
}

/**
 * Convert plain text into ANSI-escape-coded text.
 * "global" wraps the whole text once, "line" wraps every line and
 * "word" wraps every word (whitespace stays untouched so spacing is kept).
 */
function toAnsi(text: string, opts: StyleOptions, mode: ApplyMode): string {
  const open = buildSgr(opts)
  if (!open) return text // no styles chosen -> plain passthrough
  const reset = '\u001b[0m'

  if (mode === 'global') {
    return `${open}${text}${reset}`
  }

  if (mode === 'line') {
    return text
      .split('\n')
      .map((line) => `${open}${line}${reset}`)
      .join('\n')
  }

  // per-word: split into words + whitespace groups, wrap only the words
  return text
    .split(/(\s+)/)
    .map((part) => (/\s/.test(part) ? part : `${open}${part}${reset}`))
    .join('')
}

/* ------------------------------------------------------------------ */
/* 3. LIVE PREVIEW PARSER                                              */
/*   Walks the ANSI-coded string and converts each escape sequence     */
/*   into a CSS-styled span so we can approximate Discord's rendering. */
/* ------------------------------------------------------------------ */

type PreviewSegment = {
  text: string
  color?: string
  background?: string
  fontWeight?: number
  opacity?: number
  textDecoration?: string
}

function parseAnsi(raw: string): PreviewSegment[] {
  const segments: PreviewSegment[] = []
  const re = /\u001b\[([0-9;]*)m/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  let fg = ''
  let bg = ''
  let bold = false
  let dim = false
  let underline = false

  const push = (end: number) => {
    const text = raw.slice(lastIndex, end)
    if (text) {
      segments.push({
        text,
        color: fg ? ANSI_PALETTE[fg] : undefined,
        background: bg ? ANSI_PALETTE[bg] : undefined,
        fontWeight: bold ? 700 : undefined,
        opacity: dim ? 0.55 : undefined,
        textDecoration: underline ? 'underline' : undefined,
      })
    }
    lastIndex = end
  }

  while ((match = re.exec(raw)) !== null) {
    // Emit the plain text that appeared before this escape sequence
    push(match.index)
    lastIndex = match.index + match[0].length

    // Apply the codes to the "current style" state
    const codes = match[1].split(';').filter(Boolean).map(Number)
    for (const code of codes) {
      if (code === 0) {
        fg = ''
        bg = ''
        bold = false
        dim = false
        underline = false
      } else if (code === 1) {
        bold = true
      } else if (code === 2) {
        dim = true
      } else if (code === 4) {
        underline = true
      } else if (code >= 30 && code <= 37) {
        fg = String(code)
      } else if (code >= 40 && code <= 47) {
        bg = String(code)
      } else if (code >= 90 && code <= 97) {
        fg = String(code)
      } else if (code >= 100 && code <= 107) {
        bg = String(code)
      }
    }
  }

  // Emit any remaining text after the last escape sequence
  push(raw.length)
  return segments
}

/* ------------------------------------------------------------------ */
/* 4. PAGE COMPONENT                                                   */
/* ------------------------------------------------------------------ */

export default function DiscordAnsiConverterPage() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<ApplyMode>('global')
  const [fg, setFg] = useState('31') // default to red so the tool feels alive
  const [bg, setBg] = useState('')
  const [bold, setBold] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [dim, setDim] = useState(false)
  const [copied, setCopied] = useState(false)

  const opts: StyleOptions = { fg, bg, bold, underline, dim }

  // Derived values
  const converted = input ? toAnsi(input, opts, mode) : ''
  // Wrap in the ```ansi code block that Discord uses to render colors
  const output = converted ? '```ansi\n' + converted + '\n```' : ''
  // For display, make the invisible ESC character visible as "ESC"
  const displayOutput = output.split('\u001b[').join('ESC[')
  const previewSegments = parseAnsi(converted)

  const charCount = input.length
  const lineCount = input ? input.split('\n').length : 0
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0

  const insertSample = () => setInput(SAMPLE_TEXT)

  const clearAll = () => {
    setInput('')
    setCopied(false)
  }

  /** Copy the raw output (with real ESC characters) to the clipboard. */
  const copyOutput = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
    } catch {
      // Fallback for older browsers / non-secure contexts
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
        <title>Discord ANSI Text Converter — Mihaitzuuu</title>
        <meta
          name="description"
          content="Convert plain text into colorful Discord ANSI-coded messages. Pick a color and style, copy the code block, and paste it into Discord."
        />
      </Head>

      <main className="min-h-screen bg-deep-black text-white px-6 py-20">
        <Navbar />

        <div className="mx-auto max-w-6xl pt-20">
          <div className="rounded-[2rem] border border-white/10 bg-black/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-10">
            {/* Header */}
            <p className="text-sm uppercase tracking-[0.3em] text-sakura-pink/80">
              Discord Tools · ANSI Text Converter
            </p>
            <h1 className="mt-4 text-3xl font-black text-white md:text-4xl">
              Discord ANSI Text Converter
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-gray-300">
              Write plain text, pick a color and style, then copy the ANSI-coded
              message and paste it into Discord inside a code block with the{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-sakura-pink">
                ansi
              </code>{' '}
              language tag.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {/* ---------------- Left column: input + controls ---------------- */}
              <section className="flex flex-col gap-6">
                {/* Text area */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="ansi-input" className="text-sm font-semibold text-white">
                      Your Text
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={insertSample}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
                      >
                        Insert sample
                      </button>
                      <button
                        type="button"
                        onClick={clearAll}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <textarea
                    id="ansi-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={8}
                    placeholder="Type or paste your plain text here..."
                    className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-white placeholder-gray-500 focus:border-sakura-pink/50 focus:outline-none"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    {charCount} characters · {wordCount} words · {lineCount} lines
                  </p>
                </div>

                {/* Apply mode */}
                <fieldset>
                  <legend className="mb-2 text-sm font-semibold text-white">
                    Apply styles to
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {MODES.map((m) => {
                      const active = mode === m.id
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMode(m.id)}
                          aria-pressed={active}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            active
                              ? 'bg-sakura-pink text-black'
                              : 'border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {m.label}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                {/* Color selectors */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ansi-fg" className="mb-2 block text-sm font-semibold text-white">
                      Text color
                    </label>
                    <select
                      id="ansi-fg"
                      value={fg}
                      onChange={(e) => setFg(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-white focus:border-sakura-pink/50 focus:outline-none"
                    >
                      {TEXT_COLORS.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ansi-bg" className="mb-2 block text-sm font-semibold text-white">
                      Background color
                    </label>
                    <select
                      id="ansi-bg"
                      value={bg}
                      onChange={(e) => setBg(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-white focus:border-sakura-pink/50 focus:outline-none"
                    >
                      {BACKGROUND_COLORS.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Style toggles */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-white">Text styles</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setBold((v) => !v)}
                      aria-pressed={bold}
                      title="Bold"
                      className={`h-10 w-10 rounded-lg border text-sm transition ${
                        bold
                          ? 'border-sakura-pink bg-sakura-pink text-black'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-bold">B</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnderline((v) => !v)}
                      aria-pressed={underline}
                      title="Underline"
                      className={`h-10 w-10 rounded-lg border text-sm transition ${
                        underline
                          ? 'border-sakura-pink bg-sakura-pink text-black'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="underline">U</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDim((v) => !v)}
                      aria-pressed={dim}
                      title="Dim"
                      className={`h-10 rounded-lg border px-4 text-sm font-semibold transition ${
                        dim
                          ? 'border-sakura-pink bg-sakura-pink text-black'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="opacity-70">Dim</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* ---------------- Right column: output + preview ---------------- */}
              <section className="flex flex-col gap-6">
                {/* Output */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="ansi-output" className="text-sm font-semibold text-white">
                      Output (ANSI code block)
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
                    id="ansi-output"
                    className="min-h-[9.5rem] overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs leading-6 text-sakura-pink"
                  >
                    {output ? displayOutput : 'Converted output will appear here...'}
                  </pre>
                  <p className="mt-2 text-xs text-gray-400">
                    <span className="font-semibold text-white">ESC</span> represents the
                    invisible ESC character Discord needs. The copy button copies the real
                    escape codes.
                  </p>
                </div>

                {/* Live preview */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-white">
                    Live preview (approx.)
                  </p>
                  <div className="overflow-auto rounded-xl border border-white/10 bg-[#0b0d10] p-4 font-mono text-sm leading-7">
                    {previewSegments.length > 0 ? (
                      previewSegments.map((seg, i) => (
                        <span
                          key={i}
                          style={{
                            color: seg.color,
                            backgroundColor: seg.background,
                            fontWeight: seg.fontWeight,
                            opacity: seg.opacity,
                            textDecoration: seg.textDecoration,
                          }}
                        >
                          {seg.text}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">Preview will appear here...</span>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    Approximation of how Discord renders the ANSI block (dark theme).
                  </p>
                </div>
              </section>
            </div>

            {/* How it works */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-300">
                <li>Type or paste plain text above.</li>
                <li>Pick a text/background color and optional styles (bold, underline, dim).</li>
                <li>Copy the generated ANSI code block.</li>
                <li>
                  Paste it into Discord inside a code block with the language tag{' '}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-sakura-pink">
                    ansi
                  </code>
                  .
                </li>
              </ol>
              <p className="mt-4 text-xs text-gray-400">
                Tip: on Discord&apos;s dark theme, black text (30/40) can be hard to read —
                prefer the bright variants or add a background color.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

