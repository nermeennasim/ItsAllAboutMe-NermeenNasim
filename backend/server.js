// server.js - Express server for portfolio backend
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Contact form specific rate limiting
const contactLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 3, // limit each IP to 3 contact form submissions per minute
	message: "Too many contact form submissions, please try again in a minute.",
});

// CORS configuration
const corsOptions = {
	origin: [
		"http://localhost:5173", // Vite dev server
		"http://localhost:3000", // Alternative dev server
		"http://localhost:4173", // Vite preview server

		"https://its-all-about-me-nermeen-nasim.vercel.app/", // Replace with your actual domain
	],
	credentials: true,
	optionsSuccessStatus: 200,
	methods: ["GET", "POST", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Import routes
const contactRoutes = require("./routes/contactRoutes");

// API routes
app.use("/api/contact", contactLimiter, contactRoutes);

// Health check route
app.get("/health", (req, res) => {
	res.json({
		status: "OK",
		message: "Portfolio Backend API is running",
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV || "development",
	});
});

// Root route
app.get("/", (req, res) => {
	res.json({
		message: "Portfolio Backend API",
		version: "1.0.0",
		endpoints: {
			health: "/health",
			contact: "/api/contact",
		},
	});
});

// 404 handler
app.use("*", (req, res) => {
	res.status(404).json({
		error: "Route not found",
		message: `The route ${req.originalUrl} does not exist on this server.`,
	});
});

// Global error handler
app.use((err, req, res, next) => {
	console.error("Error:", err.stack);
	res.status(500).json({
		error: "Internal Server Error",
		message:
			process.env.NODE_ENV === "development"
				? err.message
				: "Something went wrong!",
	});
});

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Portfolio Backend Server running on port ${PORT}`);
	console.log(`📍 Health check: http://localhost:${PORT}/health`);
	console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
	console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
