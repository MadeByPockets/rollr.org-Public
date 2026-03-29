"use client";

import React from 'react';
import BaseSearchResultCard from './BaseSearchResultCard';
import { Tag } from '@/types/tag';

interface SearchResultCardProps {
  result: any;
  onClick?: (id: number) => void;
  tags: Tag[];
}

/**
 * @deprecated Use specialized card components (PlayerResultCard, TableResultCard, EventResultCard) instead
 * This component is kept for backward compatibility
 */
const SearchResultCard: React.FC<SearchResultCardProps> = ({ 
  result,
  onClick,
    tags,
}) => {
  return (
    <BaseSearchResultCard result={result} onClick={onClick} tags={tags}>
      {/* No specialized content for the generic card */}
    </BaseSearchResultCard>
  );
};

export default SearchResultCard;