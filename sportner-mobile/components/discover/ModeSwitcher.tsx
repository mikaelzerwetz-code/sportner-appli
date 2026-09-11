import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { brand } from '@/constants/brand';
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
    gap: 8,
    marginTop: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: brand.accent,
  },
  tabText: {
    color: brand.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  tabTextActive: {
    color: brand.black,
  },
});
