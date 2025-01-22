import React from 'react';
import { Button } from '@mui/material';

const ContactMeButton: React.FC = () => {
  return (
   <a href="mailto:nimmi24.1990@gmail.com?subject=Hello%20from%20Portfolio&body=Hi%20there,%0A%0AI%20wanted%20to%20connect...">

      <Button
        variant="contained"
        color="primary"
        sx={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)', // Button hover effect
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        Contact Me
      </Button>
    </a>
  );
};

export default ContactMeButton;
