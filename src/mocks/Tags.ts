export const Tags: TagsFormat[] = [
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
        id:13,
        label: 'Youmacon 2025',
        color: '#FFC300',
        appliesTo: {
            players: true,
            events: true,
            tables: true,
        }
    }
]


export interface TagsFormat {
  id: number,
  label: string,
  color?: string,
  image?: string,
  appliesTo: {
    players: boolean,
    events: boolean,
    tables: boolean
  }
}