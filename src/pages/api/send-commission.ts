import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import formidable from 'formidable'


type ResponseData = {
  success?: boolean
  message: string
  errors?: string[]
}

type CommissionForm = {
  name: string
  buildType: string
  subserver?: string
  budget?: string
  timeframe?: string
  details: string
  youtubeLink?: string
  yourEmail?: string
}

type UploadedLinks = {
  schematic?: string
  photos: string[]
}

function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
    )
  }

  return createClient(supabaseUrl, supabaseKey)
}

function ensureArray<T>(v: T | T[] | undefined): T[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

async function uploadFileToStorage(
  supabase: SupabaseClient,
  file: File,
  path: string
) {
  const bucket = 'commissions'

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: false,
      contentType: file.type || undefined,
    })

  if (error) throw error
}

async function getSignedUrl(
  supabase: SupabaseClient,
  objectPath: string,
  expiresInSeconds: number = 60 * 60 * 24
) {
  const bucket = 'commissions'
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(objectPath, expiresInSeconds)

  if (error) throw error
  return data.signedUrl
}

/**
 * Commission API endpoint (Discord webhook + Resend + Supabase Storage)
 *
 * Expected request: multipart/form-data
 *
 * Files:
 * - schematicFile (optional)
 * - photoFiles (0..8)
 */
export const config = {
  api: {
    bodyParser: false,
  },
}

type FormFields = formidable.Fields

type FormFiles = formidable.Files

type UploadedFile = {
  originalFilename?: string
  mimetype?: string
  filePath: string
  size?: number
}

