import {
	Box,
	Container,
	Typography,
	Stack,
	IconButton,
	Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Footer() {
	const theme = useTheme();
	const currentYear = new Date().getFullYear();

	return (
		<Box
			component="footer"
			sx={{
				py: 6,
				px: 2,
				mt: "auto",
				background:
					theme.palette.mode === "light"
						? "linear-gradient(135deg, rgb(246, 222, 216) 0%, #ffffff 100%)"
						: "linear-gradient(135deg, #1a2441 0%, #09122C 100%)",
				borderTop: `1px solid ${theme.palette.divider}`,
			}}>
			<Container maxWidth="lg">
				<Stack spacing={4} alignItems="center">
					{/* Social Links */}
					<Stack direction="row" spacing={2}>
						<IconButton
							href="https://www.linkedin.com/in/n-nasim"
							target="_blank"
							sx={{
								color: theme.palette.text.secondary,
								border: `2px solid ${theme.palette.divider}`,
								"&:hover": {
									backgroundColor: theme.palette.primary.main,
									color: "#ffffff",
									borderColor: theme.palette.primary.main,
									transform: "translateY(-3px)",
								},
								transition: "all 0.3s ease",
							}}>
							<LinkedInIcon />
						</IconButton>

						<IconButton
							href="https://github.com/nermeennasim"
							target="_blank"
							sx={{
								color: theme.palette.text.secondary,
								border: `2px solid ${theme.palette.divider}`,
								"&:hover": {
									backgroundColor: theme.palette.secondary.main,
									color: "#ffffff",
									borderColor: theme.palette.secondary.main,
									transform: "translateY(-3px)",
								},
								transition: "all 0.3s ease",
							}}>
							<GitHubIcon />
						</IconButton>

						<IconButton
							href="mailto:nimmi24.1990@gmail.com"
							sx={{
								color: theme.palette.text.secondary,
								border: `2px solid ${theme.palette.divider}`,
								"&:hover": {
									backgroundColor: theme.palette.warning.main,
									color: "#ffffff",
									borderColor: theme.palette.warning.main,
									transform: "translateY(-3px)",
								},
								transition: "all 0.3s ease",
							}}>
							<EmailIcon />
						</IconButton>
					</Stack>

					<Divider sx={{ width: "100%", maxWidth: "400px" }} />

					{/* Copyright */}
					<Typography
						variant="body2"
						color="text.secondary"
						align="center"
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 0.5,
							fontWeight: 500,
						}}>
						© {currentYear} Nermeen Nasim. Made with{" "}
						<FavoriteIcon
							sx={{ fontSize: "1rem", color: theme.palette.error.main }}
						/>{" "}
						and React
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
}

export default Footer;
