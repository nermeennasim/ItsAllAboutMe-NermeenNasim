import { Box, Typography, Button } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const Hero = () => {
  return (
    <Box 
      sx={{
        backgroundColor: 'background.paper',  // Use theme's background color
        padding: '50px',
        textAlign: 'center',
        boxShadow: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>
       About Me
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        My name is Nermeen Nasim. I am a Software Engineer. Beyond the code, I’m a deep thinker and writer, sharing perspectives on life, positivity, and productivity. A software engineer with a human touch. Lets Connect!
      </Typography>

      <Box sx={{ marginTop: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<LinkedInIcon />} 
          href="https://www.linkedin.com/in/n-nasim" 
          target="_blank"
          sx={{ margin: 1 }}
        >
          LinkedIn
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<GitHubIcon />} 
          href="https://github.com/nermeennasim" 
          target="_blank"
          sx={{ margin: 1 }}
        >
          GitHub
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<EmailIcon />} 
          href="mailto:nimmi24.1990@gmail.com"
          sx={{ margin: 1 }}
        >
          Email
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