function toArray<T>(v: T | T[] | undefined): T[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

function pickUploadedFile(f: any): UploadedFile | null {
  if (!f) return null
  // formidable may return File-like objects or arrays
  const obj = Array.isArray(f) ? f[0] : f
  if (!obj) return null
  return {
    originalFilename: obj.originalFilename,
    mimetype: obj.mimetype,
    filePath: obj.filepath || obj.path,
    size: obj.size,
  }
}

function validateEnv() {
  const issues: string[] = []
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  const webhook = process.env.WEBHOOK_URL
  const resend = process.env.RESEND_API_KEY

  if (!url || url.includes('YOUR_PROJECT_REF') || !url.startsWith('http')) {
    issues.push('SUPABASE_URL is missing or still a placeholder')
  }
  if (!key || key.includes('YOUR_SERVICE_ROLE') || key.length < 20) {
    issues.push('SUPABASE_SERVICE_ROLE_KEY is missing or still a placeholder')
  }
  if (!webhook || webhook.includes('...') || !webhook.startsWith('http')) {
    issues.push('WEBHOOK_URL is missing or still a placeholder')
  }
  if (!resend || resend.includes('YOUR_RESEND') || resend.length < 10) {
    issues.push('RESEND_API_KEY is missing or still a placeholder')
  }

  if (issues.length > 0) {
    throw new Error(`Environment configuration issues: ${issues.join('; ')}`)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Fail fast with a clear message if env vars are placeholders/missing
    validateEnv()

    const form = formidable({
      multiples: true,
      maxFileSize: 20 * 1024 * 1024, // 20MB (adjust if needed)
    })

    const [fields, files] = await new Promise<[FormFields, FormFiles]>((resolve, reject) => {
      form.parse(req, (err, flds, fls) => {
        if (err) reject(err)
        else resolve([flds, fls])
      })
    })

    const getText = (key: string) => {
      const v = (fields as any)[key]
      if (typeof v === 'string') return v
      if (Array.isArray(v) && typeof v[0] === 'string') return v[0]
      return ''
    }

    const commission: CommissionForm = {
      name: getText('name'),
      buildType: getText('buildType'),
      subserver: getText('subserver') || undefined,
      budget: getText('budget') || undefined,
      timeframe: getText('timeframe') || undefined,
      details: getText('details'),
      youtubeLink: getText('youtubeLink') || undefined,
      yourEmail: getText('yourEmail') || undefined,
    }

    if (!commission.name || !commission.buildType || !commission.details) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const supabase = getSupabaseClient()
    const timestamp = Date.now()

    const schematicUploaded = pickUploadedFile((files as any).schematicFile)
    const photoUploadedList = toArray((files as any).photoFiles).filter(Boolean).map(pickUploadedFile)
    const photoFiles = photoUploadedList.filter(Boolean) as UploadedFile[]

    const uploads: UploadedLinks = {
      schematic: undefined,
      photos: [],
    }

    // Upload + signed URLs (bucket is private)
    if (schematicUploaded) {
      const originalName = schematicUploaded.originalFilename || 'schematic'
      const schematicPath = `commissions/${timestamp}_${originalName}`
      // Read file from disk and upload
      const { readFile } = await import('node:fs/promises')
      const buf = await readFile(schematicUploaded.filePath)
      const blob = new Blob([buf], { type: schematicUploaded.mimetype || 'application/octet-stream' })
      const fileForUpload = blob as any as File
      await uploadFileToStorage(supabase, fileForUpload, schematicPath)
      uploads.schematic = await getSignedUrl(supabase, schematicPath)
    }

    for (const photo of photoFiles) {
      const originalName = photo.originalFilename || 'photo'
      const photoPath = `commissions/${timestamp}_${originalName}`
      const { readFile } = await import('node:fs/promises')
      const buf = await readFile(photo.filePath)
      const blob = new Blob([buf], { type: photo.mimetype || 'application/octet-stream' })
      const fileForUpload = blob as any as File
      await uploadFileToStorage(supabase, fileForUpload, photoPath)
      const url = await getSignedUrl(supabase, photoPath)
      uploads.photos.push(url)
    }


    // Send to the user + Mihai builds inbox
    const userEmail = (commission.yourEmail || '').trim()
    const mihaiEmail = 'mihaiu.builds@gmail.com'

    const recipients = new Set<string>()
    if (userEmail) recipients.add(userEmail)
    recipients.add(mihaiEmail)

    const errors: string[] = []
    let didSendDiscord = false
    let didSendResend = false

    const discordEmbed = {
      title: `Build Commission: ${commission.buildType}`,
      color: 0xff8ac2,
      fields: [
        { name: 'Username', value: commission.name || '—', inline: true },
        {
          name: 'Discord User',
          value: commission.yourEmail ? commission.yourEmail : '—',
          inline: true,
        },
        { name: 'Subserver', value: commission.subserver || 'Not specified', inline: true },
        { name: 'Budget', value: commission.budget || 'Not specified', inline: true },
        {
          name: 'Timeframe',
          value: commission.timeframe || 'Not specified',
          inline: true,
        },
        {
          name: 'YouTube',
          value: commission.youtubeLink ? `[link](${commission.youtubeLink})` : 'None',
          inline: false,
        },
        {
          name: 'Schematic',
          value: uploads.schematic ? `[download](${uploads.schematic})` : 'None',
          inline: false,
        },
        {
          name: 'Photos',
          value:
            uploads.photos.length > 0
              ? uploads.photos.map((u, i) => `[${i + 1}](${u})`).join('\n')
              : 'None',
          inline: false,
        },
        {
          name: 'Project Details',
          value: String(commission.details).slice(0, 3800) || '—',
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
    }

    // Discord webhook (best-effort)
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
          <p><strong>Username:</strong> ${commission.name}</p>
          <p><strong>Build Type:</strong> ${commission.buildType}</p>
          <p><strong>Subserver:</strong> ${commission.subserver || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${commission.budget || 'Not specified'}</p>
          <p><strong>Timeframe:</strong> ${commission.timeframe || 'Not specified'}</p>
          ${commission.youtubeLink ? `<p><strong>YouTube Reference:</strong> <a href="${commission.youtubeLink}">${commission.youtubeLink}</a></p>` : ''}

          <h3>Schematic</h3>
          <p>
            ${uploads.schematic ? `<a href="${uploads.schematic}">Download schematic</a>` : 'None'}
          </p>

          <h3>Photos</h3>
          <p>
            ${
              uploads.photos.length > 0
                ? uploads.photos
                    .map((u, i) => `<a href="${u}">Photo ${i + 1}</a>`) // keep simple
                    .join('<br>')
                : 'None'
            }
          </p>

          <h3>Project Details:</h3>
          <p>${String(commission.details).replace(/\n/g, '<br>')}</p>
        `

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
            subject: `New Build Commission Request from ${commission.name}`,
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
          'Email/Discord service not configured. Configure WEBHOOK_URL and/or RESEND_API_KEY in .env.local',
      })
    }

    if (didSendResend) {
      return res.status(200).json({
        success: true,
        message: 'Commission request received. Files uploaded and recipients notified.',
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

