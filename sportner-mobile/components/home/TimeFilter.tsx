import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SectionTitle } from '@/components/home/SectionTitle';
import { colors } from '@/constants/theme';
import type { TimeIntent } from '@/types/home';

const TIME_OPTIONS: { key: TimeIntent; label: string }[] = [
  { key: 'now', label: 'Maintenant' },
  { key: 'tonight', label: 'Ce soir' },
  { key: 'tomorrow', label: 'Demain' },
  { key: 'week', label: 'Cette semaine' },
  { key: 'custom', label: 'Choisir' },
];

export function TimeFilter() {
  const [selected, setSelected] = useState<TimeIntent>('now');

  const handlePress = (key: TimeIntent) => {
    setSelected(key);
    if (key === 'custom') {
      Alert.alert('Bientôt disponible', 'Le choix d’une date précise arrive prochainement.');
    }
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Quand veux-tu bouger ?" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {TIME_OPTIONS.map((option) => {
          const isActive = option.key === selected;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.8}
              onPress={() => handlePress(option.key)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    gap: 8,
    paddingRight: 8,
  },
  chip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  chipTextActive: {
    color: colors.text,
  },
});
