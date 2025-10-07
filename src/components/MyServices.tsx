import { useTheme } from "../hooks/useTheme";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
	Code,
	Database,
	Globe,
	Smartphone,
	Cloud,
	Settings,
} from "lucide-react";

interface Service {
	id: number;
	title: string;
	description: string;
	icon: React.ReactNode;
	skills: string[];
}

const services: Service[] = [
	{
		id: 1,
		title: "Frontend Development",
		description:
			"Creating responsive, interactive user interfaces with modern frameworks and libraries.",
		icon: <Globe size={40} />,
		skills: [
			"React",
			"TypeScript",
			"Vue.js",
			"Next.js",
			"Tailwind CSS",
			"Material-UI",
		],
	},
	{
		id: 2,
		title: "Backend Development",
		description:
			"Building robust server-side applications and APIs with scalable architectures.",
		icon: <Database size={40} />,
		skills: [
			"Node.js",
			"Python",
			"Express",
			"FastAPI",
			"PostgreSQL",
			"MongoDB",
		],
	},
	{
		id: 3,
		title: "Mobile Development",
		description:
			"Developing cross-platform mobile applications with native performance.",
		icon: <Smartphone size={40} />,
		skills: [
			"React Native",
			"Expo",
			"Flutter",
			"iOS",
			"Android",
			"Mobile UI/UX",
		],
	},
	{
		id: 4,
		title: "Cloud & DevOps",
		description:
			"Deploying and managing applications in cloud environments with CI/CD pipelines.",
		icon: <Cloud size={40} />,
		skills: [
			"AWS",
			"Docker",
			"Kubernetes",
			"GitHub Actions",
			"Terraform",
			"Monitoring",
		],
	},
	{
		id: 5,
		title: "Full-Stack Solutions",
		description:
			"End-to-end application development from concept to deployment.",
		icon: <Code size={40} />,
		skills: [
			"System Architecture",
			"Database Design",
			"API Development",
			"Performance Optimization",
		],
	},
	{
		id: 6,
		title: "Technical Consulting",
		description:
			"Providing technical guidance and code reviews to optimize development processes.",
		icon: <Settings size={40} />,
		skills: [
			"Code Review",
			"Architecture Planning",
			"Technology Selection",
			"Team Mentoring",
		],
	},
];

const MyServices = () => {
	const { theme, styles, themeMode } = useTheme();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 50, scale: 0.9 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: [0.6, -0.05, 0.01, 0.99] as const,
			},
		},
	};
	return (
		<section
			id="services"
			ref={ref}
			style={{
				minHeight: "100vh",
				padding: "80px 20px",
				backgroundColor: styles.surface,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<div style={{ maxWidth: "1200px", width: "100%" }}>
				<motion.div
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}>
					{/* Section Header */}
					<motion.div
						variants={itemVariants}
						style={{
							textAlign: "center",
							marginBottom: "60px",
						}}>
						<h2
							style={{
								fontSize: "2.5rem",
								fontWeight: "bold",
								color: styles.text,
								marginBottom: "16px",
								fontFamily: "Delius, cursive",
							}}>
							My Services
						</h2>
						<p
							style={{
								fontSize: "1.125rem",
								color: styles.textSecondary,
								maxWidth: "600px",
								margin: "0 auto",
								lineHeight: "1.6",
							}}>
							I offer comprehensive software development services to bring your
							ideas to life
						</p>
					</motion.div>

					{/* Services Grid */}
					<motion.div
						variants={containerVariants}
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
							gap: "30px",
							padding: "0 20px",
						}}>
						{services.map((service) => (
							<motion.div
								key={service.id}
								variants={itemVariants}
								whileHover={{
									y: -10,
									transition: { duration: 0.3 },
								}}
								style={{
									background: styles.background,
									padding: "32px",
									borderRadius: "16px",
									border: `1px solid ${styles.border}`,
									boxShadow:
										themeMode === "light"
											? `0 4px 20px ${(theme as any).lightShade4}`
											: "0 4px 20px rgba(0, 0, 0, 0.3)",
									transition: "all 0.3s ease",
									cursor: "pointer",
									position: "relative",
									overflow: "hidden",
								}}>
								{/* Background Pattern */}
								<div
									style={{
										position: "absolute",
										top: 0,
										right: 0,
										width: "100px",
										height: "100px",
										background: `linear-gradient(45deg, ${
											(theme as any).lightShade3
										}, ${(theme as any).lightShade4})`,
										borderRadius: "0 16px 0 100px",
										opacity: 0.1,
										zIndex: 0,
									}}
								/>

								{/* Content */}
								<div style={{ position: "relative", zIndex: 1 }}>
									{/* Icon */}
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											width: "70px",
											height: "70px",
											borderRadius: "16px",
											background: `linear-gradient(135deg, ${styles.primary}, ${styles.accent})`,
											color: "#ffffff",
											marginBottom: "24px",
											boxShadow: `0 4px 15px ${(theme as any).lightShade2}40`,
										}}>
										{service.icon}
									</div>

									{/* Title */}
									<h3
										style={{
											fontSize: "1.25rem",
											fontWeight: "bold",
											color: styles.text,
											marginBottom: "12px",
											fontFamily: "Delius, cursive",
										}}>
										{service.title}
									</h3>

									{/* Description */}
									<p
										style={{
											color: styles.textSecondary,
											lineHeight: "1.6",
											marginBottom: "20px",
											fontSize: "0.95rem",
										}}>
										{service.description}
									</p>

									{/* Skills */}
									<div
										style={{
											display: "flex",
											flexWrap: "wrap",
											gap: "8px",
										}}>
										{service.skills.map((skill, index) => (
											<span
												key={index}
												style={{
													background:
														themeMode === "light"
															? (theme as any).lightShade4
															: (theme as any).lightShade1,
													color:
														themeMode === "light" ? styles.primary : "#ffffff",
													padding: "4px 12px",
													borderRadius: "12px",
													fontSize: "0.8rem",
													fontWeight: "500",
													border: `1px solid ${(theme as any).lightShade2}`,
												}}>
												{skill}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default MyServices;
