import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/theme';
import type { GamificationStats } from '@/types/home';

type GamificationStripProps = {
  stats: GamificationStats;
};

export function GamificationStrip({ stats }: GamificationStripProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.streak}>🔥 Série de {stats.streakWeeks} semaines actives</Text>
      <Text style={styles.stats}>
        {stats.points.toLocaleString('fr-FR')} pts · Niveau Sportner {stats.sportnerLevel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 20,
  },
  streak: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  stats: {
    color: colors.accentSoft,
    fontSize: 12,
    fontWeight: '700',
  },
});
