import React from 'react';
import ScrollableResultsList from './ScrollableResultsList';
import { SearchResultItem } from '@/types/search';
import { Tag } from '@/types/tag';

export interface TablesScrollableListProps {
  results: SearchResultItem[];
  tags: Tag[];
  maxHeight?: number | string;
  onResultClick?: (id: number) => void;
  showEventTag?: boolean;
  eventTagId?: number;
}

/**
 * Thin wrapper to show only table results in a scrollable list.
 */
const TablesScrollableList: React.FC<TablesScrollableListProps> = ({
  results,
  tags,
  maxHeight,
  onResultClick,
  showEventTag,
  eventTagId
}) => {
  const tables = (results || []).filter((r): r is SearchResultItem & { type: 'table' } => r?.type === 'table');
  const handleClick = (id: number) => onResultClick?.(id);

  return (
    <ScrollableResultsList
      results={tables}
      tags={tags}
      maxHeight={maxHeight}
      onResultClick={(id, type) => {
        if (type === 'table') handleClick(id);
      }}
      showEventTag={showEventTag}
      eventTagId={eventTagId}
    />
  );
};

export default TablesScrollableList;
