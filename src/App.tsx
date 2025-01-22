import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme'; // Import your custom theme
import Services from './components/Services';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Writings from './components/Writings';

function App() {
  // State to manage theme mode
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Toggle theme mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: mode === 'light' ? '#f5f5f5' : '#333', // Gray background for the sides
        }}
      >
        <Navbar toggleTheme={toggleTheme} mode={mode} />
        <Box
          sx={{
            mx: 'auto',
            maxWidth: '90%',
            background: mode === 'light'
              ? 'linear-gradient(to right, #1976d2, #9c27b0)' // Light theme gradient
              : 'linear-gradient(to right, #90caf9, #f48fb1)', // Dark theme gradient
            padding: '20px',
            borderRadius: '8px', // Optional: add border radius
          }}
        >
          <Hero />
          <Portfolio />
          <Services />
          <Writings />
          <Contact />
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
