import type { NearbyPlayer } from '@/types/home';

/**
 * Profils compacts affichés dans "Pour toi" sur le nouvel accueil.
 * Séparé de lib/homeMockData.ts pour ne rien changer aux données déjà
 * utilisées ailleurs (Découvrir, futurs Profil/Clubs). Remplacer par de
 * vraies données (avec photos) une fois Supabase connecté.
 */
export const RECOMMENDED_PLAYERS: NearbyPlayer[] = [
  { id: 'lucas', name: 'Lucas', age: 24, sport: 'Padel', level: 7, distanceKm: 1.2, availability: 'Dispo ce soir' },
  { id: 'sarah', name: 'Sarah', age: 22, sport: 'Running', level: 5, distanceKm: 2.1, availability: 'Dispo demain' },
  { id: 'tom', name: 'Tom', age: 25, sport: 'Football', level: 6, distanceKm: 2.5, availability: 'Disponible' },
];
