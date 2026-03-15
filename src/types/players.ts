export interface Player {
  id: number;
  username: string;
  description: string;
  experience?: number;
  preferredGames?: string[];
  tags?: number[];
  imageUrl?: string;
  joinDate?: string;
  miniPic: string;
  discordId?: number;
}
