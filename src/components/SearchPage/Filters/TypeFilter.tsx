import React from 'react';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import type { SearchResultType } from '@/types/search';

interface TypeFilterProps {
  onChange?: (selectedTypes: SearchResultType[]) => void;
}

const FILTER_TYPES: Array<{ id: SearchResultType; label: string; disabled?: boolean }> = [
  { id: 'player', label: 'Players' },
  { id: 'event', label: 'Events', disabled: true },
  { id: 'table', label: 'Tables', disabled: true },
];

const TypeFilter: React.FC<TypeFilterProps> = ({ onChange }) => {
  const [selectedTypes, setSelectedTypes] = React.useState<SearchResultType[]>([]);

  const handleTypeChange = (typeId: SearchResultType) => {
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter((id) => id !== typeId)
      : [...selectedTypes, typeId];

    setSelectedTypes(newSelectedTypes);
    onChange?.(newSelectedTypes);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Type
      </Typography>
      <FormGroup>
        {FILTER_TYPES.map((type) => (
          <FormControlLabel
            key={type.id}
            control={
              <Checkbox
                checked={selectedTypes.includes(type.id)}
                onChange={() => handleTypeChange(type.id)}
                disabled={type.disabled}
              />
            }
            label={type.label}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default TypeFilter;
