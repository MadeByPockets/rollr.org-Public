"use client"

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import SearchPageLayout from '@/components/SearchPage/SearchPageLayout';
import { SearchResultItem, PaginationData, SearchCriteria } from '@/types/search';
import { MockedTags } from '@/mocks/Tags';
import { MockedSearchFilters } from '@/mocks/SearchResults';
import { performSearchAction } from './actions';
import { criteriaToSearchParams, searchParamsToCriteria } from '@/utils/searchUrl';

/**
 * Search page content that uses search params
 */
const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // State to store results
  const [results, setResults] = useState<SearchResultItem[]>([]);
  
  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Pagination (Packet) state
  const [pagination, setPagination] = useState<PaginationData>({
    currentPacket: 1,
    totalPackets: 1,
    totalResults: 0,
    packetSize: 20
  });

  // Track the criteria currently active on the server (for pagination)
  const [activeCriteria, setActiveCriteria] = useState<SearchCriteria | null>(null);

  /**
   * Effect to load data when search params change
   */
  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      const { criteria, packet } = searchParamsToCriteria(searchParams);
      
      const response = await performSearchAction(criteria, packet);
      setResults(response.results);
      setPagination(response.pagination);
      setActiveCriteria(criteria);
      setIsLoading(false);
    };
    loadResults();
  }, [searchParams]);

  /**
   * Handler for when a search is submitted
   */
  const handleSearch = (criteria: SearchCriteria) => {
    const params = criteriaToSearchParams(criteria, 1);
    router.push(`${pathname}?${params.toString()}`);
  };

  /**
   * Handler for packet changes
   */
  const handlePacketChange = (packet: number) => {
    if (!activeCriteria) return;
    const params = criteriaToSearchParams(activeCriteria, packet);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleResultClick = (id: number) => {
    console.log('Result clicked:', id);
  };

  // Get current criteria from search params for initial state of layout
  const { criteria: currentCriteria } = useMemo(() => searchParamsToCriteria(searchParams), [searchParams]);

  return (
    <SearchPageLayout
        title="Search"
        results={results}
        pagination={pagination}
        onPacketChange={handlePacketChange}
        isLoading={isLoading}
        onSubmit={handleSearch}
        onResultClick={handleResultClick} 
        allTags={MockedTags} 
        validTags={MockedTags}
        searchTypes={MockedSearchFilters.types}
        initialSelectedTypes={currentCriteria.selectedTypes}
        initialSelectedTags={currentCriteria.selectedTags}
        initialTextSearch={currentCriteria.textSearch}
        includeExpiredTables={currentCriteria.includeExpiredTables}
    />
  );
};

/**
 * Search page component that serves as a shell to deliver the SearchPageLayout
 */
const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading Search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;