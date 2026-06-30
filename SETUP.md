# 📬 Contact Form System — Setup Guide

Complete setup instructions for the production-ready contact form system on your portfolio website.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Firebase Setup (Firestore)](#1-firebase-setup-firestore)
3. [EmailJS Setup](#2-emailjs-setup)
4. [Google reCAPTCHA v3 Setup](#3-google-recaptcha-v3-setup)
5. [Environment Variables](#4-environment-variables)
6. [Local Development](#5-local-development)
7. [Vercel Deployment](#6-vercel-deployment)
8. [EmailJS Template Examples](#7-emailjs-template-examples)
9. [Testing Checklist](#8-testing-checklist)
10. [Troubleshooting](#9-troubleshooting)

---

## Prerequisites

- A [Google Account](https://accounts.google.com/) (for Firebase & reCAPTCHA)
- An [EmailJS Account](https://www.emailjs.com/) (free tier: 200 emails/month)
- [Node.js](https://nodejs.org/) v18+ installed locally
- [Vercel CLI](https://vercel.com/docs/cli) (optional, for local testing): `npm i -g vercel`

---

## 1. Firebase Setup (Firestore)

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or **"Add project"**)
3. Name it (e.g., `divyanshu-portfolio`)
4. Disable Google Analytics (optional — not needed)
5. Click **"Create project"**

### Step 2: Enable Firestore

1. In your Firebase project, go to **Build → Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select a region close to you (e.g., `asia-south1` for Mumbai)
5. Click **"Enable"**

### Step 3: Set Firestore Security Rules

Go to **Firestore → Rules** and set:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Deny all direct client access — only server (admin SDK) can read/write
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

> This is secure because our API uses the **Firebase Admin SDK**, which bypasses these rules.

### Step 4: Generate a Service Account Key

1. Go to **Project Settings** (gear icon) → **Service Accounts**
2. Click **"Generate new private key"**
3. Download the JSON file
4. From this file, you'll need:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY`

> ⚠️ **Never commit this JSON file to Git.** Extract the values and store them as environment variables.

---

## 2. EmailJS Setup

### Step 1: Create an Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up
2. The free plan gives you **200 emails/month** (100 notification + 100 auto-replies)

### Step 2: Connect Gmail Service

1. Go to **Email Services** → **Add New Service**
2. Select **Gmail**
3. Click **"Connect Account"** and authorize with your Gmail
4. Name the service (e.g., `portfolio_gmail`)
5. Note the **Service ID** (e.g., `service_abc123`) → `EMAILJS_SERVICE_ID`

### Step 3: Create Notification Template

This template sends the enquiry to **your Gmail**.

1. Go to **Email Templates** → **Create New Template**
2. Name: `Portfolio Contact Notification`
3. Set **To Email**: `divyanshu.kanojia.72@gmail.com`
4. Set **Subject**: `New Portfolio Enquiry: {{subject}}`
5. Use the HTML template from [Section 7](#notification-email-template) below
6. Note the **Template ID** → `EMAILJS_TEMPLATE_ID`

### Step 4: Create Auto-Reply Template

This template sends a confirmation to the **visitor**.

1. Create another template
2. Name: `Portfolio Auto Reply`
3. Set **To Email**: `{{to_email}}`
4. Set **Subject**: `Thank you for contacting Divyanshu Kanojia`
5. Use the HTML template from [Section 7](#auto-reply-email-template) below
6. Note the **Template ID** → `EMAILJS_AUTOREPLY_TEMPLATE_ID`

### Step 5: Get API Keys

1. Go to **Account** → **General**
2. Copy your **Public Key** → `EMAILJS_PUBLIC_KEY`
3. Copy your **Private Key** → `EMAILJS_PRIVATE_KEY`

---

## 3. Google reCAPTCHA v3 Setup

### Step 1: Register Your Site

1. Go to [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **"+"** to create a new site
3. **Label**: `Divyanshu Portfolio`
4. **reCAPTCHA type**: **reCAPTCHA v3**
5. **Domains**: Add:
   - `mrdivyanshu.tech`
   - `localhost` (for local testing)
6. Accept the Terms and click **Submit**

### Step 2: Get Your Keys

- **Site Key** (public) — paste this in two places:
  1. `index.html` line ~241: replace `YOUR_RECAPTCHA_SITE_KEY` in the script URL
  2. `contact.js` line ~39: replace `YOUR_RECAPTCHA_SITE_KEY` in the constant
- **Secret Key** (private) → `RECAPTCHA_SECRET_KEY` (environment variable only)

---

## 4. Environment Variables

### For Vercel (Production)

Go to your Vercel project → **Settings** → **Environment Variables** and add:

| Variable | Value | Example |
|----------|-------|---------|
| `EMAILJS_SERVICE_ID` | Your EmailJS service ID | `service_abc123` |
| `EMAILJS_TEMPLATE_ID` | Notification template ID | `template_xyz789` |
| `EMAILJS_AUTOREPLY_TEMPLATE_ID` | Auto-reply template ID | `template_def456` |
| `EMAILJS_PUBLIC_KEY` | Your EmailJS public key | `user_AbCdEfGhIj` |
| `EMAILJS_PRIVATE_KEY` | Your EmailJS private key | `abc123def456...` |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret key | `6Lc...` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `divyanshu-portfolio` |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email | `firebase-admin@...iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | Firebase private key (with `\n`) | `-----BEGIN PRIVATE KEY-----\n...` |

> ⚠️ **FIREBASE_PRIVATE_KEY**: When pasting in Vercel, keep the `\n` characters as-is. The API code handles the conversion.

### For Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in all values in `.env.local`
3. This file is git-ignored and won't be committed

---

## 5. Local Development

### Install Dependencies

```bash
npm install
```

### Run with Vercel Dev

```bash
npx vercel dev
```

This starts a local server that:
- Serves static files (`index.html`, `style.css`, etc.)
- Runs the serverless function at `http://localhost:3000/api/contact`
- Reads `.env.local` for environment variables

### Test the Form

1. Open `http://localhost:3000`
2. Fill in the contact form
3. Submit and check:
   - ✅ Notification email in your Gmail
   - ✅ Auto-reply in the sender's inbox
   - ✅ Entry in Firebase Firestore
   - ✅ Toast notification appears

---

## 6. Vercel Deployment

### Option A: Via Git (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **"Add New..."** → **"Project"**
4. Import your GitHub repository
5. Framework Preset: **Other**
6. Build Command: (leave empty or `echo 'Static site'`)
7. Output Directory: (leave empty — defaults to root)
8. Set all environment variables (see Section 4)
9. Click **Deploy**

### Option B: Via CLI

```bash
npx vercel --prod
```

### Verify Deployment

After deployment:
1. Visit `https://your-domain.vercel.app/api/contact` — should return `405 Method Not Allowed` (GET not supported, this is correct)
2. Submit a test form on the live site
3. Verify all three outputs (email, auto-reply, Firestore)

---

## 7. EmailJS Template Examples

### Notification Email Template

Use this HTML in your **notification template** (the one that emails you):

```html
<div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0e17; border: 1px solid #1a1f2e; border-radius: 12px; overflow: hidden;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #C8A96A 0%, #a08040 100%); padding: 24px 32px;">
        <h1 style="margin: 0; color: #0a0e17; font-size: 20px; font-weight: 700;">📬 New Portfolio Enquiry</h1>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 12px 0; color: #8892a4; font-size: 13px; width: 100px; vertical-align: top;">Name</td>
                <td style="padding: 12px 0; color: #e4e8f0; font-size: 15px;">{{from_name}}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; color: #8892a4; font-size: 13px; vertical-align: top;">Email</td>
                <td style="padding: 12px 0; color: #e4e8f0; font-size: 15px;"><a href="mailto:{{from_email}}" style="color: #C8A96A;">{{from_email}}</a></td>
            </tr>
            <tr>
                <td style="padding: 12px 0; color: #8892a4; font-size: 13px; vertical-align: top;">Subject</td>
                <td style="padding: 12px 0; color: #e4e8f0; font-size: 15px;">{{subject}}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; color: #8892a4; font-size: 13px; vertical-align: top;">Date</td>
                <td style="padding: 12px 0; color: #e4e8f0; font-size: 15px;">{{date}} at {{time}}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; color: #8892a4; font-size: 13px; vertical-align: top;">Source</td>
                <td style="padding: 12px 0; color: #e4e8f0; font-size: 15px;">{{source}}</td>
            </tr>
        </table>

        <!-- Message -->
        <div style="margin-top: 24px; padding: 20px; background: #111827; border-left: 3px solid #C8A96A; border-radius: 8px;">
            <p style="margin: 0 0 8px; color: #8892a4; font-size: 13px;">Message</p>
            <p style="margin: 0; color: #e4e8f0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">{{message}}</p>
        </div>

        <!-- Reply Button -->
        <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:{{from_email}}?subject=Re: {{subject}}" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #C8A96A 0%, #a08040 100%); color: #0a0e17; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Reply to {{from_name}}</a>
        </div>
    </div>
</div>
```

### Auto-Reply Email Template

Use this HTML in your **auto-reply template** (sent to the visitor):

```html
<div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0a0e17 0%, #1a1f2e 100%); padding: 40px 32px; text-align: center;">
        <h1 style="margin: 0 0 8px; color: #C8A96A; font-size: 24px; font-weight: 700;">Thank You, {{to_name}}!</h1>
        <p style="margin: 0; color: #8892a4; font-size: 14px;">Your message has been received successfully.</p>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
        <p style="color: #333; font-size: 15px; line-height: 1.7;">
            Hi <strong>{{to_name}}</strong>,
        </p>
        <p style="color: #555; font-size: 15px; line-height: 1.7;">
            Thank you for reaching out! I've received your enquiry regarding <strong>"{{subject}}"</strong> and I truly appreciate you taking the time to write.
        </p>
        <p style="color: #555; font-size: 15px; line-height: 1.7;">
            I'll review your message carefully and get back to you <strong>within 24 hours</strong>. If your matter is urgent, feel free to reach me directly at <a href="mailto:divyanshu.kanojia.72@gmail.com" style="color: #C8A96A;">divyanshu.kanojia.72@gmail.com</a>.
        </p>

        <!-- Enquiry Summary -->
        <div style="margin: 24px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
            <p style="margin: 0 0 12px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Message Summary</p>
            <p style="margin: 0 0 4px; color: #333; font-size: 14px;"><strong>Subject:</strong> {{subject}}</p>
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">{{message}}</p>
        </div>

        <!-- Signature -->
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e9ecef;">
            <p style="margin: 0 0 4px; color: #333; font-size: 15px;">Warm regards,</p>
            <p style="margin: 0 0 2px; color: #0a0e17; font-size: 16px; font-weight: 700;">Divyanshu Kanojia</p>
            <p style="margin: 0 0 2px; color: #888; font-size: 13px;">Founder & CEO</p>
            <p style="margin: 0 0 12px; color: #C8A96A; font-size: 13px; font-weight: 600;">TechDwar Technologies</p>
            <p style="margin: 0; font-size: 13px;">
                <a href="https://mrdivyanshu.tech" style="color: #C8A96A; text-decoration: none;">mrdivyanshu.tech</a>
                &nbsp;•&nbsp;
                <a href="https://github.com/divyanshuX72" style="color: #888; text-decoration: none;">GitHub</a>
                &nbsp;•&nbsp;
                <a href="https://linkedin.com/in/divyanshu-kanojia" style="color: #888; text-decoration: none;">LinkedIn</a>
            </p>
        </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8f9fa; padding: 16px 32px; text-align: center;">
        <p style="margin: 0; color: #999; font-size: 11px;">
            This is an automated confirmation from <a href="https://mrdivyanshu.tech" style="color: #C8A96A; text-decoration: none;">mrdivyanshu.tech</a>. Please do not reply to this email.
        </p>
    </div>
</div>
```

---

## 8. Testing Checklist

After setup, verify each component:

- [ ] **Form Validation**: Try submitting with empty fields → error toast appears
- [ ] **Email Validation**: Enter an invalid email → error toast appears
- [ ] **Loading State**: Button shows "Sending..." spinner during submission
- [ ] **Success State**: Button shows "Sent!" checkmark after success
- [ ] **Success Toast**: Green toast appears with success message
- [ ] **Form Reset**: Form fields clear after successful submission
- [ ] **Notification Email**: Check your Gmail for the enquiry email
- [ ] **Auto-Reply Email**: Check sender's inbox for the confirmation email
- [ ] **Firestore Entry**: Check Firebase Console → Firestore → `enquiries` collection
- [ ] **Rate Limiting**: Submit 6 times rapidly → "Too many requests" error on 6th
- [ ] **reCAPTCHA**: Open browser DevTools → Network tab → verify `recaptcha` request

---

## 9. Troubleshooting

### "Failed to send message" Error

1. Check Vercel Function logs: **Vercel Dashboard → Your Project → Functions → Logs**
2. Common causes:
   - Missing environment variables
   - Incorrect EmailJS template IDs
   - Firebase private key not properly formatted

### Emails Not Arriving

1. Check your spam/junk folder
2. Verify EmailJS service is connected (EmailJS Dashboard → Services)
3. Check EmailJS quota (free plan: 200/month)
4. Verify template variable names match exactly: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`, etc.

### Firestore Not Saving

1. Check Firebase Console → Firestore → `enquiries` collection
2. Verify `FIREBASE_PRIVATE_KEY` has proper newline formatting
3. Check Vercel function logs for Firebase errors

### reCAPTCHA Errors

1. Ensure your domain is registered in the reCAPTCHA admin panel
2. For local testing, add `localhost` to the allowed domains
3. Check browser console for reCAPTCHA loading errors

### CORS Errors

1. The `vercel.json` restricts API access to `https://mrdivyanshu.tech`
2. For local development, `vercel dev` handles CORS automatically
3. If deploying to a different domain, update the `Access-Control-Allow-Origin` header in `vercel.json`

---

## Architecture Diagram

```
┌─────────────────┐     POST /api/contact     ┌──────────────────────┐
│   Contact Form  │ ───────────────────────── │  Vercel Serverless   │
│   (contact.js)  │                           │   (api/contact.js)   │
│                 │ ◄─────────────────────── │                      │
│  • Validation   │     JSON Response         │  1. Rate Limit Check │
│  • reCAPTCHA    │                           │  2. Input Sanitize   │
│  • Loading UI   │                           │  3. reCAPTCHA Verify │
│  • Toast Notifs │                           │  4. Firestore Save   │
└─────────────────┘                           │  5. EmailJS Notify   │
                                              │  6. EmailJS Reply    │
                                              └──────────┬───────────┘
                                                         │
                              ┌───────────────────────────┼───────────────────────┐
                              │                           │                       │
                         ┌────▼────┐              ┌───────▼──────┐         ┌──────▼──────┐
                         │ Firebase │              │  EmailJS →   │         │  EmailJS →  │
                         │Firestore│              │  Your Gmail  │         │  Sender's   │
                         │         │              │ (Notification)│         │   Inbox     │
                         │ enquiries│              │              │         │ (Auto-Reply)│
                         └─────────┘              └──────────────┘         └─────────────┘
```
