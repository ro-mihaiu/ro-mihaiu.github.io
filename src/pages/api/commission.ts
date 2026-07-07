import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  success?: boolean
  message: string
  errors?: string[]
}

/**
 * Commission API endpoint (Discord webhook + Resend)
 *
 * - Discord: set WEBHOOK_URL in .env.local
 * - Resend: set RESEND_API_KEY in .env.local
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, buildType, subserver, budget, timeframe, details, youtubeLink } = req.body

    if (!name || !buildType || !details) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const commissionData = {
      timestamp: new Date().toISOString(),
      username: name,
      buildType,
      subserver: subserver || 'Not specified',
      budget: budget || 'Not specified',
      timeframe: timeframe || 'Not specified',
      youtubeLink: youtubeLink || 'None',
      details,
    }

    const errors: string[] = []
    let didSendDiscord = false
    let didSendResend = false

    // Discord webhook (best-effort)
    if (process.env.WEBHOOK_URL) {
      try {
        const webhookResponse = await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `New Commission Request from **${name}**\n\`\`\`${JSON.stringify(commissionData, null, 2)}\`\`\``,
            embeds: [
              {
                title: `Build Commission: ${buildType}`,
                fields: [
                  { name: 'Username', value: name, inline: true },
                  { name: 'Subserver', value: subserver || 'Not specified', inline: true },
                  { name: 'Budget', value: budget || 'Not specified', inline: true },
                  { name: 'Timeframe', value: timeframe || 'Not specified', inline: true },
                  { name: 'Details', value: details.substring(0, 1024) },
                ],
                color: 16751911,
              },
            ],
          }),
        })

        if (!webhookResponse.ok) {
          throw new Error(`Webhook failed (${webhookResponse.status})`)
        }

        didSendDiscord = true
      } catch (e) {
        const msg = String(e)
        errors.push(`Discord webhook failed: ${msg}`)
        console.error('Discord webhook error:', e)
      }
    }

    // Resend email (primary)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'noreply@ro-mihaiu.xyz',
            to: 'mihaiu.dev@gmail.com',
            subject: `New Build Commission Request from ${name}`,
            html: `
              <h2>New Commission Request</h2>
              <p><strong>Username:</strong> ${name}</p>
              <p><strong>Build Type:</strong> ${buildType}</p>
              <p><strong>Subserver:</strong> ${subserver || 'Not specified'}</p>
              <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
              <p><strong>Timeframe:</strong> ${timeframe || 'Not specified'}</p>
              ${youtubeLink ? `<p><strong>YouTube Reference:</strong> <a href="${youtubeLink}">${youtubeLink}</a></p>` : ''}
              <h3>Project Details:</h3>
              <p>${String(details).replace(/\n/g, '<br>')}</p>
            `,
          }),
        })

        if (!resendResponse.ok) {
          throw new Error(`Resend email failed (${resendResponse.status})`)
        }

        didSendResend = true
      } catch (e) {
        const msg = String(e)
        errors.push(`Resend failed: ${msg}`)
        console.error('Resend error:', e)
      }
    }

    if (!didSendDiscord && !didSendResend) {
      console.warn('No service configured. Configure WEBHOOK_URL and/or RESEND_API_KEY in .env.local')
      return res.status(501).json({
        message: 'Email service not configured. Configure WEBHOOK_URL and/or RESEND_API_KEY in .env.local',
      })
    }

    if (didSendResend) {
      return res.status(200).json({
        success: true,
        message: 'Commission request received. Check your email for confirmation.',
        errors: errors.length ? errors : undefined,
      })
    }

    // Resend failed but Discord may have worked
    return res.status(200).json({
      success: didSendDiscord,
      message: 'Commission delivered to Discord, but email failed.',
      errors: errors.length ? errors : undefined,
    })
  } catch (e) {
    console.error('Commission API error:', e)
    return res.status(500).json({
      message: 'Error processing request. Please try again.',
      errors: [String(e)],
    })
  }
}

