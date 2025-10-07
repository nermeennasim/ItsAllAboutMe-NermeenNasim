import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Theme configuration for portfolio - using your chosen palette
// Main colors: #09122C (dark navy) #872341 (deep burgundy) #BE3144 (red) #E17564 (coral)
// Light shades: rgb(184, 33, 50) rgb(210, 102, 90) rgb(242, 178, 140) rgb(246, 222, 216)
const themeConfig = {
	light: {
		// Light theme colors - your portfolio brand colors
		primary: "#09122C", // Dark navy - main brand color
		secondary: "#BE3144", // Red - secondary brand color
		background: "#ffffff", // Clean white
		surface: "rgb(246, 222, 216)", // Light peachy surface from your light shades
		text: "#09122C", // Dark navy text
		textSecondary: "#872341", // Deep burgundy secondary text
		border: "rgb(242, 178, 140)", // Light coral border from your shades
		accent: "#E17564", // Coral accent
		success: "#10b981", // Green
		warning: "#BE3144", // Red warning
		error: "#872341", // Deep burgundy error
		// Additional light shades for variety
		lightShade1: "rgb(184, 33, 50)", // Deep coral-red
		lightShade2: "rgb(210, 102, 90)", // Medium coral
		lightShade3: "rgb(242, 178, 140)", // Light coral
		lightShade4: "rgb(246, 222, 216)", // Very light peachy
	},
	dark: {
		// Dark theme colors - using your palette inverted
		primary: "#E17564", // Coral becomes primary in dark
		secondary: "#BE3144", // Red - keeping consistent
		background: "#09122C", // Dark navy background
		surface: "#1a2441", // Darker navy surface (lightened #09122C)
		text: "#ffffff", // White text
		textSecondary: "#E17564", // Coral secondary text
		border: "#872341", // Deep burgundy border
		accent: "#E17564", // Coral accent
		success: "#34d399", // Light green
		warning: "#BE3144", // Red warning
		error: "#872341", // Deep burgundy error
		// Additional shades for dark mode - muted versions of light shades
		lightShade1: "rgba(184, 33, 50, 0.8)", // Muted deep coral-red
		lightShade2: "rgba(210, 102, 90, 0.7)", // Muted medium coral
		lightShade3: "rgba(242, 178, 140, 0.6)", // Muted light coral
		lightShade4: "rgba(246, 222, 216, 0.5)", // Muted very light peachy
	},
} as const;

// Theme type definitions
export type Theme = { [K in keyof typeof themeConfig.dark]: string };
export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
	theme: Theme;
	themeMode: ThemeMode;
	isDark: boolean;
	toggleTheme: () => void;
	setThemeMode: (mode: ThemeMode) => void;
}

// Create context
export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
);

// Theme provider component
export interface ThemeProviderProps {
	children: ReactNode;
	defaultTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	defaultTheme = "light",
}) => {
	const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
		// Check localStorage first, then default to light theme
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("portfolio-theme") as ThemeMode;
			return savedTheme || defaultTheme;
		}
		return defaultTheme;
	});

	// Get current theme object
	const theme = themeConfig[themeMode];
	const isDark = themeMode === "dark";

	// Persist theme to localStorage and apply CSS custom properties
	useEffect(() => {
		localStorage.setItem("portfolio-theme", themeMode);

		// Apply theme to document root for CSS custom properties
		const root = document.documentElement;

		// Set CSS custom properties for the current theme
		root.style.setProperty("--color-primary", theme.primary);
		root.style.setProperty("--color-secondary", theme.secondary);
		root.style.setProperty("--color-background", theme.background);
		root.style.setProperty("--color-surface", theme.surface);
		root.style.setProperty("--color-text", theme.text);
		root.style.setProperty("--color-text-secondary", theme.textSecondary);
		root.style.setProperty("--color-border", theme.border);
		root.style.setProperty("--color-accent", theme.accent);
		root.style.setProperty("--color-success", theme.success);
		root.style.setProperty("--color-warning", theme.warning);
		root.style.setProperty("--color-error", theme.error);

		// Add theme class to body for conditional styling
		document.body.className = document.body.className.replace(/theme-\w+/g, "");
		document.body.classList.add(`theme-${themeMode}`);

		// Set body background color
		document.body.style.backgroundColor = theme.background;
	}, [themeMode, theme]);

	const toggleTheme = () => {
		setThemeModeState((prev) => (prev === "light" ? "dark" : "light"));
	};

	const setThemeMode = (mode: ThemeMode) => {
		setThemeModeState(mode);
	};

	const value: ThemeContextType = {
		theme,
		themeMode,
		isDark,
		toggleTheme,
		setThemeMode,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

// Utility hook for component styling
export const useThemeStyles = () => {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeStyles must be used within a ThemeProvider");
	}

	const { theme, isDark } = context;

	return {
		// Common style patterns
		card: {
			backgroundColor: theme.surface,
			border: `1px solid ${theme.border}`,
			borderRadius: "12px",
			boxShadow: isDark
				? "0 4px 6px rgba(0, 0, 0, 0.3)"
				: "0 4px 6px rgba(0, 0, 0, 0.1)",
		},
		button: {
			primary: {
				backgroundColor: theme.primary,
				color: isDark ? theme.background : "#ffffff",
				border: "none",
				borderRadius: "8px",
				padding: "12px 24px",
				fontWeight: 600,
				cursor: "pointer",
				transition: "all 0.3s ease",
			},
			secondary: {
				backgroundColor: "transparent",
				color: theme.secondary,
				border: `2px solid ${theme.secondary}`,
				borderRadius: "8px",
				padding: "10px 22px",
				fontWeight: 600,
				cursor: "pointer",
				transition: "all 0.3s ease",
			},
		},
		text: {
			primary: { color: theme.text },
			secondary: { color: theme.textSecondary },
			accent: { color: theme.accent },
		},
		background: {
			main: { backgroundColor: theme.background },
			surface: { backgroundColor: theme.surface },
		},
		theme,
		isDark,
	};
};

export { themeConfig };
