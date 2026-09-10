import type {
  CurrentUser,
  GamificationStats,
  NearbyPlayer,
  NearbySession,
  NextSessionSummary,
  RecommendedSession,
  TodayRecommendation,
  UserSportLevel,
} from '@/types/home';

export const CURRENT_USER: CurrentUser = {
  firstName: 'Mika',
  city: 'Marseille',
  avatarInitial: 'M',
};

/** Le niveau appartient à user + sport : un même utilisateur peut avoir des niveaux différents par sport. */
export const MY_SPORTS: UserSportLevel[] = [
  { sportId: 'padel', sportName: 'Padel', level: 7 },
  { sportId: 'running', sportName: 'Running', level: 5 },
  { sportId: 'fitness', sportName: 'Fitness', level: 6 },
];

export const TODAY_RECOMMENDATION: TodayRecommendation = {
  matchCount: 2,
  sportName: 'padel',
  availability: 'ce soir',
  levelRange: '6–8',
  maxDistanceKm: 5,
};

export const RECOMMENDED_SESSION: RecommendedSession = {
  sportName: 'Padel',
  day: 'ce soir',
  time: '19h',
  participants: '3/4 joueurs',
  levelRange: '6–8',
  place: 'Marseille 8e',
};

export const NEARBY_PLAYERS: NearbyPlayer[] = [
  { id: 'lucas', name: 'Lucas', age: 24, sport: 'Padel', level: 7, distanceKm: 1.2, availability: 'Disponible ce soir' },
  { id: 'sarah', name: 'Sarah', age: 22, sport: 'Running', level: 5, distanceKm: 2.1, availability: 'Disponible demain matin' },
  { id: 'mehdi', name: 'Mehdi', age: 26, sport: 'Football', level: 6, distanceKm: 3.4, availability: 'Disponible vendredi soir' },
];

export const NEARBY_SESSIONS: NearbySession[] = [
  {
    id: 'five-marseille-8e',
    timeframe: 'today',
    title: 'Five — 2 places restantes',
    day: 'Aujourd’hui',
    time: '20:00',
    place: 'Marseille 8e',
    distanceKm: 2.4,
    levelRange: '5–7',
    participants: '8/10 participants',
  },
  {
    id: 'fitness-cross-training',
    timeframe: 'today',
    title: 'Fitness — Cours collectif',
    day: 'Aujourd’hui',
    time: '18:30',
    place: 'Studio Endorphine',
    distanceKm: 1.6,
    levelRange: 'Tous niveaux',
    participants: '6/12 participants',
  },
  {
    id: 'running-borely',
    timeframe: 'tomorrow',
    title: 'Running — sortie 5 km',
    day: 'Demain',
    time: '18:30',
    place: 'Parc Borély',
    distanceKm: 2.1,
    levelRange: 'Tous niveaux',
    participants: '4 participants',
  },
  {
    id: 'basket-prado',
    timeframe: 'weekend',
    title: 'Basket 3x3 — 2 places restantes',
    day: 'Samedi',
    time: '11:00',
    place: 'Plages du Prado',
    distanceKm: 3.8,
    levelRange: '4–6',
    participants: '4/6 joueurs',
  },
];

export const NEXT_SESSION: NextSessionSummary | null = {
  sportName: 'Padel',
  day: 'Aujourd’hui',
  time: '19:00',
  withNames: ['Lucas', 'Sarah', 'Mehdi'],
};

export const GAMIFICATION: GamificationStats = {
  streakWeeks: 3,
  points: 1240,
  sportnerLevel: 8,
};
