"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { SearchResultItem } from '@/mocks/SearchResults';
import BaseSearchResultCard, { BaseSearchResultCardProps } from './BaseSearchResultCard';

interface TableResultCardProps extends BaseSearchResultCardProps {
  result: SearchResultItem & { type: 'table' };
}

/**
 * Component for displaying table search results
 * Shows active players vs. available slots and DM status
 */
const TableResultCard: React.FC<TableResultCardProps> = ({ 
  result,
  onClick,
  tags
}) => {
  // Prefer values provided directly on the search result item
  const capacity = typeof result.capacity === 'number' ? result.capacity : 6;
  const activePlayers = typeof result.numPlayers === 'number' ? result.numPlayers : 0;
  const availableSlots = Math.max(capacity - activePlayers, 0);

  // DM status from result if provided
  const hasDM = typeof result.hasDM === 'boolean' ? result.hasDM : false;

  // Calculate percentage for progress bar (avoid NaN/div by zero)
  const occupancyPercentage = capacity > 0 ? (activePlayers / capacity) * 100 : 0;
  
  // Create table icon
  const tableIcon = (
    <TableRestaurantIcon 
      sx={{ 
        fontSize: 40,
        color: 'primary.main'
      }}
    />
  );

  return (
    <BaseSearchResultCard result={result} onClick={onClick} icon={tableIcon} tags={tags}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2">
            <strong>Players:</strong> {activePlayers}/{capacity}
          </Typography>
          <Chip 
            icon={hasDM ? <SupervisorAccountIcon /> : <PersonIcon />}
            label={hasDM ? "DM Present" : "No DM"}
            color={hasDM ? "success" : "warning"}
            size="small"
          />
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={occupancyPercentage} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: availableSlots > 0 ? '#4caf50' : '#f44336'
            }
          }}
        />
        
        <Typography variant="body2" sx={{ mt: 0.5, textAlign: 'right' }}>
          {availableSlots > 0 
            ? `${availableSlots} slot${availableSlots !== 1 ? 's' : ''} available` 
            : 'Table full'}
        </Typography>

        {typeof result.waitlistCount === 'number' && result.waitlistCount > 0 && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Waitlist:</strong> {result.waitlistCount}
          </Typography>
        )}
      </Box>
    </BaseSearchResultCard>
  );
};

export default TableResultCard;