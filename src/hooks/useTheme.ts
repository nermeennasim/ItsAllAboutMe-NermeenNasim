import { useContext } from "react";
import { ThemeContext, type ThemeContextType, useThemeStyles } from "../contexts/ThemeContext";

// Extended type to include styles
export type ExtendedThemeType = ThemeContextType & {
	styles: {
		// Direct theme property access for convenience - all colors
		primary: string;
		secondary: string;
		background: string;
		surface: string;
		surfaceLight: string;
		text: string;
		textSecondary: string;
		border: string;
		borderLight: string;
		accent: string;
		accentLight: string;
		tertiary: string;
		tertiaryLight: string;
		primaryLight: string;
		secondaryLight: string;
		success: string;
		warning: string;
		error: string;
		inputBg: string;
		inputBgLight: string;
		inputBorder: string;
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
			// Direct theme properties for easy access - all colors
			primary: theme.primary,
			secondary: theme.secondary,
			background: theme.background,
			surface: theme.surface,
			surfaceLight: theme.surfaceLight,
			text: theme.text,
			textSecondary: theme.textSecondary,
			border: theme.border,
			borderLight: theme.borderLight,
			accent: theme.accent,
			accentLight: theme.accentLight,
			tertiary: theme.tertiary,
			tertiaryLight: theme.tertiaryLight,
			primaryLight: theme.primaryLight,
			secondaryLight: theme.secondaryLight,
			success: theme.success,
			warning: theme.warning,
			error: theme.error,
			inputBg: theme.inputBg,
			inputBgLight: theme.inputBgLight,
			inputBorder: theme.inputBorder,
			// Style patterns from useThemeStyles
			card: themeStyles.card,
			button: themeStyles.button,
			textStyles: themeStyles.text,
			backgroundStyles: themeStyles.background,
		},
	};
};