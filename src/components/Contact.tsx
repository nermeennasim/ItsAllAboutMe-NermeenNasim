import { useState } from "react";
import {
	Container,
	TextField,
	Button,
	Typography,
	Box,
	Alert,
	CircularProgress,
	Card,
	CardContent,
	Grid,
	Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@mui/material/styles";
import {
	Send,
	Email,
	LocationOn,
	LinkedIn,
	GitHub,
	CheckCircle,
} from "@mui/icons-material";

const Contact = () => {
	const theme = useTheme();
	const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [responseMessage, setResponseMessage] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStatus("loading");

		try {
			// For now, we'll use a simple form service (you can replace with SendGrid later)
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setStatus("success");
				setResponseMessage(
					"Thank you! Your message has been sent successfully."
				);
				setFormData({ name: "", email: "", subject: "", message: "" });
			} else {
				throw new Error("Failed to send message");
			}
		} catch (error) {
			setStatus("error");
			setResponseMessage(
				"Sorry, there was an error sending your message. Please try again or contact me directly."
			);
		}
	};

	// For now, let's use a simple mailto fallback
	const handleQuickContact = () => {
		window.location.href = `mailto:nimmi24.1990@gmail.com?subject=${
			formData.subject || "Contact from Portfolio"
		}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${
			formData.message
		}`;
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, duration: 0.6 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};
	return (
		<Box
			id="contact"
			sx={{
				padding: "80px 20px",
				minHeight: "100vh",
				background: "transparent",
				position: "relative",
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(225, 117, 100, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(135, 35, 65, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(190, 49, 68, 0.1) 0%, transparent 50%)
          `,
					pointerEvents: "none",
					zIndex: 1,
				},
			}}>
			<Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
				<motion.div
					ref={ref}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}>
					<motion.div variants={itemVariants}>
						<Typography
							variant="h3"
							gutterBottom
							sx={{
								color: theme.palette.text.primary,
								textAlign: "center",
								fontWeight: 700,
								marginBottom: 2,
								fontFamily: theme.typography.h3.fontFamily,
							}}>
							<Email
								sx={{
									fontSize: "2rem",
									verticalAlign: "middle",
									mr: 2,
									color: theme.palette.primary.main,
								}}
							/>
							Let's Work Together
						</Typography>

						<Typography
							variant="h6"
							sx={{
								textAlign: "center",
								color: theme.palette.text.secondary,
								marginBottom: 6,
								maxWidth: "600px",
								margin: "0 auto 3rem",
								fontFamily: theme.typography.body1.fontFamily,
							}}>
							Ready to bring your ideas to life? Let's discuss your next project
						</Typography>
					</motion.div>

					<Grid container spacing={4}>
						{/* Contact Information */}
						<Grid item xs={12} md={4}>
							<motion.div variants={itemVariants}>
								<Card
									sx={{
										height: "100%",
										background: (theme) =>
											`linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(225, 117, 100, 0.02) 100%)`,
										borderRadius: 3,
										border: "1px solid rgba(225, 117, 100, 0.1)",
										p: 3,
									}}>
									<CardContent>
										<Typography
											variant="h5"
											sx={{
												fontWeight: 600,
												mb: 3,
												color: theme.palette.text.primary,
												fontFamily: theme.typography.h6.fontFamily,
											}}>
											Contact Information
										</Typography>

										<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
											<Email
												sx={{ color: theme.palette.primary.main, mr: 2 }}
											/>
											<Box>
												<Typography variant="body2" color="text.secondary">
													Email
												</Typography>
												<Typography variant="body1" fontWeight={500}>
													nimmi24.1990@gmail.com
												</Typography>
											</Box>
										</Box>

										<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
											<LocationOn
												sx={{ color: theme.palette.secondary.main, mr: 2 }}
											/>
											<Box>
												<Typography variant="body2" color="text.secondary">
													Location
												</Typography>
												<Typography variant="body1" fontWeight={500}>
													Available Globally (Remote)
												</Typography>
											</Box>
										</Box>

										<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
											<LinkedIn
												sx={{ color: theme.palette.error.main, mr: 2 }}
											/>
											<Box>
												<Typography variant="body2" color="text.secondary">
													LinkedIn
												</Typography>
												<Typography
													variant="body1"
													fontWeight={500}
													component="a"
													href="https://www.linkedin.com/in/n-nasim"
													target="_blank"
													sx={{
														textDecoration: "none",
														color: "inherit",
														"&:hover": { color: theme.palette.error.main },
													}}>
													/in/n-nasim
												</Typography>
											</Box>
										</Box>

										<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
											<GitHub
												sx={{ color: theme.palette.primary.main, mr: 2 }}
											/>
											<Box>
												<Typography variant="body2" color="text.secondary">
													GitHub
												</Typography>
												<Typography
													variant="body1"
													fontWeight={500}
													component="a"
													href="https://github.com/nermeennasim"
													target="_blank"
													sx={{
														textDecoration: "none",
														color: "inherit",
														"&:hover": { color: theme.palette.primary.main },
													}}>
													/nermeennasim
												</Typography>
											</Box>
										</Box>

										<Box sx={{ mt: 4 }}>
											<Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
												Services I Offer
											</Typography>
											<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
												{[
													"Full-Stack Development",
													"React Applications",
													".NET Solutions",
													"Cloud Integration",
													"API Development",
												].map((service) => (
													<Chip
														key={service}
														label={service}
														size="small"
														sx={{
															backgroundColor: "rgba(225, 117, 100, 0.1)",
															color: theme.palette.warning.main,
															fontWeight: 500,
														}}
													/>
												))}
											</Box>
										</Box>
									</CardContent>
								</Card>
							</motion.div>
						</Grid>

						{/* Contact Form */}
						<Grid item xs={12} md={8}>
							<motion.div variants={itemVariants}>
								<Card
									sx={{
										background: (theme) =>
											`linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(225, 117, 100, 0.02) 100%)`,
										borderRadius: 3,
										border: "1px solid rgba(225, 117, 100, 0.1)",
										p: 4,
									}}>
									<CardContent>
										{status === "success" && (
											<Alert
												severity="success"
												icon={<CheckCircle />}
												sx={{ mb: 3 }}>
												{responseMessage}
											</Alert>
										)}

										{status === "error" && (
											<Alert severity="error" sx={{ mb: 3 }}>
												{responseMessage}
											</Alert>
										)}

										<Box component="form" onSubmit={handleSubmit}>
											<Grid container spacing={3}>
												<Grid item xs={12} sm={6}>
													<TextField
														label="Full Name"
														name="name"
														fullWidth
														required
														value={formData.name}
														onChange={handleInputChange}
														sx={{
															"& .MuiOutlinedInput-root": {
																"&:hover fieldset": {
																	borderColor: theme.palette.warning.main,
																},
																"&.Mui-focused fieldset": {
																	borderColor: theme.palette.warning.main,
																},
															},
														}}
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextField
														label="Email Address"
														name="email"
														type="email"
														fullWidth
														required
														value={formData.email}
														onChange={handleInputChange}
														sx={{
															"& .MuiOutlinedInput-root": {
																"&:hover fieldset": {
																	borderColor: theme.palette.warning.main,
																},
																"&.Mui-focused fieldset": {
																	borderColor: theme.palette.warning.main,
																},
															},
														}}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														label="Subject"
														name="subject"
														fullWidth
														required
														value={formData.subject}
														onChange={handleInputChange}
														sx={{
															"& .MuiOutlinedInput-root": {
																"&:hover fieldset": {
																	borderColor: theme.palette.warning.main,
																},
																"&.Mui-focused fieldset": {
																	borderColor: theme.palette.warning.main,
																},
															},
														}}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														label="Message"
														name="message"
														fullWidth
														multiline
														rows={6}
														required
														value={formData.message}
														onChange={handleInputChange}
														sx={{
															"& .MuiOutlinedInput-root": {
																"&:hover fieldset": {
																	borderColor: theme.palette.warning.main,
																},
																"&.Mui-focused fieldset": {
																	borderColor: theme.palette.warning.main,
																},
															},
														}}
													/>
												</Grid>
												<Grid item xs={12}>
													<Box
														sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
														<Button
															type="submit"
															variant="contained"
															startIcon={
																status === "loading" ? (
																	<CircularProgress size={20} color="inherit" />
																) : (
																	<Send />
																)
															}
															disabled={status === "loading"}
															sx={{
																backgroundColor: theme.palette.warning.main,
																fontWeight: 600,
																textTransform: "none",
																px: 4,
																py: 1.5,
																borderRadius: 2,
																"&:hover": {
																	backgroundColor: theme.palette.warning.dark,
																},
															}}>
															{status === "loading"
																? "Sending..."
																: "Send Message"}
														</Button>

														<Button
															variant="outlined"
															startIcon={<Email />}
															onClick={handleQuickContact}
															sx={{
																borderColor: theme.palette.secondary.main,
																color: theme.palette.secondary.main,
																fontWeight: 600,
																textTransform: "none",
																px: 4,
																py: 1.5,
																borderRadius: 2,
																"&:hover": {
																	borderColor: theme.palette.secondary.main,
																	backgroundColor: `${theme.palette.secondary.main}20`,
																},
															}}>
															Quick Email
														</Button>
													</Box>
												</Grid>
											</Grid>
										</Box>
									</CardContent>
								</Card>
							</motion.div>
						</Grid>
					</Grid>
				</motion.div>
			</Container>
		</Box>
	);
};

export default Contact;
