
export interface EventResult {
  id: number;
  title: string;
  description: string;
  date: string;
  location?: string;
  organizer?: string;
  tags?: number[];
  imageUrl?: string;
}

export const Events: EventResult[] = [
  {
    id: 1,
    title: 'Epic Raid Tournament',
    description: 'Annual tournament featuring the best raid teams from around the world.',
    date: '2025-08-15',
    location: 'Los Angeles Convention Center',
    organizer: 'GameCon Events',
    tags: [1, 5, 11],
    imageUrl: '/images/events/event1.jpg'
  },
  {
    id: 2,
    title: 'Summer Gaming Festival',
    description: 'Three-day event with tournaments, workshops, and networking opportunities.',
    date: '2025-07-30',
    location: 'Chicago Expo Center',
    organizer: 'Midwest Gaming Association',
    tags: [2, 4, 9, 11],
    imageUrl: '/images/events/event2.jpg'
  },
  {
    id: 3,
    title: 'Strategy Masters Competition',
    description: 'Elite competition for strategy game enthusiasts with cash prizes.',
    date: '2025-09-10',
    location: 'Online',
    organizer: 'Strategic Minds Inc.',
    tags: [3, 5],
    imageUrl: '/images/events/event3.jpg'
  },
  {
    id: 4,
    title: 'RPG Immersion Weekend',
    description: 'Immersive role-playing experience with professional game masters.',
    date: '2025-10-05',
    location: 'Seattle Gaming Hub',
    organizer: 'Narrative Adventures',
    tags: [1, 7, 12],
    imageUrl: '/images/events/event4.jpg'
  },
  {
    id: 5,
    title: 'Indie Game Showcase',
    description: 'Showcase of innovative indie games with developer panels and playable demos.',
    date: '2025-11-20',
    location: 'San Francisco Game Center',
    organizer: 'Independent Developers Collective',
    tags: [6, 9, 11],
    imageUrl: '/images/events/event5.jpg'
  }
];