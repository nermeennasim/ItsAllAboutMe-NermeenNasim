// api/contact.js - Serverless function for contact form
export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { name, email, subject, message } = req.body;

	// Validate required fields
	if (!name || !email || !subject || !message) {
		return res.status(400).json({ message: "All fields are required" });
	}

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ message: "Invalid email address" });
	}

	try {
		// SendGrid integration
		const sgMail = require("@sendgrid/mail");

		// Set your SendGrid API key (you'll need to add this to your environment variables)
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		// Email template
		const msg = {
			to: "nimmi24.1990@gmail.com", // Your email
			from: "noreply@nermeennasim.dev", // Verified sender email
			replyTo: email, // User's email for easy reply
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
                <td style="padding: 10px;">${email}</td>
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
              This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
			text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        Sent from portfolio at ${new Date().toLocaleString()}
      `,
		};

		await sgMail.send(msg);

		// Auto-reply to user
		const autoReply = {
			to: email,
			from: "noreply@nermeennasim.dev",
			subject: "Thank you for reaching out - Nermeen Nasim",
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E17564, #BE3144); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Thank You!</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Hi ${name},</p>
            
            <p>Thank you for reaching out through my portfolio! I've received your message about "<strong>${subject}</strong>" and I'll get back to you within 24 hours.</p>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Check out my <a href="https://www.linkedin.com/in/n-nasim" style="color: #E17564;">LinkedIn profile</a></li>
              <li>Browse my <a href="https://github.com/nermeennasim" style="color: #E17564;">GitHub projects</a></li>
              <li>Read my <a href="https://medium.com/@nermeennasim" style="color: #E17564;">Medium articles</a></li>
            </ul>
            
            <p>Best regards,<br>
            <strong>Nermeen Nasim</strong><br>
            <em>Software Engineer | Startup Founder</em></p>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
              <h4 style="margin-top: 0; color: #E17564;">Your Message:</h4>
              <p style="font-style: italic;">"${message}"</p>
            </div>
          </div>
        </div>
      `,
		};

		await sgMail.send(autoReply);

		return res.status(200).json({
			message: "Message sent successfully!",
			success: true,
		});
	} catch (error) {
		console.error("SendGrid Error:", error);

		// Fallback: Log the message (you could save to database here)
		console.log("Contact Form Submission:", {
			name,
			email,
			subject,
			message,
			timestamp: new Date().toISOString(),
		});

		return res.status(500).json({
			message: "Failed to send message. Please try the quick email option.",
			success: false,
		});
	}
}
