"use client"
import React from 'react';
import { Box, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import BaseSearchResultCard from './BaseSearchResultCard';
import { Tag } from '@/types/tag';
import { SearchResultItem } from '@/types/search';

interface EventResultCardProps {
  result: SearchResultItem;
  onClick?: (id: number) => void;
  tags: Tag[];
}

const EventResultCard: React.FC<EventResultCardProps> = ({
  result,
  onClick,
  tags,
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    } catch {
      return dateString;
    }
  };

  const formattedDate = result.date ? formatDate(result.date) : 'Date TBD';
  const location = result.location || 'Location TBD';

  return (
    <BaseSearchResultCard result={result} onClick={onClick} icon={<EventIcon color="primary" />} tags={tags}>
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <CalendarTodayIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </Box>
      </Box>
    </BaseSearchResultCard>
  );
};

export default EventResultCard;
