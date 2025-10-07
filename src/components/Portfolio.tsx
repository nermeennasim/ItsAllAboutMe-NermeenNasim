import React, { useState } from "react";
import {
	Box,
	Typography,
	Button,
	Card,
	CardContent,
	CardActions,
	Chip,
	Stack,
	Pagination,
} from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@mui/material/styles";
import { Launch, Code, Work } from "@mui/icons-material";

const projects = [
	{
		name: "Webhooks Parsing Mechanism",
		description:
			"Advanced webhooks integration system for Xytech v10.4+ enabling external systems to initiate workflows based on trigger events. Features outbound connections, export adaptors, and dynamic JSON/XML payload generation with real-time event processing.",
		liveLink: "https://knowledgebase.fabricdata.com/xytech/webhooks",
		sourceCode: "PROPRIETARY",
		tags: [
			"Webhooks",
			"API Integration",
			"JSON/XML",
			"Event Processing",
			"Xytech",
		],
	},
	{
		name: "Event Trigger Response Parsing",
		description:
			"Sophisticated response parsing and storing mechanism for Xytech webhooks system. Handles JSON/XML response parsing with XPATH syntax, field mapping, and automatic data type validation. Stores external system IDs and response values back into originating documents.",
		liveLink:
			"https://knowledgebase.fabricdata.com/xytech/webhooks/event-trigger",
		sourceCode: "PROPRIETARY",
		tags: [
			"C#",
			"Response Parsing",
			"JSON/XML",
			"XPATH",
			"Data Storage",
			"Xytech",
		],
	},
	{
		name: "Visualizer",
		description:
			"Enterprise data visualization platform with advanced React Flow architecture. Interactive diagrams and flowcharts for complex system workflows, featuring real-time data binding and responsive design for enterprise applications.",
		liveLink: "https://knowledgebase.fabricdata.com/xytech/webhooks",
		sourceCode: "PROPRIETARY",
		tags: ["React Flow", "Data Visualization", "Enterprise", "Interactive UI"],
	},
	{
		name: "Media Pulse",
		description:
			"Comprehensive media management system with enhanced migration capabilities from ScheduAll. Microservices architecture with advanced workflow automation, resource scheduling, and media asset management for broadcasting industry.",
		liveLink:
			"https://xytechsystems-2.wistia.com/medias/r0607q3j5n?_hsenc=p2ANqtz-8YJVFqeBdUUwqKpi-Vy6ilhVdUsgte782LynkzczRyZIZmEztLZ9IrK_P3em4hhRxx7i6v",
		sourceCode: "PROPRIETARY",
		tags: [
			"Media Management",
			"Microservices",
			".NET Core",
			"Broadcasting",
			"Workflow",
		],
	},
	{
		name: "Blue Sprout Agency",
		description:
			"Multi-tenant web platform built with Next.js, TypeScript, and AWS. Scalable solution for custom client websites with mobile-first responsive design and automated CI/CD pipeline.",
		liveLink: "https://bluesproutagency.com",
		sourceCode: "PROPRIETARY",
		tags: ["Next.js", "TypeScript", "AWS", "React"],
	},
	{
		name: "Canada Cloud Solution",
		description:
			"Cloud infrastructure and consulting platform providing enterprise-level cloud solutions and DevOps services for Canadian businesses.",
		liveLink: "https://canadacloudsolution.ca",
		sourceCode: "PROPRIETARY",
		tags: ["Cloud", "DevOps", "Enterprise"],
	},
	{
		name: "Black Tie Events",
		description:
			"Professional event management platform with integrated admin portal for testimonials and bookings, streamlined onboarding process for event coordinators.",
		liveLink: "https://blktieevents.com",
		sourceCode: "PROPRIETARY",
		tags: ["Events", "Admin Portal", "Booking System"],
	},
	{
		name: "Feedback Management System",
		description:
			"Interactive React application for managing user feedback with CRUD operations, rating calculations, and data visualization components. Features real-time feedback processing and analytics dashboard.",
		liveLink: "https://delightful-tartufo-a0e436.netlify.app/",
		sourceCode: "https://github.com/nermeennasim/feedback-app-2",
		tags: ["React", "CRUD", "Data Visualization", "Analytics"],
	},
	{
		name: "Age Calculator",
		description:
			"Simple and intuitive age calculator application built with modern web technologies. Calculates precise age in years, months, and days with a clean, responsive user interface.",
		liveLink: "https://nermeennasim-agecalculator-io.vercel.app/",
		sourceCode:
			"https://github.com/nermeennasim/nermeennasim.age-calculator-responsive.io-",
		tags: ["JavaScript", "HTML5", "CSS3", "Responsive Design"],
	},
];

