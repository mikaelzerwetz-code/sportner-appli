import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FilterSheet } from '@/components/discover/FilterSheet';
import { brand } from '@/constants/brand';
import type { NumericRange } from '@/types/discover';

type LevelFilterSheetProps = {
  visible: boolean;
  value: NumericRange | null;
  onClose: () => void;
  onApply: (range: NumericRange) => void;
  onClear: () => void;
};

const MIN_LEVEL = 1;
const MAX_LEVEL = 10;
const DEFAULT_RANGE: NumericRange = { min: MIN_LEVEL, max: MAX_LEVEL };

export function LevelFilterSheet({ visible, value, onClose, onApply, onClear }: LevelFilterSheetProps) {
  const [draftMin, setDraftMin] = useState(value?.min ?? DEFAULT_RANGE.min);
  const [draftMax, setDraftMax] = useState(value?.max ?? DEFAULT_RANGE.max);

  useEffect(() => {
    if (visible) {
      setDraftMin(value?.min ?? DEFAULT_RANGE.min);
      setDraftMax(value?.max ?? DEFAULT_RANGE.max);
    }
  }, [visible, value]);

  return (
    <FilterSheet visible={visible} title="Ton niveau idéal" onClose={onClose}>
      <Text style={styles.subtitle}>Choisis le niveau des partenaires que tu recherches</Text>

      <Text style={styles.rangeValue}>
        {draftMin} — {draftMax}
      </Text>

      <Text style={styles.sliderLabel}>Minimum</Text>
      <Slider
        style={styles.slider}
        minimumValue={MIN_LEVEL}
        maximumValue={MAX_LEVEL}
        step={1}
        value={draftMin}
        onValueChange={(next) => setDraftMin(Math.min(next, draftMax))}
        minimumTrackTintColor={brand.accent}
        maximumTrackTintColor={brand.border}
        thumbTintColor={brand.accent}
      />

      <Text style={styles.sliderLabel}>Maximum</Text>
      <Slider
        style={styles.slider}
        minimumValue={MIN_LEVEL}
        maximumValue={MAX_LEVEL}
        step={1}
        value={draftMax}
        onValueChange={(next) => setDraftMax(Math.max(next, draftMin))}
        minimumTrackTintColor={brand.accent}
        maximumTrackTintColor={brand.border}
        thumbTintColor={brand.accent}
      />

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => {
            onClear();
            onClose();
          }}
        >
          <Text style={styles.secondaryButtonText}>Effacer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => {
            onApply({ min: Math.round(draftMin), max: Math.round(draftMax) });
            onClose();
          }}
        >
          <Text style={styles.primaryButtonText}>Appliquer</Text>
        </TouchableOpacity>
      </View>
    </FilterSheet>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: brand.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
  },
  rangeValue: {
    color: brand.text,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
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
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
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
    flex: 1,
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
