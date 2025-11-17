import { Box, Typography, Button, Container, Stack, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import profileImage from "../assets/profile.jpg";
import "../assets/styles/imageProtection.css";

const Hero = () => {
	const theme = useTheme();

	const scrollToPortfolio = () => {
		document
			.getElementById("portfolio")
			?.scrollIntoView({ behavior: "smooth" });
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.2, delayChildren: 0.3 },
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

	const imageVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.8 },
		},
	};

	return (
		//put url in bg /backgroundcustom.png
		<Box
			id="hero"
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "relative",
				backgroundImage: "url(/backgroundcustom.png)",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
				overflow: "hidden",
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background:
						theme.palette.mode === "light"
							? "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(246, 222, 216, 0.90) 100%)"
							: "linear-gradient(135deg, rgba(9, 18, 44, 0.85) 0%, rgba(26, 36, 65, 0.90) 100%)",
					pointerEvents: "none",
					zIndex: 0,
				},
				"&::after": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage:
						theme.palette.mode === "light"
							? `radial-gradient(circle at 20% 50%, rgba(225, 117, 100, 0.12) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(190, 49, 68, 0.12) 0%, transparent 50%),
               radial-gradient(circle at 40% 80%, rgba(135, 35, 65, 0.12) 0%, transparent 50%)`
							: `radial-gradient(circle at 20% 50%, rgba(225, 117, 100, 0.20) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(190, 49, 68, 0.20) 0%, transparent 50%),
               radial-gradient(circle at 40% 80%, rgba(135, 35, 65, 0.20) 0%, transparent 50%)`,
					pointerEvents: "none",
					zIndex: 0,
				},
			}}>
			<Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible">
					<Grid container spacing={6} alignItems="center">
						{/* Text Content - Left Side */}
						<Grid item xs={12} md={6}>
							<Box>
								<motion.div variants={itemVariants}>
									<Typography
										variant="h3"
										sx={{
											color: theme.palette.text.primary,
											fontWeight: 400,
											mb: 3,
											fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
											fontFamily: '"Delius Swash Caps", cursive',
											lineHeight: 1.3,
										}}>
										About Me
									</Typography>
								</motion.div>

								<motion.div variants={itemVariants}>
									<Typography
										variant="h6"
										sx={{
											color: theme.palette.text.secondary,
											mb: 4,
											lineHeight: 1.8,
											fontSize: { xs: "1rem", md: "1.15rem" },
											fontFamily: '"Delius", sans-serif',
										}}>
										My name is Nermeen Nasim. I am a Software Engineer and
										Founder of Blue Sprout Agency. Beyond the code, I'm a deep
										thinker and writer, sharing perspectives on life,
										positivity, and productivity. A software engineer with a
										human touch. Let's Connect!
									</Typography>
								</motion.div>

								<motion.div variants={itemVariants}>
									<Stack
										direction={{ xs: "column", sm: "row" }}
										spacing={2}
										sx={{ mb: 3 }}>
										<Button
											variant="contained"
											size="large"
											startIcon={<LinkedInIcon />}
											href="https://www.linkedin.com/in/n-nasim"
											target="_blank"
											sx={{
												background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
												color: "#ffffff",
												px: 3,
												py: 1.5,
												fontSize: "1rem",
												fontWeight: 600,
												borderRadius: 3,
												boxShadow:
													theme.palette.mode === "light"
														? "0 8px 24px rgba(190, 49, 68, 0.25)"
														: "0 8px 24px rgba(225, 117, 100, 0.25)",
												"&:hover": {
													background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
													transform: "translateY(-2px)",
													boxShadow:
														theme.palette.mode === "light"
															? "0 12px 32px rgba(190, 49, 68, 0.35)"
															: "0 12px 32px rgba(225, 117, 100, 0.35)",
												},
												transition: "all 0.3s ease",
											}}>
											LinkedIn
										</Button>

										<Button
											variant="outlined"
											size="large"
											startIcon={<GitHubIcon />}
											href="https://github.com/nermeennasim"
											target="_blank"
											sx={{
												borderColor: theme.palette.secondary.main,
												color: theme.palette.secondary.main,
												borderWidth: 2,
												px: 3,
												py: 1.5,
												fontSize: "1rem",
												fontWeight: 600,
												borderRadius: 3,
												"&:hover": {
													borderColor: theme.palette.secondary.dark,
													borderWidth: 2,
													backgroundColor: `${theme.palette.secondary.main}15`,
													transform: "translateY(-2px)",
												},
												transition: "all 0.3s ease",
											}}>
											GitHub
										</Button>

										<Button
											variant="outlined"
											size="large"
											startIcon={<EmailIcon />}
											href="mailto:nimmi24.1990@gmail.com"
											sx={{
												borderColor: theme.palette.warning.main,
												color: theme.palette.warning.main,
												borderWidth: 2,
												px: 3,
												py: 1.5,
												fontSize: "1rem",
												fontWeight: 600,
												borderRadius: 3,
												"&:hover": {
													borderColor: theme.palette.warning.dark,
													borderWidth: 2,
													backgroundColor: `${theme.palette.warning.main}15`,
													transform: "translateY(-2px)",
												},
												transition: "all 0.3s ease",
											}}>
											Email
										</Button>
									</Stack>
								</motion.div>

							{/* Resume Download Button */}
							<motion.div variants={itemVariants}>
								<Button
									variant="contained"
									size="large"
									startIcon={<DownloadIcon />}
									href="https://docs.google.com/document/d/1WGkUcK-H7RQxPKs2nwUs_8CVfnyEN65PGoqQJB2xRcQ/edit?usp=sharing"
									target="_blank"
									rel="noopener noreferrer"
									sx={{
										background:
											theme.palette.mode === "light"
												? `linear-gradient(135deg, ${theme.palette.success.main}, #059669)`
												: `linear-gradient(135deg, ${theme.palette.success.main}, #6ee7b7)`,
										color: "#ffffff",
										px: 4,
										py: 1.5,
										fontSize: "1rem",
										fontWeight: 600,
										borderRadius: 3,
										mb: 4,
										boxShadow: "0 8px 24px rgba(16, 185, 129, 0.25)",
										"&:hover": {
											background:
												theme.palette.mode === "light"
													? `linear-gradient(135deg, #059669, #047857)`
													: `linear-gradient(135deg, #6ee7b7, ${theme.palette.success.main})`,
											transform: "translateY(-2px)",
											boxShadow: "0 12px 32px rgba(16, 185, 129, 0.35)",
										},
										transition: "all 0.3s ease",
									}}>
									Download My Resume
								</Button>
							</motion.div>								<motion.div
									variants={itemVariants}
									animate={{ y: [0, 10, 0] }}
									transition={{
										duration: 2,
										repeat: Infinity,
										// ease: "easeInOut",
									}}>
									<Button
										onClick={scrollToPortfolio}
										sx={{
											color: theme.palette.text.secondary,
											display: "flex",
											alignItems: "center",
											gap: 0.5,
											fontFamily: '"Delius", sans-serif',
											"&:hover": {
												backgroundColor: "transparent",
												color: theme.palette.primary.main,
											},
										}}>
										<Typography variant="body2" sx={{ fontWeight: 500 }}>
											Explore My Work
										</Typography>
										<ArrowDownwardIcon />
									</Button>
								</motion.div>
							</Box>
						</Grid>

						{/* Profile Image - Right Side */}
						<Grid item xs={12} md={6}>
							<motion.div
								variants={imageVariants}
								onContextMenu={(e) => e.preventDefault()} // Disable right-click on entire section
								onDragStart={(e) => e.preventDefault()} // Disable drag on entire section
								className="protected-container no-right-click">
								<Box
									className="protected-container"
									sx={{
										position: "relative",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										userSelect: "none",
										WebkitUserSelect: "none",
										MozUserSelect: "none",
										msUserSelect: "none",
									}}>
									{/* Decorative Background Circle */}
									<Box
										sx={{
											position: "absolute",
											width: { xs: "280px", md: "400px" },
											height: { xs: "280px", md: "400px" },
											borderRadius: "50%",
											background: `linear-gradient(135deg, ${theme.palette.primary.main}40, ${theme.palette.warning.main}40)`,
											filter: "blur(40px)",
											animation: "pulse 3s ease-in-out infinite",
											"@keyframes pulse": {
												"0%, 100%": { transform: "scale(1)" },
												"50%": { transform: "scale(1.1)" },
											},
										}}
									/>

									{/* Profile Image Container */}
									<Box
										className="protected-container no-right-click"
										onContextMenu={(e) => e.preventDefault()} // Disable right-click
										onDragStart={(e) => e.preventDefault()} // Disable drag
										onKeyDown={(e) => {
											// Disable common screenshot/save shortcuts
											if (
												(e.ctrlKey && (e.key === "s" || e.key === "S")) || // Ctrl+S
												(e.ctrlKey &&
													e.shiftKey &&
													(e.key === "s" || e.key === "S")) || // Ctrl+Shift+S
												e.key === "PrintScreen" || // Print Screen
												(e.altKey && e.key === "PrintScreen") // Alt+Print Screen
											) {
												e.preventDefault();
												e.stopPropagation();
											}
										}}
										sx={{
											position: "relative",
											width: { xs: "280px", md: "400px" },
											height: { xs: "280px", md: "400px" },
											borderRadius: "50%",
											overflow: "hidden",
											border: `6px solid ${theme.palette.background.paper}`,
											boxShadow:
												theme.palette.mode === "light"
													? "0 20px 60px rgba(9, 18, 44, 0.2)"
													: "0 20px 60px rgba(0, 0, 0, 0.5)",
											background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.warning.main})`,
											// CSS protection against screenshots
											userSelect: "none",
											WebkitUserSelect: "none",
											MozUserSelect: "none",
											msUserSelect: "none",
											// Additional protection
											"-webkit-touch-callout": "none",
											"-webkit-tap-highlight-color": "transparent",
											"&::before": {
												content: '""',
												position: "absolute",
												top: 0,
												left: 0,
												right: 0,
												bottom: 0,
												background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.warning.main}20)`,
												zIndex: 1,
												pointerEvents: "none",
											},
											// Anti-screenshot overlay (subtle)
											"&::after": {
												content: '""',
												position: "absolute",
												top: 0,
												left: 0,
												right: 0,
												bottom: 0,
												background: "transparent",
												zIndex: 2,
												pointerEvents: "auto",
											},
										}}>
										<img
											className="protected-image no-right-click"
											src={profileImage}
											alt="Nermeen Nasim - Software Engineer"
											onContextMenu={(e) => e.preventDefault()} // Additional right-click protection on image
											onDragStart={(e) => e.preventDefault()} // Additional drag protection on image
											draggable={false} // HTML5 draggable attribute
											style={
												{
													width: "100%",
													height: "100%",
													objectFit: "cover",
													position: "relative",
													zIndex: 0,
													userSelect: "none",
													WebkitUserSelect: "none",
													MozUserSelect: "none",
													msUserSelect: "none",
													pointerEvents: "none", // Prevent direct interaction with image
												} as React.CSSProperties
											}
										/>
									</Box>

									{/* Decorative Rings */}
									<Box
										sx={{
											position: "absolute",
											width: { xs: "320px", md: "460px" },
											height: { xs: "320px", md: "460px" },
											borderRadius: "50%",
											border: `2px dashed ${theme.palette.primary.main}40`,
											animation: "rotate 20s linear infinite",
											"@keyframes rotate": {
												"0%": { transform: "rotate(0deg)" },
												"100%": { transform: "rotate(360deg)" },
											},
										}}
									/>
								</Box>
							</motion.div>
						</Grid>
					</Grid>
				</motion.div>
			</Container>
		</Box>
	);
};

export default Hero;
