"use client"
import React from 'react';
import ScrollableResultsList from './ScrollableResultsList';
import { SearchResultItem } from '@/mocks/SearchResults';
import { TagsFormat } from '@/mocks/Tags';

export interface TablesScrollableListProps {
  results: SearchResultItem[];
  tags: TagsFormat[];
  maxHeight?: number | string;
  onResultClick?: (id: number) => void;
  sortBy?: 'none' | 'availability';
}

/**
 * Thin wrapper to show only table results in a scrollable list.
 * Updated to sort by most available slots first.
 */
const TablesScrollableList: React.FC<TablesScrollableListProps> = ({
  results,
  tags,
  maxHeight,
  onResultClick,
  sortBy = 'availability',
}) => {
  const tables = (results || []).filter((r): r is SearchResultItem & { type: 'table' } => r?.type === 'table');

  // Compute available slots using only the result item; default to safe values when missing
  const getAvailableSlots = (r: SearchResultItem & { type: 'table' }) => {
    const capacity = typeof (r as any).capacity === 'number' ? (r as any).capacity : 0;
    const playersCount = typeof (r as any).numPlayers === 'number' ? (r as any).numPlayers : 0;
    return Math.max(capacity - playersCount, 0);
  };

  const sortedTables = sortBy === 'availability'
    ? [...tables].sort((a, b) => getAvailableSlots(b) - getAvailableSlots(a))
    : tables;

  const handleClick = (id: number) => onResultClick?.(id);

  return (
    <ScrollableResultsList
      results={sortedTables}
      tags={tags}
      maxHeight={maxHeight}
      onResultClick={(id, type) => {
        if (type === 'table') handleClick(id);
      }}
    />
  );
};

export default TablesScrollableList;
