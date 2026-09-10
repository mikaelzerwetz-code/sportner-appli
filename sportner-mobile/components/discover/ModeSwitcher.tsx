import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/theme';
import type { DiscoverMode } from '@/types/discover';

const MODES: { key: DiscoverMode; label: string }[] = [
  { key: 'players', label: 'Sportifs' },
  { key: 'sessions', label: 'Sessions' },
  { key: 'map', label: 'Carte' },
  { key: 'coaches', label: 'Coachs' },
];

type ModeSwitcherProps = {
  value: DiscoverMode;
  onChange: (mode: DiscoverMode) => void;
};

export function ModeSwitcher({ value, onChange }: ModeSwitcherProps) {
  return (
    <View style={styles.container}>
      {MODES.map((mode) => {
        const isActive = mode.key === value;
        return (
          <TouchableOpacity
            key={mode.key}
            style={[styles.tab, isActive && styles.tabActive]}
            activeOpacity={0.8}
            onPress={() => onChange(mode.key)}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{mode.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 4,
    marginTop: 14,
  },
  tab: {
    flex: 1,
    borderRadius: 11,
    paddingVertical: 9,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.accent,
  },
  tabText: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  tabTextActive: {
    color: colors.text,
  },
});
