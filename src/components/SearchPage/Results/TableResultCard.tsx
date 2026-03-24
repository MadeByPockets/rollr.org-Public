import React from 'react';
import { BaseSearchResultCard } from './BaseSearchResultCard';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { TagsFormat } from '@/types/tag';
import { SearchResultItem } from '@/types/search';

interface TableResultCardProps {
  result: SearchResultItem;
  tags: TagsFormat[];
  onClick?: (id: number) => void;
}

export const TableResultCard: React.FC<TableResultCardProps> = ({ result, tags, onClick }) => {
  const capacity = result.capacity || 1;
  const numPlayers = result.numPlayers || 0;
  const occupancy = (numPlayers / capacity) * 100;
  
  return (
    <BaseSearchResultCard result={result} tags={tags} onClick={onClick} icon={<CasinoIcon color="primary" />}>
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Players: {numPlayers} / {capacity}
          </Typography>
          {result.dungeonMaster ? (
            <Chip label="DM Present" size="small" color="success" variant="outlined" />
          ) : (
            <Chip label="No DM" size="small" color="warning" variant="outlined" />
          )}
        </Box>
        <LinearProgress variant="determinate" value={occupancy} sx={{ height: 8, borderRadius: 4 }} />
      </Box>
    </BaseSearchResultCard>
  );
};

export default TableResultCard;