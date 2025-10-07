import "./assets/styles/fonts.css";
// ... rest of your imports

import { motion } from "framer-motion";
import { ThemeProvider as CustomThemeProvider } from "./contexts/ThemeContext";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "./hooks/useTheme";
import { createMUITheme } from "./theme/muiTheme";
import MyServices from "./components/MyServices";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Writings from "./components/Writings";
import Hero from "./components/Hero";

const AppContent = () => {
	const { theme, toggleTheme, themeMode } = useTheme();
	const muiTheme = createMUITheme(themeMode);

	return (
		<MuiThemeProvider theme={muiTheme}>
			<CssBaseline />
			<div
				style={{
					backgroundColor: theme.background,
					color: theme.text,
					minHeight: "100vh",
					fontFamily: '"Delius", "Arial", sans-serif',
				}}>
				<Navbar toggleTheme={toggleTheme} currentTheme={themeMode} />
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					<div style={{ width: "100%", paddingTop: "80px" }}>
						<Hero />
						<Portfolio />
						<MyServices />
						<Writings />
						<Contact />
						<Footer />
					</div>
				</motion.div>
			</div>
		</MuiThemeProvider>
	);
};

function App() {
	return (
		<CustomThemeProvider defaultTheme="light">
			<AppContent />
		</CustomThemeProvider>
	);
}

export default App;
