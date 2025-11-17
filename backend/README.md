# Backend API - Email Service (Serverless Functions)

Serverless functions for handling contact form submissions via SendGrid on Vercel.

## 📁 Structure

```
backend/
├── api/
│   ├── send-email.js    # Main email API endpoint (recommended)
│   └── contact.js       # Legacy contact endpoint
```

## Features

- 📧 Contact form with SendGrid email integration
- 🛡️ Security: CORS headers, input validation, email validation
- ✅ Auto-reply emails to form submitters
- 🔒 Environment variable validation
- ⚡ Serverless deployment on Vercel
- 🚀 Ready for production deployment
- 📝 Comprehensive logging

## 🚀 Setup Instructions for Vercel

### 1. SendGrid Account Setup

1. **Create a SendGrid account** (free tier available)
   - Go to: https://signup.sendgrid.com/
   - Sign up and verify your email

2. **Create an API Key**
   - Navigate to Settings > API Keys
   - Click "Create API Key"
   - Choose "Restricted Access" and enable:
     - Mail Send: Full Access
   - Copy your API key (starts with `SG.`)
   - **Keep it secret and secure!**

3. **Verify Sender Identity**
   - Go to Settings > Sender Authentication
   - Verify your sender email: `noreply@nermeennasim.dev`
   - Or use Single Sender Verification

### 2. Vercel Environment Variables

**In Vercel Dashboard:**
1. Go to your project → Settings → Environment Variables
2. Add these variables:

| Variable Name      | Value                                    |
|-------------------|-------------------------------------------|
| `SENDGRID_API_KEY` | Your actual SendGrid API key (SG.xxx...) |
| `TO_EMAIL`        | `nimmi24.1990@gmail.com`                  |
| `FROM_EMAIL`      | `noreply@nermeennasim.dev`               |
| `NODE_ENV`        | `production`                              |

### 3. API Endpoint

**URL:** `/api/send-email`

**Method:** `POST`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Test Message",
  "message": "This is a test message."
}
```

## 📧 Email Flow

1. **Notification Email** → `nimmi24.1990@gmail.com`
   - Contains sender's details and message
   - Reply-To set to sender's email

2. **Auto-Reply** → Form submitter
   - Confirmation message
   - Social media links
   - Copy of their message

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- SendGrid API key
- Verified sender email in SendGrid

### Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your SendGrid API key and configuration

### Development

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

### Production

Start the production server:

```bash
npm start
```

## API Endpoints

### POST `/api/contact`

Submit a contact form

**Request Body:**

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"subject": "Project Inquiry",
	"message": "Hello, I'd like to discuss a project..."
}
```

**Response:**

```json
{
	"success": true,
	"message": "Thank you! Your message has been sent successfully."
}
```

### GET `/health`

Health check endpoint

**Response:**

```json
{
	"status": "OK",
	"message": "Portfolio Backend API is running",
	"timestamp": "2025-10-07T12:00:00.000Z",
	"environment": "development"
}
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes globally, 3 contact submissions per minute
- **CORS**: Configured for specific origins
- **Input Validation**: Comprehensive validation for all form fields
- **Helmet**: Security headers
- **Environment Variables**: Sensitive data protection

## Deployment

### Vercel (Recommended)

1. Create a `vercel.json` in the backend directory:

   ```json
   {
   	"version": 2,
   	"builds": [
   		{
   			"src": "server.js",
   			"use": "@vercel/node"
   		}
   	],
   	"routes": [
   		{
   			"src": "/(.*)",
   			"dest": "/server.js"
   		}
   	],
   	"env": {
   		"SEND_GRID_API_KEY": "@send_grid_api_key"
   	}
   }
   ```

2. Deploy to Vercel:

   ```bash
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard

### Other Platforms

The backend can also be deployed to:

- Heroku
- Railway
- DigitalOcean App Platform
- AWS Lambda
- Google Cloud Run

## Environment Variables

| Variable            | Description                          | Required |
| ------------------- | ------------------------------------ | -------- |
| `SEND_GRID_API_KEY` | SendGrid API key                     | Yes      |
| `NODE_ENV`          | Environment (development/production) | No       |
| `PORT`              | Server port                          | No       |
| `FROM_EMAIL`        | Verified sender email                | No       |
| `TO_EMAIL`          | Recipient email                      | No       |

## Error Handling

The API includes comprehensive error handling for:

- Invalid input validation
- SendGrid API errors
- Rate limiting exceeded
- Server errors

All errors are logged and appropriate responses are sent to the client.

## License

MIT License
