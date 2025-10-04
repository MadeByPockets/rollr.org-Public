export interface PlayerFormat {
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

export const Players: PlayerFormat[] = [
    {
        id: 1,
        username: 'DragonSlayer99',
        description: 'Professional gamer specializing in RPGs and strategy games.',
        experience: 15000,
        preferredGames: ['World of Warcraft', 'Starcraft II', 'Baldur\'s Gate 3'],
        tags: [1, 5, 7],
        imageUrl: '/man-walking-silhouette-clipart.jpg',
        joinDate: '2020-03-15',
        miniPic: "/quick-PFP.png",
    },
    {
        id: 2,
        username: 'MysticHealer',
        description: 'Support specialist with over 5 years of competitive gaming experience.',
        experience: 12500,
        preferredGames: ['League of Legends', 'Overwatch', 'Final Fantasy XIV'],
        tags: [5, 9, 11, 7, 6, 3, 2, 1],
        imageUrl: '/images/players/player2.jpg',
        joinDate: '2019-07-22',
        miniPic: '/quick-PFP.png',
    },
    {
        id: 3,
        username: 'StrategyMaster42',
        description: 'Top-ranked player known for innovative tactics and leadership.',
        experience: 20000,
        preferredGames: ['Civilization VI', 'Age of Empires IV', 'Total War: Warhammer III'],
        tags: [3, 5],
        imageUrl: '/images/players/player3.jpg',
        joinDate: '2018-11-05',
        miniPic: ""
    },
    {
        id: 4,
        username: 'SpeedRunner',
        description: 'World record holder for multiple game speedruns.',
        experience: 11000,
        preferredGames: ['Dark Souls', 'Celeste', 'Hollow Knight'],
        tags: [2, 5, 8],
        imageUrl: '/images/players/player4.jpg',
        joinDate: '2021-02-10',
        miniPic: ""
    },
    {
        id: 5,
        username: 'CasualGamer123',
        description: 'Enjoys a variety of games and playing with friends.',
        experience: 7500,
        preferredGames: ['Minecraft', 'Animal Crossing', 'Mario Kart'],
        tags: [2, 6, 9, 12],
        imageUrl: '/images/players/player5.jpg',
        joinDate: '2022-05-18',
        miniPic: ""
    },
    {
        id: 6,
        username: 'Trolololol98',
        description: 'Just in it for the lulz',
        experience: 500,
        preferredGames: ['World of Warcraft', 'Doom', 'Munchkin'],
        tags: [2, 6, 9, 12],
        imageUrl: '/images/players/player6.jpg',
        joinDate: '2024-09-12',
        miniPic: ""
    }
];