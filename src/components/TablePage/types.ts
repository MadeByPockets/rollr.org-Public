"use client";

import type { Player } from "@/types/player";
import type { TableRecord } from "@/types/tables";
import type { Tag } from "@/types/tag";

export interface UpdatableValues {
    description?: string;
    shortDescription?: string;
    tags?: number[];
    communicationPrefs?: string;
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
  startWithEditTitle: boolean;
  onSaveDraft?: (draft: TableRecord) => void | Promise<void>;
  onJoinWaitlist?: () => void | Promise<void>;
  onLeaveTable?: () => void | Promise<void>;
  onDeleteTable?: () => void | Promise<void>;
}
