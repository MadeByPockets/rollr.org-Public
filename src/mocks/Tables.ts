/**
 * Represents the format and structure of a table entity.
 * Used to define the properties and information relevant to a table.
 *
 * Properties:
 * - `id`: UUID: A unique identifier for the table.
 * - `title`: String(85): Table name for display on Page and in search.
 * - `shortDescription`: String(165): Brief summary of the table.
 * - `description`: String(2500) A detailed description providing more information about the table.
 * - `features`: An optional list of features or characteristics of the table.
 * - `capacity`: An optional number indicating the capacity of the table (e.g., number of people it can accommodate).
 * - `location`: An optional string specifying where the table is located.
 * - `tags`: An optional array of numerical tags associated with the table.
 * - `imageUrl`: An optional URL linking to an image of the table.
 * - `availability`: An optional string indicating the availability status of the table.
 */
export interface TableFormat {
  id: number;
  owner: number;
  title: string;
  shortDescription: string
  description: string;
  features?: string[];
  capacity?: number;
  waitlist?:boolean;
  communicationPreferances: string;
  location?: string;
  tags?: number[];
  imageUrl?: string;
  availability?: string;
  dungeonMaster: number;
  players: number[];
}

export const Tables: TableFormat[] = [
    {
        id: 1,
        title: 'Critical Hit Table',
        shortDescription: 'description coming soon',
        description: '**Welcome to the Mystical Realms Campaign!**\n' +
            'This D&D campaign is perfect for players who have already participated in a session zero. If you haven\'t had a session zero yet, feel free to reach out to us to schedule one!\n' +
            'In this campaign, you can chart the stars, salvage ships, or discover secrets on your base planet. This long-term adventure offers the progression and character development you desire, without the commitment of fixed schedules. There are no regular scheduled times, and the group membership is flexible—players can join or leave at any session.\n' +
            'Players begin their journey in the town of Eldridge, where they can take on various jobs and form crews with other players according to available time slots. At the end of each quest, any magic items and experience earned will carry over to the next adventure.\n' +
            'This campaign follows a West Marches style, where players are free to drop into any new quest, roleplay with other guild members, and ensure they never miss a session.\n' +
            'We will be using the 2024 Player\'s Handbook (PHB) rules along with "Celestial Ventures" by Sage Press as a third-party supplement and general setting. This is not a Spelljammer campaign.\n' +
            '**Campaign Premise:** In a world of endless possibilities, your characters will embark on quests that span the stars and the realms beyond. From exploring ancient ruins to battling fearsome creatures, the adventure is entirely up to you and your crew.\n' +
            '**Gameplay Style:**\n' +
            '- **Flexibility:** No regular scheduled times, and the group membership is flexible. Players can join or leave at any session.\n' +
            '- **Progression:** Character development and progression are key. At the end of each quest, any magic items and experience earned will carry over to the next adventure.\n' +
            '- **West Marches:** Players are free to drop into any new quest, roleplay with other guild members, and ensure they never miss a session.\n' +
            '\n' +
            '**Town of Eldridge:**\n' +
            '- **Starting Point:** Your journey begins in the bustling town of Eldridge, where you can take on various jobs, hire other players to form your crew, and explore the local surroundings.\n' +
            '- **Dynamic Jobs:** From scavenging for treasures to defending the town from invaders, the jobs in Eldridge offer endless opportunities for adventure and growth.\n' +
            '\n' +
            '**Quests and Adventures:**\n' +
            '- **Chart the Stars:** Embark on starship journeys to distant planets and galaxies. Discover hidden starbases, salvage derelict ships, and uncover ancient star charts.\n' +
            '- **Salvage Ships:** Dive deep into space to salvage derelict ships and recover valuable treasures. Be cautious of the dangers lurking in the void.\n' +
            '- **Discover Secrets:** Explore ancient ruins, forgotten temples, and secret bases on your base planet. Uncover hidden secrets and uncover the mysteries of the past.\n' +
            '\n' +
            '**Character Development:**\n' +
            '- **Experience Points:** Earn experience points through quests and adventures. These points will help you level up and unlock new abilities and powers.\n' +
            '- **Magic Items:** Discover and collect magic items that will enhance your character\'s abilities and help you overcome challenges.\n' +
            '\n' +
            '**General Setting:**\n' +
            '- **2024 Player\'s Handbook (PHB):** The core rules for character creation, combat, and roleplaying.\n' +
            '- **Celestial Ventures by Sage Press:** A third-party supplement that provides additional setting details, rules, and inspiration for your adventures.\n' +
            '\n' +
            '**How to Get Involved:**\n' +
            '- **Session Zero:** If you haven\'t had a session zero yet, feel free to reach out to us to schedule one. This session will help establish the game world and your character backgrounds.\n' +
            '- **Join Us:** Feel free to join us at any session. We welcome new players who want to explore this exciting campaign.\n' +
            '\n' +
            '**Learn More:** For more information on the campaign setting, rules, and general guidelines, please refer to the Campaign Primer document. This document will help you get a better understanding of the world you will be exploring and the rules that govern your adventures.\n',
        features: ['Digital mapping system', 'Integrated lighting', 'Sound effects', 'Hidden compartments'],
        capacity: 8,
        location: 'GameHaven Seattle',
        tags: [1, 4, 5],
        imageUrl: '/images/tables/table1.jpg',
        availability: 'Weekends only',
        communicationPreferances: "",
        dungeonMaster: 1,
        players: [2, 3, 4],
        owner: 1
    },
    {
        id: 2,
        title: 'Dragon\'s Lair Table',
        description: 'Themed gaming table with immersive lighting and sound effects for RPG sessions.',
        shortDescription: 'description coming soon',
        features: ['Themed lighting', 'Surround sound', 'Modular terrain', 'Dice towers'],
        capacity: 6,
        location: 'Fantasy Realms Chicago',
        tags: [1, 7, 12],
        imageUrl: '/images/tables/table2.jpg',
        availability: 'Daily',
        communicationPreferances: "",
        dungeonMaster: 1,
        players: [],
        owner: 2
    },
    {
        id: 3,
        title: 'Strategy Command Center',
        shortDescription: 'description coming soon',
        description: 'Specialized table designed for strategy board games with built-in organization systems.',
        features: ['Card holders', 'Token organizers', 'Game piece storage', 'Drink holders'],
        capacity: 4,
        location: 'Strategic Mind Games NYC',
        tags: [3, 4, 11],
        imageUrl: '/images/tables/table3.jpg',
        availability: 'Weekdays after 5pm, all day weekends',
        communicationPreferances: "",
        dungeonMaster: 2,
        players: [],
        owner: 3
    },
    {
        id: 4,
        title: 'Tournament Master Table',
        shortDescription: 'description coming soon',
        description: 'Professional-grade table designed for competitive card and miniature games.',
        features: ['Tournament-sized play area', 'Precision measurements', 'Overhead camera mount', 'Spectator screens'],
        capacity: 2,
        location: 'Pro Gaming Arena Los Angeles',
        tags: [4, 5, 10],
        imageUrl: '/images/tables/table4.jpg',
        availability: 'By reservation only',
        communicationPreferances: "",
        dungeonMaster: 1,
        players: [],
        owner: 4
    },
    {
        id: 5,
        title: 'Casual Corner Table',
        shortDescription: 'description coming soon',
        description: 'Comfortable and versatile table perfect for casual gaming sessions and family games.',
        features: ['Padded edges', 'Adjustable height', 'Expandable surface', 'Built-in storage'],
        capacity: 6,
        location: 'Family Game Center Austin',
        tags: [6, 9, 12],
        imageUrl: '/images/tables/table5.jpg',
        availability: 'Daily 10am-10pm',
        communicationPreferances: "",
        dungeonMaster: 3,
        players: [],
        owner: 5
    }
];