import React from 'react';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MockedSearchFilters } from '@/mocks/SearchResults';

interface TypeFilterProps {
  onChange?: (selectedTypes: string[]) => void;
}

/**
 * Component for filtering search results by type (player, event, guild)
 */
const TypeFilter: React.FC<TypeFilterProps> = ({ onChange }) => {
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);

  const handleTypeChange = (typeId: string) => {
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newSelectedTypes);
    
    if (onChange) {
      onChange(newSelectedTypes);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Type
      </Typography>
      <FormGroup>
        {MockedSearchFilters.types.map((type) => (
          <FormControlLabel
            key={type.id}
            control={
              <Checkbox 
                checked={selectedTypes.includes(type.id)}
                onChange={() => handleTypeChange(type.id)}
                disabled={type.id === 'event' || type.id === 'table'}
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