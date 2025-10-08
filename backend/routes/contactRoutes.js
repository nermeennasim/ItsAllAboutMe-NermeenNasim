// routes/contact.js - Contact form route handler
const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");

// Set SendGrid API key
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// Validation helper
const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const validateInput = (name, email, subject, message) => {
	const errors = [];

	if (!name || name.trim().length < 2) {
		errors.push("Name must be at least 2 characters long");
	}

	if (!email || !validateEmail(email)) {
		errors.push("Please provide a valid email address");
	}

	if (!subject || subject.trim().length < 5) {
		errors.push("Subject must be at least 5 characters long");
	}

	if (!message || message.trim().length < 10) {
		errors.push("Message must be at least 10 characters long");
	}

	return errors;
};

// POST /api/contact - Handle contact form submission
router.post("/", async (req, res) => {
	try {
		const { name, email, subject, message } = req.body;

		console.log("Contact form submission received:", { name, email, subject });

		// Validate input
		const validationErrors = validateInput(name, email, subject, message);
		if (validationErrors.length > 0) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: validationErrors,
			});
		}

		// Check if SendGrid API key is configured
		if (!process.env.SEND_GRID_API_KEY) {
			console.error("SendGrid API key not configured");
			return res.status(500).json({
				success: false,
				message:
					"Email service not configured. Please try the quick email option.",
			});
		}

		// Email to you (the recipient)
		const emailToYou = {
			to: "nimmi24.1990@gmail.com",
			from: "noreply@nermeennasim.dev", // Must be a verified sender in SendGrid
			replyTo: email,
			subject: `Portfolio Contact: ${subject}`,
			html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #E17564, #BE3144); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">From your portfolio website</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px; background-color: white;">
            <h2 style="color: #333; margin-bottom: 20px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-weight: bold; color: #E17564; width: 100px;">Name:</td>
                <td style="padding: 12px 0; color: #333;">${name.trim()}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-weight: bold; color: #E17564;">Email:</td>
                <td style="padding: 12px 0; color: #333;">
                  <a href="mailto:${email}" style="color: #E17564; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-weight: bold; color: #E17564;">Subject:</td>
                <td style="padding: 12px 0; color: #333;">${subject.trim()}</td>
              </tr>
            </table>
            
            <h3 style="color: #333; margin: 20px 0 10px 0;">Message:</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #E17564; line-height: 1.6;">
              ${message.trim().replace(/\n/g, "<br>")}
            </div>
            
            <!-- Quick Actions -->
            <div style="margin-top: 30px; padding: 20px; background: #f0f7ff; border-radius: 8px;">
              <h4 style="margin: 0 0 15px 0; color: #333;">Quick Actions:</h4>
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(
				subject
			)}" 
                 style="display: inline-block; background: #E17564; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">
                Reply via Email
              </a>
              <a href="https://www.linkedin.com/in/n-nasim" 
                 style="display: inline-block; background: #0077b5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                View LinkedIn
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f1f1f1; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">This message was sent from your portfolio contact form</p>
            <p style="margin: 5px 0 0 0;">Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
			text: `
New Contact Form Submission

Name: ${name.trim()}
Email: ${email}
Subject: ${subject.trim()}

Message:
${message.trim()}

Sent from your portfolio at ${new Date().toLocaleString()}
Reply to this person at: ${email}
      `.trim(),
		};

		// Auto-reply to the sender
		const autoReply = {
			to: email,
			from: "noreply@nermeennasim.dev",
			subject: "Thank you for reaching out - Nermeen Nasim",
			html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #E17564, #BE3144); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">I'll get back to you soon</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px; background-color: white;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi ${name.trim()},</p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out through my portfolio! I've received your message about 
              "<strong style="color: #E17564;">${subject.trim()}</strong>" and I'll get back to you within 24-48 hours.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #E17564;">Your Message:</h4>
              <p style="margin: 0; font-style: italic; color: #666;">
                "${message.trim().substring(0, 200)}${
				message.trim().length > 200 ? "..." : ""
			}"
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              In the meantime, feel free to check out my work and connect with me:
            </p>
            
            <!-- Links -->
            <div style="text-align: center; margin: 25px 0;">
              <a href="https://www.linkedin.com/in/n-nasim" 
                 style="display: inline-block; background: #0077b5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 5px;">
                LinkedIn Profile
              </a>
              <a href="https://github.com/nermeennasim" 
                 style="display: inline-block; background: #333; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 5px;">
                GitHub Projects
              </a>
              <a href="https://medium.com/@nermeennasim" 
                 style="display: inline-block; background: #00ab6c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 5px;">
                Medium Articles
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              <strong style="color: #E17564;">Nermeen Nasim</strong><br>
              <em>Software Engineer | Startup Founder</em>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #f1f1f1; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">This is an automated response from Nermeen Nasim's portfolio</p>
            <p style="margin: 5px 0 0 0;">If you need immediate assistance, please reply to this email</p>
          </div>
        </div>
      `,
			text: `
Hi ${name.trim()},

Thank you for reaching out through my portfolio! I've received your message about "${subject.trim()}" and I'll get back to you within 24-48 hours.

Your Message: "${message.trim()}"

In the meantime, feel free to connect with me:
- LinkedIn: https://www.linkedin.com/in/n-nasim
- GitHub: https://github.com/nermeennasim
- Medium: https://medium.com/@nermeennasim

Best regards,
Nermeen Nasim
Software Engineer | Startup Founder

This is an automated response. If you need immediate assistance, please reply to this email.
      `.trim(),
		};

		// Send both emails
		await Promise.all([sgMail.send(emailToYou), sgMail.send(autoReply)]);

		console.log("Contact emails sent successfully");

		// Success response
		res.status(200).json({
			success: true,
			message:
				"Thank you! Your message has been sent successfully. You should receive a confirmation email shortly.",
		});
	} catch (error) {
		console.error("Contact form error:", error);

		// Handle SendGrid specific errors
		if (error.response && error.response.body) {
			console.error("SendGrid error details:", error.response.body);
		}

		// Log the form data for manual follow-up
		console.log("Failed submission data:", {
			name: req.body.name,
			email: req.body.email,
			subject: req.body.subject,
			message: req.body.message,
			timestamp: new Date().toISOString(),
		});

		res.status(500).json({
			success: false,
			message:
				"Failed to send message. Please try the quick email option or contact me directly.",
			error: process.env.NODE_ENV === "development" ? error.message : undefined,
		});
	}
});

module.exports = router;
