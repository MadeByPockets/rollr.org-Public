"use client"
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

interface ExpiredTablesFilterProps {
  includeExpiredTables: boolean;
  onChange: (include: boolean) => void;
}

const ExpiredTablesFilter: React.FC<ExpiredTablesFilterProps> = ({
  includeExpiredTables,
  onChange
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={includeExpiredTables}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
          />
        }
        label="Show expired tables"
      />
    </Box>
  );
};

export default ExpiredTablesFilter;
