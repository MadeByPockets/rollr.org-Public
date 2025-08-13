"use client"

import React, { useState } from 'react';
import SearchPageLayout from '@/components/SearchPage/SearchPageLayout';
import { SearchResults, SearchResultItem } from '@/mocks/SearchResults';
import { Tags } from '@/mocks/Tags';
import {SelectChangeEvent} from "@mui/material/Select";

/**
 * Search page component that serves as a shell to deliver the SearchPageLayout
 */
const SearchPage = () => {
  // State to store current filter values
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<{
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  }>({
    mustHave: [],
    mustNotHave: [],
    shouldHaveAtLeastOne: []
  });
  const [distance, setDistance] = useState<string>("15");
  
  // State to store filtered results
  const [filteredResults, setFilteredResults] = useState<SearchResultItem[]>(SearchResults);

  // Handler for type filter changes
  const handleTypeChange = (types: string[]) => {
    setSelectedTypes(types);
    console.log('Selected types:', types);
  };

  // Handler for tag filter changes
  const handleTagChange = (tags: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  }) => {
    setSelectedTags(tags);
    console.log('Must have tags:', tags.mustHave);
    console.log('Must not have tags:', tags.mustNotHave);
    console.log('Should contain at least one tag:', tags.shouldHaveAtLeastOne);
  };
  
  // Handler for distance filter changes
  
  const handleDistanceChange = (event: SelectChangeEvent) => {
    setDistance(event.target.value);
    console.log('Distance:', event.target.value);
  }

  // Handler for search button click
  const handleSubmit = () => {
    console.log('Search button clicked');
    console.log('Applying filters:', { selectedTypes, selectedTags });
    
    // Filter results based on selected types and tags
    let results = [...SearchResults];
    
    // Filter by type if any types are selected
    if (selectedTypes.length > 0) {
      results = results.filter(result => selectedTypes.includes(result.type));
    }
    
    // Filter by "must have" tags
    if (selectedTags.mustHave.length > 0) {
      results = results.filter(result => 
        result.tags && selectedTags.mustHave.every(tagId => result.tags!.includes(tagId))
      );
    }
    
    // Filter by "must not have" tags
    if (selectedTags.mustNotHave.length > 0) {
      results = results.filter(result => 
        !result.tags || !selectedTags.mustNotHave.some(tagId => result.tags!.includes(tagId))
      );
    }
    
    // Filter by "should have at least one" tags
    if (selectedTags.shouldHaveAtLeastOne.length > 0) {
      results = results.filter(result => 
        result.tags && selectedTags.shouldHaveAtLeastOne.some(tagId => result.tags!.includes(tagId))
      );
    }
    
    // Update filtered results
    setFilteredResults(results);
    console.log('Filtered results:', results);
  };

  const handleResultClick = (id: number) => {
    console.log('Result clicked:', id);
  };

  return (
    <SearchPageLayout
        title="Search"
        results={filteredResults}
        onTypeChange={handleTypeChange}
        onTagChange={handleTagChange}
        onSubmit={handleSubmit}
        onResultClick={handleResultClick}
        allTags={Tags}
        validTags={Tags}
        distance={distance}
        onDistanceChange={handleDistanceChange}/>
  );
};

export default SearchPage;