import type {
  CurrentUser,
  ForYouCard,
  GamificationStats,
  NearbyPlayer,
  NearbySession,
  NextSessionSummary,
  RecommendedSession,
  TimeIntent,
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

/**
 * Une recommandation et une session conseillée par intention temporelle,
 * pour que "Quand veux-tu bouger ?" fasse visiblement varier "Pour toi
 * aujourd'hui". Purement fictif (pas de vrai matching) : "custom" reprend
 * le jeu "week" par défaut, quelle que soit la date précise choisie.
 */
export const TODAY_RECOMMENDATION_BY_INTENT: Record<TimeIntent, TodayRecommendation> = {
  now: { matchCount: 2, sportName: 'padel', availability: 'maintenant', levelRange: '6–8', maxDistanceKm: 3 },
  tonight: { matchCount: 2, sportName: 'padel', availability: 'ce soir', levelRange: '6–8', maxDistanceKm: 5 },
  tomorrow: { matchCount: 3, sportName: 'running', availability: 'demain matin', levelRange: '4–6', maxDistanceKm: 4 },
  week: { matchCount: 4, sportName: 'football', availability: 'cette semaine', levelRange: '5–7', maxDistanceKm: 6 },
  custom: { matchCount: 4, sportName: 'football', availability: 'cette semaine', levelRange: '5–7', maxDistanceKm: 6 },
};

export const RECOMMENDED_SESSION_BY_INTENT: Record<TimeIntent, RecommendedSession> = {
  now: { sportName: 'Padel', day: 'maintenant', time: '18h00', participants: '3/4 joueurs', levelRange: '6–8', place: 'Padel Bocage' },
  tonight: { sportName: 'Padel', day: 'ce soir', time: '19h', participants: '3/4 joueurs', levelRange: '6–8', place: 'Marseille 8e' },
  tomorrow: { sportName: 'Running', day: 'demain', time: '8h00', participants: '4 participants', levelRange: 'Tous niveaux', place: 'Parc Borély' },
  week: { sportName: 'Football', day: 'samedi', time: '11h00', participants: '8/10 joueurs', levelRange: '5–7', place: 'Plages du Prado' },
  custom: { sportName: 'Football', day: 'samedi', time: '11h00', participants: '8/10 joueurs', levelRange: '5–7', place: 'Plages du Prado' },
};

export const NEARBY_PLAYERS: NearbyPlayer[] = [
  { id: 'lucas', name: 'Lucas', age: 24, sport: 'Padel', level: 7, distanceKm: 1.2, availability: 'Disponible ce soir' },
  { id: 'sarah', name: 'Sarah', age: 22, sport: 'Running', level: 5, distanceKm: 2.1, availability: 'Disponible demain matin' },
  { id: 'mehdi', name: 'Mehdi', age: 26, sport: 'Football', level: 6, distanceKm: 3.4, availability: 'Disponible vendredi soir' },
];

/** Ordre de priorité fictif des profils selon l'intention temporelle choisie. */
const NEARBY_PLAYERS_PRIORITY_BY_INTENT: Record<TimeIntent, string[]> = {
  now: ['lucas', 'mehdi', 'sarah'],
  tonight: ['lucas', 'mehdi', 'sarah'],
  tomorrow: ['sarah', 'lucas', 'mehdi'],
  week: ['mehdi', 'sarah', 'lucas'],
  custom: ['lucas', 'sarah', 'mehdi'],
};

export function getPlayersForIntent(intent: TimeIntent): NearbyPlayer[] {
  return NEARBY_PLAYERS_PRIORITY_BY_INTENT[intent]
    .map((id) => NEARBY_PLAYERS.find((player) => player.id === id))
    .filter((player): player is NearbyPlayer => Boolean(player));
}

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

/**
 * Sélection courte pour la section "Pour toi" de l'accueil : au plus 2
 * cartes, mélangeant une session et un profil, pour simuler ce que fera
 * plus tard un vrai moteur de recommandation.
 */
export const FOR_YOU: ForYouCard[] = [
  {
    kind: 'session',
    id: 'padel-ce-soir',
    headline: 'Padel ce soir à 19h',
    meta: '3/4 joueurs · Niveau 6–8 · 1,2 km',
    highlight: true,
  },
  {
    kind: 'player',
    id: 'lucas',
    name: 'Lucas',
    age: 24,
    sport: 'Padel',
    level: 7,
    distanceKm: 1.2,
    availability: 'Disponible ce soir',
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