const Portfolio: React.FC = () => {
	const theme = useTheme();
	const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
	const [currentPage, setCurrentPage] = useState(1);
	const projectsPerPage = 6;

	// Calculate pagination
	const totalPages = Math.ceil(projects.length / projectsPerPage);
	const startIndex = (currentPage - 1) * projectsPerPage;
	const currentProjects = projects.slice(
		startIndex,
		startIndex + projectsPerPage
	);

	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
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
			id="portfolio"
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
						radial-gradient(circle at 70% 30%, rgba(190, 49, 68, 0.1) 0%, transparent 50%),
						radial-gradient(circle at 30% 70%, rgba(225, 117, 100, 0.1) 0%, transparent 50%),
						radial-gradient(circle at 50% 10%, rgba(135, 35, 65, 0.1) 0%, transparent 50%)
					`,
					pointerEvents: "none",
					zIndex: 1,
				},
			}}>
			<Box
				sx={{
					position: "relative",
					zIndex: 2,
					maxWidth: "1200px",
					margin: "0 auto",
				}}>
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
							<Work
								sx={{
									fontSize: "2rem",
									verticalAlign: "middle",
									mr: 2,
									color: theme.palette.primary.main,
								}}
							/>
							Featured Projects
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
							Enterprise solutions and innovative applications built with modern
							technologies
						</Typography>
					</motion.div>

					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr",
								md: "repeat(2, 1fr)",
								lg: "repeat(3, 1fr)",
							},
							gap: 4,
							marginBottom: 6,
						}}>
						{currentProjects.map((project, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								whileHover={{ y: -8, transition: { duration: 0.3 } }}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
										backgroundColor: theme.palette.background.paper,
										borderRadius: 3,
										border: `1px solid ${theme.palette.primary.main}20`,
										transition: "all 0.3s ease",
										"&:hover": {
											boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
											borderColor: theme.palette.primary.main,
										},
									}}>
									<CardContent sx={{ flexGrow: 1, p: 3 }}>
										<Typography
											variant="h5"
											component="div"
											sx={{
												color: theme.palette.text.primary,
												fontWeight: 600,
												marginBottom: 2,
												fontFamily: theme.typography.h5.fontFamily,
											}}>
											{project.name}
										</Typography>

										<Typography
											variant="body2"
											sx={{
												color: theme.palette.text.secondary,
												marginBottom: 2,
												lineHeight: 1.6,
											}}>
											{project.description}
										</Typography>

										<Stack
											direction="row"
											spacing={0.5}
											flexWrap="wrap"
											gap={0.5}>
											{project.tags?.map((tag, tagIndex) => (
												<Chip
													key={tagIndex}
													label={tag}
													size="small"
													sx={{
														backgroundColor: `${theme.palette.primary.main}20`,
														color: theme.palette.primary.main,
														border: `1px solid ${theme.palette.primary.main}30`,
														fontWeight: 500,
														fontSize: "0.75rem",
													}}
												/>
											))}
										</Stack>
									</CardContent>

									<CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
										<Button
											variant="contained"
											size="small"
											startIcon={<Launch />}
											href={project.liveLink}
											target="_blank"
											rel="noopener noreferrer"
											sx={{
												backgroundColor: theme.palette.primary.main,
												color: theme.palette.primary.contrastText,
												fontWeight: 600,
												textTransform: "none",
												borderRadius: 2,
												"&:hover": {
													backgroundColor: theme.palette.primary.dark,
													transform: "translateY(-1px)",
												},
												transition: "all 0.3s ease",
											}}>
											View Live
										</Button>

										{project.sourceCode !== "PROPRIETARY" &&
											project.sourceCode !== "NOT AVAILABLE" && (
												<Button
													variant="outlined"
													size="small"
													startIcon={<Code />}
													href={project.sourceCode}
													target="_blank"
													rel="noopener noreferrer"
													sx={{
														borderColor: theme.palette.secondary.main,
														color: theme.palette.secondary.main,
														fontWeight: 600,
														textTransform: "none",
														borderRadius: 2,
														"&:hover": {
															borderColor: theme.palette.secondary.main,
															backgroundColor: `${theme.palette.secondary.main}20`,
															transform: "translateY(-1px)",
														},
														transition: "all 0.3s ease",
													}}>
													Source Code
												</Button>
											)}

										{project.sourceCode === "PROPRIETARY" && (
											<Chip
												label="Proprietary"
												size="small"
												sx={{
													backgroundColor: `${theme.palette.error.main}20`,
													color: theme.palette.error.main,
													fontWeight: 500,
												}}
											/>
										)}
									</CardActions>
								</Card>
							</motion.div>
						))}
					</Box>

					{/* Pagination */}
					{totalPages > 1 && (
						<motion.div variants={itemVariants}>
							<Box sx={{ display: "flex", justifyContent: "center" }}>
								<Pagination
									count={totalPages}
									page={currentPage}
									onChange={handlePageChange}
									color="primary"
									size="large"
									sx={{
										"& .MuiPaginationItem-root": {
											color: theme.palette.text.primary,
											fontWeight: 600,
											"&.Mui-selected": {
												backgroundColor: theme.palette.primary.main,
												color: theme.palette.primary.contrastText,
												"&:hover": {
													backgroundColor: theme.palette.primary.dark,
												},
											},
											"&:hover": {
												backgroundColor: `${theme.palette.primary.main}20`,
											},
										},
									}}
								/>
							</Box>
						</motion.div>
					)}
				</motion.div>
			</Box>
		</Box>
	);
};

export default Portfolio;
