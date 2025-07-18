export function BlurbTitles() {
    const blurbTitles = new Map();
    blurbTitles.set(1, "What’s your most epic tabletop moment?");
    blurbTitles.set(2, "What type of character do you dream of playing?");
    blurbTitles.set(3, "What kind of story are you most excited to be part of?");
    blurbTitles.set(4, "Which tabletop world would you want to live in?");
    blurbTitles.set(5, "If you could only play one tabletop game forever, what would it be?");
    blurbTitles.set(6, "What’s a fantasy or sci-fi world you love and would want to game in?");
    blurbTitles.set(7, "Who’s the most chaotic (or hilarious) player you've ever gamed with?");
    blurbTitles.set(8, "What motivates you to join a tabletop game: adventure, laughs, or something else?");
    blurbTitles.set(9, "What’s your weirdest in-game flex?");
    blurbTitles.set(10, "Which class or archetype are you drawn to—fighter, mage, rogue, healer, or wildcard?");
    blurbTitles.set(11, "What character did you have the most fun playing?");
    blurbTitles.set(12, "What kind of player are you: Min-maxer, storyteller, or chaos incarnate?");
    blurbTitles.set(13, "Describe the best campaign twist you’ve ever experienced.");
    blurbTitles.set(14, "What’s your guilty pleasure when it comes to character archetypes?");
    blurbTitles.set(15, "Who’s your favorite villain or antagonist you’ve faced in a campaign?");
    blurbTitles.set(16, "What’s the hardest decision your character ever had to make?");
    blurbTitles.set(17, "What’s the funniest tabletop memory you’ve ever had?");
    blurbTitles.set(18, "Ever had a tabletop game go completely off the rails? What happened?");
    blurbTitles.set(19, "Introduce us to your favorite homebrew rule!");
    blurbTitles.set(20, "What’s your favorite dice-rolling ritual or superstition?");
    blurbTitles.set(21, "What’s your go-to tabletop snack during sessions?");
    blurbTitles.set(22, "What’s the most creative solution you’ve ever come up with in a game?");
    blurbTitles.set(23, "What NPC or character from a campaign would you date IRL?");
    blurbTitles.set(24, "What’s your favorite tabletop rule or mechanic?");
    blurbTitles.set(25, "What’s the most emotional tabletop moment you’ve had?");
    blurbTitles.set(26, "What kind of story twist or epic moment would make you fall in love with the game?");
    blurbTitles.set(27, "What’s the most challenging yet rewarding NPC you've ever created?");
    blurbTitles.set(28, "How do you keep players on track without railroading your game?");
    blurbTitles.set(29, "What’s the most unexpected way your players solved a problem you designed?");
    blurbTitles.set(30, "What’s your favorite resource or tool for planning campaigns?");
    blurbTitles.set(31, "What’s the funniest way your players have broken your carefully-planned encounter?");
    blurbTitles.set(32, "What’s the most memorable villain or antagonist you’ve created?");
    blurbTitles.set(33, "How do you handle player conflict in your campaigns?");
    blurbTitles.set(34, "What’s your favorite homebrew rule to spice up your campaigns?");
    blurbTitles.set(35, "Have you ever scrapped a planned session because of something your players did?");
    blurbTitles.set(36, "What’s the most creative environment or setting you’ve designed for your players?");

    return blurbTitles;
}

export function PrivacyValues() {
    const privacyValues = new Map();
    privacyValues.set(1, "private");
    privacyValues.set("private", 1);

    privacyValues.set(2, "connection");
    privacyValues.set("connection",2);

    privacyValues.set(3, "public");
    privacyValues.set("public", 3);

    privacyValues.set(4, "table");
    privacyValues.set("table", 4);

    return privacyValues;
}

export function PlayerTagLabels(): string[] {
    const tagTitles: string[] = [];

    tagTitles.push("girl gamer");
    tagTitles.push("veteran");
    tagTitles.push("new");
    tagTitles.push("min-maxer");
    tagTitles.push("role-player");
    tagTitles.push("rules lawyer");
    tagTitles.push("storyteller");
    tagTitles.push("chaotic");
    tagTitles.push("planner");
    tagTitles.push("wildcard");
    tagTitles.push("protector");
    tagTitles.push("rogue-like");
    tagTitles.push("power gamer");
    tagTitles.push("thinker");
    tagTitles.push("narrative");
    tagTitles.push("homebrewer");
    tagTitles.push("dungeon master");
    tagTitles.push("world builder");
    tagTitles.push("solver");
    tagTitles.push("strategist");
    tagTitles.push("dice lover");
    tagTitles.push("performer");
    tagTitles.push("casual");
    tagTitles.push("character-focused");
    tagTitles.push("team player");
    tagTitles.push("mechanics");
    tagTitles.push("adventurer");
    tagTitles.push("collector");
    tagTitles.push("problem solver");
    tagTitles.push("innovator");
    tagTitles.push("lorekeeper");
    tagTitles.push("rule bender");
    tagTitles.push("sandboxer");
    tagTitles.push("cartographer");
    tagTitles.push("loyalist");
    tagTitles.push("wrangler");
    tagTitles.push("moment maker");
    tagTitles.push("jinxed roller");
    tagTitles.push("lucky roller");
    tagTitles.push("meticulous");
    tagTitles.push("improviser");
    tagTitles.push("tactician");
    tagTitles.push("butterfly");
    tagTitles.push("beginner");
    tagTitles.push("voice actor");
    tagTitles.push("multi-campaign");
    tagTitles.push("starter");
    tagTitles.push("forever DM");
    tagTitles.push("finisher");
    tagTitles.push("swapper");
    tagTitles.push("meta-gamer");
    tagTitles.push("specialist");

    return tagTitles;
}


