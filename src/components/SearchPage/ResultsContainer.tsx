import React from 'react';
import Box from '@mui/material/Box';
import { SearchResultItem } from '@/mocks/SearchResults';
import PlayerResultCard from './Results/PlayerResultCard';
import TableResultCard from './Results/TableResultCard';
import EventResultCard from './Results/EventResultCard';
import { TagsFormat } from '@/mocks/Tags';

interface ResultsContainerProps {
  results: SearchResultItem[];
  onResultClick?: (id: number, type: "player" | "event" | "table") => void;
  tags: TagsFormat[]
}

/**
 * Container component that displays a list of search results
 */
const ResultsContainer: React.FC<ResultsContainerProps> = ({
  results,
  onResultClick,
  tags
}) => {
  if (results.length === 0 || !results.map) {
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            // This should never happen with proper typing
            console.error(`Unknown result type: ${result.type}`);
            return null;
        }
      })}
    </Box>
  );
};

export default ResultsContainer;