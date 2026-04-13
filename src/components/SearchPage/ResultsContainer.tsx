import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { SearchResultItem, PaginationData } from '@/types/search';
import PlayerResultCard from './Results/PlayerResultCard';
import TableResultCard from './Results/TableResultCard';
import EventResultCard from './Results/EventResultCard';
import { Tag } from '@/types/tag';

interface ResultsContainerProps {
  results: SearchResultItem[];
  onResultClick?: (id: number, type: "player" | "event" | "table") => void;
  tags: Tag[];
  pagination?: PaginationData;
  onPacketChange?: (packet: number) => void;
}

/**
 * Container component that displays a list of search results
 */
const ResultsContainer: React.FC<ResultsContainerProps> = ({
  results,
  onResultClick,
  tags,
  pagination,
  onPacketChange
}) => {
  if (!results || results.length === 0 || !results.map) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        No results found. Try adjusting your filters.
      </Box>
    );
  }

  const onPlayerClick = (id: number) => {
    onResultClick?.(id, 'player');
  }

  const onTableClick = (id: number) => {
    onResultClick?.(id, 'table');
  }

  const onEventClick = (id: number) => {
    onResultClick?.(id, 'event');
  }

  const handlePacketChange = (_event: React.ChangeEvent<unknown>, packet: number) => {
    onPacketChange?.(packet);
  };

  const startResult = pagination ? (pagination.currentPacket - 1) * pagination.packetSize + 1 : 1;
  const endResult = pagination ? Math.min(pagination.currentPacket * pagination.packetSize, pagination.totalResults) : results.length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {pagination && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {startResult}-{endResult} of {pagination.totalResults} results
          </Typography>
        </Box>
      )}

      {results.map((result) => {
        // Render the appropriate card based on result type
        switch (result.type) {
          case 'player':
            return (
              <PlayerResultCard 
                key={result.id} 
                result={result as SearchResultItem & { type: 'player' }} 
                onClick={onPlayerClick}
                tags={tags}
              />
            );
          case 'table':
            return (
              <TableResultCard 
                key={result.id} 
                result={result as SearchResultItem & { type: 'table' }} 
                onClick={onTableClick}
                tags={tags}
              />
            );
          case 'event':
            return (
              <EventResultCard 
                key={result.id} 
                result={result as SearchResultItem & { type: 'event' }} 
                onClick={onEventClick}
                tags={tags}
              />
            );
          default:
            console.error(`Unknown result type: ${result.type}`);
            return null;
        }
      })}

      {pagination && pagination.totalPackets > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={pagination.totalPackets} 
            page={pagination.currentPacket} 
            onChange={handlePacketChange} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
};

export default ResultsContainer;