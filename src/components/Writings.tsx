import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // To access the theme

const writings = [
  {
    title:'Context API vs. Reducers',
    description: 'Choosing Right State Management Approach in React',
    link: 'https://medium.com/@nimmi24.1990/context-api-vs-reducers-choosing-the-right-state-management-approach-in-react-8196fac16459'
  },
  {
    title: 'What I have? vs What is missing?',
    description: 'This article if you read will lead you how to overcome depression, sadness, anger.',
    link: 'https://medium.com/@nimmi24.1990/you-will-never-feel-frustrated-or-depressed-again-once-you-read-this-361d6a251a0f',
  },
  {
    title: 'Managing Stress Day-to-Day',
    description: 'How to take baby steps to overcome daily stress',
    link: 'https://medium.com/@nimmi24.1990/managing-stress-day-to-day-the-power-of-small-consistent-habits-38be67600b33',
  },
  {
    title: 'Top 10 Essential Skills to Learn in 2025',
    description: 'You dont want to miss these skills if you want to develop Personally or Professionally in 2025',
    link: 'https://medium.com/@nimmi24.1990/10-essential-skills-to-master-in-2025-for-success-in-life-or-career-in-tech-3a38f047266a',
  },
  {
    title: 'The Power of your subconcious Mind, A book Review',
    description: 'Book Review for a book written by Joseph Murphy',
    link: 'https://medium.com/@nimmi24.1990/unlock-the-secret-power-of-your-mind-how-this-book-can-transform-your-life-forever-806685217591',
  },
  {
    title: 'Momentum Matters',
    description: 'Moving forward how to transform life using these strategies',
    link: 'https://medium.com/@nimmi24.1990/momentum-matters-setting-goals-to-transform-your-life-and-keep-moving-forward-faf514275cf9'
  }
  ,
];

const Writings: React.FC = () => {
  const theme = useTheme(); // Access the theme

  return (
    <Box id="writings" sx={{ padding: '50px 20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }}>
        My Writings
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {writings.map((writing, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 345,
              margin: 'auto',
              backgroundColor: theme.palette.background.paper,
              boxShadow: 3,
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)', // Slight scaling on hover
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" sx={{ color: theme.palette.text.primary }}>
                {writing.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                {writing.description}
              </Typography>
            </CardContent>
            <Button
              size="small"
              color="primary"
              href={writing.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                margin: '10px',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Read Article
            </Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Writings;
