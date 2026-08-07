import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Server-side proxy for the Birdflop RGBirdflop API.
 *
 * The Birdflop API does not send CORS headers, so browsers cannot call it
 * directly. This route forwards the request from the server (which has no
 * CORS restrictions) and returns the result to the client.
 *
 * Usage (client-side):
 *   POST /api/rgb
 *   Body: { text, colors, colorLength, gradientType, baseFormatting, ... }
 */
const BIRDFLOP_API = 'https://www.birdflop.com/api/v2/rgb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const upstream = await fetch(BIRDFLOP_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...req.body,
        silent: true,
      }),
    })

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '')
      return res.status(upstream.status).json({
        error: `Birdflop API error ${upstream.status}`,
        detail: text,
      })
    }

    const data = await upstream.json()
    return res.status(200).json(data)
  } catch (err) {
    return res.status(502).json({
      error: String(err instanceof Error ? err.message : err),
    })
  }
}
