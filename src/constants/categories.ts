export const CATEGORY_KEYWORDS = {
  Books: [
    "boek",
    "literatuur",
    "roman",
    "thriller",
    "fantasy",
    "young adult",
    "kook",
    "reis",
    "kunst",
    "psychologie",
    "management",
    "nederlands",
    "engels",
    "duits",
    "frans",
    "spaans",
    "ebook",
    "kobo",
    "magazine",
    "school",
    "studie",
  ],
  Music: [
    "muziek",
    "cd",
    "lp",
    "album",
    "audio",
    "hifi",
    "speaker",
    "koptelefoon",
    "bluetooth",
    "soundbar",
  ],
  Movies: ["film", "dvd", "blu-ray", "tv-series", "documentaire", "cinema"],
  Games: [
    "game",
    "playstation",
    "xbox",
    "nintendo",
    "pc gaming",
    "console",
    "virtual reality",
    "fanshop",
  ],
  Technology: [
    "computer",
    "laptop",
    "desktop",
    "telefoon",
    "smartphone",
    "tablet",
    "monitor",
    "televisie",
    "camera",
    "software",
    "netwerk",
    "internet",
    "accessoire",
    "domotica",
    "gps",
    "e-reader",
  ],
  "Kids & Toys": [
    "speelgoed",
    "baby",
    "peuter",
    "kind",
    "puzzel",
    "spel",
    "lego",
    "playmobil",
    "pop",
    "knuffel",
    "bouwen",
    "educatief",
    "creatief",
    "verkleed",
    "buiten",
    "trampoline",
    "loopfiets",
  ],
  "Beauty & Care": [
    "cosmetica",
    "parfum",
    "verzorging",
    "gezondheid",
    "make-up",
    "scheren",
    "haar",
    "mooi",
    "luxe",
    "elektrische tandenborstel",
  ],
  Sports: [
    "sport",
    "fitness",
    "yoga",
    "voetbal",
    "zwemmen",
    "outdoor",
    "fiets",
    "kamperen",
    "koffer",
    "rugzak",
  ],
  "Home & Living": [
    "wonen",
    "keuken",
    "tuin",
    "huishouden",
    "zetel",
    "tafel",
    "stoel",
    "bed",
    "pot",
    "pan",
    "servies",
    "barbecue",
    "gereedschap",
    "klus",
  ],
  Fashion: ["kleding", "juwelen", "horloge", "tas", "zonnebril", "mode"],
  Office: ["kantoor", "papier", "schrijf", "agenda", "kalender", "bureau"],
  Pets: ["hond", "kat", "paard", "dier", "voer", "ruiter"],
} as const;

export const SEARCH_MAPPINGS = {
  // Books & Literature
  books: ["boek", "literatuur", "roman", "thriller", "fantasy", "young adult"],
  book: ["boek", "literatuur", "roman"],
  literature: ["literatuur", "roman"],

  // Entertainment
  music: ["muziek", "cd", "lp", "album"],
  games: ["game", "playstation", "xbox", "nintendo", "console"],
  movies: ["film", "dvd", "blu-ray", "tv-series", "documentaire"],

  // Technology
  tech: ["computer", "laptop", "telefoon", "smartphone", "tablet"],
  technology: [
    "computer",
    "laptop",
    "telefoon",
    "smartphone",
    "tablet",
    "monitor",
  ],
  computer: ["computer", "laptop", "desktop"],
  phone: ["telefoon", "smartphone"],

  // Lifestyle
  toys: ["speelgoed", "baby", "peuter", "kind", "puzzel", "spel"],
  beauty: ["cosmetica", "parfum", "verzorging", "make-up", "scheren"],
  fashion: ["kleding", "mode", "juwelen", "horloge"],
  home: ["wonen", "keuken", "tuin", "huishouden"],
  kids: ["kind", "baby", "peuter", "speelgoed"],
  office: ["kantoor", "bureau", "schrijf"],

  // Health & Family
  health: ["gezondheid", "gezin", "verzorging", "care"],
  family: ["gezin", "gezondheid", "baby", "kind"],

  // Sports
  sports: ["sport", "fitness", "yoga", "voetbal", "zwemmen"],
  fitness: ["sport", "fitness", "yoga"],

  // Pets
  pets: ["hond", "kat", "paard", "dier"],
  pet: ["hond", "kat", "paard", "dier"],
} as const;

export function getCategoryKeywords(
  category: keyof typeof CATEGORY_KEYWORDS
): readonly string[] {
  return CATEGORY_KEYWORDS[category];
}

export function getAvailableCategories(): string[] {
  return Object.keys(CATEGORY_KEYWORDS);
}

export function getSearchMappings(): typeof SEARCH_MAPPINGS {
  return SEARCH_MAPPINGS;
}
