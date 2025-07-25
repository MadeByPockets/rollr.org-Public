export interface SearchResultItem {
  id: number;
  title: string;
  description: string;
  type: 'player' | 'event' | 'table';
  tags?: number[];
  imageUrl?: string;
  date?: string;
}

export const SearchResults: SearchResultItem[] = [
  {
    id: 1,
    title: 'DragonSlayer99',
    description: 'Professional gamer specializing in RPGs and strategy games.',
    type: 'player',
    tags: [1, 5, 7],
    imageUrl: '/images/players/player1.jpg'
  },
  {
    id: 2,
    title: 'MysticHealer',
    description: 'Support specialist with over 5 years of competitive gaming experience.',
    type: 'player',
    tags: [5, 9, 11],
    imageUrl: '/images/players/player2.jpg'
  },
  {
    id: 3,
    title: 'Epic Raid Tournament',
    description: 'Annual tournament featuring the best raid teams from around the world.',
    type: 'event',
    tags: [1, 5, 11],
    date: '2025-08-15'
  },
  {
    id: 4,
    title: 'Critical Hit Table',
    description: 'Premium gaming table with integrated digital features for enhanced gameplay.',
    type: 'table',
    tags: [1, 4, 10],
    imageUrl: '/images/tables/table1.jpg'
  },
  {
    id: 5,
    title: 'StrategyMaster42',
    description: 'Top-ranked player known for innovative tactics and leadership.',
    type: 'player',
    tags: [3, 5, 11],
    imageUrl: '/images/players/player3.jpg'
  },
  {
    id: 6,
    title: 'Summer Gaming Festival',
    description: 'Three-day event with tournaments, workshops, and networking opportunities.',
    type: 'event',
    tags: [2, 6, 9],
    date: '2025-07-30'
  },
  {
    id: 7,
    title: 'Dragon\'s Lair Table',
    description: 'Themed gaming table with immersive lighting and sound effects for RPG sessions.',
    type: 'table',
    tags: [1, 7, 12],
    imageUrl: '/images/tables/table2.jpg'
  },
  {
    id: 8,
    title: 'SpeedRunner',
    description: 'World record holder for multiple game speedruns.',
    type: 'player',
    tags: [2, 5, 8],
    imageUrl: '/images/players/player4.jpg'
  }
];

export const SearchFilters = {
  types: [
    { id: 'player', label: 'Players' },
    { id: 'event', label: 'Events' },
    { id: 'table', label: 'Tables' }
  ],
  sortOptions: [
    { id: 'relevance', label: 'Relevance' },
    { id: 'date', label: 'Date' },
    { id: 'name', label: 'Name' }
  ]
};