import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { SearchResultItem } from '@/mocks/SearchResults';
import { Tables } from '@/mocks/Tables';
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
  onClick
}) => {
  // Find the full table data from Tables mock data
  const tableData = Tables.find(table => table.id === result.id);
  
  // Mock data for active players and DM status (since it's not in the data structure)
  // In a real application, this would come from the API
  const getRandomActivePlayers = (capacity: number) => {
    return Math.floor(Math.random() * (capacity + 1));
  };
  
  const hasDM = Math.random() > 0.5; // 50% chance of having a DM
  
  // Use capacity from tableData if available, otherwise default to 6
  const capacity = tableData?.capacity || 6;
  const activePlayers = getRandomActivePlayers(capacity);
  const availableSlots = capacity - activePlayers;
  
  // Calculate percentage for progress bar
  const occupancyPercentage = (activePlayers / capacity) * 100;
  
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
    <BaseSearchResultCard result={result} onClick={onClick} icon={tableIcon}>
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
        
        {tableData?.location && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Location:</strong> {tableData.location}
          </Typography>
        )}
      </Box>
    </BaseSearchResultCard>
  );
};

export default TableResultCard;