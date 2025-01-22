import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // To access the theme

import 'devicon/devicon.min.css';

const skills = [
  { name: 'React', icon: <i className="devicon-react-original colored"></i> },
  { name: 'TypeScript', icon: <i className="devicon-typescript-plain colored"></i> },
  { name: 'JavaScript', icon: <i className="devicon-javascript-plain colored"></i> },
  { name: '.NET', icon: <i className="devicon-dotnetcore-plain colored"></i> },
  { name: 'HTML', icon: <i className="devicon-html5-plain colored"></i> },
  { name: 'CSS', icon: <i className="devicon-css3-plain colored"></i> },
  { name: 'DevOps', icon: <i className="devicon-docker-plain colored"></i> },
  { name: 'AWS', icon: <i className="devicon-amazonwebservices-plain colored"></i> },
  { name: 'Azure', icon: <i className="devicon-azure-plain colored"></i> },
  { name: 'MySQL', icon: <i className="devicon-mysql-plain colored"></i> },
  { name: 'MSSQL', icon: <i className="devicon-microsoftsqlserver-plain colored"></i> },
  { name: 'Cosmos DB', icon: <i className="devicon-cosmosdb-plain colored"></i> },
  { name: 'Java', icon: <i className="devicon-java-plain colored"></i> },
  { name: 'TailWind CSS', icon: <i className="devicon-tailwindcss-plain colored"></i> },
];

const Services: React.FC = () => {
  const theme = useTheme(); // Access the theme

  return (
    <Box id="services" sx={{ padding: '50px 20px', backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '30px', color: theme.palette.text.primary }}>
       My Skills
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        {skills.map((skill, index) => (
          <Box
            key={index}
            sx={{
              textAlign: 'center',
              width: '120px',
              padding: '10px',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '8px',
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
              backgroundColor: theme.palette.background.default,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <Box sx={{ fontSize: '40px', marginBottom: '10px' }}>
              {skill.icon}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              {skill.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Services;
