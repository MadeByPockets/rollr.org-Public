export interface Player {
  id: number;
  username: string;
  description?: string;
  experience?: number;
  preferredGames?: string[];
  tags?: number[];
  imageUrl?: string;
  joinDate?: string;
  miniPic?: string;
  discordId?: number;
  preferredPronouns?: string | null;
  bio?: string | null;
  role?: string;
  isHost?: boolean;
}

export type PlayerFormat = Player;
export type WaitlistPlayer = Pick<Player, "id" | "username" | "miniPic">;
