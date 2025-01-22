import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import to access theme
import { Brightness4, Brightness7 } from '@mui/icons-material';
import profileImage from '../assets/profile.jpg'; 

interface NavbarProps {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, mode }) => {
  const theme = useTheme(); // Use the theme

  return (
    <AppBar position="relative" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            src ={profileImage} // Replace with your image path
            alt="Profile"
            sx={{ width: 45, height: 45, marginRight: '3px' , border: '1 solid #fff'}} // Adjust size
          />
        <Typography
            variant="h4"
            sx={{
              fontFamily: '"Lobster", cursive', // Stylish font
              color: theme.palette.text.primary,
              cursor: 'default', // Not clickable
              '&:hover': {
                color: theme.palette.secondary.main, // Hover effect
              },
            }}
          >
            Nermeen Nasim
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button 
            color="inherit" 
            href="#portfolio"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.secondary.main, // Pink hover
                color: '#fff',
              }
            }}
          >
            Portfolio
          </Button>
          <Button 
            color="inherit" 
            href="#services"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.secondary.main, // Pink hover
                color: '#fff',
              }
            }}
          >
            Services
          </Button>
          <Button 
            color="inherit" 
            href="#writings"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.secondary.main, // Pink hover
                color: '#fff',
              }
            }}
          >
            My Writings
          </Button>
          <Button 
            color="inherit" 
            href="#contact"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.secondary.main, // Pink hover
                color: '#fff',
              }
            }}
          >
            Contact Me
          </Button>

          <IconButton color="inherit" onClick={toggleTheme}>
          {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
