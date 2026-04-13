import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

interface TextSearchCardProps {
  onChange?: (textSearch: { query: string; titleOnly: boolean }) => void;
  selectedTypes: string[];
  initialTextSearch?: {
    query: string;
    titleOnly: boolean;
  };
}

/**
 * Component for searching text within tables and events
 * Only shown when table or event types are selected
 */
const TextSearchCard: React.FC<TextSearchCardProps> = ({ onChange, selectedTypes, initialTextSearch }) => {
  const [query, setQuery] = React.useState<string>(initialTextSearch?.query || '');
  const [titleOnly, setTitleOnly] = React.useState<boolean>(initialTextSearch?.titleOnly || false);

  // Update state when initialTextSearch changes
  useEffect(() => {
    if (initialTextSearch) {
      setQuery(initialTextSearch.query || '');
      setTitleOnly(initialTextSearch.titleOnly || false);
    }
  }, [initialTextSearch]);

  // Check if we should show this card (only when table or event is selected)
  const shouldShow = selectedTypes.includes('table') || selectedTypes.includes('event');

  if (!shouldShow) {
    return null;
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (onChange) {
      onChange({ query: newQuery, titleOnly });
    }
  };

  const handleTitleOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitleOnly = e.target.checked;
    setTitleOnly(newTitleOnly);

    if (onChange) {
      onChange({ query, titleOnly: newTitleOnly });
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Text Search
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search in title and description"
          variant="outlined"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter search terms..."
          sx={{ mb: 1 }}
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={titleOnly}
              onChange={handleTitleOnlyChange}
            />
          }
          label="Search in title only"
        />
      </Box>
    </>
  );
};

export default TextSearchCard;
