# Portfolio Backend

A Node.js/Express backend API for the portfolio contact form with SendGrid email integration.

## Features

- 📧 Contact form with SendGrid email integration
- 🛡️ Security middleware (Helmet, CORS, Rate limiting)
- ✅ Input validation and sanitization
- 📨 Auto-reply emails to form submitters
- 🚀 Ready for production deployment
- 📝 Comprehensive logging

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
