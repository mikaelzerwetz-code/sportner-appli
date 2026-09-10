import type { SessionTimeframe, TimeIntent, TimePeriod } from '@/types/home';

export const TIME_INTENT_OPTIONS: { key: TimeIntent; label: string }[] = [
  { key: 'now', label: 'Maintenant' },
  { key: 'tonight', label: 'Ce soir' },
  { key: 'tomorrow', label: 'Demain' },
  { key: 'week', label: 'Cette semaine' },
  { key: 'custom', label: 'Choisir' },
];

export const TIME_PERIODS: { key: TimePeriod; label: string; time: string }[] = [
  { key: 'morning', label: 'Matin', time: '09h00' },
  { key: 'afternoon', label: 'Après-midi', time: '14h00' },
  { key: 'evening', label: 'Soir', time: '18h30' },
];

const WEEKDAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function diffInDays(from: Date, to: Date) {
  const oneDayMs = 24 * 60 * 60 * 1000;
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / oneDayMs);
}

/** Nom complet du jour, ex. "Samedi 19 septembre" — utilisé une fois la date validée. */
export function formatFullDateLabel(date: Date): string {
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

/** Libellé court pour la liste de sélection : "Aujourd’hui", "Demain", ou le nom complet. */
export function formatDateListLabel(date: Date): string {
  const diff = diffInDays(new Date(), date);
  if (diff === 0) return 'Aujourd’hui';
  if (diff === 1) return 'Demain';
  return formatFullDateLabel(date);
}

/** Les prochains jours à partir d'aujourd'hui — empêche par construction toute date passée. */
export function getUpcomingDays(count: number): Date[] {
  const today = startOfDay(new Date());
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index);
    return date;
  });
}

/**
 * Traduit le filtre temporel choisi en case des sessions déjà disponibles
 * (today / tomorrow / weekend). Purement fictif, pour faire varier
 * l'accueil selon l'intention — aucun vrai calcul de disponibilité.
 */
export function getTimeframeForIntent(intent: TimeIntent, customDate?: Date): SessionTimeframe {
  if (intent === 'now' || intent === 'tonight') return 'today';
  if (intent === 'tomorrow') return 'tomorrow';
  if (intent === 'week') return 'weekend';

  if (intent === 'custom' && customDate) {
    const diff = diffInDays(new Date(), customDate);
    if (diff <= 0) return 'today';
    if (diff === 1) return 'tomorrow';
    return 'weekend';
  }

  return 'today';
}