export const FantasyNouns = [
    // Core D&D Classes
    "Fighter", "Rogue", "Wizard", "Cleric", "Paladin", "Barbarian", "Ranger", "Sorcerer", "Bard", "Monk", "Warlock", "Druid", "Artificer",

    // Fantasy Occupations
    "Alchemist", "Blacksmith", "Knight", "Mage", "Mercenary", "Archer", "Scribe", "Healer", "Hunter", "Assassin", "Enchanter",
    "Miner", "Sailor", "Merchant", "Herbalist", "Cartographer", "Tailor", "Innkeeper", "Cook", "Scholar",

    // Archetypes
    "Adventurer", "Champion", "Warlord", "Outlaw", "Pilgrim", "Prophet", "Necromancer", "Witch", "Shaman",
    "Beastmaster", "Acolyte", "Spellblade", "Battlemage", "Blademaster", "Warpriest", "Berserker", "Elementalist",

    // Fantasy Creatures/Beings
    "Dragon", "Elf", "Dwarf", "Orc", "Goblin", "Gnome", "Tiefling", "Genasi", "Halfling", "Lich", "Vampire", "Werewolf",
    "Demon", "Angel", "Pixie", "Dryad", "Centaur", "Chimera", "Golem", "Fairy", "Troll", "Minotaur", "Kraken",
    "Griffin", "Phoenix",

    // Fantasy Roles/Titles
    "Archmage", "High Priestess", "King", "Queen", "Duke", "Duchess", "Emperor", "Empress", "Captain", "Seer", "Oracle",
    "Warden", "Guardian", "Watchman", "Hero", "Villain", "Herald", "Scout", "Envoy",

    // Other Fantasy-Themed Nouns
    "Spellcaster", "Summoner", "Conjurer", "Warrior", "Gladiator", "Pathfinder", "Explorer", "Tinkerer", "Shadowblade",
    "Dungeoneer", "Archon", "Mystic", "Sage", "Runemaster", "Smith", "Wanderer", "Wayfarer", "Avenger", "Defender", "Keeper"
];

export const FantasyAdjectives = [
    // Descriptive of Power/Strength
    "Mighty", "Powerful", "Fierce", "Tough", "Armored", "Indomitable", "Savage", "Vengeful", "Heroic", "Valiant",

    // Magical Features
    "Enchanted", "Bewitched", "Magical", "Mystical", "Ethereal", "Arcane", "Spellbound", "Supernatural", "Runed",

    // Personality/Appearance Traits
    "Noble", "Gallant", "Cunning", "Crafty", "Shadowy", "Elegant", "Wise", "Shrewd", "Merciless", "Serene",
    "Infernal", "Wicked", "Pious", "Charming", "Loyal", "Treacherous", "Bold", "Cowardly", "Sly",

    // Environment-Themed
    "Cursed", "Blessed", "Haunted", "Frozen", "Burning", "Fiery", "Icy", "Stormy", "Sunlit", "Moonlit",
    "Dark", "Luminous", "Glistening", "Ancient", "Shattered", "Sacred", "Forbidden", "Hidden", "Lost",
    "Verdant", "Barren",

    // Monster/Creature Traits
    "Ferocious", "Ravenous", "Menacing", "Grotesque", "Spiked", "Scaled", "Hulking", "Winged", "Fanged", "Horned",
    "Tentacled", "Shapeshifting",

    // Mystical/Abstract Traits
    "Immortal", "Mythical", "Omniscient", "Unbreakable",
    "Unfathomable", "Celestial", "Void", "Otherworldly", "Primordial",

    // Precious/Gleaming Adjectives
    "Golden", "Silver", "Crystalline", "Diamond", "Jeweled", "Sapphire", "Emerald", "Shimmering", "Gleaming", "Radiant",

    // Combat-Related Traits
    "Bloodstained", "Battleworn", "Unyielding", "Victorious", "Deadly", "Sharp", "Piercing", "Relentless", "Untouchable",

    // Nature-Themed
    "Whispering", "Thorned", "Blossoming", "Blooming", "Overgrown", "Howling", "Cracked", "Twisted", "Mossy", "Winding",
    "Towering", "Rooted",

    // Emotional/Thematic Descriptors
    "Free", "Courageous", "Reckless", "Damned", "Lonely", "Heartless", "Driven", "Hopeful",
    "Fateful"
];

export const FantasyQualifiers = [
    // Describing Uniqueness or Origins
    "Original", "Prime", "Primal", "Archetypal", "Ancestral", "Legendary", "Foremost",

    // Describing Finality or Completion
    "Final", "Ultimate", "Absolute", "Conclusive", "Eternal", "Enduring", "Definitive",

    // Describing Supremacy or Greatness
    "Supreme", "Paramount", "Preeminent", "Pinnacle", "Peerless", "Unrivaled", "Sovereign", "Dominant",

    // Describing Perfection or Excellence
    "Flawless", "Perfect", "Divine", "Exalted", "Transcendent", "Matchless", "Incomparable",

    // Describing Eternity or Timelessness
    "Timeless", "Boundless", "Ageless", "Perpetual", "Infinite", "Everlasting",

    // Describing Power or Authority
    "Omnipotent", "Almighty", "Unassailable", "Overwhelming", "Irresistible", "Unconquerable", "Majestic"
];

export const generateUsername = () => {
    let output = ""

    output+= getRandomElement(FantasyQualifiers)
    output+= getRandomElement(FantasyAdjectives)
    output+= getRandomElement(FantasyNouns)

    return output;
}

export const ProfilePictureSettings = {
    aspectRatio: 4/5,
    minWidth: 400,
}

const getRandomElement = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
}

