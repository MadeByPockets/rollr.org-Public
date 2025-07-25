export interface PlayerFormat {
  id: number;
  username: string;
  description: string;
  level?: number;
  experience?: number;
  preferredGames?: string[];
  tags?: number[];
  imageUrl?: string;
  joinDate?: string;
}

export const Players: PlayerFormat[] = [
  {
    id: 1,
    username: 'DragonSlayer99',
    description: 'Professional gamer specializing in RPGs and strategy games.',
    level: 42,
    experience: 15000,
    preferredGames: ['World of Warcraft', 'Starcraft II', 'Baldur\'s Gate 3'],
    tags: [1, 5, 7],
    imageUrl: '/images/players/player1.jpg',
    joinDate: '2020-03-15'
  },
  {
    id: 2,
    username: 'MysticHealer',
    description: 'Support specialist with over 5 years of competitive gaming experience.',
    level: 38,
    experience: 12500,
    preferredGames: ['League of Legends', 'Overwatch', 'Final Fantasy XIV'],
    tags: [5, 9, 11],
    imageUrl: '/images/players/player2.jpg',
    joinDate: '2019-07-22'
  },
  {
    id: 3,
    username: 'StrategyMaster42',
    description: 'Top-ranked player known for innovative tactics and leadership.',
    level: 50,
    experience: 20000,
    preferredGames: ['Civilization VI', 'Age of Empires IV', 'Total War: Warhammer III'],
    tags: [3, 5],
    imageUrl: '/images/players/player3.jpg',
    joinDate: '2018-11-05'
  },
  {
    id: 4,
    username: 'SpeedRunner',
    description: 'World record holder for multiple game speedruns.',
    level: 35,
    experience: 11000,
    preferredGames: ['Dark Souls', 'Celeste', 'Hollow Knight'],
    tags: [2, 5, 8],
    imageUrl: '/images/players/player4.jpg',
    joinDate: '2021-02-10'
  },
  {
    id: 5,
    username: 'CasualGamer123',
    description: 'Enjoys a variety of games and playing with friends.',
    level: 25,
    experience: 7500,
    preferredGames: ['Minecraft', 'Animal Crossing', 'Mario Kart'],
    tags: [2, 6, 9, 12],
    imageUrl: '/images/players/player5.jpg',
    joinDate: '2022-05-18'
  }
];