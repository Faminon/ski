export type Station = {
  slug: string;
  name: string;
  heroImage: string;              // image plein écran en haut
  intro: string;                  // courte description
  altitudeVillage: number;        // altitude du village (m)
  altitudeMin: number;            // altitude domaine min (m)
  altitudeMax: number;            // altitude domaine max (m)
  domaineName: string;            // nom du domaine
  domaineKm: number;              // km de pistes (approx)
  lifts: number;                  // nb remontées
  slopes: {
    green: number;
    blue: number;
    red: number;
    black: number;
  };
  snowpark?: boolean;
  openingStart?: string;          // YYYY-MM-DD
  openingEnd?: string;            // YYYY-MM-DD
  nearestAirports?: string[];
  officialSite?: string;
  planStationImage?: string;
  planDomaineImage?: string;
};

export const STATIONS: Station[] = [
  {
    slug: "val-thorens",
    name: "Val Thorens",
    heroImage: "/images/stations/val-thorens-hero.jpg",
    intro:
      "La plus haute station d’Europe (2300 m), intégrée au domaine des 3 Vallées, réputée pour sa neige et son ambiance conviviale.",
    altitudeVillage: 2300,
    altitudeMin: 1300,
    altitudeMax: 3230,
    domaineName: "Les 3 Vallées",
    domaineKm: 600,
    lifts: 160,
    slopes: { green: 66, blue: 254, red: 204, black: 60 },
    snowpark: true,
    // 🔒 Dates exactes (exemple saison 2025–2026) → ajuste si besoin
    openingStart: "2025-11-22",
    openingEnd:   "2026-05-03",
    nearestAirports: ["Chambéry (CMF)", "Genève (GVA)", "Lyon (LYS)"],
    officialSite: "https://www.valthorens.com/",
    planStationImage: "/images/stations/val-thorens-plan-station.jpg",
    planDomaineImage: "/images/stations/val-thorens-plan-domaine.jpg",
  },
  {
    slug: "tignes",
    name: "Tignes",
    heroImage: "/images/stations/tignes-hero.jpg",
    intro:
      "Grand domaine relié à Val d’Isère. Ski sportif, haute altitude et enneigement de qualité.",
    altitudeVillage: 2100,
    altitudeMin: 1550,
    altitudeMax: 3456,
    domaineName: "Tignes – Val d’Isère",
    domaineKm: 300,
    lifts: 75,
    slopes: { green: 22, blue: 61, red: 46, black: 25 },
    snowpark: true,
    openingStart: "2025-11-23",
    openingEnd:   "2026-05-04",
    nearestAirports: ["Chambéry (CMF)", "Genève (GVA)", "Lyon (LYS)"],
    officialSite: "https://www.tignes.net/",
    planStationImage: "/images/stations/tignes-plan-station.jpg",
    planDomaineImage: "/images/stations/tignes-plan-domaine.jpg",
  },
  {
    slug: "vars",
    name: "Vars",
    heroImage: "/images/stations/vars-hero.jpg",
    intro:
      "Station des Hautes-Alpes, ensoleillée, terrain varié et esprit authentique.",
    altitudeVillage: 1850,
    altitudeMin: 1650,
    altitudeMax: 2750,
    domaineName: "La Forêt Blanche (Vars – Risoul)",
    domaineKm: 185,
    lifts: 36,
    slopes: { green: 21, blue: 45, red: 40, black: 10 },
    snowpark: true,
    openingStart: "2025-12-06",
    openingEnd:   "2026-04-13",
    nearestAirports: ["Marseille (MRS)", "Turin (TRN)"],
    officialSite: "https://www.vars.com/",
    planStationImage: "/images/stations/vars-plan-station.jpg",
    planDomaineImage: "/images/stations/vars-plan-domaine.jpg",
  },
    {
    slug: "val-d'isere",
    name: "Val d'isere",
    heroImage: "/images/stations/val-d'isère-hero.jpg",
    intro:
      "Grand domaine relié à Tignes. Ski sportif, haute altitude et enneigement de qualité.",
    altitudeVillage: 1850,
    altitudeMin: 1850,
    altitudeMax: 3456,
    domaineName: "Tignes – Val d’Isère",
    domaineKm: 300,
    lifts: 75,
    slopes: { green: 22, blue: 61, red: 46, black: 25 },
    snowpark: true,
    openingStart: "2025-11-23",
    openingEnd:   "2026-05-04",
    nearestAirports: ["Chambéry (CMF)", "Genève (GVA)", "Lyon (LYS)"],
    officialSite: "https://www.valdisere.com/",
    planStationImage: "/images/stations/val-d'isère-plan-station.jpg",
    planDomaineImage: "/images/stations/tignes-plan-domaine.jpg",
  },
  {
    slug: "avoriaz",
    name: "Avoriaz",
    heroImage: "/images/stations/avoriaz-hero.jpg",
    intro:
      "Perchée à 1800 m au cœur du domaine des Portes du Soleil, Avoriaz séduit par son architecture unique en bois et ses pistes ski-aux-pieds.",
    altitudeVillage: 1800,
    altitudeMin: 1000,
    altitudeMax: 2466,
    domaineName: "Les Portes du Soleil",
    domaineKm: 650,
    lifts: 197,
    slopes: { green: 33, blue: 119, red: 104, black: 32 },
    snowpark: true,
    openingStart: "2025-12-14",
    openingEnd: "2026-04-20",
    nearestAirports: ["Genève (GVA)", "Chambéry (CMF)", "Lyon (LYS)"],
    officialSite: "https://www.avoriaz.com/",
    planStationImage: "/images/stations/avoriaz-plan-station.jpg",
    planDomaineImage: "/images/stations/avoriaz-plan-domaine.jpg",
  },
  {
    slug: "meribel",
    name: "Méribel",
    heroImage: "/images/stations/meribel-hero.jpg",
    intro:
      "Nichée au cœur des 3 Vallées, Méribel combine élégance savoyarde et accès direct au plus grand domaine skiable du monde.",
    altitudeVillage: 1450,
    altitudeMin: 1100,
    altitudeMax: 2952,
    domaineName: "Les 3 Vallées",
    domaineKm: 600,
    lifts: 160,
    slopes: { green: 66, blue: 254, red: 204, black: 60 },
    snowpark: true,
    openingStart: "2025-12-07",
    openingEnd: "2026-04-18",
    nearestAirports: ["Chambéry (CMF)", "Lyon (LYS)", "Genève (GVA)"],
    officialSite: "https://www.meribel.net/",
    planStationImage: "/images/stations/meribel-plan-station.jpg",
    planDomaineImage: "/images/stations/meribel-plan-domaine.jpg",
  },
  {
    slug: "courchevel",
    name: "Courchevel",
    heroImage: "/images/stations/courchevel-hero.jpg",
    intro:
      "Courchevel incarne le luxe alpin au sein des 3 Vallées, avec ses six villages reliés skis aux pieds et un enneigement exceptionnel.",
    altitudeVillage: 1850,
    altitudeMin: 1100,
    altitudeMax: 2738,
    domaineName: "Les 3 Vallées",
    domaineKm: 600,
    lifts: 160,
    slopes: { green: 66, blue: 254, red: 204, black: 60 },
    snowpark: true,
    openingStart: "2025-12-07",
    openingEnd: "2026-04-18",
    nearestAirports: ["Chambéry (CMF)", "Lyon (LYS)", "Genève (GVA)"],
    officialSite: "https://www.courchevel.com/",
    planStationImage: "/images/stations/courchevel-plan-station.jpg",
    planDomaineImage: "/images/stations/courchevel-plan-domaine.jpg",
  },
];

// helpers
export function getStationBySlug(slug: string): Station | undefined {
  return STATIONS.find((s) => s.slug === slug);
}
export function getAllSlugs(): string[] {
  return STATIONS.map((s) => s.slug);
}
