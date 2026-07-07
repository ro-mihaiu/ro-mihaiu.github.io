import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  success?: boolean
  message: string
  errors?: string[]
}

/**
 * Commission API endpoint (Discord webhook + Resend)
 *
 * IMPORTANT:
 * - Must not import build-time email libraries (GitHub builds run strict type-check step).
 * - Discord webhook: set WEBHOOK_URL in .env.local
 * - Resend email: set RESEND_API_KEY in .env.local
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      name,
      buildType,
      subserver,
      budget,
      timeframe,
      details,
      youtubeLink,
      yourEmail,
    } = req.body as {
      name: string
      buildType: string
      subserver?: string
      budget?: string
      timeframe?: string
      details: string
      youtubeLink?: string
      yourEmail?: string
    }

    if (!name || !buildType || !details) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Send to the user + Mihai builds inbox
    const userEmail = (yourEmail || '').trim()
    const mihaiEmail = 'mihaiu.builds@gmail.com'

    const recipients = new Set<string>()
    if (userEmail) recipients.add(userEmail)
    recipients.add(mihaiEmail)

    const errors: string[] = []
    let didSendDiscord = false
    let didSendResend = false

    const discordEmbed = {
      title: `Build Commission: ${buildType}`,
      color: 0xff8ac2,
      fields: [
        { name: 'Username', value: name || '—', inline: true },
        { name: 'Subserver', value: subserver || 'Not specified', inline: true },
        { name: 'Budget', value: budget || 'Not specified', inline: true },
        { name: 'Timeframe', value: timeframe || 'Not specified', inline: true },
        {
          name: 'YouTube',
          value: youtubeLink ? `[link](${youtubeLink})` : 'None',
          inline: false,
        },
        {
          name: 'Project Details',
          value: String(details).slice(0, 3800) || '—',
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
    }

    // Discord webhook (best-effort) -> embed
    if (process.env.WEBHOOK_URL) {
      try {
        const webhookResponse = await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [discordEmbed],
          }),
        })

        if (!webhookResponse.ok) {
          throw new Error(`Webhook failed (${webhookResponse.status})`)
        }

        didSendDiscord = true
      } catch (e) {
        errors.push(`Discord webhook failed: ${String(e)}`)
        console.error('Discord webhook error:', e)
      }
    }

    // Resend email (best-effort)
    if (process.env.RESEND_API_KEY) {
      try {
        const html = `
          <h2>New Build Commission Request</h2>
          <p><strong>Username:</strong> ${name}</p>
          <p><strong>Build Type:</strong> ${buildType}</p>
          <p><strong>Subserver:</strong> ${subserver || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
          <p><strong>Timeframe:</strong> ${timeframe || 'Not specified'}</p>
          ${youtubeLink ? `<p><strong>YouTube Reference:</strong> <a href="${youtubeLink}">${youtubeLink}</a></p>` : ''}
          <h3>Project Details:</h3>
          <p>${String(details).replace(/\n/g, '<br>')}</p>
        `

        // Resend supports `to` as a string or array; keep simple with comma-free multiple requests if needed.
        const to = Array.from(recipients)

        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'noreply@ro-mihaiu.xyz',
            to,
            subject: `New Build Commission Request from ${name}`,
            html,
          }),
        })

        if (!resendResponse.ok) {
          throw new Error(`Resend email failed (${resendResponse.status})`)
        }

        didSendResend = true
      } catch (e) {
        errors.push(`Resend failed: ${String(e)}`)
        console.error('Resend error:', e)
      }
    }

    if (!didSendDiscord && !didSendResend) {
      return res.status(501).json({
        message:
          'Email service not configured. Configure WEBHOOK_URL and/or RESEND_API_KEY in .env.local',
      })
    }

    if (didSendResend) {
      return res.status(200).json({
        success: true,
        message: 'Commission request received. Check your email for confirmation.',
        errors: errors.length ? errors : undefined,
      })
    }

    return res.status(200).json({
      success: didSendDiscord,
      message: 'Commission delivered to Discord, but email failed.',
      errors: errors.length ? errors : undefined,
    })
  } catch (e) {
    return res.status(500).json({
      message: 'Error processing request. Please try again.',
      errors: [String(e)],
    })
  }
}

