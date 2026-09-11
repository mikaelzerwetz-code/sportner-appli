export type SportCategory =
  | 'Sports collectifs'
  | 'Sports de raquette'
  | 'Running / endurance'
  | 'Fitness / musculation'
  | 'Sports de combat'
  | 'Sports aquatiques / nautiques'
  | 'Cyclisme'
  | 'Outdoor / montagne'
  | 'Sports de glisse'
  | 'Sports de précision'
  | 'Sports adaptés / handisport';

export type Sport = {
  id: string;
  name: string;
  category: SportCategory;
};

/** Le niveau appartient à un utilisateur + un sport, pas au sport seul. */
export type UserSportLevel = {
  sportId: string;
  sportName: string;
  level: number;
};

export type CurrentUser = {
  firstName: string;
  city: string;
  avatarInitial: string;
};

export type TodayRecommendation = {
  matchCount: number;
  sportName: string;
  availability: string;
  levelRange: string;
  maxDistanceKm: number;
};

export type RecommendedSession = {
  sportName: string;
  day: string;
  time: string;
  participants: string;
  levelRange: string;
  place: string;
};

export type NearbyPlayer = {
  id: string;
  name: string;
  age: number;
  sport: string;
  level: number;
  distanceKm: number;
  availability: string;
  /** Optionnel : uniquement renseigné sur les profils Découvrir pour le filtre Genre. */
  gender?: 'male' | 'female';
};

export type SessionTimeframe = 'today' | 'tomorrow' | 'weekend';

export type NearbySession = {
  id: string;
  timeframe: SessionTimeframe;
  title: string;
  day: string;
  time: string;
  place: string;
  distanceKm: number;
  levelRange: string;
  participants: string;
};

export type NextSessionSummary = {
  sportName: string;
  day: string;
  time: string;
  withNames: string[];
};

export type GamificationStats = {
  streakWeeks: number;
  points: number;
  sportnerLevel: number;
};

export type TimeIntent = 'now' | 'tonight' | 'tomorrow' | 'week' | 'custom';

export type TimePeriod = 'morning' | 'afternoon' | 'evening';

export type CustomTimeSelection = {
  dateIso: string;
  period: TimePeriod;
  /** Heure précise "HH:MM" facultative, en plus du créneau (Matin/Après-midi/Soir). */
  preciseTime?: string;
  /** Version courte affichée à la place du chip "Choisir", ex. "Sam. 19 · 19h30". */
  label: string;
};

/**
 * Carte "Pour toi" : mélange volontairement joueurs et sessions pour
 * simuler un futur algorithme de recommandation. Toujours 2 max à l'écran.
 */
export type ForYouSessionCard = {
  kind: 'session';
  id: string;
  headline: string;
  meta: string;
  highlight?: boolean;
};

export type ForYouPlayerCard = {
  kind: 'player';
  id: string;
  name: string;
  age: number;
  sport: string;
  level: number;
  distanceKm: number;
  availability: string;
};

export type ForYouCard = ForYouSessionCard | ForYouPlayerCard;
