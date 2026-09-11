import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { FilterSheet } from '@/components/discover/FilterSheet';
import { brand } from '@/constants/brand';
import type { NumericRange } from '@/types/discover';

export type Gender = 'male' | 'female';
export type PracticeIntent = 'leisure' | 'regular' | 'competition';

type MoreFiltersSheetProps = {
  visible: boolean;
  ageRange: NumericRange | null;
  gender: Gender | null;
  practiceIntent: PracticeIntent | null;
  verifiedOnly: boolean;
  onClose: () => void;
  onApply: (
    ageRange: NumericRange | null,
    gender: Gender | null,
    practiceIntent: PracticeIntent | null,
    verifiedOnly: boolean
  ) => void;
  onClearAll: () => void;
};

const MIN_AGE = 18;
/** 70 = "70 ans et +" : aucune borne supérieure réelle n'est appliquée à ce cran. */
const MAX_AGE = 70;
const DEFAULT_AGE_RANGE: NumericRange = { min: MIN_AGE, max: MAX_AGE };

const GENDER_OPTIONS: { key: Gender | 'any'; label: string }[] = [
  { key: 'any', label: 'Peu importe' },
  { key: 'male', label: 'Homme' },
  { key: 'female', label: 'Femme' },
];

const PRACTICE_INTENT_OPTIONS: { key: PracticeIntent | 'any'; label: string }[] = [
  { key: 'any', label: 'Peu importe' },
  { key: 'leisure', label: 'Loisir' },
  { key: 'regular', label: 'Régulier' },
  { key: 'competition', label: 'Compétition' },
];

function formatAgeBound(value: number): string {
  return value >= MAX_AGE ? '70+' : `${Math.round(value)} ans`;
}

export function MoreFiltersSheet({
  visible,
  ageRange,
  gender,
  practiceIntent,
  verifiedOnly,
  onClose,
  onApply,
  onClearAll,
}: MoreFiltersSheetProps) {
  const [draftMinAge, setDraftMinAge] = useState(ageRange?.min ?? DEFAULT_AGE_RANGE.min);
  const [draftMaxAge, setDraftMaxAge] = useState(ageRange?.max ?? DEFAULT_AGE_RANGE.max);
  const [draftGender, setDraftGender] = useState<Gender | 'any'>(gender ?? 'any');
  const [draftPracticeIntent, setDraftPracticeIntent] = useState<PracticeIntent | 'any'>(practiceIntent ?? 'any');
  const [draftVerifiedOnly, setDraftVerifiedOnly] = useState(verifiedOnly);

  useEffect(() => {
    if (visible) {
      setDraftMinAge(ageRange?.min ?? DEFAULT_AGE_RANGE.min);
      setDraftMaxAge(ageRange?.max ?? DEFAULT_AGE_RANGE.max);
      setDraftGender(gender ?? 'any');
      setDraftPracticeIntent(practiceIntent ?? 'any');
      setDraftVerifiedOnly(verifiedOnly);
    }
  }, [visible, ageRange, gender, practiceIntent, verifiedOnly]);

  const hasAgeChanged = draftMinAge !== MIN_AGE || draftMaxAge !== MAX_AGE;

  return (
    <FilterSheet visible={visible} title="Plus de filtres" onClose={onClose}>
      <Text style={styles.sectionTitle}>Âge</Text>
      <Text style={styles.rangeValue}>
        {formatAgeBound(draftMinAge)} — {formatAgeBound(draftMaxAge)}
      </Text>

      <Text style={styles.sliderLabel}>Minimum</Text>
      <Slider
        style={styles.slider}
        minimumValue={MIN_AGE}
        maximumValue={MAX_AGE}
        step={1}
        value={draftMinAge}
        onValueChange={(next) => setDraftMinAge(Math.min(next, draftMaxAge))}
        minimumTrackTintColor={brand.accent}
        maximumTrackTintColor={brand.border}
        thumbTintColor={brand.accent}
      />

      <Text style={styles.sliderLabel}>Maximum</Text>
      <Slider
        style={styles.slider}
        minimumValue={MIN_AGE}
        maximumValue={MAX_AGE}
        step={1}
        value={draftMaxAge}
        onValueChange={(next) => setDraftMaxAge(Math.max(next, draftMinAge))}
        minimumTrackTintColor={brand.accent}
        maximumTrackTintColor={brand.border}
        thumbTintColor={brand.accent}
      />

      <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Genre</Text>
      <View style={styles.chipRow}>
        {GENDER_OPTIONS.map((option) => {
          const isActive = draftGender === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.8}
              onPress={() => setDraftGender(option.key)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Type de partenaire</Text>
      <View style={styles.chipRow}>
        {PRACTICE_INTENT_OPTIONS.map((option) => {
          const isActive = draftPracticeIntent === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.8}
              onPress={() => setDraftPracticeIntent(option.key)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Profil</Text>
      <View style={styles.verifiedRow}>
        <Text style={styles.verifiedLabel}>Profils vérifiés uniquement</Text>
        <Switch
          value={draftVerifiedOnly}
          onValueChange={setDraftVerifiedOnly}
          trackColor={{ false: brand.surfaceMuted, true: brand.accent }}
          thumbColor="#FFFFFF"
          ios_backgroundColor={brand.surfaceMuted}
        />
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => {
            onClearAll();
            onClose();
          }}
        >
          <Text style={styles.secondaryButtonText}>Tout effacer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => {
            const nextAgeRange = hasAgeChanged
              ? { min: Math.round(draftMinAge), max: Math.round(draftMaxAge) }
              : null;
            const nextGender = draftGender === 'any' ? null : draftGender;
            const nextPracticeIntent = draftPracticeIntent === 'any' ? null : draftPracticeIntent;
            onApply(nextAgeRange, nextGender, nextPracticeIntent, draftVerifiedOnly);
            onClose();
          }}
        >
          <Text style={styles.primaryButtonText}>Afficher les résultats</Text>
        </TouchableOpacity>
      </View>
    </FilterSheet>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: brand.textMuted,
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  sectionSpacing: {
    marginTop: 20,
    marginBottom: 10,
  },
  rangeValue: {
    color: brand.text,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  sliderLabel: {
    color: brand.textMuted,
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: brand.surfaceMuted,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  chipActive: {
    backgroundColor: brand.accent,
  },
  chipText: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  chipTextActive: {
    color: brand.black,
  },
  verifiedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: brand.surfaceMuted,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  verifiedLabel: {
    color: brand.text,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: brand.surfaceMuted,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: brand.text,
    fontSize: 14,
    fontWeight: '800',
  },
  primaryButton: {
    flex: 1.4,
    backgroundColor: brand.accent,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: brand.black,
    fontSize: 14,
    fontWeight: '800',
  },
});
