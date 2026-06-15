"use client"
import React from 'react';
import ScrollableResultsList from './ScrollableResultsList';
import { SearchResultItem } from '@/types/search';
import { Tag } from '@/types/tag';

export interface PlayersScrollableListProps {
  results: SearchResultItem[];
  tags: Tag[];
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

  return (
    <ScrollableResultsList
      results={players}
      tags={tags}
      maxHeight={maxHeight}
      onResultClick={onResultClick ? (id, type) => {
        if (type === 'player') onResultClick(id);
      } : undefined}
    />
  );
};

export default PlayersScrollableList;
