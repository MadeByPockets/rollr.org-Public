"use client"
import React from 'react';
import ScrollableResultsList from './ScrollableResultsList';
import { SearchResultItem } from '@/mocks/SearchResults';
import { TagsFormat } from '@/mocks/Tags';
import { Tables } from '@/mocks/Tables';

export interface TablesScrollableListProps {
  results: SearchResultItem[];
  tags: TagsFormat[];
  maxHeight?: number | string;
  onResultClick?: (id: number) => void;
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
}) => {
  const tables = (results || []).filter((r): r is SearchResultItem & { type: 'table' } => r?.type === 'table');

  // Compute available slots using Tables mock (match by id or title), fallback to -1 so known tables sort first
  const getAvailableSlots = (r: SearchResultItem & { type: 'table' }) => {
    const match = Tables.find(t => t.id === (r as any).id || t.title === r.title);
    if (!match) return -1;
    const capacity = match.capacity ?? 0;
    const playersCount = Array.isArray(match.players) ? match.players.length : 0;
    return Math.max(capacity - playersCount, 0);
  };

  const sortedTables = [...tables].sort((a, b) => getAvailableSlots(b) - getAvailableSlots(a));

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
