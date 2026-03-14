import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import type { SearchResultItem } from '@/types/search';
import type { TagsFormat } from '@/types/tag';
import BaseSearchResultCard, { BaseSearchResultCardProps } from './BaseSearchResultCard';

interface EventResultCardProps extends BaseSearchResultCardProps {
  result: SearchResultItem & { type: 'event' };
  tags: TagsFormat[];
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

  const eventIcon = (
    <EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />
  );

  return (
    <BaseSearchResultCard result={result} onClick={onClick} icon={eventIcon} tags={tags}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarTodayIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2">
            <strong>Date:</strong> {formattedDate}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2">
            <strong>Location:</strong> {location}
          </Typography>
        </Box>

        {(typeof result.numTables === 'number' || typeof result.numPlayers === 'number') && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {typeof result.numTables === 'number' && (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <TableRestaurantIcon sx={{ mr: 0.5, color: 'primary.main' }} />
                <Typography variant="body2">
                  <strong>Tables:</strong> {result.numTables}
                </Typography>
              </Box>
            )}
            {typeof result.numPlayers === 'number' && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon sx={{ mr: 0.5, color: 'primary.main' }} />
                <Typography variant="body2">
                  <strong>Players:</strong> {result.numPlayers}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {result.organizer && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Organizer:</strong> {result.organizer}
          </Typography>
        )}
      </Box>
    </BaseSearchResultCard>
  );
};

export default EventResultCard;
