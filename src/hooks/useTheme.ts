import { useContext } from "react";
import { ThemeContext, type ThemeContextType, useThemeStyles } from "../contexts/ThemeContext";

// Extended type to include styles
export type ExtendedThemeType = ThemeContextType & {
	styles: {
		// Direct theme property access for convenience
		primary: string;
		secondary: string;
		background: string;
		surface: string;
		text: string;
		textSecondary: string;
		border: string;
		accent: string;
		success: string;
		warning: string;
		error: string;
		// Common style patterns
		card: React.CSSProperties;
		button: {
			primary: React.CSSProperties;
			secondary: React.CSSProperties;
		};
		textStyles: {
			primary: React.CSSProperties;
			secondary: React.CSSProperties;
			accent: React.CSSProperties;
		};
		backgroundStyles: {
			main: React.CSSProperties;
			surface: React.CSSProperties;
		};
	};
};

// Custom hook to use theme
export const useTheme = (): ExtendedThemeType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	
	const themeStyles = useThemeStyles();
	const { theme } = context;

	return {
		...context,
		styles: {
			// Direct theme properties for easy access
			primary: theme.primary,
			secondary: theme.secondary,
			background: theme.background,
			surface: theme.surface,
			text: theme.text,
			textSecondary: theme.textSecondary,
			border: theme.border,
			accent: theme.accent,
			success: theme.success,
			warning: theme.warning,
			error: theme.error,
			// Style patterns from useThemeStyles
			card: themeStyles.card,
			button: themeStyles.button,
			textStyles: themeStyles.text,
			backgroundStyles: themeStyles.background,
		},
	};
};