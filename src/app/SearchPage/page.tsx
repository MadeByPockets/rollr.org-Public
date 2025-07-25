"use client"

import React from 'react';
import SearchPageLayout from '@/components/SearchPage/SearchPageLayout';
import { SearchResults } from '@/mocks/SearchResults';

/**
 * Search page component that serves as a shell to deliver the SearchPageLayout
 */
const SearchPage = () => {
  // These handlers would typically update state and trigger re-renders
  // For this example, they just log to the console
  const handleTypeChange = (selectedTypes: string[]) => {
    console.log('Selected types:', selectedTypes);
  };


  const handleTagChange = (selectedTags: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  }) => {
    console.log('Must have tags:', selectedTags.mustHave);
    console.log('Must not have tags:', selectedTags.mustNotHave);
    console.log('Should contain at least one tag:', selectedTags.shouldHaveAtLeastOne);
  };

  const handleResultClick = (id: number) => {
    console.log('Result clicked:', id);
  };

  return (
    <SearchPageLayout
      title="Search"
      results={SearchResults}
      onTypeChange={handleTypeChange}
      onTagChange={handleTagChange}
      onResultClick={handleResultClick}
    />
  );
};

export default SearchPage;