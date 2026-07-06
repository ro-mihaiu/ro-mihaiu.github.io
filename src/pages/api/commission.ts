import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  success?: boolean
  message: string
}

/**
 * Email commission API endpoint
 * 
 * Configuration options:
 * 1. Using Resend (Recommended - free tier available)
 *    - Install: npm install resend
 *    - Set RESEND_API_KEY in .env.local
 * 
 * 2. Using SendGrid
 *    - Set SENDGRID_API_KEY in .env.local
 * 
 * 3. Using Mailgun
 *    - Set MAILGUN_API_KEY and MAILGUN_DOMAIN in .env.local
 * 
 * 4. Custom webhook to Discord/Slack
 *    - Set WEBHOOK_URL in .env.local
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

    // Format the commission request
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

    // Option 1: Send via Webhook (Discord, Slack, etc.)
    if (process.env.WEBHOOK_URL) {
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
              color: 16751911, // sakura-pink color
            },
          ],
        }),
      })

      if (!webhookResponse.ok) {
        throw new Error('Webhook failed')
      }

      return res.status(200).json({ success: true, message: 'Commission request sent successfully' })
    }

    // Option 2: Use Resend email service
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'noreply@mihaitzuuu.com',
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
              <p>${details.replace(/\n/g, '<br>')}</p>
            `,
          }),
        })

        if (!resendResponse.ok) {
          throw new Error('Resend email failed')
        }

        return res.status(200).json({ success: true, message: 'Commission request received. Check your email for confirmation.' })
      } catch (error) {
        console.error('Resend error:', error)
        throw error
      }
    }

    // Fallback: return error if no service is configured
    console.warn('No email service configured. Configure WEBHOOK_URL or RESEND_API_KEY in .env.local')
    return res.status(501).json({ message: 'Email service not configured. Please contact directly via Discord or email.' })
  } catch (error) {
    console.error('Commission API error:', error)
    return res.status(500).json({ message: 'Error processing request. Please try again.' })
  }
}
