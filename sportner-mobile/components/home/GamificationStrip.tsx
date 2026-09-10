import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/theme';
import type { GamificationStats } from '@/types/home';

type GamificationStripProps = {
  stats: GamificationStats;
};

export function GamificationStrip({ stats }: GamificationStripProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.streak}>🔥 Série de {stats.streakWeeks} semaines</Text>
        <Text style={styles.stats}>
          {stats.points.toLocaleString('fr-FR')} pts · Niveau Sportner {stats.sportnerLevel}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/profil')}>
        <Text style={styles.link}>Voir ma progression →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  link: {
    color: colors.accentSoft,
    fontSize: 11.5,
    fontWeight: '700',
    marginTop: 6,
  },
});
