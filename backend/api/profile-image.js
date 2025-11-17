const path = require("path");
const fs = require("fs");

// API endpoint to serve profile image with protection
const profileImageHandler = (req, res) => {
	try {
		// Add some basic protection checks
		const userAgent = req.headers["user-agent"];
		const referer = req.headers["referer"];

		// Block direct access without proper referer
		if (!referer || !referer.includes(req.headers.host)) {
			return res.status(403).json({ error: "Access denied" });
		}

		// Add rate limiting logic here if needed
		// You could also add authentication checks

		// Serve the image with cache control headers
		const imagePath = path.join(__dirname, "../../public/profile.jpg");

		if (!fs.existsSync(imagePath)) {
			return res.status(404).json({ error: "Image not found" });
		}

		const imageBuffer = fs.readFileSync(imagePath);

		// Set headers to make caching and downloading harder
		res.setHeader("Content-Type", "image/jpeg");
		res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		res.setHeader("Pragma", "no-cache");
		res.setHeader("Expires", "0");
		res.setHeader("Content-Disposition", "inline"); // Prevent direct download

		res.send(imageBuffer);
	} catch (error) {
		console.error("Error serving profile image:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = profileImageHandler;
