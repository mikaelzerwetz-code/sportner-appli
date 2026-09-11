import type { NearbyPlayer } from '@/types/home';
import type { Coach, DiscoverSession, DiscoverWhenIntent } from '@/types/discover';

/**
 * Catalogue plus large que celui de l'accueil (qui n'en montre qu'une
 * sélection de 2-3) : Découvrir est le moteur d'exploration, donc plus
 * fourni. À terme, ces listes viendront de Supabase.
 *
 * `gender` n'est renseigné qu'ici (uniquement pour le filtre Genre de
 * Découvrir) : le champ est optionnel sur `NearbyPlayer`, donc les profils
 * de l'accueil (lib/homeRecommendations.ts, lib/homeMockData.ts) n'ont pas
 * besoin d'être touchés.
 */
export const DISCOVER_PLAYERS: NearbyPlayer[] = [
  { id: 'lucas', name: 'Lucas', age: 24, sport: 'Padel', level: 7, distanceKm: 1.2, availability: 'Disponible ce soir', gender: 'male' },
  { id: 'sarah', name: 'Sarah', age: 22, sport: 'Running', level: 5, distanceKm: 2.1, availability: 'Disponible demain matin', gender: 'female' },
  { id: 'mehdi', name: 'Mehdi', age: 26, sport: 'Football', level: 6, distanceKm: 3.4, availability: 'Disponible vendredi soir', gender: 'male' },
  { id: 'clara', name: 'Clara', age: 29, sport: 'Tennis', level: 8, distanceKm: 4.5, availability: 'Disponible ce soir', gender: 'female' },
  { id: 'yanis', name: 'Yanis', age: 21, sport: 'Boxe', level: 4, distanceKm: 0.8, availability: 'Disponible maintenant', gender: 'male' },
  { id: 'ines', name: 'Inès', age: 27, sport: 'Fitness', level: 6, distanceKm: 2.9, availability: 'Disponible demain matin', gender: 'female' },
  { id: 'thomas', name: 'Thomas', age: 31, sport: 'Padel', level: 9, distanceKm: 6.2, availability: 'Disponible ce week-end', gender: 'male' },
];

export const DISCOVER_SESSIONS: DiscoverSession[] = [
  {
    id: 'five-marseille-8e',
    sport: 'Football',
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
    sport: 'Fitness',
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
    id: 'padel-bocage',
    sport: 'Padel',
    timeframe: 'today',
    title: 'Padel — 1 place restante',
    day: 'Aujourd’hui',
    time: '19:00',
    place: 'Padel Bocage',
    distanceKm: 1.2,
    levelRange: '6–8',
    participants: '3/4 joueurs',
  },
  {
    id: 'running-borely',
    sport: 'Running',
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
    id: 'tennis-prado',
    sport: 'Tennis',
    timeframe: 'tomorrow',
    title: 'Tennis — double mixte',
    day: 'Demain',
    time: '10:00',
    place: 'Tennis Club Prado',
    distanceKm: 3.1,
    levelRange: '6–9',
    participants: '3/4 joueurs',
  },
  {
    id: 'basket-prado',
    sport: 'Basketball',
    timeframe: 'weekend',
    title: 'Basket 3x3 — 2 places restantes',
    day: 'Samedi',
    time: '11:00',
    place: 'Plages du Prado',
    distanceKm: 3.8,
    levelRange: '4–6',
    participants: '4/6 joueurs',
  },
  {
    id: 'boxe-club',
    sport: 'Boxe',
    timeframe: 'weekend',
    title: 'Boxe — sparring encadré',
    day: 'Dimanche',
    time: '17:00',
    place: 'Boxing Club Marseille',
    distanceKm: 5.4,
    levelRange: '3–5',
    participants: '5/8 participants',
  },
];

export const DISCOVER_COACHES: Coach[] = [
  {
    id: 'coach-alex',
    name: 'Alex',
    sport: 'Padel',
    specialty: 'Perfectionnement technique',
    area: 'Marseille 8e',
    priceIndicative: 'à partir de 35€/h',
  },
  {
    id: 'coach-nadia',
    name: 'Nadia',
    sport: 'Running',
    specialty: 'Préparation semi-marathon',
    area: 'Marseille / Calanques',
    priceIndicative: 'à partir de 30€/h',
  },
  {
    id: 'coach-karim',
    name: 'Karim',
    sport: 'Boxe',
    specialty: 'Boxe éducative & cardio',
    area: 'Marseille 1er',
    priceIndicative: 'à partir de 40€/h',
  },
];

/**
 * "Aujourd'hui" et "Ce soir" étaient redondants avec l'ancien filtre à 5
 * choix ; simplifié à 3 options. Correspondance toujours fictive (pas de
 * vraie disponibilité datée côté données) : voir `matchesWhenIntent` dans
 * decouvrir.tsx.
 */
export const WHEN_OPTIONS: { key: DiscoverWhenIntent; label: string }[] = [
  { key: 'today', label: 'Aujourd’hui' },
  { key: 'tomorrow', label: 'Demain' },
  { key: 'custom', label: 'Choisir une date' },
];
