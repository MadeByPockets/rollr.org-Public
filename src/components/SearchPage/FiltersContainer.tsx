import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TypeFilter from './Filters/TypeFilter';
import TagsFilter from './Filters/TagsFilter';
import {TagsFormat} from '@/mocks/Tags';

interface FiltersContainerProps {
  onTypeChange?: (selectedTypes: string[]) => void;
  onTagChange?: (selectedTags: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  }) => void;
  onSubmit?: () => void;
  tags: TagsFormat[];
}

/**
 * Container component that combines all filter components
 */
const FiltersContainer: React.FC<FiltersContainerProps> = ({
  onTypeChange,
  onTagChange,
  onSubmit,
  tags
}) => {
  return (
    <Box>
      {/* Type Filters */}
      <TypeFilter onChange={onTypeChange}/>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Tags Filter */}
      <TagsFilter
        tags={tags}
        onChange={onTagChange} 
      />
      
      <Divider sx={{ my: 2 }} />
      
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