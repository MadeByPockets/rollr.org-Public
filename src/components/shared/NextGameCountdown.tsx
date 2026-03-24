import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

export const NextGameCountdown = ({ nextGameTime }: { nextGameTime?: Date | string }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!nextGameTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(nextGameTime).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('Started');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let timeString = '';
      if (days > 0) timeString += `${days}d `;
      if (hours > 0 || days > 0) timeString += `${hours}h `;
      timeString += `${minutes}m ${seconds}s`;

      setTimeLeft(timeString);
    }, 1000);

    return () => clearInterval(timer);
  }, [nextGameTime]);

  if (!nextGameTime) return null;

  return (
    <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
      Next Game: {timeLeft}
    </Typography>
  );
};
