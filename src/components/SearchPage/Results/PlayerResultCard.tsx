"use client"
import React from 'react';
import Avatar from '@mui/material/Avatar';
import BaseSearchResultCard from './BaseSearchResultCard';
import { Tag } from "@/types/tag";
import { SearchResultItem } from '@/types/search';

interface PlayerResultCardProps {
  result: SearchResultItem;
  onClick?: (id: number) => void;
  tags: Tag[];
}

/**
 * Component for displaying player search results
 * Displays player avatars with consistent color hashing/fallbacks
 */
const PlayerResultCard: React.FC<PlayerResultCardProps> = ({ 
  result,
  onClick,
  tags
}) => {
  // Get the first letter of the username for the avatar fallback
  const firstLetter = result.title.charAt(0).toUpperCase();
  
  // Generate a consistent color based on the username
  const getAvatarColor = (name: string) => {
    const colors = [
      '#F44336', '#E91E63', '#9C27B0', '#673AB7', 
      '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', 
      '#009688', '#4CAF50', '#8BC34A', '#CDDC39', 
      '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  const avatarColor = getAvatarColor(result.title);
  
  const playerIcon = (
    <Avatar 
      src={result.imageUrl} 
      alt={result.title}
      sx={{ 
        width: 40, 
        height: 40, 
        bgcolor: !result.imageUrl ? avatarColor : undefined
      }}
    >
      {!result.imageUrl && firstLetter}
    </Avatar>
  );

  return (
    <BaseSearchResultCard result={result} onClick={onClick} icon={playerIcon} tags={tags}>
      {/* No additional content needed */}
    </BaseSearchResultCard>
  );
};

export default PlayerResultCard;