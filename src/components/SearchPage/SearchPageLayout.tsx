import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';
import FiltersContainer from './FiltersContainer';
import ResultsContainer from './ResultsContainer';
import { SearchResultItem } from '@/mocks/SearchResults';

interface SearchPageLayoutProps {
  /**
   * Search results to display
   */
  results: SearchResultItem[];
  
  /**
   * Optional title for the search page
   */
  title?: string;
  
  /**
   * Optional callback for when a type filter changes
   */
  onTypeChange?: (selectedTypes: string[]) => void;
  
  /**
   * Optional callback for when tag filter changes
   */
  onTagChange?: (selectedTags: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  }) => void;
  
  /**
   * Optional callback for when a result is clicked
   */
  onResultClick?: (id: number) => void;
}

/**
 * Layout component for the search page with responsive design
 * - Title bar at the top
 * - Two containers side by side on desktop
 * - Right container takes 9 lanes on desktop, 12 on mobile
 * - Left container takes 3 lanes on desktop, appears above results on mobile
 */
export default function SearchPageLayout({
  results,
  title = 'Search Results',
  onTypeChange,
  onTagChange,
  onResultClick
}: SearchPageLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{ padding: 2 }}>
      {/* Title Bar */}
      <Card sx={{ marginBottom: 2 }}>
        <CardHeader 
          title={title}
          style={{
            background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))",
            color: "#FFFFFF",
            fontSize: "1.5rem",
            textShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)",
          }}
        />
      </Card>
      
      {/* Main Content */}
      <Grid container spacing={2}>
        {/* Filters Section - Desktop view (side by side) or Mobile view (above results) */}
        {/* For desktop: 3 columns on the left */}
        {/* For mobile: full width above results */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ marginBottom: isMobile ? 2 : 0 }}>
            <CardHeader 
              title="Filters"
              style={{
                background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))",
                color: "#FFFFFF",
                fontSize: "1.5rem",
                textShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)",
              }}
            />
            <CardContent>
              <FiltersContainer 
                onTypeChange={onTypeChange}
                onTagChange={onTagChange}
              />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Results Section */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card>
            <CardHeader 
              title="Results"
              style={{
                background: "linear-gradient(135deg, rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 1))",
                color: "#FFFFFF",
                fontSize: "1.5rem",
                textShadow: "0px 3px 6px rgba(0, 0, 0, 0.5)",
              }}
            />
            <CardContent>
              {/* Results content */}
              <ResultsContainer 
                results={results}
                onResultClick={onResultClick}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}