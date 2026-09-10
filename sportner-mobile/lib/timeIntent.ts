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

/** Créneaux horaires précis proposés une fois un moment de la journée choisi. */
export const TIME_SLOTS_BY_PERIOD: Record<TimePeriod, string[]> = {
  morning: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30'],
  afternoon: ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
  evening: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30'],
};

const WEEKDAYS_SHORT = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
const WEEKDAY_LETTERS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

/** Initiales des jours de la semaine (lundi en premier), pour l'en-tête du calendrier. */
export const CALENDAR_WEEKDAY_LETTERS = WEEKDAY_LETTERS;

export function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function diffInDays(from: Date, to: Date) {
  const oneDayMs = 24 * 60 * 60 * 1000;
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / oneDayMs);
}

export function isSameDay(a: Date, b: Date): boolean {
  return diffInDays(a, b) === 0;
}

export function isPastDay(date: Date): boolean {
  return diffInDays(new Date(), date) < 0;
}

/** "Sam. 19" — utilisé pour le chip compact une fois la sélection validée. */
export function formatShortDateLabel(date: Date): string {
  return `${WEEKDAYS_SHORT[date.getDay()]} ${date.getDate()}`;
}

/** "Septembre 2026" — en-tête du calendrier mensuel. */
export function formatMonthLabel(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** "19:30" -> "19h30", pour rester cohérent avec le reste de l'app. */
export function formatPreciseTime(time: string): string {
  return time.replace(':', 'h');
}

/**
 * Grille du mois (semaines de 7 jours, lundi en premier). Les cases hors
 * mois sont `null` — le nombre de lignes s'adapte donc au mois affiché.
 */
export function getMonthGrid(viewedMonth: Date): (Date | null)[][] {
  const year = viewedMonth.getFullYear();
  const month = viewedMonth.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7; // 0 = lundi
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
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
