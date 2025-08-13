import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Popper, { PopperProps } from '@mui/material/Popper';
import {TagsFormat} from '@/mocks/Tags';
import Divider from '@mui/material/Divider';

interface TagsFilterProps {
  onChange?: (selectedTags: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  }) => void;
  tags: TagsFormat[];
}

type TagCategory = 'mustHave' | 'mustNotHave' | 'shouldHaveAtLeastOne';

/**
 * Component for filtering search results by tags
 * Uses Autocomplete for interactive tag selection similar to PlayerTagsEdit
 * Provides three separate sections for tags: must haves, must not haves, and should contain at least one
 */
const TagsFilter: React.FC<TagsFilterProps> = ({ 
  onChange, tags: Tags = []
}) => {
  const [mustHaveTags, setMustHaveTags] = React.useState<number[]>([]);
  const [mustNotHaveTags, setMustNotHaveTags] = React.useState<number[]>([]);
  const [shouldHaveAtLeastOneTags, setShouldHaveAtLeastOneTags] = React.useState<number[]>([]);
  Tags = !!Tags ? Tags : [];
  
  const [inputValues, setInputValues] = React.useState({
    mustHave: '',
    mustNotHave: '',
    shouldHaveAtLeastOne: ''
  });

  // Convert tags to format needed for Autocomplete
  const tagOptions = React.useMemo(() => {
    console.log("available tags: " + JSON.stringify(Tags))
    console.log(!Tags)
    if (!Tags || Tags.length == 0 || !Tags.map) return [];
    return Tags.map(tag => ({
      value: tag.id,
      label: tag.label
    }));
  }, [Tags]);

  const handleTagChange = (tagId: number, category: TagCategory) => {
    let newTags: number[] = [];
    
    switch (category) {
      case 'mustHave':
        newTags = mustHaveTags.includes(tagId)
          ? mustHaveTags.filter(id => id !== tagId)
          : [...mustHaveTags, tagId];
        setMustHaveTags(newTags);
        break;
      case 'mustNotHave':
        newTags = mustNotHaveTags.includes(tagId)
          ? mustNotHaveTags.filter(id => id !== tagId)
          : [...mustNotHaveTags, tagId];
        setMustNotHaveTags(newTags);
        break;
      case 'shouldHaveAtLeastOne':
        newTags = shouldHaveAtLeastOneTags.includes(tagId)
          ? shouldHaveAtLeastOneTags.filter(id => id !== tagId)
          : [...shouldHaveAtLeastOneTags, tagId];
        setShouldHaveAtLeastOneTags(newTags);
        break;
    }
    
    if (onChange) {
      onChange({
        mustHave: category === 'mustHave' ? newTags : mustHaveTags,
        mustNotHave: category === 'mustNotHave' ? newTags : mustNotHaveTags,
        shouldHaveAtLeastOne: category === 'shouldHaveAtLeastOne' ? newTags : shouldHaveAtLeastOneTags
      });
    }
  };

  // Render selected tags as labels with remove buttons
  const renderSelectedTags = (selectedTags: number[], category: TagCategory) => {
    const tagValues: TagsFormat[] = [];

    if (!Tags || Tags.length == 0 || !Tags.map) return null;
    Tags.forEach((tag) => {
      if (selectedTags.includes(tag.id)) {
        tagValues.push(tag);
      }
    });

    if (tagValues.length === 0) {
      return null;
    }

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {tagValues.map((tag) => (
          <span
            key={tag.id}
            className="inline-block text-sm px-3 py-1 rounded-full outline-black outline-2 font-outlined"
            style={{
              background: tag.color || '#bfbcbb',
              color: "white",
              textShadow: "black 0.2em 0.2em 0.4em"
            }}
          >
            {tag.label}
            <button 
              type="button" 
              onClick={() => handleTagChange(tag.id, category)}
              className="ml-2 text-red-500 bg-white bg-opacity-50 rounded-full outline-black outline-2 font-outlined"
            >
              &times;
            </button>
          </span>
        ))}
      </Box>
    );
  };

  // Helper function to create an Autocomplete component for a specific category
  const createTagSelector = (category: TagCategory, label: string) => {
    const selectedTags = 
      category === 'mustHave' 
        ? mustHaveTags 
        : category === 'mustNotHave' 
          ? mustNotHaveTags 
          : shouldHaveAtLeastOneTags;
    
    return (
      <>
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {label}
        </Typography>
        
        {renderSelectedTags(selectedTags, category)}
        
        <Autocomplete
          key={`${category}-${selectedTags.join('-')}`}
          options={tagOptions}
          filterOptions={(options, state) => {
            // Determine which tags to exclude based on the current category
            const tagsToExclude = new Set<number>();
            
            // Always exclude tags already selected in the current category
            selectedTags.forEach(id => tagsToExclude.add(id));
            
            // Exclude tags selected in other categories
            if (category !== 'mustHave') {
              mustHaveTags.forEach(id => tagsToExclude.add(id));
            }
            if (category !== 'mustNotHave') {
              mustNotHaveTags.forEach(id => tagsToExclude.add(id));
            }
            if (category !== 'shouldHaveAtLeastOne') {
              shouldHaveAtLeastOneTags.forEach(id => tagsToExclude.add(id));
            }
            
            return options
              .filter(
                (option) =>
                  // Exclude options already selected in any category
                  !tagsToExclude.has(option.value) &&
                  // Filter based on user input
                  option.label.toLowerCase().includes(state.inputValue.toLowerCase())
              )
              .slice(0, 3); // Show up to 3 results
          }}
          value={null} // Clearing the selected value immediately
          inputValue={inputValues[category]} // Bind the input value to state
          onInputChange={(event, newInputValue) => {
            // Check if this is clearing after selection
            if (event && event.type === 'change') {
              setInputValues({
                ...inputValues,
                [category]: newInputValue
              });
            }
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              handleTagChange(newValue.value, category); // Update selected tags
            }
            // Clear the text box after selection
            setInputValues({
              ...inputValues,
              [category]: ''
            });
          }}
          slots={{ popper: CustomPopper }}
          renderInput={(params) => <TextField {...params} label={`Select ${label}`} />}
        />
      </>
    );
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Tags
      </Typography>
      
      {createTagSelector('mustHave', 'Must Have Tags')}
      
      <Divider sx={{ my: 2 }} />
      
      {createTagSelector('mustNotHave', 'Must Not Have Tags')}
      
      <Divider sx={{ my: 2 }} />
      
      {createTagSelector('shouldHaveAtLeastOne', 'Should Contain At Least One Tag')}
    </>
  );
};

// Custom popper for dropdown placement
const CustomPopper = (props: PopperProps) => {
  return (
    <Popper
      {...props}
      modifiers={[
        {
          name: "preventOverflow",
          options: {
            boundary: "viewport", // Prevent the Popper from going outside the viewport
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, -10], // Set negative vertical offset (adjust value as needed)
          },
        },
      ]}
      placement="top-start" // Position the dropdown above the input field
    />
  );
};

export default TagsFilter;