import React from 'react';
import Avatar from '@mui/material/Avatar';
import { SearchResultItem } from '@/mocks/SearchResults';
import BaseSearchResultCard, { BaseSearchResultCardProps } from './BaseSearchResultCard';

interface PlayerResultCardProps extends BaseSearchResultCardProps {
  result: SearchResultItem & { type: 'player' };
}

/**
 * Component for displaying player search results
 * Includes an avatar image or defaults to a MUI colored circle with a letter in it
 */
const PlayerResultCard: React.FC<PlayerResultCardProps> = ({ 
  result,
  onClick
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
    
    // Simple hash function to get a consistent index
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  const avatarColor = getAvatarColor(result.title);
  
  // Create avatar for use as icon
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
    <BaseSearchResultCard result={result} onClick={onClick} icon={playerIcon}>
      {/* No additional content needed after removing join date */}
    </BaseSearchResultCard>
  );
};

export default PlayerResultCard;