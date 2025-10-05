"use client"
import React from 'react';
import ScrollableResultsList from './ScrollableResultsList';
import { SearchResultItem } from '@/mocks/SearchResults';
import { TagsFormat } from '@/mocks/Tags';

export interface PlayersScrollableListProps {
  results: SearchResultItem[];
  tags: TagsFormat[];
  maxHeight?: number | string;
  onResultClick?: (id: number) => void;
}

/**
 * Thin wrapper to show only player results in a scrollable list.
 */
const PlayersScrollableList: React.FC<PlayersScrollableListProps> = ({
  results,
  tags,
  maxHeight,
  onResultClick,
}) => {
  const players = (results || []).filter((r): r is SearchResultItem & { type: 'player' } => r?.type === 'player');
  const handleClick = (id: number) => onResultClick?.(id);

  return (
    <ScrollableResultsList
      results={players}
      tags={tags}
      maxHeight={maxHeight}
      onResultClick={(id, type) => {
        if (type === 'player') handleClick(id);
      }}
    />
  );
};

export default PlayersScrollableList;
