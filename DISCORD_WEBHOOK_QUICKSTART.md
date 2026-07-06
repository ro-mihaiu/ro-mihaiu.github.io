# Quick Reference: Email Notifications Setup

## ✅ Current Configuration

**Method:** Discord Webhook  
**Status:** Active  
**Webhook URL:** Configured in `.env.local`

---

## How It Works

```
User submits form → Website validation → API call to Discord Webhook → 
→ Discord message sent to your server ✅
```

---

## Test Your Setup

### Step 1: Start the dev server
```bash
npm run dev
```

### Step 2: Go to contact form
```
http://localhost:3000/contact
```

### Step 3: Submit a test commission
- **Username:** Test User
- **Build Type:** Custom Build / Structure
- **Subserver:** Cherry
- **Budget:** 1,000,000
- **Timeframe:** 1 week
- **Details:** This is a test message to verify Discord webhook is working

### Step 4: Check your Discord server
- You should see a formatted message with all the details within seconds
- The message includes title, fields, and a color-coded embed

---

## Discord Message Format

When you submit a form, you'll see something like this in Discord:

```
┌─────────────────────────────────────────┐
│ Build Commission: Custom Build          │
│                                         │
│ Username: Test User                     │
│ Subserver: Cherry                       │
│ Budget: 1,000,000                      │
│ Timeframe: 1 week                       │
│ Details: This is a test message...      │
└─────────────────────────────────────────┘
```

---

## Switching Services (Future)

### To Switch to Resend:
1. Sign up at resend.com
2. Copy API key
3. In `.env.local`: Remove `WEBHOOK_URL`, add `RESEND_API_KEY=re_...`
4. Restart dev server

### To Switch to Gmail:
1. Create app-specific password
2. In `.env.local`: Remove `WEBHOOK_URL`, add `EMAIL_USER=...` and `EMAIL_PASSWORD=...`
3. Restart dev server

See [EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md) for full details.

---

## Files Modified

- ✅ `.env.local` - Contains your Discord webhook URL
- ✅ `.env.example` - Template with all options documented
- ✅ `/src/pages/api/commission.ts` - Handles form submissions
- ✅ `/src/pages/contact.tsx` - Updated form with async handling

---

## Troubleshooting

### Form submission not working?
```bash
# Check browser console for errors (F12)
# Check terminal output for server errors
# Verify .env.local exists (not .env)
# Restart: npm run dev
```

### Discord message not appearing?
- Check webhook URL is correct
- Verify webhook has access to the channel
- Check Discord webhook permissions

### Want to verify webhook manually?
Test with curl:
```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"content":"Test from website"}' \
  WEBHOOK_URL_HERE
```

---

**Everything is ready!** Start the dev server and test the commission form.
