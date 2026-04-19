import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { SearchResultItem } from '@/types/search';
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
  // Use real capacity and player counts from result when available; no randomization
  const rawCapacity = result.capacity;
  const hasDefinedCapacity = typeof rawCapacity === 'number' && Number.isFinite(rawCapacity) && rawCapacity > 0;
  const capacity = hasDefinedCapacity ? rawCapacity : 0;
  const activePlayers = typeof result.numPlayers === 'number' ? result.numPlayers : 0;
  const availableSlots = Math.max(capacity - activePlayers, 0);
  const hasDM = typeof result.hasDM === 'boolean' ? result.hasDM : Boolean(result.dungeonMaster);

  // Calculate percentage for progress bar safely
  const occupancyPercentage = hasDefinedCapacity ? (activePlayers / capacity) * 100 : 100;

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
            <strong>Players:</strong> {hasDefinedCapacity ? `${activePlayers}/${capacity}` : activePlayers}
          </Typography>
          {typeof hasDM === 'boolean' && (
            <Chip
              icon={hasDM ? <SupervisorAccountIcon /> : <PersonIcon />}
              label={hasDM ? "DM Present" : "No DM"}
              color={hasDM ? "success" : "warning"}
              size="small"
            />
          )}
        </Box>

        <LinearProgress 
          variant="determinate" 
          value={occupancyPercentage} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: hasDefinedCapacity ? (availableSlots > 0 ? '#4caf50' : '#f44336') : '#2196f3'
            }
          }}
        />

        {hasDefinedCapacity && (
          <Typography variant="body2" sx={{ mt: 0.5, textAlign: 'right' }}>
            {availableSlots > 0 
              ? `${availableSlots} slot${availableSlots !== 1 ? 's' : ''} available` 
              : 'Table full'}
          </Typography>
        )}
      </Box>
    </BaseSearchResultCard>
  );
};

export default TableResultCard;