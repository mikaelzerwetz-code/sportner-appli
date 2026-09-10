/**
 * Nouvelle identité visuelle Sportner (fond clair / vert électrique).
 * Utilisée aujourd'hui par l'accueil redesigné ; les autres écrans migreront
 * vers cette palette lors de leurs propres passes de refonte — en attendant,
 * `constants/theme.ts` (fond bleu nuit) reste inchangé pour ne pas les casser.
 */
export const brand = {
  background: '#FAFAF8',
  surface: '#FFFFFF',
  surfaceMuted: '#F2F2F0',
  border: '#ECECE9',
  text: '#0A0A0A',
  textMuted: '#6B6B68',
  accent: '#8CFF00',
  black: '#0A0A0A',
} as const;
