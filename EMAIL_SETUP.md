# Email API Setup - Quick Reference

## ✅ What I Did

### 1. Created New Email API
- **File:** `backend/api/send-email.js`
- **Endpoint:** `/api/send-email`
- **Features:**
  - Clean, refined code
  - Proper error handling
  - Auto-reply to users
  - Notification emails to you
  - Beautiful HTML email templates

### 2. Updated Configuration
- **File:** `vercel.json`
  - Added routing for `/api/send-email`
  - Configured CORS headers
  - Set max duration to 10 seconds

### 3. Updated Frontend
- **File:** `src/hooks/useContactMutation.ts`
  - Now uses `/api/send-email` endpoint
  - Properly handles responses

### 4. Updated Documentation
- **File:** `backend/README.md`
  - Complete setup instructions
  - Troubleshooting guide

## 🔑 Your SendGrid API Key

**Keep this secret!** Use your actual SendGrid API key from your account.

```
SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key_here
```

Get your API key from: https://app.sendgrid.com/settings/api_keys

## 📋 Steps to Complete on Vercel

### Step 1: Redeploy Your Project

1. Delete current Vercel project (if needed)
2. Create new project from GitHub
3. Import: `nermeennasim/ItsAllAboutMe-NermeenNasim`
4. Settings:
   - Framework: **Vite**
   - Build Command: `vite build`
   - Output Directory: `dist`
   - Root Directory: `./`

### Step 2: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
SENDGRID_API_KEY = your_actual_sendgrid_api_key_here
TO_EMAIL = nimmi24.1990@gmail.com
FROM_EMAIL = noreply@nermeennasim.dev
NODE_ENV = production
```

**Important:** 
- Replace `your_actual_sendgrid_api_key_here` with your real API key from SendGrid
- Apply to **Production**, **Preview**, and **Development** environments

### Step 3: Verify SendGrid Setup

1. Go to https://app.sendgrid.com/
2. Login with your account
3. Navigate to: **Settings** → **Sender Authentication**
4. Verify the email: `noreply@nermeennasim.dev`
   - If you don't have domain access, use **Single Sender Verification**
   - You can also use `nimmi24.1990@gmail.com` as the FROM email

### Step 4: Test the Contact Form

1. Go to your live site
2. Navigate to Contact section
3. Fill out the form
4. Submit and check:
   - You should receive an email at `nimmi24.1990@gmail.com`
   - The sender should receive an auto-reply

## 🐛 Troubleshooting

### If emails don't send:

**Check 1: Environment Variables**
- Verify all 4 variables are set in Vercel
- Redeploy after adding variables

**Check 2: SendGrid Sender Email**
- Make sure `noreply@nermeennasim.dev` OR `nimmi24.1990@gmail.com` is verified
- Go to SendGrid → Settings → Sender Authentication

**Check 3: Vercel Function Logs**
- Go to Vercel → Deployments → Click on deployment → Functions
- Look for errors in `/api/send-email` logs

**Check 4: SendGrid Activity**
- Go to SendGrid → Activity
- See if emails are being sent/bounced

## 📁 Files Changed

```
✅ backend/api/send-email.js         (NEW - Main API)
✅ backend/README.md                 (Updated - Instructions)
✅ vercel.json                       (Updated - Routing)
✅ src/hooks/useContactMutation.ts   (Updated - Endpoint)
```

## 🔄 Next Steps

1. ✅ Commit and push changes (already done)
2. ⏳ Redeploy on Vercel
3. ⏳ Add environment variables in Vercel
4. ⏳ Verify SendGrid sender email
5. ⏳ Test contact form

## 📞 Alternative: Use Gmail as FROM Email

If you can't verify `noreply@nermeennasim.dev`, update environment variable:

```
FROM_EMAIL = nimmi24.1990@gmail.com
```

Then verify `nimmi24.1990@gmail.com` in SendGrid's Single Sender Verification.

---

**Ready to deploy!** All code is committed and ready. Just set up environment variables in Vercel! 🚀
