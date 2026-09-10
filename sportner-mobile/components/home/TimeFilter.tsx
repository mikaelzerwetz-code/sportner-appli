import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ChooseTimeModal } from '@/components/home/ChooseTimeModal';
import { SectionTitle } from '@/components/home/SectionTitle';
import { colors } from '@/constants/theme';
import { TIME_INTENT_OPTIONS } from '@/lib/timeIntent';
import type { CustomTimeSelection, TimeIntent } from '@/types/home';

export type TimeFilterState = {
  intent: TimeIntent;
  customSelection: CustomTimeSelection | null;
};

type TimeFilterProps = {
  onChange?: (state: TimeFilterState) => void;
};

export function TimeFilter({ onChange }: TimeFilterProps) {
  const [selected, setSelected] = useState<TimeIntent>('now');
  const [customSelection, setCustomSelection] = useState<CustomTimeSelection | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const applySelection = (intent: TimeIntent, selection: CustomTimeSelection | null) => {
    setSelected(intent);
    onChange?.({ intent, customSelection: intent === 'custom' ? selection : null });
  };

  const handlePress = (key: TimeIntent) => {
    if (key === 'custom') {
      setModalVisible(true);
      return;
    }
    applySelection(key, null);
  };

  const handleCustomConfirm = (selection: CustomTimeSelection) => {
    setCustomSelection(selection);
    applySelection('custom', selection);
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Quand veux-tu bouger ?" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {TIME_INTENT_OPTIONS.map((option) => {
          const isActive = option.key === selected;
          const isCustomWithSelection = option.key === 'custom' && Boolean(customSelection);
          const label = isCustomWithSelection && customSelection ? customSelection.label : option.label;

          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.8}
              onPress={() => handlePress(option.key)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ChooseTimeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleCustomConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
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
