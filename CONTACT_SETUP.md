# Contact Form Setup Guide

## SendGrid Integration

Your contact form is now set up with professional styling and SendGrid email integration. Here's how to complete the setup:

### 1. SendGrid Setup

1. **Create SendGrid Account**: Go to [sendgrid.com](https://sendgrid.com) and create a free account
2. **Get API Key**:

   - Navigate to Settings > API Keys
   - Create a new API key with "Full Access" or "Mail Send" permissions
   - Copy the API key

3. **Verify Sender Identity**:
   - Go to Settings > Sender Authentication
   - Verify your email domain or single sender email
   - Use this verified email in the `from` field

### 2. Environment Variables

Create a `.env` file in your project root:

```bash
SENDGRID_API_KEY=SG.your_actual_api_key_here
```

### 3. Deployment Options

#### Option A: Vercel (Recommended)

1. Deploy your portfolio to Vercel
2. Add environment variables in Vercel dashboard
3. The `/api/contact.js` will work as a serverless function

#### Option B: Netlify

1. Deploy to Netlify
2. Rename `/api/contact.js` to `/netlify/functions/contact.js`
3. Add environment variables in Netlify dashboard

#### Option C: Traditional Hosting

- Set up a simple Express.js server
- Host the API endpoint separately
- Update the fetch URL in the contact form

### 4. Features Included

✅ **Professional Contact Form**

- Clean, modern design matching your portfolio theme
- Real-time validation
- Loading states and success/error feedback
- Responsive grid layout

✅ **Contact Information Card**

- Your email, location, social links
- Services you offer as chips
- Professional presentation

✅ **Email Functionality**

- Automated email to you with contact details
- Auto-reply to the person contacting you
- HTML formatted emails with your branding
- Fallback "Quick Email" button using mailto

✅ **User Experience**

- Smooth animations with Framer Motion
- Loading spinner during submission
- Success/error alerts
- Form reset after successful submission

### 5. Customization

#### Update Contact Information

Edit the contact information in `Contact.tsx`:

- Email address
- Location
- Social media links
- Services offered

#### Styling

The form uses your portfolio's theme colors:

- Primary: #E17564 (coral)
- Secondary: #BE3144 (red)
- Accent: #872341 (burgundy)
- Dark: #09122C (navy)

### 6. Testing

1. **Local Testing**: Use the "Quick Email" button (mailto fallback)
2. **Production Testing**: Deploy and test the SendGrid integration
3. **Monitoring**: Check SendGrid dashboard for delivery analytics

### 7. Alternative Simple Solution

If you prefer a simpler solution without backend setup:

1. **Use Formspree**: Replace the API call with Formspree endpoint
2. **Use EmailJS**: Client-side email service
3. **Use Netlify Forms**: Built-in form handling for Netlify

The current setup provides a professional, scalable solution that will impress potential clients and employers!
