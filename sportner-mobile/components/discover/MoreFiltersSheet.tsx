import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FilterSheet } from '@/components/discover/FilterSheet';
import { brand } from '@/constants/brand';
import type { NumericRange } from '@/types/discover';

export type Gender = 'male' | 'female';

type MoreFiltersSheetProps = {
  visible: boolean;
  ageRange: NumericRange | null;
  gender: Gender | null;
  onClose: () => void;
  onApply: (ageRange: NumericRange | null, gender: Gender | null) => void;
  onClearAll: () => void;
};

const MIN_AGE = 18;
const MAX_AGE = 99;
const DEFAULT_AGE_RANGE: NumericRange = { min: MIN_AGE, max: MAX_AGE };

const GENDER_OPTIONS: { key: Gender | 'any'; label: string }[] = [
  { key: 'any', label: 'Peu importe' },
  { key: 'male', label: 'Homme' },
  { key: 'female', label: 'Femme' },
];

export function MoreFiltersSheet({ visible, ageRange, gender, onClose, onApply, onClearAll }: MoreFiltersSheetProps) {
  const [draftMinAge, setDraftMinAge] = useState(ageRange?.min ?? DEFAULT_AGE_RANGE.min);
  const [draftMaxAge, setDraftMaxAge] = useState(ageRange?.max ?? DEFAULT_AGE_RANGE.max);
  const [draftGender, setDraftGender] = useState<Gender | 'any'>(gender ?? 'any');

  useEffect(() => {
    if (visible) {
      setDraftMinAge(ageRange?.min ?? DEFAULT_AGE_RANGE.min);
      setDraftMaxAge(ageRange?.max ?? DEFAULT_AGE_RANGE.max);
      setDraftGender(gender ?? 'any');
    }
  }, [visible, ageRange, gender]);

  const hasAgeChanged = draftMinAge !== MIN_AGE || draftMaxAge !== MAX_AGE;

  return (
    <FilterSheet visible={visible} title="Plus de filtres" onClose={onClose}>
      <Text style={styles.sectionTitle}>Âge</Text>
      <Text style={styles.rangeValue}>
        {Math.round(draftMinAge)} — {Math.round(draftMaxAge)} ans
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

      <Text style={[styles.sectionTitle, styles.genderTitle]}>Genre</Text>
      <View style={styles.genderRow}>
        {GENDER_OPTIONS.map((option) => {
          const isActive = draftGender === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.genderChip, isActive && styles.genderChipActive]}
              activeOpacity={0.8}
              onPress={() => setDraftGender(option.key)}
            >
              <Text style={[styles.genderChipText, isActive && styles.genderChipTextActive]}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
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
            onApply(nextAgeRange, nextGender);
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
  genderTitle: {
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
  genderRow: {
    flexDirection: 'row',
    gap: 8,
  },
  genderChip: {
    flex: 1,
    backgroundColor: brand.surfaceMuted,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  genderChipActive: {
    backgroundColor: brand.accent,
  },
  genderChipText: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  genderChipTextActive: {
    color: brand.black,
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
