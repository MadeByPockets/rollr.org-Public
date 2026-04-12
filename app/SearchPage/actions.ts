"use server"

import { MockedSearchResults } from '@/mocks/SearchResults';
import { PaginationData } from '@/types/search';

/**
 * Server Action for searching with results partitioned into packets
 */
export async function performSearchAction(criteria: any, packet: number) {
  console.log('--- SERVER-SIDE SEARCH ACTION ---');
  console.log('Criteria:', criteria);
  console.log('Packet:', packet);

  // Simulate network delay to "slow down data scraping"
  await new Promise(resolve => setTimeout(resolve, 800));

  // Filter results based on criteria
  let results = [...MockedSearchResults];
  
  if (criteria.selectedTypes && criteria.selectedTypes.length > 0) {
    results = results.filter(result => criteria.selectedTypes.includes(result.type));
  }
  
  if (criteria.textSearch && criteria.textSearch.query.trim()) {
    const q = criteria.textSearch.query.toLowerCase();
    results = results.filter(result => {
      const inTitle = result.title.toLowerCase().includes(q);
      if (criteria.textSearch.titleOnly) return inTitle;
      const inDesc = result.description.toLowerCase().includes(q);
      return inTitle || inDesc;
    });
  }

  if (criteria.includeExpiredTables === false) {
    const now = new Date();
    results = results.filter(result => {
      if (result.type !== 'table' || !result.date) return true;
      return new Date(result.date) >= now;
    });
  }

  if (criteria.selectedTags) {
    if (criteria.selectedTags.mustHave.length > 0) {
      results = results.filter(result => 
        result.tags && criteria.selectedTags.mustHave.every((tagId: number) => result.tags!.includes(tagId))
      );
    }
    
    if (criteria.selectedTags.mustNotHave.length > 0) {
      results = results.filter(result => 
        !result.tags || !criteria.selectedTags.mustNotHave.some((tagId: number) => result.tags!.includes(tagId))
      );
    }
    
    if (criteria.selectedTags.shouldHaveAtLeastOne.length > 0) {
      results = results.filter(result => 
        result.tags && criteria.selectedTags.shouldHaveAtLeastOne.some((tagId: number) => result.tags!.includes(tagId))
      );
    }
  }

  // Server-side partitioning: limit to 20 results per packet
  const packetSize = 20;
  const totalResults = results.length;
  const totalPackets = Math.ceil(totalResults / packetSize) || 1;
  
  // Ensure we don't request a packet out of bounds
  const requestedPacket = Math.max(1, Math.min(packet, totalPackets));
  const startIndex = (requestedPacket - 1) * packetSize;
  const paginatedResults = results.slice(startIndex, startIndex + packetSize);

  return {
    results: paginatedResults,
    pagination: {
      currentPacket: requestedPacket,
      totalPackets,
      totalResults,
      packetSize
    } as PaginationData
  };
}
