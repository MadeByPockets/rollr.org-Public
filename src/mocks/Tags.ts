import { Tag } from "../types/tag";

export const MockedTags: Tag[] = [
  // Game tags
  {
    id: 1,
    label: 'D&D 5e',
    color: '#FF5733',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 2,
    label: 'Smash Bros',
    color: '#33FF57',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 3,
    label: 'Settlers of Catan',
    color: '#3357FF',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 4,
    label: 'Magic: The Gathering',
    color: '#FF33A1',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 14,
    label: 'Pathfinder 2e',
    color: '#E05A00',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 15,
    label: 'Warhammer 40K',
    color: '#8B0000',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 16,
    label: 'Pokemon TCG',
    color: '#FFCC00',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 17,
    label: 'Dungeons & Dragons',
    color: '#C0392B',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 18,
    label: 'Vampire: The Masquerade',
    color: '#6C0057',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 19,
    label: 'Starfinder',
    color: '#1A6BB5',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  // Play style tags
  {
    id: 5,
    label: 'Competitive',
    color: '#57FF33',
    appliesTo: {
      players: true,
      events: true,
      tables: false
    }
  },
  {
    id: 6,
    label: 'Casual',
    color: '#33FFF7',
    appliesTo: {
      players: true,
      events: true,
      tables: false
    }
  },
  {
    id: 7,
    label: 'RP Heavy',
    color: '#FF8A33',
    appliesTo: {
      players: true,
      events: true,
      tables: false
    }
  },
  {
    id: 8,
    label: 'Grimdark',
    color: '#D433FF',
    appliesTo: {
      players: true,
      events: true,
      tables: false
    }
  },
  {
    id: 20,
    label: 'Hardcore',
    color: '#FF2200',
    appliesTo: {
      players: true,
      events: true,
      tables: false
    }
  },
  {
    id: 21,
    label: 'Narrative Focused',
    color: '#9B59B6',
    appliesTo: {
      players: true,
      events: true,
      tables: false
    }
  },
  {
    id: 22,
    label: 'Combat Heavy',
    color: '#E74C3C',
    appliesTo: {
      players: true,
      events: true,
      tables: false
    }
  },
  {
    id: 23,
    label: 'Puzzle Focused',
    color: '#1ABC9C',
    appliesTo: {
      players: true,
      events: true,
      tables: false
    }
  },
  {
    id: 24,
    label: 'One-Shot',
    color: '#F39C12',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 25,
    label: 'Long Campaign',
    color: '#27AE60',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  // Social indicator tags
  {
    id: 9,
    label: 'LGBT-Friendly',
    color: '#33FF93',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 10,
    label: 'No Politics',
    color: '#FFC300',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 11,
    label: 'Beginner Friendly',
    color: '#FF8A33',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 12,
    label: 'Family Friendly',
    color: '#FFC300',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 26,
    label: 'Adults Only',
    color: '#7F8C8D',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 27,
    label: 'Accessibility Friendly',
    color: '#2ECC71',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 28,
    label: 'Online Play',
    color: '#3498DB',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 29,
    label: 'In-Person Only',
    color: '#E67E22',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 30,
    label: 'Veterans Welcome',
    color: '#16A085',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id:13,
    label: 'Youmacon 2025',
    color: '#FFC300',
    appliesTo: {
        players: true,
        events: true,
        tables: true,
    }
  },
  {
    id: 31,
    label: 'GenCon 2025',
    color: '#8E44AD',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 32,
    label: 'DragonCon 2025',
    color: '#2980B9',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
  {
    id: 33,
    label: 'PAX Unplugged 2025',
    color: '#D35400',
    appliesTo: {
      players: true,
      events: true,
      tables: true
    }
  },
];