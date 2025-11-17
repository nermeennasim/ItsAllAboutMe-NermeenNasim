// backend/api/send-email.js - Serverless function for contact form email
const sgMail = require("@sendgrid/mail");

export default async function handler(req, res) {
	// Set CORS headers
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,OPTIONS,PATCH,DELETE,POST,PUT"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);

	// Handle preflight request
	if (req.method === "OPTIONS") {
		return res.status(200).end();
	}

	// Only allow POST requests
	if (req.method !== "POST") {
		return res.status(405).json({
			success: false,
			message: "Method not allowed. Please use POST.",
		});
	}

	// Extract form data
	const { name, email, subject, message } = req.body;

	// Validate required fields
	if (!name || !email || !subject || !message) {
		return res.status(400).json({
			success: false,
			message: "All fields are required: name, email, subject, message",
		});
	}

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({
			success: false,
			message: "Invalid email address format",
		});
	}

	// Check if SendGrid API key is configured
	if (!process.env.SENDGRID_API_KEY) {
		console.error("SENDGRID_API_KEY is not configured");
		return res.status(500).json({
			success: false,
			message:
				"Email service is not configured. Please contact directly via email.",
		});
	}

	try {
		// Initialize SendGrid with API key
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		const toEmail = process.env.TO_EMAIL || "nimmi24.1990@gmail.com";
		const fromEmail = process.env.FROM_EMAIL || "noreply@nermeennasim.dev";

		// Email to yourself (notification)
		const notificationEmail = {
			to: toEmail,
			from: fromEmail,
			replyTo: email,
			subject: `Portfolio Contact: ${subject}`,
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E17564, #BE3144); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #E17564;">Name:</td>
                <td style="padding: 10px;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #E17564;">Email:</td>
                <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #E17564;">Subject:</td>
                <td style="padding: 10px;">${subject}</td>
              </tr>
            </table>
            
            <h3 style="color: #333; margin-top: 20px;">Message:</h3>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #E17564;">
              ${message.replace(/\n/g, "<br>")}
            </div>
            
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              Received: ${new Date().toLocaleString()}<br>
              You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
			text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Received: ${new Date().toLocaleString()}
      `,
		};

		// Send notification email to you
		await sgMail.send(notificationEmail);

		// Auto-reply to the user
		const autoReplyEmail = {
			to: email,
			from: fromEmail,
			subject: "Thank you for reaching out! - Nermeen Nasim",
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E17564, #BE3144); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Thank You for Contacting Me! 🙌</h1>
          </div>
          
          <div style="padding: 20px;">
            <p style="font-size: 16px;">Hi ${name},</p>
            
            <p>Thank you for reaching out through my portfolio! I've received your message about "<strong>${subject}</strong>" and I appreciate you taking the time to connect.</p>
            
            <p>I'll review your message and get back to you within 24-48 hours.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #E17564;">In the meantime, feel free to:</h3>
              <ul style="line-height: 1.8;">
                <li>Connect on <a href="https://www.linkedin.com/in/n-nasim" style="color: #E17564; text-decoration: none; font-weight: 600;">LinkedIn</a></li>
                <li>Explore my projects on <a href="https://github.com/nermeennasim" style="color: #E17564; text-decoration: none; font-weight: 600;">GitHub</a></li>
                <li>Read my articles on <a href="https://medium.com/@nermeennasim" style="color: #E17564; text-decoration: none; font-weight: 600;">Medium</a></li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #fff3f0; border-radius: 5px; border-left: 4px solid #E17564;">
              <h4 style="margin-top: 0; color: #E17564;">Your Message:</h4>
              <p style="color: #666; font-style: italic;">${message}</p>
            </div>
            
            <p style="margin-top: 30px;">Best regards,<br>
            <strong style="color: #E17564; font-size: 18px;">Nermeen Nasim</strong><br>
            <em style="color: #666;">Senior Software Engineer | Startup Founder</em></p>
          </div>
          
          <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        </div>
      `,
			text: `
Hi ${name},

Thank you for reaching out through my portfolio! I've received your message about "${subject}" and I appreciate you taking the time to connect.

I'll review your message and get back to you within 24-48 hours.

In the meantime, feel free to:
- Connect on LinkedIn: https://www.linkedin.com/in/n-nasim
- Explore my projects on GitHub: https://github.com/nermeennasim
- Read my articles on Medium: https://medium.com/@nermeennasim

Your Message:
${message}

Best regards,
Nermeen Nasim
Senior Software Engineer | Startup Founder

---
This is an automated confirmation. Please do not reply to this email.
      `,
		};

		// Send auto-reply
		await sgMail.send(autoReplyEmail);

		// Success response
		return res.status(200).json({
			success: true,
			message:
				"Thank you! Your message has been sent successfully. Check your email for confirmation.",
		});
	} catch (error) {
		console.error("SendGrid Error:", error);

		// Log error details for debugging
		if (error.response) {
			console.error("SendGrid Response Error:", error.response.body);
		}

		// Fallback: Log the submission
		console.log("Contact Form Submission (fallback logging):", {
			name,
			email,
			subject,
			message,
			timestamp: new Date().toISOString(),
		});

		return res.status(500).json({
			success: false,
			message:
				"Sorry, there was an error sending your message. Please try emailing directly at nimmi24.1990@gmail.com",
			error: process.env.NODE_ENV === "development" ? error.message : undefined,
		});
	}
}
