export interface TableFormat {
  id: number;
  title: string;
  description: string;
  features?: string[];
  capacity?: number;
  location?: string;
  tags?: number[];
  imageUrl?: string;
  availability?: string;
}

export const Tables: TableFormat[] = [
  {
    id: 1,
    title: 'Critical Hit Table',
    description: 'Premium gaming table with integrated digital features for enhanced gameplay.',
    features: ['Digital mapping system', 'Integrated lighting', 'Sound effects', 'Hidden compartments'],
    capacity: 8,
    location: 'GameHaven Seattle',
    tags: [1, 4, 5],
    imageUrl: '/images/tables/table1.jpg',
    availability: 'Weekends only'
  },
  {
    id: 2,
    title: 'Dragon\'s Lair Table',
    description: 'Themed gaming table with immersive lighting and sound effects for RPG sessions.',
    features: ['Themed lighting', 'Surround sound', 'Modular terrain', 'Dice towers'],
    capacity: 6,
    location: 'Fantasy Realms Chicago',
    tags: [1, 7, 12],
    imageUrl: '/images/tables/table2.jpg',
    availability: 'Daily'
  },
  {
    id: 3,
    title: 'Strategy Command Center',
    description: 'Specialized table designed for strategy board games with built-in organization systems.',
    features: ['Card holders', 'Token organizers', 'Game piece storage', 'Drink holders'],
    capacity: 4,
    location: 'Strategic Mind Games NYC',
    tags: [3, 4, 11],
    imageUrl: '/images/tables/table3.jpg',
    availability: 'Weekdays after 5pm, all day weekends'
  },
  {
    id: 4,
    title: 'Tournament Master Table',
    description: 'Professional-grade table designed for competitive card and miniature games.',
    features: ['Tournament-sized play area', 'Precision measurements', 'Overhead camera mount', 'Spectator screens'],
    capacity: 2,
    location: 'Pro Gaming Arena Los Angeles',
    tags: [4, 5, 10],
    imageUrl: '/images/tables/table4.jpg',
    availability: 'By reservation only'
  },
  {
    id: 5,
    title: 'Casual Corner Table',
    description: 'Comfortable and versatile table perfect for casual gaming sessions and family games.',
    features: ['Padded edges', 'Adjustable height', 'Expandable surface', 'Built-in storage'],
    capacity: 6,
    location: 'Family Game Center Austin',
    tags: [6, 9, 12],
    imageUrl: '/images/tables/table5.jpg',
    availability: 'Daily 10am-10pm'
  }
];