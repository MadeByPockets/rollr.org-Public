export interface Tag {
  id: number;
  label: string;
  color?: string;
  image?: string;
  alternate_title?: string[] | null;
  appliesTo: {
    players: boolean;
    events: boolean;
    tables: boolean;
  };
}