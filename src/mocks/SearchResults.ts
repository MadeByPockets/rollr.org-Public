export interface SearchResultItem {
  id: number;
  title: string;
  description: string;
  type: 'player' | 'event' | 'table';
  tags?: number[];
  imageUrl?: string;
  date?: string;
  // Optional metrics for events and tables
  numTables?: number; // events only
  numPlayers?: number; // events and tables
  // Table-specific optional fields
  capacity?: number;
  waitlistCount?: number;
  hasDM?: boolean;
}

export const MockedSearchResults: SearchResultItem[] = [
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
    date: '2025-08-15',
    numTables: 12,
    numPlayers: 96
  },
  {
    id: 4,
    title: 'Critical Hit Table',
    description: 'Premium gaming table with integrated digital features for enhanced gameplay.',
    type: 'table',
    tags: [1, 4, 10],
    imageUrl: '/images/tables/table1.jpg',
    capacity: 6,
    numPlayers: 4,
    waitlistCount: 1,
    hasDM: true
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
    date: '2025-07-30',
    numTables: 20,
    numPlayers: 150
  },
  {
    id: 7,
    title: 'Dragon\'s Lair Table',
    description: 'Themed gaming table with immersive lighting and sound effects for RPG sessions.',
    type: 'table',
    tags: [1, 7, 12],
    imageUrl: '/images/tables/table2.jpg',
    capacity: 8,
    numPlayers: 3,
    waitlistCount: 3,
    hasDM: false
  },
  {
    id: 8,
    title: 'SpeedRunner',
    description: 'World record holder for multiple game speedruns.',
    type: 'player',
    tags: [2, 5, 8],
    imageUrl: '/images/players/player4.jpg'
  },
  // Additional Players
  { id: 9, title: 'ArcaneArcher', description: 'Precision DPS with mastery in ranged combat and crowd control.', type: 'player', tags: [4, 8, 12], imageUrl: '/images/players/player5.jpg' },
  { id: 10, title: 'TankTitan', description: 'Unbreakable frontline with superb aggro management.', type: 'player', tags: [1, 6, 10], imageUrl: '/images/players/player6.jpg' },
  { id: 11, title: 'PuzzleProdigy', description: 'Solves complex mechanics and leads strat calls.', type: 'player', tags: [3, 5, 9], imageUrl: '/images/players/player7.jpg' },
  { id: 12, title: 'ShadowRogue', description: 'Stealth expert with burst damage and utility.', type: 'player', tags: [2, 7, 11], imageUrl: '/images/players/player8.jpg' },
  { id: 13, title: 'HealingHaven', description: 'Clutch healer with excellent resource management.', type: 'player', tags: [5, 9, 12], imageUrl: '/images/players/player9.jpg' },
  { id: 14, title: 'MetaBreaker', description: 'Innovator who discovers unconventional winning tactics.', type: 'player', tags: [1, 3, 11], imageUrl: '/images/players/player10.jpg' },
  { id: 15, title: 'FrostMage', description: 'Controls the battlefield with slows and AoE.', type: 'player', tags: [4, 8, 10], imageUrl: '/images/players/player11.jpg' },
  { id: 16, title: 'BardicInspire', description: 'Support player boosting team morale and stats.', type: 'player', tags: [5, 6, 12], imageUrl: '/images/players/player12.jpg' },
  { id: 17, title: 'CritCommander', description: 'Leads teams with macro awareness and decisive calls.', type: 'player', tags: [1, 5, 11], imageUrl: '/images/players/player13.jpg' },
  { id: 18, title: 'SummonerSeer', description: 'Pet class specialist managing multiple units.', type: 'player', tags: [2, 4, 7], imageUrl: '/images/players/player14.jpg' },
  { id: 19, title: 'GeoMonk', description: 'Tanky support with environmental control.', type: 'player', tags: [6, 8, 10], imageUrl: '/images/players/player15.jpg' },
  { id: 20, title: 'LightningLancer', description: 'Fast-paced melee with high mobility plays.', type: 'player', tags: [1, 2, 8], imageUrl: '/images/players/player16.jpg' },

  // Additional Events
  { id: 21, title: 'Winter Clash Cup', description: 'Seasonal PvP event with elimination brackets.', type: 'event', tags: [1, 4, 9], date: '2025-12-10', numTables: 10, numPlayers: 80 },
  { id: 22, title: 'Indie Dev Showcase', description: 'Spotlight on community-made modules and tools.', type: 'event', tags: [3, 6, 11], date: '2025-11-05', numTables: 6, numPlayers: 42 },
  { id: 23, title: 'Dungeon Delvers Open', description: 'Open registration raid race with live commentary.', type: 'event', tags: [2, 5, 8], date: '2025-10-20', numTables: 12, numPlayers: 96 },
  { id: 24, title: 'Spring Strategy Summit', description: 'Workshops on tactics, VOD reviews, and team building.', type: 'event', tags: [5, 7, 12], date: '2025-03-18', numTables: 8, numPlayers: 64 },
  { id: 25, title: 'Speedrun Marathon', description: 'Charity marathon featuring top speedrunners.', type: 'event', tags: [2, 8, 10], date: '2025-09-01', numTables: 5, numPlayers: 30 },
  { id: 26, title: 'Creators Con', description: 'Panels and meetups with content creators.', type: 'event', tags: [3, 9, 11], date: '2025-06-22', numTables: 14, numPlayers: 120 },
  { id: 27, title: 'Arena Masters', description: 'Team-based arena battles with seasonal rewards.', type: 'event', tags: [1, 6, 12], date: '2025-05-12', numTables: 16, numPlayers: 128 },
  { id: 28, title: 'Co-op Quest Fest', description: 'Casual co-op challenges and puzzle races.', type: 'event', tags: [4, 7, 10], date: '2025-04-08', numTables: 7, numPlayers: 49 },
  { id: 29, title: 'VR Adventures Expo', description: 'Hands-on demos for upcoming VR titles.', type: 'event', tags: [2, 3, 9], date: '2025-08-05', numTables: 9, numPlayers: 72 },
  { id: 30, title: 'Tactics League Finals', description: 'Grand finals for the national tactics league.', type: 'event', tags: [1, 5, 11], date: '2025-10-02', numTables: 10, numPlayers: 80 },
  { id: 31, title: 'Guild Summit', description: 'Networking event for guild leaders and organizers.', type: 'event', tags: [6, 9, 12], date: '2025-07-12', numTables: 4, numPlayers: 28 },
  { id: 32, title: 'Retro Games Carnival', description: 'Celebration of classic games with tournaments.', type: 'event', tags: [3, 4, 8], date: '2025-02-14', numTables: 6, numPlayers: 48 },

  // Additional Tables
  { id: 33, title: 'Nebula Nexus Table', description: 'Sci-fi themed table with modular hex grid.', type: 'table', tags: [2, 4, 9], imageUrl: '/images/tables/table3.jpg', capacity: 6, numPlayers: 5, waitlistCount: 0, hasDM: false },
  { id: 34, title: 'Oakheart Deluxe', description: 'Handcrafted oak table with felt inlays.', type: 'table', tags: [1, 6, 10], imageUrl: '/images/tables/table4.jpg', capacity: 8, numPlayers: 6, waitlistCount: 1, hasDM: true },
  { id: 35, title: 'ArenaPro Surface', description: 'Durable top for miniature wargames.', type: 'table', tags: [3, 7, 11], imageUrl: '/images/tables/table5.jpg', capacity: 4, numPlayers: 2, waitlistCount: 0, hasDM: false },
  { id: 36, title: 'Crystal Cavern Table', description: 'LED-lit terrain zones for ambience.', type: 'table', tags: [4, 8, 12], imageUrl: '/images/tables/table6.jpg', capacity: 8, numPlayers: 7, waitlistCount: 2, hasDM: false },
  { id: 37, title: 'FoldAway Battleboard', description: 'Portable, compact table for small spaces.', type: 'table', tags: [2, 5, 10], imageUrl: '/images/tables/table7.jpg', capacity: 4, numPlayers: 3, waitlistCount: 0, hasDM: false },
  { id: 38, title: 'KingsCourt Table', description: 'Regal design perfect for board game nights.', type: 'table', tags: [1, 3, 9], imageUrl: '/images/tables/table8.jpg', capacity: 6, numPlayers: 4, waitlistCount: 1, hasDM: true },
  { id: 39, title: 'Vaulted Vale Table', description: 'Storage drawers and cable management built-in.', type: 'table', tags: [6, 8, 11], imageUrl: '/images/tables/table9.jpg', capacity: 6, numPlayers: 5, waitlistCount: 0, hasDM: false },
  { id: 40, title: 'Rogue’s Rest', description: 'Compact RPG table with dice towers.', type: 'table', tags: [5, 7, 12], imageUrl: '/images/tables/table10.jpg', capacity: 5, numPlayers: 5, waitlistCount: 2, hasDM: true },
  { id: 41, title: 'Starforge Station', description: 'Magnetic tile system for modular setups.', type: 'table', tags: [2, 4, 10], imageUrl: '/images/tables/table11.jpg', capacity: 7, numPlayers: 4, waitlistCount: 0, hasDM: false },
  { id: 42, title: 'Seafarer’s Deck', description: 'Nautical theme with resin river centerpiece.', type: 'table', tags: [3, 6, 9], imageUrl: '/images/tables/table12.jpg', capacity: 6, numPlayers: 6, waitlistCount: 3, hasDM: true },
  { id: 43, title: 'Runebound Workbench', description: 'Etched runes with underglow lighting.', type: 'table', tags: [1, 8, 11], imageUrl: '/images/tables/table13.jpg', capacity: 8, numPlayers: 6, waitlistCount: 1, hasDM: false },
  { id: 44, title: 'Verdant Grove Table', description: 'Green felt ecosystem for nature-themed games.', type: 'table', tags: [4, 7, 12], imageUrl: '/images/tables/table14.jpg', capacity: 8, numPlayers: 7, waitlistCount: 2, hasDM: false }
];

export const MockedSearchFilters = {
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

// Convenience filtered mock datasets
export const MockedSearchResultsEventsOnly: SearchResultItem[] = MockedSearchResults.filter(item => item.type === 'event');
export const MockedSearchResultsTablesOnly: SearchResultItem[] = MockedSearchResults.filter(item => item.type === 'table');
export const MockedSearchResultsPlayersOnly: SearchResultItem[] = MockedSearchResults.filter(item => item.type === 'player');
