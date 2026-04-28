"use client";

import React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DistanceOption } from '@/types/search';

interface DistanceFilterProps {
  distances: DistanceOption[];
  selectedDistance?: number;
  onChange: (distance: number) => void;
}

/**
 * Component for filtering search results by distance
 * //todo add JSDoc for this
 */
const DistanceFilter: React.FC<DistanceFilterProps> = ({ distances, selectedDistance, onChange }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Distance
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={selectedDistance !== undefined ? selectedDistance : ''}
          onChange={(e) => onChange(Number(e.target.value))}
          displayEmpty
        >
          <MenuItem value="">
            <em>Any Distance</em>
          </MenuItem>
          {distances.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.display}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DistanceFilter;
