import type { Sport, SportCategory } from '@/types/home';

export const SPORT_CATEGORIES: SportCategory[] = [
  'Sports collectifs',
  'Sports de raquette',
  'Running / endurance',
  'Fitness / musculation',
  'Sports de combat',
  'Sports aquatiques / nautiques',
  'Cyclisme',
  'Outdoor / montagne',
  'Sports de glisse',
  'Sports de précision',
  'Sports adaptés / handisport',
];

/**
 * Catalogue extensible : ajouter un sport = ajouter une entrée ici,
 * aucune autre modification nécessaire (recherche, filtres et rendu
 * de la vue "Tous les sports" en dérivent automatiquement).
 */
export const SPORTS_CATALOG: Sport[] = [
  // Sports collectifs
  { id: 'football', name: 'Football', category: 'Sports collectifs' },
  { id: 'basketball', name: 'Basketball', category: 'Sports collectifs' },
  { id: 'handball', name: 'Handball', category: 'Sports collectifs' },
  { id: 'volleyball', name: 'Volleyball', category: 'Sports collectifs' },
  { id: 'rugby', name: 'Rugby', category: 'Sports collectifs' },
  { id: 'futsal', name: 'Futsal', category: 'Sports collectifs' },

  // Sports de raquette
  { id: 'tennis', name: 'Tennis', category: 'Sports de raquette' },
  { id: 'padel', name: 'Padel', category: 'Sports de raquette' },
  { id: 'badminton', name: 'Badminton', category: 'Sports de raquette' },
  { id: 'squash', name: 'Squash', category: 'Sports de raquette' },
  { id: 'tennis-de-table', name: 'Tennis de table', category: 'Sports de raquette' },

  // Running / endurance
  { id: 'running', name: 'Running', category: 'Running / endurance' },
  { id: 'trail', name: 'Trail', category: 'Running / endurance' },
  { id: 'marathon', name: 'Marathon', category: 'Running / endurance' },
  { id: 'triathlon', name: 'Triathlon', category: 'Running / endurance' },

  // Fitness / musculation
  { id: 'fitness', name: 'Fitness', category: 'Fitness / musculation' },
  { id: 'musculation', name: 'Musculation', category: 'Fitness / musculation' },
  { id: 'crossfit', name: 'CrossFit', category: 'Fitness / musculation' },
  { id: 'yoga', name: 'Yoga', category: 'Fitness / musculation' },
  { id: 'pilates', name: 'Pilates', category: 'Fitness / musculation' },

  // Sports de combat
  { id: 'boxe', name: 'Boxe', category: 'Sports de combat' },
  { id: 'judo', name: 'Judo', category: 'Sports de combat' },
  { id: 'karate', name: 'Karaté', category: 'Sports de combat' },
  { id: 'mma', name: 'MMA', category: 'Sports de combat' },
  { id: 'taekwondo', name: 'Taekwondo', category: 'Sports de combat' },

  // Sports aquatiques / nautiques
  { id: 'natation', name: 'Natation', category: 'Sports aquatiques / nautiques' },
  { id: 'surf', name: 'Surf', category: 'Sports aquatiques / nautiques' },
  { id: 'voile', name: 'Voile', category: 'Sports aquatiques / nautiques' },
  { id: 'plongee', name: 'Plongée', category: 'Sports aquatiques / nautiques' },
  { id: 'paddle', name: 'Paddle', category: 'Sports aquatiques / nautiques' },
  { id: 'water-polo', name: 'Water-polo', category: 'Sports aquatiques / nautiques' },

  // Cyclisme
  { id: 'velo-route', name: 'Vélo route', category: 'Cyclisme' },
  { id: 'vtt', name: 'VTT', category: 'Cyclisme' },
  { id: 'gravel', name: 'Gravel', category: 'Cyclisme' },
  { id: 'bmx', name: 'BMX', category: 'Cyclisme' },

  // Outdoor / montagne
  { id: 'randonnee', name: 'Randonnée', category: 'Outdoor / montagne' },
  { id: 'escalade', name: 'Escalade', category: 'Outdoor / montagne' },
  { id: 'ski-de-randonnee', name: 'Ski de randonnée', category: 'Outdoor / montagne' },
  { id: 'trail-montagne', name: 'Trail montagne', category: 'Outdoor / montagne' },

  // Sports de glisse
  { id: 'ski', name: 'Ski', category: 'Sports de glisse' },
  { id: 'snowboard', name: 'Snowboard', category: 'Sports de glisse' },
  { id: 'skateboard', name: 'Skateboard', category: 'Sports de glisse' },
  { id: 'roller', name: 'Roller', category: 'Sports de glisse' },

  // Sports de précision
  { id: 'golf', name: 'Golf', category: 'Sports de précision' },
  { id: 'tir-a-larc', name: "Tir à l'arc", category: 'Sports de précision' },
  { id: 'petanque', name: 'Pétanque', category: 'Sports de précision' },
  { id: 'fléchettes', name: 'Fléchettes', category: 'Sports de précision' },

  // Sports adaptés / handisport
  { id: 'basket-fauteuil', name: 'Basket fauteuil', category: 'Sports adaptés / handisport' },
  { id: 'rugby-fauteuil', name: 'Rugby fauteuil', category: 'Sports adaptés / handisport' },
  { id: 'tennis-fauteuil', name: 'Tennis fauteuil', category: 'Sports adaptés / handisport' },
  { id: 'para-badminton', name: 'Para badminton', category: 'Sports adaptés / handisport' },
  { id: 'para-athletisme', name: 'Para athlétisme', category: 'Sports adaptés / handisport' },
  { id: 'para-natation', name: 'Para natation', category: 'Sports adaptés / handisport' },
  { id: 'para-cyclisme', name: 'Para cyclisme', category: 'Sports adaptés / handisport' },
  { id: 'cecifoot', name: 'Cécifoot', category: 'Sports adaptés / handisport' },
  { id: 'goalball', name: 'Goalball', category: 'Sports adaptés / handisport' },
  { id: 'boccia', name: 'Boccia', category: 'Sports adaptés / handisport' },
  { id: 'para-taekwondo', name: 'Para taekwondo', category: 'Sports adaptés / handisport' },
];
