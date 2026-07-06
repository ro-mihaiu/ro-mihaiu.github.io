import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

type ResponseData = {
  success?: boolean
  message: string
  error?: string
}

// Configure your email service here
// You'll need to set these as environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

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

    // Email to builder
    const builderEmail = {
      from: process.env.EMAIL_USER,
      to: 'mihaiu.dev@gmail.com',
      subject: `New Build Commission Request from ${name}`,
      html: `
        <h2>New Commission Request</h2>
        <p><strong>Username:</strong> ${name}</p>
        <p><strong>Build Type:</strong> ${buildType}</p>
        <p><strong>Subserver:</strong> ${subserver || 'Not specified'}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Timeframe:</strong> ${timeframe || 'Not specified'}</p>
        <p><strong>YouTube Reference:</strong> ${youtubeLink ? `<a href="${youtubeLink}">${youtubeLink}</a>` : 'None'}</p>
        <h3>Project Details:</h3>
        <p>${details.replace(/\n/g, '<br>')}</p>
      `,
    }

    // Confirmation email to client
    const clientEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL, // Set this to a general contact email or client's email if available
      subject: 'Build Commission Request Received',
      html: `
        <h2>Thank you for your commission request!</h2>
        <p>Hi ${name},</p>
        <p>We've received your build commission request. Mihaitzuuu will review your request and get back to you soon via Discord or email.</p>
        <h3>Your Request Details:</h3>
        <ul>
          <li><strong>Build Type:</strong> ${buildType}</li>
          <li><strong>Subserver:</strong> ${subserver || 'Not specified'}</li>
          <li><strong>Budget:</strong> ${budget || 'Not specified'}</li>
          <li><strong>Timeframe:</strong> ${timeframe || 'Not specified'}</li>
        </ul>
        <p>In the meantime, feel free to reach out:</p>
        <ul>
          <li>Discord: @ro_mihaiu</li>
          <li>Email: mihaiu.dev@gmail.com</li>
        </ul>
        <p>Best regards,<br>Mihaitzuuu</p>
      `,
    }

    // Send emails
    await transporter.sendMail(builderEmail)
    await transporter.sendMail(clientEmail)

    res.status(200).json({ success: true, message: 'Emails sent successfully' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ message: 'Failed to send email', error: String(error) })
  }
}
