import React from 'react';
import BaseSearchResultCard, { BaseSearchResultCardProps } from './BaseSearchResultCard';

/**
 * @deprecated Use specialized card components (PlayerResultCard, TableResultCard, EventResultCard) instead
 * This component is kept for backward compatibility
 */
const SearchResultCard: React.FC<BaseSearchResultCardProps> = ({ 
  result,
  onClick
}) => {
  return (
    <BaseSearchResultCard result={result} onClick={onClick}>
      {/* No specialized content for the generic card */}
    </BaseSearchResultCard>
  );
};

export default SearchResultCard;