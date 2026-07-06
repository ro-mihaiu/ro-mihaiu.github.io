# Email Notification Setup Guide

Your website now has automatic email notifications when someone submits a build commission request. Three configuration options are available:

---

## **Option 1: Discord Webhook** ✅ (Currently Active)

### How It Works:
- Commission requests are sent as **Discord messages** to your server
- Instant notifications - no email delays
- Beautiful formatted cards with all project details
- Best for real-time collaboration

### Current Status:
✅ **Already configured** - Your webhook URL is set in `.env.local`

### Verify It Works:
1. Go to your Discord server channel where the webhook is pointing
2. Submit a test commission on your website
3. You should see a formatted message appear instantly

### How to Change the Webhook Channel:
1. Go to Discord Server Settings → Integrations → Webhooks
2. Find the webhook you created
3. Change the channel it points to
4. Copy the new URL and update `WEBHOOK_URL` in `.env.local`

---

## **Option 2: Resend (Email Service)** 📧 - Switch Anytime

### Why Choose This?
- ✅ Professional HTML emails
- ✅ Delivery tracking and analytics
- ✅ Free tier: 100 emails/day
- ✅ Paid tier: Very affordable ($20/month for unlimited)
- ✅ No email server setup required
- ✅ Better for formal business communication

### Setup Steps:

**1. Sign up for Resend:**
- Go to [https://resend.com](https://resend.com)
- Create free account (no credit card required)
- Verify email

**2. Get API Key:**
- Go to Dashboard → API Keys
- Create new API key
- Copy the key (starts with `re_`)

**3. Configure in `.env.local`:**
```bash
# Comment out or remove:
# WEBHOOK_URL=https://discord.com/api/webhooks/...

# Add this instead:
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**4. Set sender email:**
Edit `.env.local` to add:
```bash
CONTACT_EMAIL=noreply@mihaitzuuu.com
```

**5. Test:**
- Submit a commission form
- Check your email inbox for the notification

### To Switch Back to Discord:
- Uncomment `WEBHOOK_URL` in `.env.local`
- Comment out or remove `RESEND_API_KEY`

---

## **Option 3: Gmail SMTP** 📬 - Traditional Email

### Why Choose This?
- ✅ Uses your personal Gmail account
- ✅ No additional services to pay for
- ✅ Emails come from your Gmail
- ✅ Simple setup

### Limitations:
- ⚠️ Rate limited (500 emails/day)
- ⚠️ Slightly slower than other options
- ⚠️ Requires app-specific password setup

### Setup Steps:

**1. Enable 2-Factor Authentication:**
- Go to [https://myaccount.google.com](https://myaccount.google.com)
- Click "Security" on left menu
- Enable 2-Step Verification (follow prompts)

**2. Create App Password:**
- Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- Select "Mail" and "Windows Computer" from dropdowns
- Click "Generate"
- Copy the 16-character password (ignore spaces)

**3. Configure in `.env.local`:**
```bash
# Comment out or remove:
# WEBHOOK_URL=https://discord.com/api/webhooks/...

# Add these instead:
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**4. Test:**
- Submit a commission form
- Check your Gmail inbox

### To Switch Back to Discord:
- Comment out `EMAIL_USER` and `EMAIL_PASSWORD`
- Uncomment `WEBHOOK_URL`

---

## **Quick Comparison Table**

| Feature | Discord Webhook | Resend | Gmail SMTP |
|---------|-----------------|--------|-----------|
| **Setup Time** | 2 minutes | 5 minutes | 10 minutes |
| **Cost** | Free | Free + $20/mo paid | Free |
| **Speed** | Instant | Very Fast | Fast |
| **Daily Limit** | Unlimited | 100 (free tier) | 500 |
| **Email Format** | Discord embed | HTML email | Gmail |
| **Best For** | Real-time alerts | Professional emails | Budget option |
| **Current Status** | ✅ Active | Not configured | Not configured |

---

## **Troubleshooting**

### Commission form not sending?

**Check these:**
1. Is `.env.local` file created? (Not `.env.example`)
2. Is the correct API key/webhook URL copied?
3. No extra spaces or line breaks?

**Test the API directly:**
```bash
# Test Discord webhook:
curl -X POST -H 'Content-type: application/json' \
  --data '{"content":"Test message"}' \
  YOUR_WEBHOOK_URL

# Test Resend:
curl -X POST https://api.resend.com/emails \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "delivered@resend.dev",
    "subject": "Hello World",
    "html": "<strong>It works!</strong>"
  }'
```

### Can't see Discord message?

1. **Check webhook permissions:**
   - Webhook might not have access to the channel
   - Re-create it and select correct channel

2. **Check webhook URL:**
   - Make sure entire URL is copied (very long string)
   - No typos or missing characters

3. **Check file permissions:**
   - Restart your development server: `npm run dev`

---

## **Switching Services (Any Time)**

To switch between options:

1. **Keep the current setup working**
2. **Set up the new service separately**
3. **Test both to make sure new one works**
4. **Switch in `.env.local` when ready**
5. **Optionally delete old configuration**

Example switching from Discord to Resend:

**Before:**
```bash
WEBHOOK_URL=https://discord.com/api/webhooks/...
```

**After:**
```bash
# WEBHOOK_URL=https://discord.com/api/webhooks/...  (commented out)
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

---

## **Recommended Path Forward**

### Current Setup (Perfect for Now):
✅ Discord Webhook - Get instant notifications in your server

### When You're Ready (Future):
Consider upgrading to **Resend** when you want:
- Formal, branded emails to clients
- Professional communication
- Better delivery tracking
- Scale beyond 100 daily submissions

---

**Everything is set up and ready!** Your Discord webhook is active and will receive commission requests as they come in.

Need help? The API code in `/src/pages/api/commission.ts` handles all the logic and can be easily modified.
