import { createTheme, ThemeOptions } from '@mui/material/styles';
const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Your primary color for light theme
    },
    secondary: {
      main: '#9c27b0', // Your secondary color for light theme
    },
    background: {
      default: '#fff', // Light background color
      paper: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Primary color for dark theme
    },
    secondary: {
      main: '#f48fb1', // Secondary color for dark theme
    },
    background: {
      default: '#121212', // Dark background color
      paper: '#424242',
    },
    text: {
      primary: '#fff',
      secondary: '#bbb',
    },
  },
};

const theme = (mode: 'light' | 'dark') => {
  return createTheme(mode === 'light' ? lightTheme : darkTheme);
};

export default theme;
