import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useMediaQuery, useTheme } from '@mui/material';
import FiltersContainer from './FiltersContainer';
import ResultsContainer from './ResultsContainer';
import { SearchResultItem, PaginationData, SearchCriteria } from '@/types/search';
import { Tag } from '@/types/tag';

interface SearchPageLayoutProps {
  /**
   * Search results to display
   */
  results: SearchResultItem[];

  /**
   * Pagination information
   */
  pagination?: PaginationData;

  /**
   * Optional callback for when the packet changes
   */
  onPacketChange?: (packet: number) => void;

  /**
   * Optional title for the search page
   */
  title?: string;

  /**
   * Initial selected types for the type filter
   */
  initialSelectedTypes?: string[];

  /**
   * Initial selected tags for the tag filter
   */
  initialSelectedTags?: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  };

  /**
   * Initial text search values
   */
  initialTextSearch?: {
    query: string;
    titleOnly: boolean;
  };

  /**
   * Include expired tables option
   */
  includeExpiredTables?: boolean;

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
   * Optional callback for when text search changes
   */
  onTextSearchChange?: (textSearch: { query: string; titleOnly: boolean }) => void;

  /**
   * Optional callback for when include expired tables changes
   */
  onIncludeExpiredTablesChange?: (include: boolean) => void;

  allTags: Tag[];
  validTags: Tag[];

  /**
   * Optional callback for when the search button is clicked.
   * If provided, SearchPageLayout will call this when it determines a backend search is needed.
   */
  onSubmit?: (criteria: SearchCriteria) => void;

  /**
   * Is the search loading?
   */
  isLoading?: boolean;

  /**
   * Optional callback for when a result is clicked
   */
  onResultClick?: (id: number, type: "player" | "event" | "table") => void;
  searchTypes: { id: string; label: string }[];
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
  initialSelectedTypes = [],
  initialSelectedTags = {
    mustHave: [],
    mustNotHave: [],
    shouldHaveAtLeastOne: []
  },
  initialTextSearch = {
    query: '',
    titleOnly: false
  },
  includeExpiredTables: initialIncludeExpiredTables = false,
  onTypeChange,
  onTagChange,
  onTextSearchChange,
  onIncludeExpiredTablesChange,
  onSubmit,
  onResultClick,
  onPacketChange,
  pagination,
  validTags,
  allTags,
  searchTypes,
  isLoading = false
}: SearchPageLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // --- Internal Search State ---
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialSelectedTypes);
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags);
  const [textSearch, setTextSearch] = useState(initialTextSearch);
  const [includeExpiredTables, setIncludeExpiredTables] = useState<boolean>(initialIncludeExpiredTables);
  
  // Update internal state when props change
  useEffect(() => {
    setSelectedTypes(initialSelectedTypes);
  }, [initialSelectedTypes]);

  useEffect(() => {
    setSelectedTags(initialSelectedTags);
  }, [initialSelectedTags]);

  useEffect(() => {
    setTextSearch(initialTextSearch);
  }, [initialTextSearch]);

  useEffect(() => {
    setIncludeExpiredTables(initialIncludeExpiredTables);
  }, [initialIncludeExpiredTables]);

  // Handle filter changes and sync with props
  const handleTypeChange = (types: string[]) => {
    setSelectedTypes(types);
    if (onTypeChange) onTypeChange(types);
  };

  const handleTagChange = (tags: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  }) => {
    setSelectedTags(tags);
    if (onTagChange) onTagChange(tags);
  };

  const handleTextSearchChange = (ts: { query: string; titleOnly: boolean }) => {
    setTextSearch(ts);
    if (onTextSearchChange) onTextSearchChange(ts);
  };

  const handleIncludeExpiredTablesChange = (include: boolean) => {
    setIncludeExpiredTables(include);
    if (onIncludeExpiredTablesChange) onIncludeExpiredTablesChange(include);
  };

  const handleSubmit = () => {
    const currentCriteria: SearchCriteria = {
      selectedTypes,
      selectedTags,
      textSearch,
      includeExpiredTables
    };

    if (onSubmit) {
      onSubmit(currentCriteria);
    }
  };

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
                initialSelectedTypes={selectedTypes}
                initialSelectedTags={selectedTags}
                initialTextSearch={textSearch}
                includeExpiredTables={includeExpiredTables}
                onTypeChange={handleTypeChange}
                onTagChange={handleTagChange}
                onTextSearchChange={handleTextSearchChange}
                onIncludeExpiredTablesChange={handleIncludeExpiredTablesChange}
                onSubmit={handleSubmit}
                tags={validTags}
                searchTypes={searchTypes}
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
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress size={60} thickness={4} />
                </Box>
              ) : (
                <ResultsContainer 
                  results={results}
                  pagination={pagination}
                  onPacketChange={onPacketChange}
                  onResultClick={onResultClick}
                  tags={allTags}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}