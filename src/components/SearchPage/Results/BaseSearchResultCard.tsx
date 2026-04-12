import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Tag } from '@/types/tag';
import { SearchResultItem } from '@/types/search';
import NextGameLabel from "@/components/TablePage/NextGameLabel";
import { renderTagsFromIds } from "@/components/shared/TagComponents";

export interface BaseSearchResultCardProps {
  result: SearchResultItem;
  onClick?: (id: number) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  tags: Tag[];
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
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      // If modifier key is pressed, let the browser handle the navigation behavior
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        // Prevent the default onClick behavior
        e.stopPropagation();

        // Get the URL that would be navigated to
        const url = `/${result.type}/${result.id}`;

        // Open in new tab/window based on the modifier key
        window.open(url, '_blank');
      } else {
        // Normal click - use the provided onClick handler
        onClick(result.id);
      }
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
      onClick={(e) => handleClick(e)}
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
          {/* show Next Game Time if available */}
          {result.nextGameTime  && (
            <NextGameLabel nextGameTime={result.nextGameTime}/>
          )}
          {/* Show short description above player info for tables */}
          {result.type === 'table' && result.shortDescription ? (
            <Typography variant="body2" sx={{ mb: 1 }}>
              {result.shortDescription}
            </Typography>
          ) : null}

          {/* Specialized content will be inserted here */}
          {children}

          {/* Description: for tables show trimmed full description below players; otherwise show the default description */}
          {result.type === 'table' ? (
            <Typography variant="body1">
              {(() => {
                const full = result.fullDescription ?? result.description ?? '';
                const text = full || '';
                return text.length > 200 ? `${text.slice(0, 200).trimEnd()}...` : text;
              })()}
            </Typography>
          ) : (
            <Typography variant="body1">
              {result.description}
            </Typography>
          )}

          {result.tags && result.tags.length > 0 && (
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {renderTagsFromIds(result.tags, tags)}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BaseSearchResultCard;