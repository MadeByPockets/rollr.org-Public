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
import DistanceFilter from './Filters/DistanceFilter';
import { Tag } from '@/types/tag';
import { DistanceOption } from '@/types/search';

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
  distance?: number;
  distances: DistanceOption[];
  onTypeChange?: (selectedTypes: string[]) => void;
  onTagChange?: (selectedTags: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  }) => void;
  onTextSearchChange?: (textSearch: { query: string; titleOnly: boolean }) => void;
  onIncludeExpiredTablesChange?: (include: boolean) => void;
  onDistanceChange?: (distance: number) => void;
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
  distance,
  distances,
  onTypeChange,
  onTagChange,
  onTextSearchChange,
  onIncludeExpiredTablesChange,
  onDistanceChange,
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
    <Box component="form" onSubmit={(e: React.FormEvent) => { e.preventDefault(); if (onSubmit) onSubmit(); }}>
      {/* Type Filters */}
      <TypeFilter 
        types={searchTypes}
        initialSelectedTypes={initialSelectedTypes}
        onChange={handleTypeChange}
      />

      <Divider sx={{ my: 2 }} />

      {/* Distance Filter */}
      <DistanceFilter
        distances={distances}
        selectedDistance={distance}
        onChange={onDistanceChange || (() => {})}
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
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SearchIcon />}
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