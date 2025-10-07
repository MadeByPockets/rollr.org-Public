import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { SearchResultItem } from '@/mocks/SearchResults';
import { MockedEvents } from '@/mocks/Events';
import BaseSearchResultCard, { BaseSearchResultCardProps } from './BaseSearchResultCard';
import {TagsFormat} from "@/mocks/Tags";

interface EventResultCardProps extends BaseSearchResultCardProps {
  result: SearchResultItem & { type: 'event' };
  tags: TagsFormat[]
}

/**
 * Component for displaying event search results
 * Shows event location and dates
 */
const EventResultCard: React.FC<EventResultCardProps> = ({ 
  result,
  onClick,
  tags
}) => {
  // Find the full event data from Events mock data
  const eventData = MockedEvents.find(event => event.id === result.id);
  
  // Format the date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return dateString; // Fallback to the original string if parsing fails
    }
  };
  
  const formattedDate = result.date ? formatDate(result.date) : 'Date TBD';
  const location = eventData?.location || 'Location TBD';
  
  // Create event icon
  const eventIcon = (
    <EventIcon 
      sx={{ 
        fontSize: 40,
        color: 'primary.main'
      }}
    />
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
        
        {eventData?.organizer && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Organizer:</strong> {eventData.organizer}
          </Typography>
        )}
      </Box>
    </BaseSearchResultCard>
  );
};

export default EventResultCard;