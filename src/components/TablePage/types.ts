import type { Player, TableRecord, Tag } from "@/types";

export interface UpdatableValues {
    description?: string;
    shortDescription?: string;
    tags?: number[];
    communicationPrefs?: string;
    owner?: string;
    dungeonMaster?: string;
}

export type TableStatus = {
    isPlayer: boolean;
    isDM: boolean;
    isOwner: boolean;
    onWaitlist: boolean;
}

export interface TablePageLayoutProps {
  table: TableRecord;
  allTags: Tag[];
  players: Player[];
  dungeonMaster: Player;
  waitlistPlayers: Player[];
  tableStatus: TableStatus;
  onSaveDraft?: (draft: TableRecord) => void | Promise<void>;
  onJoinWaitlist?: () => void | Promise<void>;
  onLeaveTable?: () => void | Promise<void>;
  onDeleteTable?: () => void | Promise<void>;
}
