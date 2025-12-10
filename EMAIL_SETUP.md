# Email Setup Guide

This guide explains how to set up email functionality for the SourSync waitlist system.

## Overview

The waitlist system sends two types of emails:
1. **Welcome Email**: Automatically sent when a user joins the waitlist
2. **Launch Email**: Sent to all waitlist members when the SaaS launches (triggered manually by admin)

## Setup Instructions

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. In the Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "SourSync Production")
4. Copy the API key (you'll only see it once!)

### 3. Add API Key to Environment Variables

Add the following to your `.env.local` file:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=https://soursync.com
```

**Important**: Replace `re_xxxxxxxxxxxxxxxxxxxxx` with your actual Resend API key.

### 4. Verify Your Domain (Optional but Recommended)

For production, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Add your domain (e.g., `soursync.com`)
4. Add the DNS records provided by Resend to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)

Once verified, update the `from` email in:
- `src/app/api/waitlist/welcome-email/route.ts`
- `src/app/api/waitlist/launch-email/route.ts`

Change from:
```typescript
from: 'SourSync <onboarding@resend.dev>',
```

To:
```typescript
from: 'SourSync <noreply@soursync.com>', // or your verified domain
```

### 5. Test the Setup

1. **Test Welcome Email**:
   - Visit your site and join the waitlist
   - Check your email inbox for the welcome message

2. **Test Launch Email** (Admin Only):
   - Log in to `/admin/waitlist`
   - Click "Send Launch Emails"
   - Confirm the action
   - Check the results displayed on the page

## Email Templates

Both email templates are HTML-based and styled to match the SourSync dark theme. They include:
- Professional branding
- Clear call-to-action buttons
- Responsive design
- Dark mode styling

### Customizing Email Templates

You can customize the email templates by editing:
- `src/app/api/waitlist/welcome-email/route.ts` - Welcome email template
- `src/app/api/waitlist/launch-email/route.ts` - Launch email template

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Ensure `RESEND_API_KEY` is set correctly in `.env.local`
2. **Check Console**: Look for errors in the browser console or server logs
3. **Resend Dashboard**: Check the Resend dashboard for delivery status and errors
4. **Rate Limits**: Free tier has limits (100 emails/day). Upgrade if needed.

### Domain Verification Issues

- Ensure DNS records are correctly added
- Wait 24-48 hours for DNS propagation
- Use Resend's domain verification tool to check status

### Admin Access Issues

- Ensure your email is in `src/lib/admin-allowlist.ts`
- Make sure you're logged in via `/login`
- Check browser console for authentication errors

## Production Checklist

Before going live:

- [ ] Resend API key added to production environment variables
- [ ] Domain verified in Resend
- [ ] `from` email updated to use verified domain
- [ ] `NEXT_PUBLIC_APP_URL` set to production URL
- [ ] Test welcome email sent successfully
- [ ] Test launch email functionality
- [ ] Monitor Resend dashboard for delivery rates

## Support

For Resend-specific issues, check:
- [Resend Documentation](https://resend.com/docs)
- [Resend Support](https://resend.com/support)

