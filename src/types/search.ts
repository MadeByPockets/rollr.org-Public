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
}
