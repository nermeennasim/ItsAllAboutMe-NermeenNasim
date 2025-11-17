import React, { useState } from "react";
import {
	Box,
	Typography,
	Button,
	Card,
	CardContent,
	Pagination,
	Chip,
	Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@mui/material/styles";
import {
	Launch,
	Article,
	Code,
	Psychology,
	Lightbulb,
	Api,
} from "@mui/icons-material";

const writings = [
	{
		title: "10 GitHub Copilot Commands That Will Rocket Your Coding in 2025",
		description:
			"Super-charge your development workflow with these essential GitHub Copilot commands and tips for maximum productivity in 2025.",
		link: "https://medium.com/@nermeennasim/10-github-copilot-commands-that-will-super-rocket-your-coding-in-2025-941c97924e9f",
		category: "Technical",
		readTime: "10 min read",
		tags: ["GitHub Copilot", "Productivity", "AI", "Development Tools"],
		icon: <Code />,
	},
	{
		title: "Front-End Interview Skills: HTML, CSS, React Challenges",
		description:
			"Boost your front-end interview preparation with bite-sized coding challenges covering HTML, CSS, and React fundamentals.",
		link: "https://medium.com/@nermeennasim/boost-your-front-end-interview-skills-with-these-bite-sized-html-css-react-challenges-a1ddb7c9ba82",
		category: "Technical",
		readTime: "8 min read",
		tags: ["HTML", "CSS", "React", "Interview Prep"],
		icon: <Code />,
	},
	{
		title: "Email APIs in 2025: SendGrid vs Resend vs AWS SES",
		description:
			"A comprehensive developer's journey comparing modern email APIs - features, pricing, and implementation strategies.",
		link: "https://medium.com/@nermeennasim/email-apis-in-2025-sendgrid-vs-resend-vs-aws-ses-a-developers-journey-8db7b5545233",
		category: "Technical",
		readTime: "12 min read",
		tags: ["APIs", "Email", "SendGrid", "AWS SES"],
		icon: <Api />,
	},
	{
		title: "Next.js and Clean Architecture for Scalable Web Apps",
		description:
			"Discover why Next.js combined with clean architecture principles creates maintainable and scalable modern web applications.",
		link: "https://medium.com/@nermeennasim/why-next-js-and-clean-architecture-matter-for-scalable-web-apps-346e669abcfc",
		category: "Architecture",
		readTime: "10 min read",
		tags: ["Next.js", "Clean Architecture", "Scalability"],
		icon: <Lightbulb />,
	},
	{
		title: "REST API Design: Best Practices and Implementation",
		description:
			"Master REST API design, implementation, and testing with industry best practices and real-world examples.",
		link: "https://medium.com/@nermeennasim/best-practices-for-rest-api-design-implementation-and-testing-7a0d87e5b0f9",
		category: "Technical",
		readTime: "15 min read",
		tags: ["REST API", "Backend", "Testing", "Best Practices"],
		icon: <Api />,
	},
	{
		title: "16 Personality Types: The Personality Transformation I Never Saw Coming",
		description:
			"A personal journey through the 16 personality types from ISTJ to ESFP, exploring the unexpected transformation and insights gained along the way.",
		link: "https://medium.com/@nermeennasim/16-personality-types-from-istj-to-esfp-the-personality-transformation-i-never-saw-coming-c091a09025b6",
		category: "Personal Development",
		readTime: "9 min read",
		tags: ["Personality", "MBTI", "Self-Discovery", "Personal Growth"],
		icon: <Psychology />,
	},
	{
		title: "Unlock the Secret Power of Your Mind",
		description:
			'Transform your life forever with insights from "The Power of Your Subconscious Mind" - a comprehensive book review and life application guide.',
		link: "https://medium.com/@nermeennasim/unlock-the-secret-power-of-your-mind-how-this-book-can-transform-your-life-forever-806685217591",
		category: "Personal Development",
		readTime: "7 min read",
		tags: ["Psychology", "Self-Development", "Book Review"],
		icon: <Psychology />,
	},
	{
		title: "Context API vs. Reducers in React",
		description:
			"Choose the right state management approach in React by understanding the differences between Context API and Reducers.",
		link: "https://medium.com/@nimmi24.1990/context-api-vs-reducers-choosing-the-right-state-management-approach-in-react-8196fac16459",
		category: "Technical",
		readTime: "9 min read",
		tags: ["React", "State Management", "Context API"],
		icon: <Code />,
	},
	{
		title: "Managing Stress Day-to-Day",
		description:
			"Discover the power of small consistent habits to overcome daily stress and build resilience for long-term success.",
		link: "https://medium.com/@nimmi24.1990/managing-stress-day-to-day-the-power-of-small-consistent-habits-38be67600b33",
		category: "Personal Development",
		readTime: "6 min read",
		tags: ["Stress Management", "Habits", "Wellness"],
		icon: <Psychology />,
	},
	{
		title: "Essential Skills to Master in 2025",
		description:
			"Don't miss these 10 essential skills for personal and professional development in the tech industry for 2025.",
		link: "https://medium.com/@nimmi24.1990/10-essential-skills-to-master-in-2025-for-success-in-life-or-career-in-tech-3a38f047266a",
		category: "Career",
		readTime: "11 min read",
		tags: ["Career Development", "Skills", "2025 Trends"],
		icon: <Lightbulb />,
	},
	{
		title: "Momentum Matters: Transform Your Life",
		description:
			"Learn powerful goal-setting strategies to maintain momentum, transform your life, and keep moving forward.",
		link: "https://medium.com/@nimmi24.1990/momentum-matters-setting-goals-to-transform-your-life-and-keep-moving-forward-faf514275cf9",
		category: "Personal Development",
		readTime: "8 min read",
		tags: ["Goal Setting", "Motivation", "Life Transformation"],
		icon: <Psychology />,
	},
];

const Writings: React.FC = () => {
	const theme = useTheme();
	const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const articlesPerPage = 6;

	// Filter articles based on selected category
	const filteredWritings =
		selectedCategory === "All"
			? writings
			: writings.filter((writing) => writing.category === selectedCategory);

	// Calculate pagination
	const totalPages = Math.ceil(filteredWritings.length / articlesPerPage);
	const startIndex = (currentPage - 1) * articlesPerPage;
	const currentArticles = filteredWritings.slice(
		startIndex,
		startIndex + articlesPerPage
	);

	// Get unique categories
	const categories = [
		"All",
		...Array.from(new Set(writings.map((w) => w.category))),
	];

	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		setCurrentPage(1); // Reset to first page when category changes
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
			id="writings"
			sx={{
				padding: "80px 20px",
				minHeight: "100vh",
				position: "relative",
				backgroundImage: `
					linear-gradient(rgba(9, 18, 44, 0.85), rgba(9, 18, 44, 0.85)),
					url('https://t3.ftcdn.net/jpg/02/18/02/54/360_F_218025408_vAqShwhdxe2wU9WF9YjEYg62sbCQEGMz.jpg')
				`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(225, 117, 100, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(190, 49, 68, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(135, 35, 65, 0.1) 0%, transparent 50%)
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
								fontFamily: '"Poppins", sans-serif',
							}}>
							<Article
								sx={{
									fontSize: "2rem",
									verticalAlign: "middle",
									mr: 2,
									color: theme.palette.warning.main,
								}}
							/>
							My Writings & Insights
						</Typography>

						<Typography
							variant="h6"
							sx={{
								textAlign: "center",
								color: theme.palette.text.secondary,
								marginBottom: 4,
								maxWidth: "600px",
								margin: "0 auto 2rem",
								fontFamily: '"Inter", sans-serif',
							}}>
							Exploring technology, personal development, and software
							engineering insights
						</Typography>
					</motion.div>

					{/* Category Filter */}
					<motion.div variants={itemVariants}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								mb: 4,
								flexWrap: "wrap",
								gap: 1,
							}}>
							{categories.map((category) => (
								<Chip
									key={category}
									label={category}
									onClick={() => handleCategoryChange(category)}
									sx={{
										backgroundColor:
											selectedCategory === category
												? "#E17564"
												: "rgba(225, 117, 100, 0.1)",
										color: selectedCategory === category ? "white" : "#E17564",
										border: "1px solid rgba(225, 117, 100, 0.3)",
										fontWeight: 600,
										"&:hover": {
											backgroundColor:
												selectedCategory === category
													? "#d85246"
													: "rgba(225, 117, 100, 0.2)",
										},
										transition: "all 0.3s ease",
									}}
								/>
							))}
						</Box>
					</motion.div>

					{/* Articles Grid */}
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
						{currentArticles.map((writing) => (
							<motion.div
								key={`${writing.title}-${currentPage}`}
								variants={itemVariants}
								whileHover={{ y: -8, transition: { duration: 0.3 } }}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
										backgroundColor: theme.palette.background.paper,
										borderRadius: 3,
										border: "1px solid rgba(225, 117, 100, 0.1)",
										transition: "all 0.3s ease",
										"&:hover": {
											boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
											borderColor: theme.palette.warning.main,
										},
									}}>
									<CardContent sx={{ flexGrow: 1, p: 3 }}>
										<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
											<Box sx={{ color: theme.palette.warning.main, mr: 1 }}>
												{writing.icon}
											</Box>
											<Chip
												label={writing.category}
												size="small"
												sx={{
													backgroundColor: "rgba(190, 49, 68, 0.1)",
													color: theme.palette.secondary.main,
													fontSize: "0.7rem",
												}}
											/>
											<Typography
												variant="caption"
												sx={{
													ml: "auto",
													color: theme.palette.text.secondary,
													fontWeight: 500,
												}}>
												{writing.readTime}
											</Typography>
										</Box>

										<Typography
											variant="h6"
											component="div"
											sx={{
												color: theme.palette.text.primary,
												fontWeight: 600,
												marginBottom: 2,
												fontFamily: '"Inter", sans-serif',
												lineHeight: 1.3,
											}}>
											{writing.title}
										</Typography>

										<Typography
											variant="body2"
											sx={{
												color: theme.palette.text.secondary,
												marginBottom: 2,
												lineHeight: 1.6,
											}}>
											{writing.description}
										</Typography>

										<Stack
											direction="row"
											spacing={0.5}
											flexWrap="wrap"
											gap={0.5}>
											{writing.tags.slice(0, 3).map((tag, tagIndex) => (
												<Chip
													key={tagIndex}
													label={tag}
													size="small"
													sx={{
														backgroundColor: "rgba(135, 35, 65, 0.1)",
														color: theme.palette.error.main,
														border: "1px solid rgba(135, 35, 65, 0.2)",
														fontWeight: 500,
														fontSize: "0.7rem",
													}}
												/>
											))}
										</Stack>
									</CardContent>

									<Box sx={{ p: 3, pt: 0 }}>
										<Button
											variant="contained"
											fullWidth
											startIcon={<Launch />}
											href={writing.link}
											target="_blank"
											rel="noopener noreferrer"
											sx={{
												backgroundColor: theme.palette.warning.main,
												color: "white",
												fontWeight: 600,
												textTransform: "none",
												borderRadius: 2,
												"&:hover": {
													backgroundColor: theme.palette.warning.dark,
													transform: "translateY(-1px)",
												},
												transition: "all 0.3s ease",
											}}>
											Read on Medium
										</Button>
									</Box>
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
												backgroundColor: theme.palette.warning.main,
												color: "white",
												"&:hover": {
													backgroundColor: theme.palette.warning.dark,
												},
											},
											"&:hover": {
												backgroundColor: `${theme.palette.warning.main}20`,
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

export default Writings;
