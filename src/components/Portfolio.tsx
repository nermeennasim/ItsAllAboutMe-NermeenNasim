import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import to access theme

const projects = [
  {
    name: 'My First Portfolio BASIC version',
    description: 'A personal portfolio to showcase my skills and projects. Based on Simple HTML, CSS & Javascript',
    liveLink: 'https://nermeennasim.github.io/MyPersonalSite/',
    sourceCode: 'https://github.com/nermeennasim/MyPersonalSite',
  },
  {
    name: 'Portfolio Live 2025',
    description: 'A personal portfolio to showcase my skills and projects. Based on Simple React, Vite, Material UI & Typescript, Vercel, GitHub',
    liveLink: 'https://my-portfolio2025-gamma.vercel.app/',
    sourceCode: 'https://github.com/nermeennasim/MyPortfolio2025',
  },
  {
    name: 'Age Calculator',
    description: 'A simple HTML, CSS and Javascript based challenged done on Frond End Mentor',
    liveLink: 'https://nermeennasim-agecalculator-io.vercel.app/',
    sourceCode: 'https://github.com/nermeennasim/nermeennasim.age-calculator-responsive.io-'
  },
  {
    name: 'Feed Back App',
    description: 'A simple React App that help user to Add , Delete, or Update Feedback and calculates Average ratings as well.',
    liveLink: 'https://delightful-tartufo-a0e436.netlify.app/',
    sourceCode: 'https://github.com/nermeennasim/feedback-app-2',
  },
  {
    name: 'A New Visualizer-Media Pulse',
    description: 'A react based app using React Flow Library for creating operations and services for Media Pulse. This is my work related project and hence no code available.',
    liveLink: 'https://xytechsystems-2.wistia.com/medias/r0607q3j5n?_hsenc=p2ANqtz-8YJVFqeBdUUwqKpi-Vy6ilhVdUsgte782LynkzczRyZIZmEztLZ9IrK_P3em4hhRxx7i6v?wtime=0?wtime=0?wtime=0',
    sourceCode: 'NOT AVAILABLE'
  },
  {
    name: 'Kanye West - ChatBot',
    description: 'This project was done solely for the purpose of learning Open AI and Chat GPT using React library, there is an issue for running on server because of API token',
    liveLink: 'https://kanye-west-bot.vercel.app/',
    sourceCode: 'https://github.com/nermeennasim/KanyeWest-Bot'
  }
];

const Portfolio: React.FC = () => {
  const theme = useTheme(); // Access the theme

  return (
    <Box id="portfolio" sx={{ padding: '50px 20px', textAlign: 'center', backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }}>
        My Projects
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {projects.map((project, index) => (
          <Card key={index} sx={{ maxWidth: 345, margin: 'auto', backgroundColor: theme.palette.background.default }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ color: theme.palette.text.primary }}>
                {project.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                {project.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                size="small"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live
              </Button>
              <Button
                size="small"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Portfolio;
