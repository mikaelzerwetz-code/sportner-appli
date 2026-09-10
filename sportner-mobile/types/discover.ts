import type { SessionTimeframe } from '@/types/home';

export type DiscoverMode = 'players' | 'sessions' | 'map' | 'coaches';

/**
 * Séparé de `NearbySession` (types/home.ts) : Découvrir a besoin d'un champ
 * `sport` explicite pour filtrer fiablement (le titre seul, ex. "Five", ne
 * suffit pas à retrouver "Football"). Ne touche pas au type utilisé par
 * l'accueil.
 */
export type DiscoverSession = {
  id: string;
  sport: string;
  timeframe: SessionTimeframe;
  title: string;
  day: string;
  time: string;
  place: string;
  distanceKm: number;
  levelRange: string;
  participants: string;
};

export type Coach = {
  id: string;
  name: string;
  sport: string;
  specialty: string;
  area: string;
  priceIndicative?: string;
  /** Absent pour l'instant : les avis arriveront avec le vrai backend. */
  rating?: number;
};

export type MapCategory = 'sessions' | 'infrastructures' | 'clubs' | 'coaches' | 'players';

export type DistanceOption = {
  key: string;
  label: string;
  /** null = pas de limite */
  maxKm: number | null;
};

export type LevelRangeOption = {
  key: string;
  label: string;
  min: number;
  max: number;
};
