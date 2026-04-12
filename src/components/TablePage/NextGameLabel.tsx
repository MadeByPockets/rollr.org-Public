import React from 'react';
import { Typography } from '@mui/material';

interface NextGameCountdownProps {
  nextGameTime: string | Date;
}

const NextGameLabel: React.FC<NextGameCountdownProps> = ({ nextGameTime }) => {
  const date = typeof nextGameTime === 'string' ? new Date(nextGameTime) : nextGameTime;
  
  return (
    <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
      Next Game: {date.toLocaleString()}
    </Typography>
  );
};

export default NextGameLabel;
