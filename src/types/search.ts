export type SearchResultType = "player" | "event" | "table";

export interface SearchResultItem {
  id: number;
  title: string;
  description: string;
  type: SearchResultType;
  tags?: number[];
  imageUrl?: string;
  date?: string;
  numTables?: number;
  numPlayers?: number;
  capacity?: number;
  waitlistCount?: number;
  hasDM?: boolean;
  location?: string;
  organizer?: string;
  dungeonMaster?: string;
  shortDescription?: string;
  fullDescription?: string;
  nextGameTime?: string | Date;
}

export interface SearchCriteria {
  selectedTypes: string[];
  selectedTags: {
    mustHave: number[];
    mustNotHave: number[];
    shouldHaveAtLeastOne: number[];
  };
  textSearch: {
    query: string;
    titleOnly: boolean;
  };
  includeExpiredTables: boolean;
}

export interface PaginationData {
  currentPacket: number;
  totalPackets: number;
  totalResults: number;
  packetSize: number;
}
