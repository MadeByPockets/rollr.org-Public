import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TypeFilter from './Filters/TypeFilter';
import TagsFilter from './Filters/TagsFilter';

interface FiltersContainerProps {
  onTypeChange?: (selectedTypes: string[]) => void;
  onTagChange?: (selectedTags: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  }) => void;
}

/**
 * Container component that combines all filter components
 */
const FiltersContainer: React.FC<FiltersContainerProps> = ({
  onTypeChange,
  onTagChange
}) => {
  return (
    <Box>
      {/* Type Filters */}
      <TypeFilter onChange={onTypeChange} />
      
      <Divider sx={{ my: 2 }} />
      
      {/* Tags Filter */}
      <TagsFilter 
        onChange={onTagChange} 
      />
    </Box>
  );
};

export default FiltersContainer;