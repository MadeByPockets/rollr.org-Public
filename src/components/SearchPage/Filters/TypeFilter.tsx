"use client";

import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface TypeFilterProps {
  types: { id: string; label: string }[];
  initialSelectedTypes?: string[];
  onChange?: (selectedTypes: string[]) => void;
}

/**
 * Component for filtering search results by type (player, event, table)
 */
const TypeFilter: React.FC<TypeFilterProps> = ({ types, initialSelectedTypes = [], onChange }) => {
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>(initialSelectedTypes);

  // Update state when initialSelectedTypes changes
  useEffect(() => {
    setSelectedTypes(initialSelectedTypes);
  }, [initialSelectedTypes]);

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
        {types.map((type) => (
          <FormControlLabel
            key={type.id}
            control={
              <Checkbox 
                checked={selectedTypes.includes(type.id)}
                onChange={() => handleTypeChange(type.id)}
                disabled={type.id === 'event'}
                title={type.id === 'event' ? 'Coming soon! Currently only player and table search are supported.' : ''}
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
