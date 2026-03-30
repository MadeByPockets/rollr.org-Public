export interface TableFormat {
  availability?: string;
  capacity: number;
  communicationPreferences: string;
  description: string;
  dungeonMaster?: string;
  features?: string[];
  id: number;
  imageUrl?: string;
  location?: string;
  players: number[];
  shortDescription: string;
  title: string;
  waitlist: number[];
  tags?: number[];
  numPlayers: number;
  hasDM: boolean;
  nextGameTime?: Date | string;
}
