import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SearchResultItem } from '@/mocks/SearchResults';
import {TagsFormat} from '@/mocks/Tags';

export interface BaseSearchResultCardProps {
  result: SearchResultItem;
  onClick?: (id: number) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  tags: TagsFormat[];
}

/**
 * Base component for displaying search results with common functionality
 */
const BaseSearchResultCard: React.FC<BaseSearchResultCardProps> = ({ 
  result,
  onClick,
  children,
  icon,
  tags
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(result.id);
    }
  };

  return (
    <Card 
      elevation={6}
      sx={{ 
        width: '100%', 
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.2)'
        },
        marginBottom: 2
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Icon on the left */}
        {icon && (
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', pt: 0.5 }}>
            {icon}
          </Box>
        )}
        
        {/* Content on the right */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {result.title}
          </Typography>
          
          {/* Specialized content will be inserted here */}
          {children}
          
          <Typography variant="body1">
            {result.description}
          </Typography>
          
          {result.tags && result.tags.length > 0 && (
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {result.tags.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);
                return tag ? (
                  <span
                    key={tag.id}
                    className="inline-block text-sm px-3 py-1 rounded-full outline-black outline-2 font-outlined"
                    style={{
                      background: tag.color || '#bfbcbb',
                      color: "white",
                      textShadow: "black 0.2em 0.2em 0.4em"
                    }}
                  >
                    {tag.label}
                  </span>
                ) : null;
              })}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BaseSearchResultCard;