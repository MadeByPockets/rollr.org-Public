"use client"
import React from 'react';
import Box from '@mui/material/Box';
import ResultsContainer from './ResultsContainer';
import { SearchResultItem } from '@/mocks/SearchResults';
import { TagsFormat } from '@/mocks/Tags';

export interface ScrollableResultsListProps {
  results: SearchResultItem[];
  tags: TagsFormat[];
  maxHeight?: number | string;
  onResultClick?: (id: number, type: 'player' | 'event' | 'table') => void;
  emptyText?: string;
}

/**
 * Generic scrollable list for search results. Reuses ResultsContainer and simply constrains height.
 */
const ScrollableResultsList: React.FC<ScrollableResultsListProps> = ({
  results,
  tags,
  maxHeight = 400,
  onResultClick,
  emptyText,
}) => {
  const hasResults = Array.isArray(results) && results.length > 0;

  return (
    <Box sx={{ maxHeight, overflowY: 'auto', pr: 1 }}>
      {hasResults ? (
        <ResultsContainer results={results} onResultClick={onResultClick} tags={tags} />
      ) : (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          {emptyText || 'No results to display.'}
        </Box>
      )}
    </Box>
  );
};

export default ScrollableResultsList;
