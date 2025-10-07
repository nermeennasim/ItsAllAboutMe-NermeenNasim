import { createTheme } from "@mui/material/styles";

export const createMUITheme = (mode: "light" | "dark") => {
	const isLight = mode === "light";

	return createTheme({
		palette: {
			mode,
			primary: {
				main: isLight ? "#09122C" : "#E17564",
				light: isLight ? "#1a2441" : "#f08574",
				dark: isLight ? "#000000" : "#d85246",
				contrastText: "#ffffff",
			},
			secondary: {
				main: "#BE3144",
				light: "#d85056",
				dark: "#a02030",
				contrastText: "#ffffff",
			},
			error: {
				main: "#872341",
				light: "#a03555",
				dark: "#6e1a35",
				contrastText: "#ffffff",
			},
			warning: {
				main: "#E17564",
				light: "#f08574",
				dark: "#d85246",
				contrastText: "#ffffff",
			},
			success: {
				main: isLight ? "#10b981" : "#34d399",
				contrastText: "#ffffff",
			},
			background: {
				default: isLight ? "#ffffff" : "#09122C",
				paper: isLight ? "rgb(246, 222, 216)" : "#1a2441",
			},
			text: {
				primary: isLight ? "#09122C" : "#ffffff",
				secondary: isLight ? "#872341" : "#E17564",
			},
			divider: isLight ? "rgb(242, 178, 140)" : "#872341",
		},
		typography: {
			fontFamily: '"Poppins", "Inter", "Delius", sans-serif',
			h3: {
				fontFamily: '"Poppins", sans-serif',
				fontWeight: 700,
			},
			h5: {
				fontFamily: '"Poppins", sans-serif',
				fontWeight: 600,
			},
			h6: {
				fontFamily: '"Inter", sans-serif',
				fontWeight: 600,
			},
			body1: {
				fontFamily: '"Inter", sans-serif',
				lineHeight: 1.6,
			},
		},
		shape: {
			borderRadius: 12,
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
						fontWeight: 600,
						borderRadius: "8px",
						padding: "10px 24px",
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: "16px",
						boxShadow: isLight
							? "0 4px 20px rgba(184, 33, 50, 0.08)"
							: "0 4px 20px rgba(0, 0, 0, 0.3)",
					},
				},
			},
		},
	});
};
