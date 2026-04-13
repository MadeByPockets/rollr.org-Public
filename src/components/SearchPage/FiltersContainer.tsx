"use client"
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TypeFilter from './Filters/TypeFilter';
import TagsFilter from './Filters/TagsFilter';
import TextSearchCard from './Filters/TextSearchCard';
import ExpiredTablesFilter from './Filters/ExpiredTablesFilter';
import { Tag } from '@/types/tag';

interface FiltersContainerProps {
  initialSelectedTypes?: string[];
  initialSelectedTags?: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  };
  initialTextSearch?: {
    query: string;
    titleOnly: boolean;
  };
  includeExpiredTables?: boolean;
  onTypeChange?: (selectedTypes: string[]) => void;
  onTagChange?: (selectedTags: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  }) => void;
  onTextSearchChange?: (textSearch: { query: string; titleOnly: boolean }) => void;
  onIncludeExpiredTablesChange?: (include: boolean) => void;
  onSubmit?: () => void;
  tags: Tag[];
  searchTypes: { id: string; label: string }[];
}

/**
 * Container component that combines all filter components
 */
const FiltersContainer: React.FC<FiltersContainerProps> = ({
  initialSelectedTypes = [],
  initialSelectedTags,
  initialTextSearch,
  includeExpiredTables = false,
  onTypeChange,
  onTagChange,
  onTextSearchChange,
  onIncludeExpiredTablesChange,
  onSubmit,
  tags,
  searchTypes
}) => {
  // Track selected types to conditionally show TextSearchCard and ExpiredTablesFilter
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>(initialSelectedTypes);

  // Update state when initialSelectedTypes changes
  useEffect(() => {
    setSelectedTypes(initialSelectedTypes);
  }, [initialSelectedTypes]);

  // Handler for type changes
  const handleTypeChange = (types: string[]) => {
    setSelectedTypes(types);
    if (onTypeChange) {
      onTypeChange(types);
    }
  };

  return (
    <Box>
      {/* Type Filters */}
      <TypeFilter 
        types={searchTypes}
        initialSelectedTypes={initialSelectedTypes}
        onChange={handleTypeChange}
      />

      <Divider sx={{ my: 2 }} />

      {/* Text Search - only shown when table or event is selected */}
      <TextSearchCard 
        selectedTypes={selectedTypes}
        initialTextSearch={initialTextSearch}
        onChange={onTextSearchChange}
      />

      {/* Only show divider if TextSearchCard is visible */}
      {(selectedTypes.includes('table') || selectedTypes.includes('event')) && (
        <Divider sx={{ my: 2 }} />
      )}

      {/* Tags Filter */}
      <TagsFilter
        tags={tags}
        initialSelectedTags={initialSelectedTags}
        onChange={onTagChange} 
      />

      <Divider sx={{ my: 2 }} />

      {/* Only show the expired tables filter when 'table' is selected */}
      {selectedTypes.includes('table') && (
        <>
          <ExpiredTablesFilter
            includeExpiredTables={includeExpiredTables}
            onChange={onIncludeExpiredTablesChange || (() => {})}
          />
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Submit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SearchIcon />}
          onClick={onSubmit}
          sx={{
            width: '100%',
            py: 1.5,
            borderRadius: 2,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.9), rgba(25, 118, 210, 1))',
              boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
            }
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default FiltersContainer;