import React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

interface SortOptionsProps {
  defaultValue?: string;
  onChange?: (sortOption: string) => void;
}

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'newest', label: 'Newest' },
  { id: 'popular', label: 'Most Popular' },
];

const SortOptions: React.FC<SortOptionsProps> = ({
  defaultValue = 'relevance',
  onChange
}) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Sort By
      </Typography>
      <FormControl>
        <RadioGroup defaultValue={defaultValue} onChange={handleSortChange}>
          {SORT_OPTIONS.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default SortOptions;
