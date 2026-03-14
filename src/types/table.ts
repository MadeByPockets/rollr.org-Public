export interface TableFormat {
  availability?: string;
  capacity?: number;
  communicationPreferences: string;
  description: string;
  dungeonMaster: number;
  features?: string[];
  id: number;
  imageUrl?: string;
  location?: string;
  owner: number;
  players: number[];
  shortDescription: string;
  title: string;
  waitlist: number[];
  tags?: number[];
}
