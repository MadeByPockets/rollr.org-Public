export interface Tag {
  id: number;
  label: string;
  color?: string;
  image?: string;
  appliesTo?: {
    players: boolean;
    events: boolean;
    tables: boolean;
  };
}

export type TagsFormat = Tag;
