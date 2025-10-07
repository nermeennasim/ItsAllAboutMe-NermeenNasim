import React, { useState, useEffect } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Button,
	useTheme,
	useMediaQuery,
	Divider,
	Tooltip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import ArticleIcon from "@mui/icons-material/Article";
import EmailIcon from "@mui/icons-material/Email";

interface NavbarProps {
	toggleTheme: () => void;
	currentTheme: "light" | "dark";
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, currentTheme }) => {
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState("hero");
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const navigationItems = [
		{ label: "Home", id: "hero", icon: <HomeIcon /> },
		{ label: "Portfolio", id: "portfolio", icon: <WorkIcon /> },
		{ label: "Skills", id: "services", icon: <CodeIcon /> },
		{ label: "Writings", id: "writings", icon: <ArticleIcon /> },
		{ label: "Contact", id: "contact", icon: <EmailIcon /> },
	];

	// Track scroll position for navbar background
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Track active section based on scroll position
	useEffect(() => {
		const handleScroll = () => {
			const sections = navigationItems.map((item) => item.id);
			const scrollPosition = window.scrollY + 100;

			for (const sectionId of sections) {
				const section = document.getElementById(sectionId);
				if (section) {
					const { offsetTop, offsetHeight } = section;
					if (
						scrollPosition >= offsetTop &&
						scrollPosition < offsetTop + offsetHeight
					) {
						setActiveSection(sectionId);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const scrollTo = (elementId: string) => {
		const element = document.getElementById(elementId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
		setMobileOpen(false);
	};

	return (
		<>
			<AppBar
				position="fixed"
				elevation={scrolled ? 4 : 0}
				sx={{
					background:
						currentTheme === "light"
							? scrolled
								? "rgba(255, 255, 255, 0.98)"
								: "rgba(255, 255, 255, 0.85)"
							: scrolled
							? "rgba(9, 18, 44, 0.98)"
							: "rgba(9, 18, 44, 0.85)",
					backdropFilter: "blur(12px)",
					borderBottom: scrolled
						? `2px solid ${theme.palette.primary.main}40`
						: `1px solid ${theme.palette.divider}30`,
					transition: "all 0.3s ease",
					boxShadow: scrolled
						? currentTheme === "light"
							? "0 4px 20px rgba(9, 18, 44, 0.08)"
							: "0 4px 20px rgba(0, 0, 0, 0.3)"
						: "none",
				}}>
				<Toolbar
					sx={{
						justifyContent: "space-between",
						px: { xs: 2, md: 4 },
						py: 1,
					}}>
					{/* Logo/Brand */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}>
						<Box
							onClick={() => scrollTo("hero")}
							sx={{
								display: "flex",
								alignItems: "center",
								cursor: "pointer",
								gap: 1.5,
							}}>
							<Box
								sx={{
									width: 40,
									height: 40,
									borderRadius: "10px",
									background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.warning.main})`,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontWeight: 700,
									fontSize: "1.2rem",
									color: "#ffffff",
									boxShadow:
										currentTheme === "light"
											? "0 4px 12px rgba(190, 49, 68, 0.25)"
											: "0 4px 12px rgba(225, 117, 100, 0.25)",
									transition: "transform 0.3s ease",
									"&:hover": {
										transform: "scale(1.05) rotate(-5deg)",
									},
								}}>
								N
							</Box>
							<Typography
								variant="h6"
								sx={{
									color: theme.palette.text.primary,
									fontWeight: 700,
									fontSize: { xs: "1.1rem", md: "1.3rem" },
									fontFamily: '"Poppins", sans-serif',
									background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.warning.main})`,
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									backgroundClip: "text",
									transition: "all 0.3s ease",
									"&:hover": {
										opacity: 0.8,
									},
								}}>
								Nermeen Nasim
							</Typography>
						</Box>
					</motion.div>

					{/* Desktop Navigation */}
					{!isMobile && (
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							{navigationItems.map((item, index) => (
								<motion.div
									key={item.id}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}>
									<Button
										onClick={() => scrollTo(item.id)}
										sx={{
											color:
												activeSection === item.id
													? theme.palette.primary.main
													: theme.palette.text.primary,
											fontWeight: activeSection === item.id ? 600 : 500,
											px: 2.5,
											py: 1,
											borderRadius: 2,
											position: "relative",
											fontSize: "0.95rem",
											"&:hover": {
												backgroundColor: `${theme.palette.primary.main}15`,
												color: theme.palette.primary.main,
											},
											transition: "all 0.3s ease",
											"&::after": {
												content: '""',
												position: "absolute",
												bottom: 6,
												left: "50%",
												transform: "translateX(-50%)",
												width: activeSection === item.id ? "60%" : "0%",
												height: "3px",
												borderRadius: "2px",
												background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.warning.main})`,
												transition: "width 0.3s ease",
											},
										}}>
										{item.label}
									</Button>
								</motion.div>
							))}

							{/* Theme Toggle */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: 0.6 }}>
								<Tooltip
									title={
										currentTheme === "light"
											? "Switch to Dark Mode"
											: "Switch to Light Mode"
									}
									arrow>
									<IconButton
										onClick={toggleTheme}
										sx={{
											ml: 1,
											color: theme.palette.text.primary,
											border: `2px solid ${theme.palette.divider}`,
											width: 42,
											height: 42,
											"&:hover": {
												backgroundColor: `${theme.palette.primary.main}15`,
												borderColor: theme.palette.primary.main,
												transform: "rotate(180deg)",
											},
											transition: "all 0.5s ease",
										}}>
										<AnimatePresence mode="wait">
											{currentTheme === "light" ? (
												<motion.div
													key="dark"
													initial={{ rotate: -180, opacity: 0 }}
													animate={{ rotate: 0, opacity: 1 }}
													exit={{ rotate: 180, opacity: 0 }}
													transition={{ duration: 0.3 }}>
													<DarkModeIcon />
												</motion.div>
											) : (
												<motion.div
													key="light"
													initial={{ rotate: -180, opacity: 0 }}
													animate={{ rotate: 0, opacity: 1 }}
													exit={{ rotate: 180, opacity: 0 }}
													transition={{ duration: 0.3 }}>
													<LightModeIcon />
												</motion.div>
											)}
										</AnimatePresence>
									</IconButton>
								</Tooltip>
							</motion.div>
						</Box>
					)}

					{/* Mobile Menu Button */}
					{isMobile && (
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<IconButton
								onClick={toggleTheme}
								sx={{
									color: theme.palette.text.primary,
									border: `2px solid ${theme.palette.divider}`,
									"&:hover": {
										backgroundColor: `${theme.palette.primary.main}15`,
										borderColor: theme.palette.primary.main,
									},
								}}>
								{currentTheme === "light" ? (
									<DarkModeIcon />
								) : (
									<LightModeIcon />
								)}
							</IconButton>
							<IconButton
								onClick={handleDrawerToggle}
								sx={{
									color: theme.palette.text.primary,
									border: `2px solid ${theme.palette.divider}`,
									"&:hover": {
										backgroundColor: `${theme.palette.primary.main}15`,
										borderColor: theme.palette.primary.main,
									},
								}}>
								<MenuIcon />
							</IconButton>
						</Box>
					)}
				</Toolbar>
			</AppBar>

			{/* Mobile Drawer */}
			<Drawer
				anchor="right"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				sx={{
					"& .MuiDrawer-paper": {
						width: 280,
						backgroundColor: theme.palette.background.paper,
						backgroundImage:
							currentTheme === "light"
								? "linear-gradient(135deg, #ffffff 0%, rgb(246, 222, 216) 100%)"
								: "linear-gradient(135deg, #1a2441 0%, #09122C 100%)",
					},
				}}>
				<Box
					sx={{
						p: 3,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						borderBottom: `2px solid ${theme.palette.divider}`,
					}}>
					<Typography
						variant="h6"
						sx={{
							color: theme.palette.text.primary,
							fontWeight: 700,
							fontFamily: '"Poppins", sans-serif',
						}}>
						Navigation
					</Typography>
					<IconButton
						onClick={handleDrawerToggle}
						sx={{
							color: theme.palette.text.primary,
							"&:hover": {
								backgroundColor: `${theme.palette.error.main}15`,
								color: theme.palette.error.main,
							},
						}}>
						<CloseIcon />
					</IconButton>
				</Box>

				<List sx={{ px: 2, py: 3 }}>
					{navigationItems.map((item, index) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}>
							<ListItem disablePadding sx={{ mb: 1 }}>
								<ListItemButton
									onClick={() => scrollTo(item.id)}
									sx={{
										borderRadius: 2,
										py: 1.5,
										backgroundColor:
											activeSection === item.id
												? `${theme.palette.primary.main}15`
												: "transparent",
										borderLeft:
											activeSection === item.id
												? `4px solid ${theme.palette.primary.main}`
												: "4px solid transparent",
										"&:hover": {
											backgroundColor: `${theme.palette.primary.main}20`,
											borderLeft: `4px solid ${theme.palette.primary.main}`,
										},
										transition: "all 0.3s ease",
									}}>
									<Box
										sx={{
											color:
												activeSection === item.id
													? theme.palette.primary.main
													: theme.palette.text.secondary,
											mr: 2,
											display: "flex",
											alignItems: "center",
										}}>
										{item.icon}
									</Box>
									<ListItemText
										primary={item.label}
										sx={{
											"& .MuiTypography-root": {
												color:
													activeSection === item.id
														? theme.palette.primary.main
														: theme.palette.text.primary,
												fontWeight: activeSection === item.id ? 600 : 500,
											},
										}}
									/>
								</ListItemButton>
							</ListItem>
						</motion.div>
					))}
				</List>

				<Divider sx={{ mx: 2 }} />

				<Box sx={{ p: 3, textAlign: "center" }}>
					<Typography
						variant="caption"
						sx={{
							color: theme.palette.text.secondary,
							display: "block",
							mb: 1,
						}}>
						© 2025 Nermeen Nasim
					</Typography>
					<Typography
						variant="caption"
						sx={{
							color: theme.palette.text.secondary,
							fontSize: "0.7rem",
						}}>
						Software Engineer & Technical Writer
					</Typography>
				</Box>
			</Drawer>
		</>
	);
};

export default Navbar;
